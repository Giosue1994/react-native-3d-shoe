import { useFrame, useLoader } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef } from "react";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import * as THREE from "three";
import { TextureLoader } from "expo-three";

export default function Shoe(props) {
  const mesh = useRef();
  const [baseColor, normal, rough] = useLoader(TextureLoader, [
    require("../assets/Airmax/textures/BaseColor.jpg"),
    require("../assets/Airmax/textures/Normal.jpg"),
    require("../assets/Airmax/textures/Roughness.png"),
  ]);

  const materialBuffer = useLoader(
    THREE.FileLoader,
    require("../assets/Airmax/shoe.mtl")
  );

  const material = useMemo(
    () => new MTLLoader().parse(THREE.LoaderUtils.decodeText(materialBuffer)),
    [materialBuffer]
  );

  const objBuffer = useLoader(
    THREE.FileLoader,
    require("../assets/Airmax/shoe.obj"),
    (loader) => {
      // console.log(loader);
      material.preload();
      // loader.setMaterials(material);
    }
  );

  const obj = useMemo(
    () => new OBJLoader().parse(THREE.LoaderUtils.decodeText(objBuffer)),
    [objBuffer]
  );

  useLayoutEffect(() => {
    obj.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material.map = baseColor;
        child.material.normalMap = normal;
        child.material.roughnessMap = rough;
      }
    });
  }, [obj]);

  useFrame((state, delta) => {
    let { x, y, z } = props.animatedSensor.sensor.value;
    x = ~~(x * 100) / 5000;
    y = ~~(y * 100) / 5000;
    mesh.current.rotation.x += x;
    mesh.current.rotation.y += y;
  });

  return (
    <mesh ref={mesh} rotation={[0.7, 0, 0]}>
      <primitive object={obj} scale={10} />
    </mesh>
  );
}
