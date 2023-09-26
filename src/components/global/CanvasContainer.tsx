"use client"

import { BACKGROUND_COLOR } from "@/lib/constants";
import { ReactNode, useEffect, useRef, useState } from "react"

export default function CanvasContainer({children}: {children: ReactNode}) {
    const containerRef = useRef<HTMLDivElement>();
    
    useEffect(() => {
        const container = containerRef.current;

        function handleCanvasSize() {
            if (container) {
                container.style.width = window.innerWidth + 'px';
                container.style.height = window.innerHeight + 'px';
                container.style.backgroundColor = BACKGROUND_COLOR;
            }
        };

        handleCanvasSize();

        window.addEventListener('resize', handleCanvasSize);
        return () => {
            window.removeEventListener('resize', handleCanvasSize);
        }
    }, []);

    return (
        <div id="canvas-container" ref={el => el ? containerRef.current = el : null}>
            {children}
        </div>
    )
}