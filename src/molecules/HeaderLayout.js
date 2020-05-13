import  React from 'react';
import { Header, Left, Body, Button, Icon } from 'native-base';
import { StatusBar, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';



const HeaderLayout = (props) => {
    const navigation = useNavigation();
    return (  
      <View>
        <Header transparent style={styles.container}>
          <StatusBar key="bar" backgroundColor="#2D2D2D" barStyle="light-content" />
          <Left>
            <Button transparent  onPress={() => navigation.openDrawer() } >
            <Icon name='menu' style={styles.leftElement} />
            </Button>
          </Left>
          <Body>            
          </Body>        
        </Header> 
          <View >
              {props.children}
          </View>     
      </View>
  );
}

const styles = StyleSheet.create({
   container: { 
     backgroundColor: '#2D2D2D'
    },
    leftElement:{
      color: '#ffffff'
    },
})

export default HeaderLayout;
