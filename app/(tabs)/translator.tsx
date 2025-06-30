import { Camera, CameraView } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';

export default function StreamToServer() {
  const cameraRef = useRef<CameraView>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const [permission, setPermission] = useState(false);

  useEffect(() => {
    Camera.requestCameraPermissionsAsync().then(({ status }) => {
      setPermission(status === 'granted');
    });

    socketRef.current = new WebSocket('ws://<TU_IP_LOCAL>:8000');
    socketRef.current.onopen = () => {
      console.log('✅ WebSocket conectado');
    };
    socketRef.current.onerror = (err) => {
      console.error('❌ WebSocket error:', err);
    };

    return () => socketRef.current?.close();
  }, []);

  useEffect(() => {
    if (!permission || !cameraRef.current) return;

    const interval = setInterval(async () => {
      try {
        if (!cameraRef.current) return;
        const photo = await cameraRef.current.takePictureAsync({
          base64: true,
          quality: 0.5,
          skipProcessing: true,
        });

        if (photo && socketRef.current?.readyState === WebSocket.OPEN) {
          socketRef.current.send(
            JSON.stringify({ image: photo.base64 })
          );
        }
      } catch (err) {
        console.warn('Error capturando frame:', err);
      }
    }, 100); // 10 FPS

    return () => clearInterval(interval);
  }, [permission]);

  return permission ? (
    <CameraView ref={cameraRef} style={{ flex: 1 }} facing="front" />
  ) : (
    <View />
  );
}
