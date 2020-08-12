import React from 'react';
import { CheckBox, Switch } from 'react-native';

function CreatePinSwitch({ platform, isSelected, setSelected, styles }) {
  return platform === 'android' ? (
    <CheckBox
      value={isSelected}
      onValueChange={setSelected}
      style={styles.checkbox}
      tintColors={{ true: 'white', false: 'white' }}
    />
  ) : (
    <Switch value={isSelected} onValueChange={setSelected} />
  );
}

export default CreatePinSwitch;
