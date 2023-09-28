import { useRef, MutableRefObject, ReactNode, forwardRef } from "react";
import { Group } from "three";

type Props = {
  children: ReactNode
  useTransformHook?: (ref: any, objects: MutableRefObject<Group>) => void;
}

const SampledSurface = forwardRef(
  function SampledSurface(props: Props, ref: any) {
    const objects = useRef<Group>(new Group);
    const transforms = props.useTransformHook && props.useTransformHook(ref, objects);
  
    return (
      <group ref={el => el ? objects.current = el : null}>
        {props.children}
      </group>
    );
  }
)

export default SampledSurface;