import { useGLTF } from "@react-three/drei";
import { MutableRefObject, forwardRef } from "react";
import { InstancedMesh } from "three";
import { GLTF } from "three-stdlib";
import { Material, Mesh } from 'three';
import { GORSE_AMOUNT } from "@/lib/constants";

type GLTFResult = GLTF & {
    nodes: {
        'gorse-green-2': Mesh;
    };
    materials: {
        'leaves-flowers-green-baked': Material;
    };
};

const GorseBush2 = forwardRef(
    function GorseBush(props, ref: any) {
        const { nodes, materials } = useGLTF("http://localhost:3000/gltf/gorse-3.gltf") as GLTFResult;

        return (
            <instancedMesh
                geometry={nodes['gorse-green-2'].geometry}
                material={materials['leaves-flowers-green-baked']}
                rotation={[0, 0, 0]}
                ref={el => el ? ref.current = el : null}
                args={[undefined, undefined, GORSE_AMOUNT]}
                scale={[1, 1, 1]}
                castShadow
            />
        )
    }
);

export default GorseBush2;