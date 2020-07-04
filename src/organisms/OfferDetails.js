import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useMutation } from '@apollo/react-hooks';
import { Link, Button, InputText, PaymentForm } from '../atoms';
import { FooterWhite } from '../molecules';
import { withContext, getSession, MUTATIONS, QUERIES } from '../apollo';


function mapPaymentMethod(method) {
  const methods = {
    VE: 'Venmo',
    ZE: 'Zelle',
    MP: 'Mercado Pago',
    WU: 'Western Union',
    MG: 'Money Gram',
    NE: 'Neteller',
    UP: 'Uphold',
    PP: 'Paypal',
    BN: 'Bank',
    OT: 'Other',
  };
  return methods[method];
}

const OfferDetails = props => {
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentDataform, setPaymentDataform] = useState(false);
  const [proposalId, setProposalId] = useState(null);
  const [makerId, setMakerId] = useState(0);
  const [takerId, setTakerId] = useState(0);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [bankData, setBankData] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  /**
   * Propiedades que nose de donde sacar
   */
  const [country, setCountry] = useState('');

  /**
   * MUTATIONS
   */
  const [sendAcceptance] = useMutation(MUTATIONS.SEND_ACCEPTANCE);
  const [sendResolution] = useMutation(MUTATIONS.SEND_RESOLUTION);
  const [sendSettlement] = useMutation(MUTATIONS.SEND_SETTLEMENT);
  const [sendFulfillment] = useMutation(MUTATIONS.SEND_FULFILLMENT);
  const [addPaymentMethod] = useMutation(
    MUTATIONS.INSERT_PROPOSAL_PAYMENT_METHOD,
  );

  const screenHeight = Math.round(Dimensions.get('window').height);
  

  useEffect(() => {
    _prepareData();
  }, []);

  const _prepareData = async () => {
        
    const { session } = await getSession();
    await setTakerId(session.id);    
    const params = props.route.params;
    await setPaymentMethod( params.body.paymentMethod);
    await setPaymentDataform(true);
    await setProposalId(params.id );
    await setMakerId(params.body.makerId);
  };

  const actionSendAcceptance = async () => {
        
    setLoading(true);
    try {
         
      await sendAcceptance({
        variables: { proposalId: props.route.params.id, takerId },
      });
    } catch (error) {
      setLoading(false);
      return Alert.alert(
        'Error',
        'Something went wrong during the acceptance. Please try again later.',
        [{ text: 'OK' }],
        { cancelable: false },
      );
    }

    try {
      await sendResolution({
        variables: { proposalId: proposalId, takerId },
      });      
    } catch (error) {
      setLoading(false);
      return Alert.alert(
        'Error',
        'Something went wrong during the resolution. Please try again later.',
        [{ text: 'OK' }],
        { cancelable: false },
      );
    }

    try {
     await sendSettlement({
        variables: {
          proposalId: proposalId,
          makerId: makerId,
          takerId,
        },
      });      
      
    } catch (error) {
      setLoading(false);
      return Alert.alert(
        'Error',
        'Something went wrong during the settlement. Please try again later.',
        [{ text: 'OK' }],
        { cancelable: false },
      );
    }

    try {

      await sendFulfillment({
        variables: { proposalId: proposalId, takerId },
        refetchQueries: [
          {
            query: QUERIES.QUERY_PROPOSALS,
            variables: { userId: takerId, offset: 0, limit: 100 },
          },
          {
            query: QUERIES.QUERY_USER_PROPOSALS,
            variables: {
              id: takerId,
              offset: 0,
              limit: 100,
            },
          },
        ],
      });      
      
    } catch (error) {
      setLoading(false);
      return Alert.alert(
        'Error',
        'Something went wrong during the fulfillment. Please try again later.',
        [{ text: 'OK' }],
        { cancelable: false },
      );
    }

    try {
     await addPaymentMethod({
        variables: {
          userId: takerId,
          proposalId: proposalId,
          name,
          email,
          lastName,
          address,
          phone,
          bankData,
          accountNumber,
          paymentMethod,
        },
      });   
      setLoading(false);
      props.navigation.navigate('AcceptedBuy', {
        body: {
          usernameMaker: props.route.params.body.usernameMaker,
          offerAsset: props.route.params.body.offerAsset,
          offerAmount: props.route.params.body.offerAmount,
          paymentMethod: props.route.params.body.paymentMethod,
          operationType: props.route.params.body.operationType,
          paymentData: {
            userId: takerId,
            proposalId: proposalId,
            name,
            email,
            lastName,
            address,
            phone,
            bankData,
            accountNumber,
            paymentMethod,
          },
        },
      });   
      
    } catch (error) {
      setLoading(false);
      return Alert.alert(
        'Error',
        'Something went wrong during the fulfillment. Please try again later.',
        [{ text: 'OK' }],
        { cancelable: false },
      );
    }

    setLoading(false);
    props.navigation.navigate('AcceptedBuy', {...props.route.params});
  };

  const handleTextChange = (name, value) => {
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'address':
        setAddress(value);
        break;
      case 'bankData':
        setBankData(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      case 'accountNumber':
        setAccountNumber(value);
        break;
      default:
        break;
    }
  };

  return loading ? (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={'white'} />
    </View>
  ) : (
    <>
      <View style={{flex: 1}}>
          <View style={{flex: screenHeight <= 683?0.8 : 0.9}}>
          <ScrollView style={{ overflow: 'hidden', maxHeight: screenHeight <= 683?480: screenHeight >= 700?560:500 }}>            
              <View style={styles.container}>
                <View style={styles.form}>
                  <View style={styles.row}>
                    <View style={styles.left}>
                      <Text style={styles.text}>{mapPaymentMethod(paymentMethod)}</Text>
                      <Text style={styles.textSecond}>{props.route.params.body.usernameMaker}</Text>
                    </View>
                    <View style={styles.right}>
                      <Text style={styles.textAmount}>
                        $ {props.route.params.body.offerAmount} {props.route.params.body.offerAsset} -> KSM
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.form}>
                  {/* use expected with apollo implementation */}
                  <PaymentForm
                    show={paymentDataform}
                    method={paymentMethod}
                    onChangeText={handleTextChange}
                  />
                </View>
              </View>                  
          </ScrollView> 
          </View>
          <View style={{flex: screenHeight <= 683? 0.2 :0.1}}>
          <FooterWhite stylectContainer={ screenHeight <= 683? styles.containerButtonsSmall: styles.containerButtons}>
              <Button
                label="Confirm"
                action={actionSendAcceptance}
                stylect={styles.buttonConfirm}
              />
              <Link
                label="Cancel"
                color="#cc5741"
                stylect={styles.linkText}
                action={() => {}}
              />
          </FooterWhite>
          </View>
      </View>        
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginHorizontal: 30,    
    paddingBottom:'70%',
    paddingTop: '20%',
    zIndex: 1,
    elevation: 1,
  },
  containerButtons: {        
    paddingBottom:'40%',
    paddingTop: '15%',
    zIndex: 2,
    elevation: 2
  },
  containerButtonsSmall: {        
    paddingBottom:'20%',
    paddingTop: '12%',
    zIndex: 2,
    elevation: 2
  },
  buttonConfirm: {
    marginHorizontal: 20,
    paddingTop: 0
  },
  containerFee: {
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    justifyContent: 'center',
    marginVertical: 5,
    paddingTop: '20%',
    paddingBottom: '10%',
    backgroundColor: 'white',
  },
  form: {
    backgroundColor: '#2D2D2D',
    borderColor: 'white',
    borderWidth: 0.2,
    padding: 20,
    borderRadius: 10,
    borderTopColor: '#ffffff',
    borderStyle: 'solid',
    borderBottomColor: '#ffffff',
    marginTop: 20,
    elevation: 3,
  },

  text: {
    marginVertical: 5,
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: '#ffffff',
  },
  textSecond: {
    fontSize: 15,
    padding: 5,
    color: '#ffffff',
    fontFamily: 'Poppins-Medium',
  },
  textAmount: {
    fontSize: 16,
    paddingLeft: 5,
    fontFamily: 'Poppins-Medium',
    color: '#ffffff',
    textAlign:'right',
    alignSelf:'stretch',
    marginVertical: 5
  },
  textareaContainer: {
    height: 180,
    padding: 5,
    backgroundColor: '#F5FCFF',
    marginVertical: 50,
  },
  textarea: {
    textAlignVertical: 'top', // hack android
    height: 170,
    fontSize: 14,
    color: '#333',
  },
  loading: {
    flex: 1,
    marginTop: 240,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBlod: {
    fontFamily: 'Poppins-Bold',
    color: '#ffffff',
  },
  left: {
    width: '50%',
  },
  right: {
    width: '50%',
    flexDirection: 'row-reverse',
    paddingStart: 10,
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  feeContainer: {
    backgroundColor: '#FAFAFA',
    marginTop: 0,
    borderRadius: 10,
  },
  linkText: {
    alignItems: 'center',
    fontFamily: 'Poppins-Regular',
    paddingTop: 30,
  },
});

export default withContext(OfferDetails);
