import React from 'react';
import { Text } from 'react-native';
import Dropdown from './Dropdown';
import { useQuery } from '@apollo/react-hooks';
import {QUERIES} from '../apollo'

const DropdownPaymentMethods = (props) => {
    const mapData = data => {
        const resp = [];
        data.map((item, index) => {
          const {id, value} = item;
          return resp.push({
            value: id,
            label: `(${id}) - ${value}`,
            key: index,
            
          });
        });
        return resp;
      };
    const {loading, error, data } = useQuery(QUERIES.PAYMENT_METHODS)
    if(loading) return <Dropdown items={[]} value="Preferred Payment Method" />
    if(error) return <Text>{`Error! ${error}`}</Text>
    return (
        <Dropdown 
        action={props.action}
        value="Preferred Payment Method"
        items={mapData(data.paymentMethods)}
        />
    );
};

export default DropdownPaymentMethods;

