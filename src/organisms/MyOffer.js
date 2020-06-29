import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useQuery } from '@apollo/react-hooks';
import moment from 'moment';

import { Offer } from '../molecules';
import { QUERIES, getSession } from '../apollo';
import { useNavigation } from '@react-navigation/native';

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

const MyOffer = () => {
  const navigation = useNavigation();  
  const [userID, setuserID] = useState(0);
  
  useEffect(() => {
    
    prepareData();
  }, []);

  const prepareData = async()=>{
    const {session} = await getSession();
    await setuserID(session.id);
    
  }


  const { loading, error, data } = useQuery(QUERIES.QUERY_USER_PROPOSALS, {
    variables: { id: 107 }
  });

  if (loading) return <Loading />;
  if (error) return <Error error={error}/>;
  

  return (
    <View>
      <View style={styles.container}>
        <Text style={{ ...styles.textBalance, paddingBottom: '5%' }}>
          Balance
        </Text>
        <Text style={{ ...styles.textBalance, fontSize: 20 }}>
          1,245.00 KSM
        </Text>
        <Text style={{ ...styles.textBalance, fontSize: 14 }}>
          {' '}
          $7,804.40 USD
        </Text>
      </View>
      <ScrollView>
        <View style={styles.offerList}>
        <View stlyle={ styles.containerList}>
            <FlatList
              data={data.userProposals}
              renderItem={({ item }) => {                             
                return (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('DetailsOffer')}>
                    <Offer
                      payment={mapPaymentMethod(item.body.paymentMethod)}
                      usernemeMaker={item.body.usernameMaker}
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
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: '10%',
  },
  textBalance: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
  },
  offerList: {
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    justifyContent: 'center',
    paddingTop: '1%',
    paddingBottom: '10%',
    backgroundColor: 'white',
  },
  containerList:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default MyOffer;