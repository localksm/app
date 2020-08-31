import React,{useState, useEffect} from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { FEE } from '../apollo/queries';
import { FeeContent } from '.';


const Fees = (props) => {

    const { amount = 0 } = props;
    const { loading, error, data } = useQuery(FEE);

    if(loading) return <ActivityIndicator size='small' color="white" />;
  
    if(error) return <Text> Error while getting fees </Text>;

    if(data) return <FeeContent  container={props.container} amount={amount} data={data} />
}

export default Fees;
