import { useGLTF } from "@react-three/drei";
import { Euler, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { Mesh, PCFSoftShadowMap } from "three"

export default function LoadModel({ url, id, position, rotation }: { url: string, id?: string, position?: [number, number, number], rotation?: Euler }) {
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
        gl.shadowMap.type = PCFSoftShadowMap;
    }, [scene, gl])

    return (
        <group>
            <primitive id={id} object={scene} />
        </group>
    )
};