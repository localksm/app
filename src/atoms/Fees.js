import React,{useState, useEffect} from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { FEE } from '../apollo/queries';


const Fees = (props) => {

    const { amount = 0 } = props;
    const { loading, error, data } = useQuery(FEE);

    if(loading) return <ActivityIndicator size='small' color="white" />;
  
    if(error) return <Text> Error while getting fees </Text>;

    const {fees} = data;
    switch (props.container) {
        case 'jury':

            let feeResult = fees.filter( item =>  item.fee == 'jury' ).pop();            
            return (
                <View  style={ styles.container } >
                    <View style={styles.groupItem}>
                        <Text style={styles.text}>Transfer amount: </Text>
                        <Text style={styles.text}>{`${parseFloat(amount)} KSM`}</Text>
                    </View>
                    <View style={styles.groupItem}>
                        <Text style={styles.text}>Transfer fee: </Text>
                        <Text style={styles.text}>- {`${feeResult.amount} KSM`}</Text>
                    </View>
                    <View style={styles.groupItem}>
                        <Text style={styles.text}>You will receive: </Text>
                        <Text style={styles.text}> { parseFloat(amount)? `${parseFloat( amount - feeResult.amount ).toFixed(2)} KSM `: '...'}</Text>
                    </View>            
              </View>
            );
    
        default:
            return (
                <View>
                    <ActivityIndicator size='small' color="black" />
                </View>
            );
            
    }    
}

const styles = StyleSheet.create({
    container:{ 
        backgroundColor: '#eaeaea',
        alignItems:'center', 
        borderRadius: 10, 
        paddingHorizontal: 20 
    },
    groupItem:{ 
        flexDirection: 'row', 
        justifyContent: 'space-between',  
        width:'100%' 
    },
    text:{
        fontSize: 10 ,fontFamily: 'Poppins-SemiBold'
    }
});

export default Fees;
