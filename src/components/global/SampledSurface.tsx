import { useRef, useEffect, MutableRefObject, ReactNode } from "react";
import { Group, Object3D, Vector3, Matrix4, Mesh } from "three";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";
import { GORSE_AMOUNT } from "../home/HomeScene";

type Props = {
  instance: any,
  children: ReactNode
}

export function SampledSurface({instance, children}: Props) {
  const objects = useRef<Group>();

  useEffect(() => {
    if (objects.current && objects.current.children[0] && instance.current) {
      const sampler = new MeshSurfaceSampler(objects.current.children[0] as Mesh).build();
      const _position = new Vector3();
      const _normal = new Vector3();
      const dummy = new Object3D();
      const matrix = new Matrix4();

      for (let i = 0; i < GORSE_AMOUNT; i++) {
        sampler.sample(_position, _normal);
        _normal.add(_position);
        dummy.position.copy(_position);
        dummy.lookAt(_normal);
        dummy.updateMatrix();
        dummy.rotation.z = Math.random() * Math.PI;
        const randomScale = (Math.random() + 1) * 0.75;
        dummy.scale.set(randomScale, randomScale, randomScale);
        dummy.updateMatrix();
        instance.current.setMatrixAt(i, dummy.matrix);
      }
      instance.current.instanceMatrix.needsUpdate = true;
      objects.current.add(instance.current);
    }
  }, [children, instance]);

  return (
    <group ref={el => el ? objects.current = el : null}>
      {children}
    </group>
  );
}