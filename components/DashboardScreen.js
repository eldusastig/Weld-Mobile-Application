import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { LineChart, BarChart } from 'react-native-chart-kit';
import NavigationBar from './NavigationBar'; // Adjust the path if necessary

export default function DashboardScreen({ navigation }) {
  return (
    <LinearGradient colors={['#11998E', '#38EF7D']} style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>HISTORY AND ANALYTICS</Text>
        </View>

        {/* Defect Types Bar Chart */}
        <View style={styles.chartWrapper}>
          <View style={styles.whiteContainer}>
            <Text style={styles.chartTitle}>Defect Types</Text>
            <BarChart
              data={{
                labels: ['Cracks', 'Porosity', 'Undercut'],
                datasets: [
                  {
                    data: [15, 20, 30],
                    color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
                  },
                ],
              }}
              width={320}
              height={220}
              chartConfig={{
                backgroundColor: 'white',
                backgroundGradientFrom: 'white',
                backgroundGradientTo: 'white',
                color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: { borderRadius: 16 },
              }}
              style={styles.chartStyle}
            />
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => alert('Number of defect found according to type')}>
              <Text style={styles.detailsButtonText}>Details</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Yearly Chart Line Chart */}
        <View style={styles.chartWrapper}>
          <View style={styles.whiteContainer}>
            <Text style={styles.chartTitle}>Yearly Chart</Text>
            <LineChart
              data={{
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [
                  {
                    data: [20, 45, 28, 80, 99, 43],
                    color: (opacity = 1) => `rgba(54, 162, 235, ${opacity})`,
                  },
                ],
              }}
              width={320}
              height={220}
              chartConfig={{
                backgroundColor: 'white',
                backgroundGradientFrom: 'white',
                backgroundGradientTo: 'white',
                color: (opacity = 1) => `rgba(54, 162, 235, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: { borderRadius: 16 },
              }}
              bezier
              style={styles.chartStyle}
            />
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => alert('Details of Performance Over Time')}>
              <Text style={styles.detailsButtonText}>Details</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.goBackButton}
          onPress={() => navigation.navigate('QRScreen')}>
          <Text style={styles.goBackButtonText}>Go Back to QR Scanner</Text>
        </TouchableOpacity>
      </View>

      <NavigationBar />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  titleContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  chartWrapper: {
    marginBottom: 20,
  },
  whiteContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  chartStyle: {
    borderRadius: 16,
    backgroundColor: 'white',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  detailsButton: {
    backgroundColor: '#D5E5FF',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 10,
  },
  detailsButtonText: {
    color: '#3A4DE9',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  goBackButton: {
    backgroundColor: '#4c9f70',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  goBackButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
