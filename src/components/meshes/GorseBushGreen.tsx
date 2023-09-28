import { useGLTF } from "@react-three/drei";
import { forwardRef } from "react";
import { GLTF } from "three-stdlib";
import { Material, Mesh } from 'three';
import { YELLOW_GORSE_AMOUNT } from "@/lib/constants";

type GLTFResult = GLTF & {
    nodes: {
        'gorse-green-2': Mesh;
    };
    materials: {
        'leaves-flowers-green-baked': Material;
    };
};

const GorseBushGreen = forwardRef(
    function GorseBush(props, ref: any) {
        const { nodes, materials } = useGLTF("/gltf/gorse-green.gltf") as GLTFResult;
        
        return (
            <instancedMesh
                geometry={nodes['gorse-green-2'].geometry}
                material={materials['leaves-flowers-green-baked']}
                ref={el => el ? ref.current.push(el) : null}
                args={[undefined, undefined, YELLOW_GORSE_AMOUNT]}
                position={[0,0.05,0]}
                scale={[1, 1, 1]}
                castShadow
                frustumCulled={false}
            />
        )
    }
);

export default GorseBushGreen;