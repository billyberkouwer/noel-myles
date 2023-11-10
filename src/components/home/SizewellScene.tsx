"use client"

import { OrbitControls, PointerLockControls, PointerLockControlsProps, Sparkles } from "@react-three/drei"
import { useRef, MutableRefObject, useEffect } from "react";
import SampledSurface from "@/components/threeHelpers/SampledSurface";
import GorseEmitter from "../meshes/GorseEmitter";
import GorseBushYellow from "../meshes/GorseBushYellow";
import { BACKGROUND_COLOR } from "@/lib/constants";
import { InstancedMesh } from "three";
import Particles from "../meshes/Particles";
import BaseCharacter from "@/components/meshes/BaseCharacter";
import { Physics } from "@react-three/cannon"
import LoadSizewellScene from "@/components/meshes/LoadSizewellScene";
import useFoliageInstanceTransforms from "../threeHelpers/useFoliageInstanceTransforms";
import GorseBushGreen from "../meshes/GorseBushGreen";
import Lake from "../meshes/Lake";

export default function SizwellScene() {
    const instances = useRef<MutableRefObject<InstancedMesh>[]>([]);
    const pointerLockControls = useRef<PointerLockControlsProps>();

    useEffect(() => {
        if (pointerLockControls.current) {
            pointerLockControls.current.domElement = document.querySelector('#sizewell-canvas') as HTMLElement;
        }
    }, [])

    return (
        <>
            <fog attach="fog" args={[BACKGROUND_COLOR, 0.01, 2]} />
            <directionalLight
                position={[5, 5, -5]}
                castShadow={true}
                intensity={1}
                shadow-mapSize-height={2048 * 2}
                shadow-mapSize-width={2048 * 2}
                shadow-camera-far={100}
                shadow-camera-near={1}
            />
            <ambientLight intensity={0.4} />
            {/* <OrbitControls /> */}
            <PointerLockControls ref={el => el ? pointerLockControls.current = el : null} />
            <Physics gravity={[0, -9.8, 0]}>
                <group scale={[0.012, 0.012, 0.012]}>
                    <GorseBushYellow ref={instances} />
                    <GorseBushGreen ref={instances} />
                    <SampledSurface ref={instances} useTransformHook={useFoliageInstanceTransforms}>
                        <GorseEmitter />
                    </SampledSurface>
                    <BaseCharacter args={[1, 6, 3]} />
                    {/* <Lake /> */}
                    <Particles />
                    <LoadSizewellScene url={'/gltf/whole-scene.gltf'} />
                </group>
            </Physics>
        </>
    )
}