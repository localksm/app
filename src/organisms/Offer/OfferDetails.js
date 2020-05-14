import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Link, Button } from '../../atoms';

const OfferDetails = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [proposalId, setProposalId] = useState(null);
  const [requestId, setRequestId] = useState(null);
  const [makerId, setMakerId] = useState(null);
  const [takerId, setTakerId] = useState(null);
  const [offerAsset, setOfferAsset] = useState(null);
  const [requestAsset, setRequesAsset] = useState(null);
  const [offerAmount, setOfferAmount] = useState(0);
  const [requestAmount, setRequestAmount] = useState(0);
  const [timestamp, setTimestamp] = useState(null);
  const [conditions, setConditions] = useState([]);
  const [juryPool, setJuryPool] = useState(null);
  const [challengeStake, setChallengeStake] = useState(0.1);
  const [audience, setAudience] = useState([null]);
  const [previousHash, setPreviousHash] = useState('');
  const [acceptancePreviousHash, setAcceptancePreviousHash] = useState('');
  const [chain, setChain] = useState('stellar');
  const [type, setType] = useState('add');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentDataForm, setPaymentDataForm] = useState(false);
  const [localCurrency, setLocalCurrency] = useState('');
  // Payment data
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [bankData, setBankData] = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  return loading ? (
    <View style={styles.loading}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <>
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
          {/* <PaymentForm
              show={this.state.paymentDataform}
              method={this.state.paymentMethod}
              onChangeText={this.handleTextChange}
            /> */}
        </View>
      </View>
      <View style={styles.containerFee}>
        <View style={styles.feeContainer}>
          {/* <FeesQuery
                qrFees={FEE}
                container="jury"
                amount_send={this.state.offerAmount}>
                <View
                    style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: 5,
                    marginTop: 10,
                    }}>
                    <Text style={styles.textBlod}> You will receive: </Text>
                    <ExchangeRate
                    query={QUERY_EXCHANGERATES}
                    isoCode={this.state.localCurrency}
                    amount={params.body.offerAmount}>
                    <Text style={styles.textAmount}>
                        {`$offer amount  offer asset or`}
                    </Text>
                    </ExchangeRate>
                </View>
                </FeesQuery> */}
        </View>
        <View style={{ paddingBottom: 10 }}>
          <Button
            label="Confirm"
            action={() => {}}
            stylect={{ marginHorizontal: 20 }}
          />
          <Link
            label="Cancel"
            color="black"
            stylect={{
              alignItems: 'center',
              fontFamily: 'Poppins-Regular',
              paddingTop: 30,
            }}
            action={() => {}}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginHorizontal: 30,
    marginVertical: 10,
    paddingBottom: '50%',
  },
  containerFee: {
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    justifyContent: 'center',
    marginVertical: 10,
    paddingTop: '30%',
    paddingBottom: '10%',
    backgroundColor: 'white',
  },
  form: {
    backgroundColor: 'black',
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
    color: '#666666',
  },
  textSecond: {
    fontSize: 15,
    padding: 5,
    color: '#b8b8b8',
    fontFamily: 'Poppins-Medium',
  },
  textAmount: {
    fontSize: 16,
    paddingLeft: 5,
    fontFamily: 'Poppins-Medium',
    color: '#666666',
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
    color: '#666666',
    fontFamily: 'Poppins-Regular',
  },
  textBlod: {
    fontFamily: 'Poppins-Bold',
    color: '#666666',
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
    marginTop: 30,
    borderRadius: 10,
  },
});

export default OfferDetails;
