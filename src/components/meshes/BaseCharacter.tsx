import { useSphere } from '@react-three/cannon';
import { useFrame } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import usePlayerControls from '@/hooks/usePlayerControls';
import * as THREE from 'three';

const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();
const speed = new THREE.Vector3();
const SPEED = 5;

const BaseCharacter = (props: any) => {
  const [ref, api] = useSphere((index) => ({
    mass: 1,
    type: 'Dynamic',
    position: [10, 10, -30],
    ...props,
  }));

  const { forward, backward, left, right, jump } = usePlayerControls();
  const velocity = useRef([0, 0, 0]);

  useEffect(() => {
    api.velocity.subscribe((v) => (velocity.current = v))
  }, [api]);

  useFrame((state) => {
    const { camera } = state;

    if (ref.current) {
      ref.current.getWorldPosition(camera.position);
    }
    
    frontVector
    .set(0, 0, Number(backward) - Number(forward));

    sideVector
    .set(Number(left) - Number(right), 0, 0);

    direction
    .subVectors(frontVector, sideVector)
    .normalize()
    .multiplyScalar(SPEED)
    .applyEuler(camera.rotation);

    speed
    .fromArray(velocity.current);

    api.velocity.set(direction.x, velocity.current[1], direction.z);

    if (velocity.current) {
      if (jump && Math.abs(+velocity.current[1].toFixed(2)) < 0.1) {
        api.velocity.set(velocity.current[0], 5, velocity.current[2])
      };
    }
  });

  return (
    <group>
      {/** @ts-ignore */}
      <mesh castShadow position={props.position} ref={ref}>
        <sphereGeometry args={props.args} />
        <meshStandardMaterial color="#FFFF00" />
      </mesh>
    </group>
  );
};

export default BaseCharacter;