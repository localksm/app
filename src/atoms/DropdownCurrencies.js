import React from 'react';
import { Text } from 'react-native';
import Dropdown from './Dropdown';
import { useQuery } from '@apollo/react-hooks';
import { QUERIES } from '../apollo';

const DropdownCurrencies = props => {
  const mapData = data => {
    const resp = [];
    data.map((item, index) => {
      const { id, label } = item;
      return resp.push({
        value: id,
        label: `(${id}) - ${label}`,
        key: index,
      });
    });
    return resp;
  };
  const { loading, error, data } = useQuery(QUERIES.CURRENCIES);
  if (loading) return <Dropdown items={[]} value="Local Currency" />;
  if (error) return <Text>{`Error! ${error}`}</Text>;
  return (
    <Dropdown
      action={props.action}
      value="Local Currency"
      items={mapData(data.currencies)}
    />
  );
};

export default DropdownCurrencies;
