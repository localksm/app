import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
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
  const [session, setSession] = useState(null);
 
  const navigation = useNavigation();

  const variables = {
    userId: session !== null && session.id,
  };

  useEffect(() => {
    set();
  }, []);

  async function set() {
    const { session } = await getSession();
    setSession(session);
  }

  const { loading, error, data } = useQuery(QUERIES.QUERY_PROPOSALS, {
    variables: variables
  });
  if (loading) return <Loading />;
  if (error) return <Error error={error}/>;
  
  return (
    <View stlyle={styles.container}>
      <FlatList
        data={data.proposals}
        renderItem={({ item }) => {
          console.log(item);
          

          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('DetailsOffer')}>
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CardProposal;
