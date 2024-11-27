import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import OnboardingScreen from './components/OnboardScreen'; // Import the OnboardingScreen component
import DashboardScreen from './components/DashboardScreen'; // Mock Dashboard Screen
import Calendar from './components/Calendar';

const Stack = createStackNavigator();

export default function App() {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [currentOnboardingIndex, setCurrentOnboardingIndex] = useState(0);

  useEffect(() => {
    const checkOnboarding = async () => {
      const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');
      if (hasSeenOnboarding === 'true') {
        setShowOnboarding(false);
      }
    };
    checkOnboarding();
  }, []);

  const onboardingScreens = [
    {
      title: 'We Ensure Accurate Weld Reports',
      description:
        'Our Application collects and processes data\nto provide precise and reliable welds.',
      imageSource: require('./assets/opening_1.png'),
    },
    {
      title: 'Discover Features',
      description: 'Learn about the app features.',
      imageSource: require('./assets/opening_2.png'),
    },
    {
      title: 'Get Started',
      description: 'Get ready to start using the app.',
      imageSource: require('./assets/onboard3.png'),
    },
  ];

  const handleNext = async () => {
    if (currentOnboardingIndex < onboardingScreens.length - 1) {
      setCurrentOnboardingIndex(currentOnboardingIndex + 1);
    } else {
      await AsyncStorage.setItem('hasSeenOnboarding', 'true');
      setShowOnboarding(false);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {showOnboarding ? (
          <Stack.Screen name="Onboarding">
            {({ navigation }) => (
              <OnboardingScreen
                title={onboardingScreens[currentOnboardingIndex].title}
                description={
                  onboardingScreens[currentOnboardingIndex].description
                }
                imageSource={
                  onboardingScreens[currentOnboardingIndex].imageSource
                }
                onNext={handleNext}
                navigation={navigation} // Pass the navigation prop
              />
            )}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
            <Stack.Screen name="Calendar" component={Calendar} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
