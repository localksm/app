import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from '../atoms';

const WalletViewButton = (props) => {
    const { handleSelect, select }=props;
    return (
        <>
            <Button
            testID="deposit"
            label="Deposit"
            stylect={{
                ...styles.deposit,
                backgroundColor: !select ? 'white' : null,
            }}
            stylectLabel={{ color: !select ? '#DB5A3A' : 'white' }}
            action={()=> handleSelect( false ) }
            />
            <Button
            testID="withdraw"
            label="Withdraw"
            stylect={{
                ...styles.deposit,
                backgroundColor: select ? 'white' : null,
            }}
            stylectLabel={{ color: select ? '#DB5A3A' : 'white' }}
            action={()=> handleSelect(true) }
            />
        </>
    );
}


const styles = StyleSheet.create({    
    deposit: {
      borderWidth: 1,
      borderColor: 'white',
      width: 150,
      marginRight: 10,
      marginLeft: 10,
    }
  });

export default WalletViewButton;
