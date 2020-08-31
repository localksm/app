import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import { MUTATIONS, QUERIES, getSession } from '../apollo';
import { getPin } from '../utils/JWT';

const useSendDisbursementSeller = (props) => {
  const sendDisbursementSeller = useMutation(
    MUTATIONS.SEND_DISBURSEMENT_SELLER,
  );
  const [load, setLoad] = useState(false);
  const [id, setId] = useState(null);
  const {
    proposalId,
    takerId,
    operationType,
    pin,
    disbursed,
  } = props.variables;

  useEffect(() => {
    set();
  }, []);

  async function set() {
    const { session } = await getSession();
    setId(session.id);
  }

  const confirmSent = async () => {
    const pin = await getPin();
    let node;
    if (operationType === 'buy') {
      node = 'makerSeller';
    } else {
      node = 'takerSeller';
    }

    if (pin === null || pin === '') {
      props.showEnterPinScreen(true);
      return;
    }

    try {
      setLoad(true);
      await sendDisbursementSeller[0]({
        variables: {
          proposalId: proposalId,
          takerId: takerId,
          node,
          pin,
        },
        refetchQueries: [
          {
            query: QUERIES.QUERY_PROPOSALS,
            variables: { userId: id, offset: 0, limit: 100 },
          },
          {
            query: QUERIES.QUERY_USER_PROPOSALS,
            variables: { id: id, offset: 0, limit: 100 },
          },
        ],
      });

      return props.navigation.navigate('TransactionCompleted', props.params);
    } catch (e) {
      setLoad(false);
      Alert.alert('Warning', 'Something went wrong, please contact support');
      throw new Error(error);
    }
  };

  return { load, confirmSent };
};

export default useSendDisbursementSeller;
