import React from 'react';
import { Text } from 'react-native';
import Dropdown from './Dropdown';
import { useQuery } from '@apollo/react-hooks';
import {QUERIES} from '../apollo'
import {mapDataDropdownPayment} from '../utils/misc'

const DropdownPaymentMethods = (props) => {
    
    const {loading, error, data } = useQuery(QUERIES.PAYMENT_METHODS)
    if(loading) {
      return <Dropdown items={[]} value="Preferred Payment Method" />
    } else if(error){
      return <Text>{`Error! ${error}`}</Text>
    } 
    return (
        <Dropdown 
        action={props.action}
        value="Preferred Payment Method"
        items={mapDataDropdownPayment(data.paymentMethods)}
        />
    );
};

export default DropdownPaymentMethods;

