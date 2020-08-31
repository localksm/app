import React from 'react';
import { Text } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import Dropdown from './Dropdown';
import { QUERIES } from '../apollo';
import { mapDataCountries } from '../utils/hooks';

const DropdownCountries = (props) => {
  
  const { loading, error, data } = useQuery(QUERIES.COUNTRIES);
  if (loading) {
    return <Dropdown items={[]} value="Country" />
  } else if (error) {
    return <Text>Error de conexion</Text>
  }
  return (
    <Dropdown
      action={props.action}
      value="Country"
      items={mapDataCountries(data.countries)}
    />
  );
};

export default DropdownCountries;
