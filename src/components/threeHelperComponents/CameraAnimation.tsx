import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react"

export default function CameraAnimation() {
    const timer = useRef(0)

    const { camera } = useThree();

    useFrame((state, delta) => {
        if (timer.current < 30) {
            timer.current += delta * 2;
            camera.position.set(0.5, .75, camera.position.z = camera.position.z - (delta / 5 * 2));
            // camera.rotation.set(-Math.PI / 3, 0, 0)
            return;
        }
        if (camera.position.y > 0.1 && timer.current < 35) {
            timer.current += delta * 2;
            camera.position.set(camera.position.x, camera.position.y -= delta / 5, camera.position.z);
            return
        }
        // camera.rotation.set(camera.rotation.x, camera.rotation.y -= delta/10, camera.rotation.z)
    })

    return (
        <></>
    );
}