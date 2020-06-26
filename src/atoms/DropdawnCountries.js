import React from 'react';
import { Text } from 'react-native';
import Dropdown from './Dropdown';
import { useQuery } from '@apollo/react-hooks';
import {QUERIES} from '../apollo'

const DropdownCountries = (props) => {
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
    const {loading, error, data } = useQuery(QUERIES.COUNTRIES)
    if(loading) return <Dropdown items={[]} value="Country" />
    if(error) return <Text>{`Error! ${error}`}</Text>
    return (
        <Dropdown 
        action={props.action}
        value="Country"
        items={mapData(data.countries)}
        />
    );
};

export default DropdownCountries;
