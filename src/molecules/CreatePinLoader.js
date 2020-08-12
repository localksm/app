import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Button } from '../atoms';

function CreatePinLoader({ loading, disabled, styles, handleSave }) {
  return !loading ? (
    <Button
      label="Create PIN"
      stylect={!disabled ? styles.button : styles.buttonDisable}
      action={handleSave}
      disabled={disabled}
    />
  ) : (
    <View style={styles.text}>
      <ActivityIndicator size="large" color="white" />
    </View>
  );
}

export default CreatePinLoader;
