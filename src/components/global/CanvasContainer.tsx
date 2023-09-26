"use client"

import { ReactNode, useEffect, useRef, useState } from "react"
import { BACKGROUND_COLOR } from "../home/HomeScene";

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