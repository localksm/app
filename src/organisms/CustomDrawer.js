import React, { useEffect, useState } from 'react';
import { Icon } from 'native-base';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Text, Drawer } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getSession } from '../apollo';
import Balance from '../atoms/Balance';

export default function CustomDrawerContent(props) {
  const [session, setSession] = useState(null);

  useEffect(() => {
    set();
  }, []);

  async function set() {
    const { session } = await getSession();
    setSession(session);
  }

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.container}>
          <View style={styles.userInfoSection}>
            <View style={{ paddingBottom: '5%', alignItems: 'center' }}>
              <Icon name="person" style={styles.icon} />
              <Text style={styles.text}>
                {session !== null && session.name}
              </Text>
            </View>
            <View>
              <Text style={styles.text}>Balance</Text>
              {session !== null ? (
                <Balance style={styles.text} id={session.id} />
              ) : (
                <ActivityIndicator />
              )}
            </View>
          </View>
        </View>
        <Drawer.Section>
          <TouchableOpacity onPress={() => props.navigation.navigate('Buy')}>
            <DrawerItem label="Buy" labelStyle={styles.labelStyle} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => props.navigation.navigate('Sell')}>
            <DrawerItem label="Sell" labelStyle={styles.labelStyle} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => props.navigation.navigate('Offers')}>
            <DrawerItem label="Offers" labelStyle={styles.labelStyle} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => props.navigation.navigate('MyOffers')}>
            <DrawerItem label="My Offers" labelStyle={styles.labelStyle} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => props.navigation.navigate('Wallet')}>
            <DrawerItem label="Wallet" labelStyle={styles.labelStyle} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => props.navigation.navigate('Help')}>
            <DrawerItem label="Help" labelStyle={styles.labelStyle} />
          </TouchableOpacity>
        </Drawer.Section>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.buttonLogout}>
        <DrawerItem
          label="Logout"
          labelStyle={{ color: 'white', fontSize: 18 }}
          onPress={() => props.navigation.navigate('SignIn')}
        />
      </Drawer.Section>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingVertical: '10%',
    alignItems: 'center',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  text: {
    color: 'white',
  },
  buttonLogout: {
    marginBottom: 15,
    borderTopWidth: 1,
    borderTopColor: 'white',
  },
  labelStyle: {
    color: 'white',
    fontSize: 18,
  },
  icon: {
    color: 'white',
    fontSize: 20,
  },
});
