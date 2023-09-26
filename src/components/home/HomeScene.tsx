"use client"

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei"
import CanvasContainer from "../global/CanvasContainer";
import LoadModel from "@/components/meshes/LoadModel";
import { useRef, MutableRefObject } from "react";
import { InstancedMesh, Vector3 } from "three";
import SampledSurface from "@/components/threeHelperComponents/SampledSurface";
import GorseEmitter from "../meshes/GorseEmitter";
import GorseBush2 from "../meshes/GorseBush2";
import { BACKGROUND_COLOR } from "@/lib/constants";
import CameraAnimation from "../threeHelperComponents/CameraAnimation";

export default function HomeScene() {
    const instance = useRef() as MutableRefObject<InstancedMesh>;

    return (
        <CanvasContainer>
            <Canvas shadows camera={{ near: 0.00001, far: 1.5 }}>
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
                <OrbitControls />
                <CameraAnimation />
                <group scale={[0.01, 0.01, 0.01]}>
                    {/* <GorseBush2 ref={instance} />
                    <SampledSurface ref={instance}>
                        <GorseEmitter />
                    </SampledSurface> */}
                    <LoadModel url={'/gltf/whole-scene.gltf'} />
                </group>
            </Canvas>
        </CanvasContainer>
    )
}