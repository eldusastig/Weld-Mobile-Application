// components/DoNotShowAgain.js

import React, { useState } from 'react';
import { View, Text, CheckBox, StyleSheet } from 'react-native';

export default function DoNotShowAgain({ isChecked, onToggle }) {
  return (
    <View style={styles.checkboxContainer}>
      <CheckBox value={isChecked} onValueChange={onToggle} />
      <Text style={styles.checkboxText}>Do not show again</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxText: {
    fontSize: 16,
    color: '#666',
  },
});
