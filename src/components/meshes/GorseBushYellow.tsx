import { useGLTF } from "@react-three/drei";
import { forwardRef } from "react";
import { GLTF } from "three-stdlib";
import { Material, Mesh } from 'three';
import { YELLOW_GORSE_AMOUNT } from "@/lib/constants";

type GLTFResult = GLTF & {
    nodes: {
        'gorse-yellow': Mesh;
    };
    materials: {
        'leaves-flowers-yellow-baked': Material;
    };
};

const GorseBushYellow = forwardRef(
    function GorseBush(props, ref: any) {
        const { nodes, materials } = useGLTF("/gltf/gorse-yellow.gltf") as GLTFResult;
        
        return (
            <instancedMesh
                geometry={nodes['gorse-yellow'].geometry}
                material={materials['leaves-flowers-yellow-baked']}
                ref={el => el ? ref.current.push(el) : null}
                args={[undefined, undefined, YELLOW_GORSE_AMOUNT]}
                position={[0,0.1,0]}
                scale={[1, 1, 1]}
                castShadow
                frustumCulled={false}
            />
        )
    }
);

export default GorseBushYellow;