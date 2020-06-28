import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@apollo/react-hooks';
import moment from'moment';
import { QUERIES, getSession } from '../apollo';
import Offer from './Offer';

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

function dateNew(date) {
    console.log(date);
    
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
      if (month < 10) {
        return(`${day}-0${month}-${year}`);
      } else {
        return(`${day}-${month}-${year}`);
      }
  }



const CardProposal = props => {
  const [session, setSession] = useState(null);
 
  const navigation = useNavigation();

  const variables = {
    userId: session !== null && session.id,
    offset: 0,
    limit: 0,
  };

  useEffect(() => {
    set();
  }, []);

  async function set() {
    const { session } = await getSession();
    setSession(session);
  }

  const { loading, error, data } = useQuery(QUERIES.QUERY_PROPOSALS, {
    variables: { variables },
  });
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View stlyle={styles.container}>
      <FlatList
        data={data.proposals}
        renderItem={({ item }) => {
            
        //   console.log('es el item',item);
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('DetailsOffer')}>
              <Offer
                payment={mapPaymentMethod(item.body.paymentData.type)}
                usernemeMaker={item.body.usernemeMaker}
                date={}
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
