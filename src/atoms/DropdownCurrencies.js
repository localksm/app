import React from 'react';
import { Text } from 'react-native';
import Dropdown from './Dropdown';
import { useQuery } from '@apollo/react-hooks';
import { QUERIES } from '../apollo';
import { mapDataCurrencies } from '../utils/hooks';

const DropdownCurrencies = (props) => {
  const { loading, error, data } = useQuery(QUERIES.CURRENCIES);
  if (loading) {
    return <Dropdown items={[]} value="Local Currency" />;
  } else if (error) {
   return <Text>{`Error! ${error}`}</Text>;
  }
  return (
    <Dropdown
      action={props.action}
      value="Local Currency"
      items={mapDataCurrencies(data.currencies)}
    />
  );
};

export default DropdownCurrencies;
