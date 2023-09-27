"use client"

import { OrbitControls, PointerLockControls } from "@react-three/drei"
import LoadModel from "@/components/meshes/LoadModel";
import { useRef, MutableRefObject } from "react";
import SampledSurface from "@/components/threeHelperComponents/SampledSurface";
import GorseEmitter from "../meshes/GorseEmitter";
import GorseBush2 from "../meshes/GorseBush2";
import { BACKGROUND_COLOR } from "@/lib/constants";
import useCameraAnimation from "../threeHelperComponents/useCameraAnimation";
import { InstancedMesh, Vector3 } from "three";
import Particles from "../meshes/Particles";
import BaseCharacter from "@/components/meshes/BaseCharacter";
import { Physics } from "@react-three/cannon"

export default function SizwellScene() {
    const instance = useRef() as MutableRefObject<InstancedMesh>;
    // const cameraAnimations = useCameraAnimation();

    return (
        <>
            <fog attach="fog" args={[BACKGROUND_COLOR, 0.01, 1.5]} />
            <directionalLight
                position={[50, 50, -50]}
                castShadow={true}
                intensity={1}
                shadow-mapSize-height={2048 * 2}
                shadow-mapSize-width={2048 * 2}
                shadow-camera-far={100}
                shadow-camera-near={1}
            />
            <ambientLight intensity={0.4} />
            <PointerLockControls />
            <Physics gravity={[0, -9.8, 0]}>
                <group scale={[0.01, 0.01, 0.01]}>
                    <GorseBush2 ref={instance} />
                    <Particles />
                    <SampledSurface ref={instance}>
                        <GorseEmitter />
                    </SampledSurface>
                    <BaseCharacter args={[2,2,2]} />
                    <LoadModel url={'/gltf/whole-scene.gltf'} />
                </group>
            </Physics>
        </>
    )
}