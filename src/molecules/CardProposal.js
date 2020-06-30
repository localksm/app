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
import { QUERIES, getSession } from '../apollo';
import Offer from './Offer';

function Loading() {
  return (
    <View style={[styles.container, {marginVertical: 30}]}>
        <ActivityIndicator size="large" color="black" />
    </View>
  );
}

function Error({error}) {
  return (
    <View style={styles.container}>
        <Text>{`Error! ${error.message}`}</Text>
    </View>
  );
}

function mapPaymentMethod(method) {
  const methods = {
    VE: 'Venmo',
    ZE: 'Zelle',
    MP: 'Mercado Pago',
    WU: 'Western Union',
    MG: 'Money Gram',
    NE: 'Neteller',
    UP: 'Uphold',
    PP: 'Paypal',
    BN: 'Bank',
    OT: 'Other',
  };
  return methods[method];
}

const CardProposal = props => {
  const [id, setId] = useState(null);
  const navigation = useNavigation();
  
  useEffect(() => {
    set();
  }, []);

  async function set() {
    const { session } = await getSession();
    setId(session.id);
  }

  const { loading, error, data } = useQuery(QUERIES.QUERY_PROPOSALS, {
    variables: {userId: id}
  });
  if (loading) return <Loading />;
  if (error) return <Error error={error}/>;
  
  return (
    <View stlyle={styles.container}>
      <FlatList
        data={data.proposals}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                switch (item.body.operationType) {
                  case 'add_funds':
                    return navigation.navigate('DetailsOffer', {...item})
                  case 'withdraw_funds':
                    return navigation.navigate('DetailsOffer', {...item})
                  default:
                    Alert.alert('Warning!', 'Unexpected error, contact the support area')
                    break;
                 }
              }}>
              <Offer
                payment={mapPaymentMethod(item.body.paymentMethod)}
                usernameMaker={item.body.usernameMaker}
                date={moment(new Date(item.body.updatedAt).toUTCString()).format(
                  'MMMM Do YYYY - h:mm:ss A',
                )}
                offered={item.body.offerAmount}
                requiered={item.body.requestAmount}
                status={item.status}
                currency={item.body.requestAsset}
                isOffer={true}
                operationType={item.body.operationType}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CardProposal;
