import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Make sure this import is correct
import NavigationBar from './NavigationBar';

export default function CalendarLog({ navigation }) {
  const [markedDates, setMarkedDates] = useState({
    '2024-11-10': { marked: true, dotColor: 'blue', log: 'Checked welding defects' },
    '2024-11-12': { marked: true, dotColor: 'red', log: 'Maintenance log entry' },
    '2024-11-15': { marked: true, dotColor: 'green', log: 'Routine inspection' },
  });
  const [selectedLogs, setSelectedLogs] = useState([]); // State to store selected date logs

  const logEntries = Object.keys(markedDates).map((date) => ({
    date,
    ...markedDates[date],
  }));

  const handleDayPress = (day) => {
    const dateKey = day.dateString;
    if (markedDates[dateKey] && markedDates[dateKey].log) {
      setSelectedLogs([{ date: day.dateString, log: markedDates[dateKey].log }]);
    } else {
      setSelectedLogs([]);
      Alert.alert('No Log', 'There is no log entry for this date.');
    }
  };

  const renderLogItem = ({ item }) => (
    <View style={styles.logItem}>
      <Text style={styles.logDate}>{item.date}</Text>
      <Text style={styles.logText}>{item.log}</Text>
    </View>
  );

  return (
    <LinearGradient colors={['#11998E', '#38EF7D']} style={styles.gradient}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('DashboardScreen')} 
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
        </TouchableOpacity>

        <Text style={styles.header}>Calendar Log</Text>
        <Calendar
          onDayPress={handleDayPress}
          markedDates={markedDates}
          markingType={'dot'}
          theme={{
            selectedDayBackgroundColor: '#5AB888',
            todayTextColor: '#5AB888',
            dotColor: '#5AB888',
            arrowColor: '#5AB888',
          }}
          style={styles.calendar}
        />
        <Text style={styles.logHeader}>Logs:</Text>
        <FlatList
          data={selectedLogs.length > 0 ? selectedLogs : logEntries} 
          renderItem={renderLogItem}
          keyExtractor={(item) => item.date}
          style={styles.logList}
        />
        <NavigationBar />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    position: 'relative', // Ensure that the back button is positioned relative to the container
  },
  backButton: {
    position: 'absolute', // Absolute positioning for the back button
    top: 20,
    bottom:10, // Adjust as necessary to position the back button
    left: 10, // Ensure it is on the left side
    zIndex: 1, // Make sure it's above other content
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40, // Add margin to lower the title
    marginBottom: 20,
    color: 'White',
  },
  calendar: {
    marginTop: 20, // Add margin to lower the calendar
    marginBottom: 20,
  },
  logHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  logList: {
    flex: 1,
  },
  logItem: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  logDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5AB888',
  },
  logText: {
    fontSize: 16,
    color: '#333',
  },
});
