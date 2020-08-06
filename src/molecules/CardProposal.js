import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@apollo/react-hooks';
import moment from 'moment';
import { QUERIES } from '../apollo';
import Offer from './Offer';
import { mapPaymentMethod, cardProposalNavigation } from '../utils/misc';
import { setSessionId } from '../utils/hooks';
import { GenericGQLLoading, GenericGQLError } from '.';

const CardProposal = () => {
  const [id, setId] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    setSessionId(setId);
  }, []);

  const { loading, error, data } = useQuery(QUERIES.QUERY_PROPOSALS, {
    variables: { userId: id },
    pollInterval: 6000,
  });

  return loading ? (
    <GenericGQLLoading styles={styles} />
  ) : error ? (
    <GenericGQLError styles={styles} error={error} />
  ) : (
    <>
      <FlatList
        data={data.proposals}
        ListFooterComponent={<View />}
        ListFooterComponentStyle={styles.listFooterComponent}
        contentContainerStyle={styles.contentContainer}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                cardProposalNavigation(item, navigation);
              }}>
              <Offer
                payment={mapPaymentMethod(item.body.paymentMethod)}
                usernameMaker={item.body.usernameMaker}
                date={moment(
                  new Date(item.body.updatedAt).toUTCString(),
                ).format('MMMM Do YYYY - h:mm:ss A')}
                offered={item.body.requestAmount}
                requiered={item.body.offerAmount}
                status={item.status}
                currency={
                  item.body.operationType === 'add_funds' ||
                  item.body.operationType === 'buy'
                    ? item.body.offerAsset
                    : item.body.requestAsset
                }
                isOffer={true}
                operationType={item.body.operationType}
              />
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listFooterComponent: {
    height: 30,
  },
  contentContainer: {
    paddingBottom: 300,
  },
});

export default CardProposal;
