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
import { useQuery } from '@apollo/react-hooks';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { Offer, BalanceHeader, OfferItem } from '../molecules';
import { QUERIES, getSession } from '../apollo';
import { mapPaymentMethod, prepareData } from '../utils/misc';
import { useUserProposals } from '../utils/hooks';

function Loading() {
  return (
    <View style={[styles.offerList, { marginVertical: 30 }]}>
      <ActivityIndicator size="large" color="black" />
    </View>
  );
}


const MyOffer = () => {
  const navigation = useNavigation();
  const [userID, setuserID] = useState(null);
  const [name, setName] = useState(null);

  useEffect(() => {
    prepareData(setuserID, setName);
  }, []);

  const { loading, data } = useUserProposals(userID);

  if (loading) return <Loading />;

  return (
    <View>
      <View style={styles.container}>
        <BalanceHeader />
      </View>
      <View style={styles.offerList}>
        <FlatList
          data={data.userProposals}
          ListFooterComponent={<View />}
          ListFooterComponentStyle={styles.listFooterComponent}
          contentContainerStyle={styles.contentContainer}
          renderItem={({ item }) => (
            <OfferItem item={item} name={name} navigation={navigation} />
          )}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    minWidth: '16%',
    height: '16%',
  },
  textBalance: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
  },
  offerList: {
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    paddingTop: '1%',
    backgroundColor: 'white',
    overflow: 'hidden',
    minHeight: '84%',
  },
  containerList: {
    flex: 1,
    flexDirection: 'row',
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

export default MyOffer;
