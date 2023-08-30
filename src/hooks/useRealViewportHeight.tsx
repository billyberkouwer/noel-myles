import { useEffect } from "react";
import useWindowSize from "./useWindowSize";

export default function useRealViewportHeight(windowSize: {x: number, y: number}) {
    useEffect(() => {
        const pageHeight = windowSize.y;
        // set a css variable for the height of the showcase element that takes into account the height of the window
        document.documentElement.style.setProperty('--vh', pageHeight + 'px');
    }, [windowSize]);
}