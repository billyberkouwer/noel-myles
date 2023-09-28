import { useGLTF } from "@react-three/drei";
import { Euler, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { Mesh, PCFSoftShadowMap } from "three"
import { useTrimesh } from "@react-three/cannon";

export default function LoadSizewellScene({ url, id, position, rotation }: { url: string, id?: string, position?: [number, number, number], rotation?: Euler }) {
    //@ts-ignore
    const { scene, nodes, materials } = useGLTF(url);
    const { gl } = useThree();
    const [ref, api] = useTrimesh(() => ({
        args: [
            nodes['ground-plane-baked-applied'].geometry.attributes.position.array,
            nodes['ground-plane-baked-applied'].geometry.index.array,
        ],
        mass: 0,
        static: true,
        position: [0,4,0]
    }));

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
    }, [scene, gl, ref, nodes])

    return (
        <group>
            <primitive id={id} object={scene} />
        </group>
    )
};