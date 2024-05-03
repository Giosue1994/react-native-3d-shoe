import { StyleSheet } from "react-native";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { useAnimatedSensor, SensorType } from "react-native-reanimated";
import Shoe from "./components/Shoe";

export default function App() {
  const animatedSensor = useAnimatedSensor(SensorType.GYROSCOPE, {
    interval: 100,
  });

  return (
    <Canvas>
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
      <Suspense fallback={null}>
        <Shoe animatedSensor={animatedSensor} />
      </Suspense>
    </Canvas>
  );
}

const styles = StyleSheet.create({});
