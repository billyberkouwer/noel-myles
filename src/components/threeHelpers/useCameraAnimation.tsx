import { useFrame } from "@react-three/fiber";

export default function useCameraAnimation() {

    useFrame((state, delta) => {
        const { clock, camera } = state;
        const isOpeningAnimationPlaying = clock.elapsedTime < 15;

        if (isOpeningAnimationPlaying) {
            if (camera.position.z > -0.9) {
                camera.position.z = camera.position.z - delta / 2.5;
            }
    
            if (camera.position.y > 0.1 && camera.position.z < 0) {
                camera.position.y = camera.position.y - delta / 4;
                return
            }
        }
    })

    return;
}