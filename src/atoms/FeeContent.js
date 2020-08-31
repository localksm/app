import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const FeeContent = ({ amount, container, data }) => {
  const { fees } = data;
  switch (container) {
    case 'jury':
      let feeResult = fees.filter((item) => item.fee == 'jury').pop();
      return (
        <View style={styles.container}>
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
            <Text style={styles.text}>
              {' '}
              {parseFloat(amount)
                ? `${parseFloat(amount - feeResult.amount).toFixed(2)} KSM `
                : '...'}
            </Text>
          </View>
        </View>
      );

    default:
      return (
        <View>
          <ActivityIndicator size="small" color="black" />
        </View>
      );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eaeaea',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: '6%',
    paddingVertical: '2%',
  },
  groupItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  text: {
    fontSize: 11,
    fontFamily: 'Poppins-SemiBold',
  },
});

export default FeeContent;
