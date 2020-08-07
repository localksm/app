import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@apollo/react-hooks';
import { Button, Link } from '../atoms';
import { FormLayout } from '.';
import { MUTATIONS, QUERIES, getSession } from '../apollo';
import { getPin } from '../utils/JWT';

function SendSettlementMakerContent(props) {
  const navigation = useNavigation();
  const sendSettlement = useMutation(MUTATIONS.SEND_SETTLEMENT);
  const sendFulfillment = useMutation(MUTATIONS.SEND_FULFILLMENT);

  // Handle action

  // Process mutations
  async function processAction() {
    let currentStep;

    const pin = await getPin();
    const { session } = await getSession();
    const { id } = session;
    const proposalId = props.route.params.id;
    const { body } = props.route.params;
    const { takerId } = body;
    const settlementNode = 'makerBuyer';
    const fulfillmentNode = 'makerBuyer';

    try {
      currentStep = 'Settlement';
      await sendSettlement[0]({
        variables: {
          proposalId,
          makerId: id,
          takerId,
          pin,
          node: settlementNode,
        },
      });

      currentStep = 'Fulfillment';
      sendFulfillment[0]({
        variables: {
          proposalId,
          takerId,
          node: fulfillmentNode,
        },
        refetchQueries: [
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

      // Navigate
      return navigation.navigate('ConfirmedSell', {
        ...props.route.params,
      });
    } catch (e) {
      alert(`There was an error during ${currentStep}. Please try again later`);
    }
  }
  return (
    <FormLayout.Content>
      <FormLayout.Body>
        <Text style={{ margin: 10, textAlign: 'center', color: 'white' }}>
          Send settlement maker
        </Text>
      </FormLayout.Body>
      <FormLayout.Footer>
        <View style={styles.footerContainer}>
          <Button label="Send Settlement" action={processAction} />
          <View style={styles.buttons}>
            <Link
              label="Report a problem"
              color="#cc5741"
              action={() =>
                props.navigation.navigate('ReportAProblem', {
                  ...props.route.params,
                })
              }
            />
          </View>
        </View>
      </FormLayout.Footer>
    </FormLayout.Content>
  );
}

const styles = StyleSheet.create({
  buttons: {
    paddingTop: '3%',
    alignItems: 'center',
  },
  footerContainer: {
    flex: 1,
    marginTop: '3%',
    marginHorizontal: '8%',
  },
});

export default SendSettlementMakerContent;
