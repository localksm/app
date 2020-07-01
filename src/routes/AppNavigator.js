import 'react-native-gesture-handler';
import  React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {CustomDrawerContent} from '../organisms'
import {
   Offers,
   DetailsOffer, 
   StartingApp, 
   SignIn, 
   SignUp, 
   CreateOfferBuy, 
   CreateOfferSell, 
   Confirmation, 
   ConfirmedBuy, 
   ConfirmedSell, 
   AcceptedBuy, 
   AcceptedSell,
   Disburse,
   TransactionCompleted,
   Wallet,
   ReportAProblem,
   Mediation,
   WonMediation,
   MyOffers, 
   Filter,
   Onboarding,
   Help,
  } from '../pages'


const Drawer = createDrawerNavigator();
const Stack =  createStackNavigator();

const OfferStack = () => {
  return(
    <Stack.Navigator initialRouteName='Offers' >
      <Stack.Screen name='Offers' component={Offers} options={{headerShown: false}} />
      <Stack.Screen name='DetailsOffer' component={DetailsOffer} options={{headerShown: false}} />
      <Stack.Screen name='AcceptedBuy' component={AcceptedBuy} options={{headerShown: false}} />
      <Stack.Screen name='AcceptedSell' component={AcceptedSell} options={{headerShown: false}} />
      <Stack.Screen name='Disburse' component={Disburse} options={{headerShown: false}} />
      <Stack.Screen name='TransactionCompleted' component={TransactionCompleted} options={{headerShown: false}} />
      <Stack.Screen name='Filter' component={Filter} options={{headerShown: false}} />
      <Stack.Screen name='ReportAProblem' component={ReportAProblemStack} options={{headerShown: false}} />
    </Stack.Navigator>
  )
}
const MyOffersStack = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen name='MyOffers' component={MyOffers} options={{headerShown: false}} />
      <Stack.Screen name='Confirmation' component={Confirmation} options={{headerShown: false}} />
      <Stack.Screen name='AcceptedBuy' component={AcceptedBuy} options={{headerShown: false}} />
      <Stack.Screen name='AcceptedSell' component={AcceptedSell} options={{headerShown: false}} />
      <Stack.Screen name='CreateOfferBuy' component={CreateOfferBuy} options={{headerShown: false}} />
      <Stack.Screen name='ConfirmedBuy' component={ConfirmedBuy} options={{headerShown: false}} />
      <Stack.Screen name='ConfirmedSell' component={ConfirmedSell} options={{headerShown: false}} />
      <Stack.Screen name='Disburse' component={Disburse} options={{headerShown: false}} />
      <Stack.Screen name='TransactionCompleted' component={TransactionCompleted} options={{headerShown: false}} />
      <Stack.Screen name='CreateOfferSell' component={CreateOfferSell} options={{headerShown: false}} />
      <Stack.Screen name='ReportAProblem' component={ReportAProblemStack} options={{headerShown: false}} />
    </Stack.Navigator>

  )
}
 const BuyStack = () => {
   return(
     <Stack.Navigator>
      <Stack.Screen name='CreateOfferBuy' component={CreateOfferBuy} options={{headerShown: false}} />
      <Stack.Screen name='Confirmation' component={Confirmation} options={{headerShown: false}} />
     </Stack.Navigator>
   )
 }
 const SellStack = () => {
  return(
    <Stack.Navigator>
     <Stack.Screen name='CreateOfferSell' component={CreateOfferSell} options={{headerShown: false}} />
     <Stack.Screen name='Confirmation' component={Confirmation} options={{headerShown: false}} />
    </Stack.Navigator>
  )
}
const ReportAProblemStack = () => {
  return(
    <Stack.Navigator initialRouteName='ReportAProblem'>
      <Stack.Screen name='ReportAProblem' component={ReportAProblem} options={{headerShown: false}} />
      <Stack.Screen name='Mediation' component={Mediation} options={{headerShown: false}} />
      <Stack.Screen name='WonMediation' component={WonMediation} options={{headerShown: false}} />
    </Stack.Navigator>
  )
}

const WalletStack = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen name='Wallet' component={Wallet} options={{headerShown: false}} />
    </Stack.Navigator>
  )
}


const MainStack = () => {
  return(
  <Stack.Navigator>
    <Stack.Screen name='Offers' component={OfferStack} options={{headerShown: false}} />
    <Stack.Screen name='Buy' component={BuyStack} options={{headerShown: false}} />
    <Stack.Screen name='Sell' component={SellStack} options={{headerShown: false}} />
    <Stack.Screen name='Wallet' component={WalletStack} options={{headerShown: false}} />
    <Stack.Screen name='MyOffers' component={MyOffersStack} options={{headerShown: false}} />
    <Stack.Screen name='Help' component={Help} options={{headerShown: false}} />
  </Stack.Navigator>
  )
}

const MenuDrawer = () => {
  return(
    <Drawer.Navigator drawerStyle={{backgroundColor: '#2D2D2D'}} drawerContent={props => <CustomDrawerContent {...props} /> } >
      <Drawer.Screen  name='App' component={MainStack} options={{headerShown: false}} />
    </Drawer.Navigator>
  )
}



export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName= 'Starting' >
        <Stack.Screen name='Starting' component={StartingApp} options={{headerShown: false}}  />
        <Stack.Screen name='Onboarding' component={Onboarding} options={{headerShown: false}} />
        <Stack.Screen name='SignIn' component={SignIn} options={{headerShown: false}}  />
        <Stack.Screen name='SignUp' component={SignUp} options={{headerShown: false}}  />     
        <Stack.Screen name='Drawer' component={MenuDrawer} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

