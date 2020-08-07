import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useMutation } from '@apollo/react-hooks';
import { Link, Button } from '../atoms';
import { PaymentForm } from '../molecules';
import { withContext, getSession, MUTATIONS, QUERIES, client } from '../apollo';
import { FormLayout } from '.';
import { validateFormDetails } from '../utils/validateDetails';
import { getPin } from '../utils/JWT';
import { mapPaymentMethod } from '../utils/misc';
import EnterPin from './EnterPin';
import { offerDetialsStyles } from '../utils/styles';

const initialState = {
  // UI Controllers
  loadingScreen: true, // Initialize loading as true
  loading: false, // Initialize loading as true
  errors: {},
  enterPinScreen: false,
  paymentDataform: false,

  // Proposal Data
  proposalId: null,
  paymentMethod: '',
  makerId: null,
  takerId: null,
  name: null,
  lastName: null,
  email: null,
  address: null,
  phone: null,
  bankData: null,
  accountNumber: null,
  country: null,
  offerAmount: 0,
  offerAsset: null,
  operationType: null,
  usernameMaker: null,
};

const OfferDetails = props => {
  // Set initialState to React hook
  const [state, setState] = useState(initialState);

  useEffect(() => {
    // Map route params to local state
    async function setParamsToLocalState() {
      // GET the current session from async storage
      const { session } = await getSession();
      const takerId = session.id;
      const { body, id } = props.route.params;
      const {
        makerId,
        paymentMethod,
        operationType,
        usernameMaker,
        offerAsset,
        offerAmount,
      } = body;

      setState(prev => ({
        ...prev,
        takerId,
        makerId,
        paymentMethod,
        operationType,
        proposalId: id,
        usernameMaker,
        offerAsset,
        offerAmount,
        loadingScreen: false, // Show content
        paymentDataform: operationType === 'buy' ? true : false,
      }));
    }

    setParamsToLocalState();
  }, []);

  // MUTATIONS
  const sendAcceptance = useMutation(MUTATIONS.SEND_ACCEPTANCE);
  const sendResolution = useMutation(MUTATIONS.SEND_RESOLUTION);
  const sendSellResolution = useMutation(MUTATIONS.SEND_SELL_RESOLUTION);
  const sendSettlement = useMutation(MUTATIONS.SEND_SETTLEMENT);
  const sendFulfillment = useMutation(MUTATIONS.SEND_FULFILLMENT);
  const addPaymentMethod = useMutation(
    MUTATIONS.INSERT_PROPOSAL_PAYMENT_METHOD,
  );

  // Deconstruct state
  const {
    loading,
    loadingScreen,
    errors,
    enterPinScreen,
    paymentDataform,
    proposalId,
    paymentMethod,
    makerId,
    takerId,
    name,
    lastName,
    email,
    address,
    phone,
    bankData,
    accountNumber,
    country,
    usernameMaker,
    offerAmount,
    offerAsset,
    operationType,
  } = state;

  const handleTextChange = (name, value) => {
    setState(prev => ({ ...prev, [name]: value }));
  };

  const actionSendAcceptance = async () => {
    setState(prev => ({ ...prev, loading: true }));
    let currentStep;
    // Let's check if pin is already stored, if not show the EnterPin screen and stop execution...
    const pin = await getPin();
    if (pin === null || pin === '') {
      setState(prev => ({ ...prev, enterPinScreen: true }));
      return;
    }

    // Check if validation is required based on operation type
    if (operationType === 'buy') {
      const validation = validateFormDetails(
        name,
        lastName,
        email,
        bankData,
        address,
        accountNumber,
        phone,
        paymentMethod,
      );

      if (!validation.isValid) {
        setState(prev => ({ ...prev, errors: validation, loading: false }));
        return Alert.alert(
          'Cannot contain empty fields',
          'Please enter the information requested in the form before continuing',
        );
      }
    }

    // Get recipientAddress
    const recipientData = await client.query({
      query: QUERIES.PUBLIC_KEY,
      variables: {
        id: takerId,
        pin,
      },
    });
    const recipientAddress = recipientData.data.publicKeys.ksm;

    try {
      // Send acceptance
      currentStep = 'Acceptance';
      await processMutation('sendAcceptance', {
        proposalId,
        takerId,
        node: operationType === 'buy' ? 'takerBuyer' : 'takerSeller',
      });

      // [**Send resolution**]
      currentStep = 'Resolution';
      const sendResolutionMutation =
        operationType === 'buy' ? 'sendResolution' : 'sendSellResolution';
      const sendResolutionVars = {
        proposalId: proposalId,
        takerId,
        recipientAddress,
        node: operationType === 'buy' ? 'makerSeller' : 'makerBuyer',
      };

      if (operationType === 'buy') delete sendResolutionVars.recipientAddress;

      await processMutation(sendResolutionMutation, sendResolutionVars);
      // [**Send resolution END**]

      // If this is a sell then finish the process (settlement and fulfillment relays on maker)
      if (operationType === 'sell') {
        setState(prev => ({ ...prev, loading: false }));
        props.navigation.navigate('AcceptedSell', { ...props.route.params });
        return;
      }

      // If this is a buy then we continue ...
      currentStep = 'Settlement';
      await processMutation('sendSettlement', {
        proposalId,
        makerId,
        takerId,
        pin,
        node: 'takerBuyer',
      });

      currentStep = 'Fulfillment';
      await processMutation('sendFulfillment', {
        proposalId: proposalId,
        takerId,
        node: 'takerBuyer',
      });

      currentStep = 'Add Payment Method';
      await processMutation('addPaymentMethod', {
        userId: takerId,
        proposalId,
        name,
        email,
        lastName,
        address,
        phone,
        bankData,
        accountNumber,
        paymentMethod,
      });

      props.navigation.navigate('AcceptedBuy', {
        body: {
          usernameMaker,
          offerAsset,
          offerAmount,
          paymentMethod,
          operationType,
          paymentData: {
            userId: takerId,
            proposalId,
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
      setState(prev => ({ ...prev, loading: false }));
    } catch (e) {
      setState(prev => ({ ...prev, loading: false }));
      return Alert.alert(
        'Error',
        `Something went wrong during the ${currentStep}. Please try again later.`,
        [{ text: 'OK' }],
        { cancelable: false },
      );
    }
  };

  // Process mutation dynamically
  async function processMutation(mutation, variables) {
    const mutations = {
      addPaymentMethod:addPaymentMethod[0],
      sendAcceptance:sendAcceptance[0],
      sendResolution:sendResolution[0],
      sendSellResolution:sendSellResolution[0],
      sendSettlement:sendSettlement[0],
      sendFulfillment:sendFulfillment[0],
    };

    const m = mutations[mutation];

    return await m({
      variables,
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
  }

  return !enterPinScreen ? (
    <FormLayout.Content>
      <FormLayout.Body>
        {!loadingScreen ? (
          <ScrollView>
            <View style={offerDetialsStyles.container}>
              <View style={offerDetialsStyles.form}>
                <View style={offerDetialsStyles.row}>
                  <View style={offerDetialsStyles.left}>
                    <Text style={offerDetialsStyles.text}>
                      {mapPaymentMethod(paymentMethod)}
                    </Text>
                    <Text style={offerDetialsStyles.textSecond}>
                      {usernameMaker}
                    </Text>
                  </View>
                  <View style={offerDetialsStyles.right}>
                    <Text style={offerDetialsStyles.textAmount}>
                      $ {offerAmount} {offerAsset} {'->'} KSM
                    </Text>
                  </View>
                </View>
              </View>
              {operationType !== 'sell' &&
              operationType !== 'withdraw_funds' ? (
                <View style={offerDetialsStyles.form}>
                  <PaymentForm
                    show={paymentDataform}
                    method={paymentMethod}
                    onChangeText={handleTextChange}
                    errors={errors}
                  />
                </View>
              ) : (
                <View />
              )}
            </View>
          </ScrollView>
        ) : (
          <View style={offerDetialsStyles.textLoad}>
            <ActivityIndicator size="small" color="black" />
          </View>
        )}
      </FormLayout.Body>
      <FormLayout.Footer>
        <View style={{ flex: 1, marginTop: '3%' }}>
          {loading ? (
            <View style={offerDetialsStyles.textLoad}>
              <ActivityIndicator size="small" color="black" />
              <Text style={offerDetialsStyles.textLoad}>Please wait...</Text>
            </View>
          ) : (
            <Button
              label="Confirm"
              action={actionSendAcceptance}
              stylect={offerDetialsStyles.buttonConfirm}
            />
          )}
          {!loading && (
            <Link
              label="Cancel"
              color="#cc5741"
              stylect={offerDetialsStyles.linkText}
              action={() => {}}
            />
          )}
        </View>
      </FormLayout.Footer>
    </FormLayout.Content>
  ) : (
    <View style={offerDetialsStyles.enterPinWrapper}>
      <EnterPin
        action={token => {
          // Hide enter pin screen
          setState(prev => ({ ...prev, enterPinScreen: false }));
        }}
      />
    </View>
  );
};

export default withContext(OfferDetails);
