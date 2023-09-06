"use client"

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sky } from "@react-three/drei"
import CanvasContainer from "../global/CanvasContainer";
import Model from "../global/Model";

export default function HomeScene() {
    return (
        <CanvasContainer>
            <Canvas shadows camera={{near: 0.01, far: 2.5}}>
                <fog attach="fog" args={['white', 0.5, 2]} />
                <directionalLight
                    position={[50, 50, -50]}
                    castShadow={true}
                    intensity={3}
                    shadow-mapSize-height={2048*2}
                    shadow-mapSize-width={2048*2}
                    shadow-camera-far={200}
                    shadow-camera-near={1}
                />
                <Model url="./gltf/whole-scene.gltf" position={[0, 0, 0]} />
                <ambientLight intensity={0.5} />
                <OrbitControls />
            </Canvas>
        </CanvasContainer>
    )
}