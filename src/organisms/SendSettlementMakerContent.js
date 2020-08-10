import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@apollo/react-hooks';
import { Button, Link } from '../atoms';
import { FormLayout } from '.';
import { MUTATIONS } from '../apollo';
import { processAction } from '../utils/misc';

function SendSettlementMakerContent(props) {
  const navigation = useNavigation();
  const sendSettlement = useMutation(MUTATIONS.SEND_SETTLEMENT);
  const sendFulfillment = useMutation(MUTATIONS.SEND_FULFILLMENT);

  return (
    <FormLayout.Content>
      <FormLayout.Body>
        <Text style={{ margin: 10, textAlign: 'center', color: 'white' }}>
          Send settlement maker
        </Text>
      </FormLayout.Body>
      <FormLayout.Footer>
        <View style={styles.footerContainer}>
          <Button
            label="Send Settlement"
            action={() =>
              processAction(props, navigation, sendSettlement, sendFulfillment)
            }
          />
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
