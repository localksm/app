import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useQuery } from '@apollo/react-hooks';
import moment from 'moment';
import { Offer, BalanceHeader } from '../molecules';
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
    <View style={[styles.container, { marginVertical: 30 }]}>
      <ActivityIndicator size="large" color="black" />
    </View>
  );
}

function Error({ error }) {
  return (
    <View style={styles.container}>
      <Text>{`Error! ${error.message}`}</Text>
    </View>
  );
}

const MyOffer = () => {
  const navigation = useNavigation();
  const [userID, setuserID] = useState(null);
  const [name, setName] = useState(null);

  useEffect(() => {
    prepareData();
  }, []);

  const prepareData = async () => {
    const { session } = await getSession();
    await setuserID(session.id);
    await setName(session.name);
  };

  const { loading, error, data } = useQuery(QUERIES.QUERY_USER_PROPOSALS, {
    variables: { id: userID },
    pollInterval: 3000
  });

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <View>
      <View style={styles.container}>
        <BalanceHeader />
      </View>
      <ScrollView>
        <View style={styles.offerList}>
          <FlatList
            data={data.userProposals}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={async () => {
                    const isMaker = name === item.body.usernameMaker;
                    switch (item.status) {
                      case 'created':
                        return navigation.navigate('Confirmation', { ...item });
                      case 'accepted':
                        if (isMaker) {
                          if (item.body.operationType === 'add_funds' || item.body.operationType === 'buy') {
                            return navigation.navigate('ConfirmedBuy', {
                              ...item,
                            });
                          } else {
                            return navigation.navigate('ConfirmedSell', {
                              ...item,
                            });
                          }
                        } else {
                          if (item.body.operationType === 'add_funds' || item.body.operationType === 'buy') {
                            return navigation.navigate('AcceptedBuy', {
                              ...item,
                            });
                          } else {
                            return navigation.navigate('AcceptedSell', {
                              ...item,
                            });
                          }
                        }
                      case 'confirmed':
                        if (isMaker) {
                          if (item.body.operationType === 'add_funds' || item.body.operationType === 'buy') {
                            return navigation.navigate('ConfirmedBuy', {
                              ...item,
                            });
                          } else {
                            return navigation.navigate('ConfirmedSell', {
                              ...item,
                            });
                          }
                        } else {
                          if (item.body.operationType === 'add_funds' || item.body.operationType === 'buy') {
                            return navigation.navigate('Disburse', { ...item });
                          } else {
                            return navigation.navigate('ConfirmedSell', {
                              ...item,
                            });
                          }
                        }
                      case 'completed':
                        return navigation.navigate('TransactionCompleted', {
                          ...item,
                        });
                      default:
                        Alert.alert('Warning!', 'Proposal not found');
                        break;
                    }

                    navigation.navigate('DetailsOffer');
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
                    currency={item.body.offerAsset}
                    isOffer={true}
                    operationType={item.body.operationType}
                  />
                </TouchableOpacity>
              );
            }}
          />
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
    paddingBottom: '80%',
    backgroundColor: 'white',
  },
  containerList: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MyOffer;
