import React, { useState, useEffect }  from 'react';
import { Alert } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import { MUTATIONS, QUERIES, getSession } from '../apollo';
import { getPin } from '../utils/JWT';
import { setSessionId, useLoader } from '../utils/hooks';


const useSendDisbursementBuyer = (props) => {
    const sendDisbursementBuyerMutation = useMutation(
        MUTATIONS.SEND_DISBURSEMENT_BUYER,
      );
      const { load, setLoad } = useLoader(false);
      const [id, setId] = useState(null);
      const { proposalId, takerId, operationType, disbursed } = props.variables;
    
      useEffect(() => {
        setSessionId(setId);
      }, []);
    
      const confirmSent = async () => {
        setLoad(true);
        const pin = await getPin();
        let node;
        if (operationType === 'buy') {
          node = 'takerBuyer';
        } else {
          node = 'makerBuyer';
        }
    
        if (pin === null || pin === '') {
          props.showEnterPinScreen(true);
          return;
        }
    
        try {
          const response = await sendDisbursementBuyerMutation[0]({
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
          const { success } = response.data.sendDisbursementBuyer;
          if (success) {
            return props.navigation.navigate('TransactionCompleted', props.params)
          } else {
            setLoad(false);
            return Alert.alert('Warning', 'Something went wrong, contact support');
          }
        } catch (e) {
          setLoad(false);
          Alert.alert('Warning', 'Something went wrong, please contact support');
          throw new Error(e);
        }
      };
   return {disbursed, load, confirmSent}
};

export default useSendDisbursementBuyer;