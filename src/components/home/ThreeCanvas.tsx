'use client'

import CanvasContainer from "@/components/global/CanvasContainer";
import SizewellScene from "@/components/home/SizewellScene";
import { Canvas } from "@react-three/fiber";
import { Vector3 } from "three";

export default function ThreeCanvas() {
    return (
        <CanvasContainer>
            <Canvas shadows camera={{ near: 0.00001, far: 100, position: new Vector3(0.5, 0.7, 4), rotation: [0, Math.PI, 0] }} id='sizewell-canvas'>
                <SizewellScene />
            </Canvas>
        </CanvasContainer>
    )
}