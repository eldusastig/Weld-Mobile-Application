import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

export default function NavigationBar() {
  const navigation = useNavigation();

  return (
    <View style={styles.navContainer}>
  

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('Calendar')}  // Replace with your calendar screen
      >
        <FontAwesome name="calendar" size={24} color="white" />
        <Text style={styles.navText}>Calendar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate('Settings')} 
      >
        <FontAwesome name="cog" size={24} color="white" />
        <Text style={styles.navText}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#5AB888',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
  },
});
