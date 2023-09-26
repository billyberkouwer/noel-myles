"use client"

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei"
import CanvasContainer from "../global/CanvasContainer";
import Model from "../global/Model";
import { useRef, MutableRefObject } from "react";
import { Mesh } from "three";
import { SampledSurface } from "../global/SampledSurface";
import GorseEmitter from "../meshes/GorseEmitter";

export const GORSE_AMOUNT = 300;
export const BACKGROUND_COLOR = '#b3b6bb';

export default function HomeScene() {
    const instance = useRef() as MutableRefObject<Mesh>;
    const { scene } = useGLTF("http://localhost:3000/gltf/gorse-3.gltf");

    return (
        <CanvasContainer>
            <Canvas shadows camera={{ near: 0.001, far: 10 }}>
                <fog attach="fog" args={[BACKGROUND_COLOR, 0.01, 1]} />
                <directionalLight
                    position={[50, 50, -50]}
                    castShadow={true}
                    intensity={1}
                    shadow-mapSize-height={2048 * 2}
                    shadow-mapSize-width={2048 * 2}
                    shadow-camera-far={100}
                    shadow-camera-near={1}
                />
                <group scale={[0.01, 0.01, 0.01]}>
                    <instancedMesh
                        //@ts-ignore
                        geometry={scene.children[0].geometry}
                        //@ts-ignore
                        material={scene.children[0].material}
                        rotation={[0, 0, 0]}
                        ref={el => el ? instance.current = el : null}
                        args={[undefined, undefined, GORSE_AMOUNT]}
                        scale={[1, 1, 1]}
                        castShadow
                    />
                    <SampledSurface instance={instance}>
                        <GorseEmitter />
                    </SampledSurface>
                    <Model url={'/gltf/whole-scene.gltf'} />
                </group>
                <ambientLight intensity={0.4} />
                <OrbitControls />
            </Canvas>
        </CanvasContainer>
    )
}