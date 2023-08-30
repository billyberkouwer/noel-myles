import { useGLTF, Clone } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { Mesh } from "three"

export default function Model({ url, id, position }: { url: string, id?: string, position?: [number, number, number] }) {
    const { scene } = useGLTF(url);
    const { gl } = useThree();

    useEffect(() => {
        scene.traverse((child) => {
            if (child instanceof Mesh) {
                child.castShadow = true;
                child.receiveShadow = true;
                child.material.needsUpdate = true;
            }
        });
        gl.shadowMap.needsUpdate = true;
        gl.shadowMap.enabled = true;
    }, [scene, gl])

    return <primitive scale={[0.01,0.01,0.01]} object={scene} />
};