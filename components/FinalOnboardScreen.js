// screens/FinalOnboardScreen.js

import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnboardingScreen from '../components/OnboardScreen';
import DoNotShowAgain from '../components/DoNotShowAgain.js';

export default function OnboardingScreen4({ navigation }) {
  const [doNotShowAgain, setDoNotShowAgain] = useState(false);

  const handleFinishOnboarding = async () => {
    if (doNotShowAgain) {
      await AsyncStorage.setItem('hasSeenOnboarding', 'true');
    }
    navigation.replace('MainApp'); 
  };

  return (
    <View style={styles.container}>
      <OnboardingScreen
        title="We prioritize thorough testing for quality assurance."
        description="We strengthen the system to guarantee the consistent verification of functional and good-quality weld information."
        onNext={handleFinishOnboarding}
      />
      <DoNotShowAgain isChecked={doNotShowAgain} onToggle={setDoNotShowAgain} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
