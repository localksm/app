import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useMutation } from '@apollo/react-hooks';
import { Link, Button, InputText, PaymentForm } from '../atoms';
import { FooterWhite } from '../molecules';
import { withContext, getSession, MUTATIONS, QUERIES } from '../apollo';

const OfferDetails = props => {

  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentDataform, setPaymentDataform] = useState(false);
  const [proposalId, setProposalId] = useState(null);
  const [makerId, setMakerId] = useState(null);
  const [takerId, setTakerId] = useState(null);
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

  useEffect(() => {
    _prepareData();
  }, []);

  const _prepareData = async () => {
    const { state } = props;
    const proposal = await state.getData('OFFER');
    const { session } = await getSession();

    setTakerId(session.id);
    /**
     * Esta linea esta comentada para usarla cuando este la implementacion real,
     * ya que para fines practicos y de uso para prueba estoy agregando un metodo por default
     * para renderear
     */
    //setPaymentMethod(proposal.offer.body.paymentMethod);
    await setPaymentMethod('VE');
    await setPaymentDataform(true);
    setProposalId(proposal.offer.id);
    setMakerId(proposal.offer.body.makerId);
  };

  const actionSendAcceptance = async () => {
    setLoading(true);

    try {
      await sendAcceptance({
        variables: { proposalId: props.route.params.id },
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
        variables: { proposalId: props.route.params.id, takerId },
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
          proposalId: props.route.params.id,
          makerId: props.route.params.body.makerId,
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
        variables: { proposalId: props.route.params.id, takerId },
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
          proposalId: props.route.params.id,
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
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.form}>
            <View style={styles.row}>
              <View style={styles.left}>
                <Text style={styles.text}>Payment</Text>
                <Text style={styles.textSecond}>Username Maker</Text>
              </View>
              <View style={styles.right}>
                <Text style={styles.textAmount}>$ 1 USD -> KSM</Text>
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
      <FooterWhite stylectContainer={styles.containerButtons}>
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  containerButtons: {
    paddingTop: '30%',
    paddingBottom: '5%',
    height: '5%'
  },
  buttonConfirm: {
    marginHorizontal: 20,
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
  textAmount: {
    color: '#ffffff',
    fontFamily: 'Poppins-Regular',
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
