import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the icon

export default function QRScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [scanning, setScanning] = useState(true); // Controls scanning state

  useEffect(() => {
    const getPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    getPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    if (scanning) {
      setScanning(false); // Disable further scanning
      setScanned(true);
      setScanResult(`Scanned data: ${data}`);
    }
  };

  const handleCapturePress = () => {
    setScanning(true); 
    setScanned(false);
    navigation.navigate('Dashboard');

  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>No access to camera. Please grant permission to continue.</Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={['#5AB888', '#28AA39']} // Gradient colors
      style={styles.container}>
      <Text style={styles.title}>Scan your QR Code</Text>

      {/* Barcode scanner view */}
      <View style={styles.scannerContainer}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject} 
        />
      </View>

      {/* Display scan result or button to scan again */}
      {scanned ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>{scanResult}</Text>
          <TouchableOpacity
            style={styles.captureButton}
            onPress={handleCapturePress}>
            <Icon name="qrcode" size={20} color="white" />
            <Text style={styles.buttonText}>Capture Again</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.captureButton}
          onPress={handleCapturePress}>
          <Icon name="qrcode" size={20} color="white" />
          <Text style={styles.buttonText}>Scan QR Code</Text>
        </TouchableOpacity>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  scannerContainer: {
    width: 900,
    height: 550,
    overflow: 'hidden',
    marginBottom: 20,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    marginBottom: 10,
    color: 'black',
  },
  captureButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
    marginLeft: 10,
  },
});
