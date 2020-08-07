import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import Offer from './Offer';
import { mapPaymentMethod, cardProposalNavigation } from '../utils/misc';

function CardComponent({ item }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      testID="press-card"
      onPress={() => {
        cardProposalNavigation(item, navigation);
      }}>
      <Offer
        payment={mapPaymentMethod(item.body?.paymentMethod)}
        usernameMaker={item.body?.usernameMaker}
        date={moment(new Date(item.body?.updatedAt).toUTCString()).format(
          'MMMM Do YYYY - h:mm:ss A',
        )}
        offered={item.body?.requestAmount}
        requiered={item.body?.offerAmount}
        status={item.status}
        currency={
          item.body?.operationType === 'add_funds' ||
          item.body?.operationType === 'buy'
            ? item.body?.offerAsset
            : item.body?.requestAsset
        }
        isOffer={true}
        operationType={item.body?.operationType}
      />
    </TouchableOpacity>
  );
}

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

export default CardComponent;
