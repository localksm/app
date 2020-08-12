import React from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import moment from 'moment';
import { Offer } from '../molecules';
import { mapPaymentMethod, myOfferNavigator } from '../utils/misc';

function OfferItem({ item, navigation, name }) {
  return (
    <TouchableOpacity
      testID="my-offer-item-test"
      onPress={() => myOfferNavigator(item, navigation, name)}>
      <Offer
        payment={mapPaymentMethod(item.body.paymentMethod)}
        usernameMaker={item.body.usernameMaker}
        date={moment(new Date(item.body.updatedAt).toUTCString()).format(
          'MMMM Do YYYY - h:mm:ss A',
        )}
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
}

export default OfferItem;
