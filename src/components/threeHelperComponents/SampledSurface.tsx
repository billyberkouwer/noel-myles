import { GORSE_AMOUNT } from "@/lib/constants";
import { useRef, useEffect, MutableRefObject, ReactNode, forwardRef } from "react";
import { Group, Object3D, Vector3, Matrix4, Mesh } from "three";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";

type Props = {
  children: ReactNode
}

const SampledSurface = forwardRef(
  function SampledSurface(props: Props, ref: any) {
    const objects = useRef<Group>();
  
    useEffect(() => {
      if (objects.current && objects.current.children[0] && ref.current) {
        const sampler = new MeshSurfaceSampler(objects.current.children[0] as Mesh).build();
        const _position = new Vector3();
        const _normal = new Vector3();
        const dummy = new Object3D();
  
        for (let i = 0; i < GORSE_AMOUNT; i++) {
          // sample random position and normal
          sampler.sample(_position, _normal);
  
          // add position to normal
          _normal.add(_position);
  
          // create object3D matrix to apply to instanced mesh
          dummy.position.copy(_position);
          dummy.lookAt(_normal);
  
          // randomize rotation and scale of instanced mesh
          dummy.rotation.z = Math.random() * Math.PI;
          const randomScale = (Math.random() + 1) * 0.75;
          dummy.scale.set(randomScale, randomScale, randomScale);
  
          // update object3D matrix
          dummy.updateMatrix();
  
          // set instance matrix
          ref.current.setMatrixAt(i, dummy.matrix);
        }
  
        ref.current.instanceMatrix.needsUpdate = true;
        objects.current.add(ref.current);
      }
    }, [ref]);
  
    return (
      <group ref={el => el ? objects.current = el : null}>
        {props.children}
      </group>
    );
  }
)

export default SampledSurface;