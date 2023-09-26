import { useEffect, useState } from "react";
import useDeviceDetect from "./useDeviceDetect";

export default function useMousePosition() {
    const [mousePosition, setMousePosition] = useState<{x: number, y: number}>({x: 0, y: 0});
    const { isMobile } = useDeviceDetect();

    const updateMousePosition = (e: MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const updateTouchPosition = (e: TouchEvent) => {
        setMousePosition({ x: e.touches[0].clientX, y: e.touches[0].clientY})
    }

    useEffect(() => {
        if (isMobile) {
            window.addEventListener("touchmove", updateTouchPosition);
            return () => {
                window.removeEventListener("touchmove", updateTouchPosition);
            }
        }
        window.addEventListener("mousemove", updateMousePosition)
        return () => {
            window.removeEventListener("mousemove", updateMousePosition)
        }
    }, [isMobile])

    return mousePosition;
}