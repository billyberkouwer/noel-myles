import { YELLOW_GORSE_AMOUNT } from "@/lib/constants";
import { MutableRefObject, useEffect } from "react";
import { Group, Mesh, Object3D, Vector3 } from "three";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";

export default function useFoliageInstanceTransforms(ref: any, objects: MutableRefObject<Group>) {
    useEffect(() => {
        if (objects.current && objects.current.children[0] && ref.current) {
            ref.current.forEach((mesh: any) => {
                const sampler = new MeshSurfaceSampler(objects.current.children[0] as Mesh).build();
                const _position = new Vector3();
                const _normal = new Vector3();
                const dummy = new Object3D();

                for (let i = 0; i < YELLOW_GORSE_AMOUNT; i++) {
                    // sample random position and normal
                    sampler.sample(_position, _normal);

                    // add position to normal
                    _normal.add(_position);

                    // create object3D matrix to apply to instanced mesh
                    dummy.position.copy(_position);
                    dummy.lookAt(_normal);

                    // randomize rotation and scale of instanced mesh
                    dummy.rotation.z = Math.random() * Math.PI * 2;
                    // dummy.rotation.x = Math.random() * Math.PI / 4;
                    const randomScale = (Math.random() + 1);
                    dummy.scale.set(randomScale, randomScale, randomScale);

                    // update object3D matrix
                    dummy.updateMatrix();
                    // set instance matrix
                    mesh.setMatrixAt(i, dummy.matrix);
                }

                mesh.instanceMatrix.needsUpdate = true;
                objects.current.add(mesh);
            })
        }
    }, [ref, objects]);
    return;
}