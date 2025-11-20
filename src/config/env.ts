// TODO: Replace with actual API base URL from environment variables
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:4000/api';

// Device BLE configuration
// TODO: Replace with actual device UUIDs and service/characteristic UUIDs
export const DEVICE_CONFIG = {
  SERVICE_UUID: '0000180a-0000-1000-8000-00805f9b34fb', // Generic Access Service (placeholder)
  CHARACTERISTIC_UUID: '00002a29-0000-1000-8000-00805f9b34fb', // Manufacturer Name String (placeholder)
  DEVICE_NAME: 'Enteronova Device', // Device name to scan for
};

