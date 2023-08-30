import { UIEvent, useEffect, useState } from "react";

export default function useScrollAmount() {
    const [scrollAmount, setScrollAmount] = useState<number>(0);
    useEffect(() => {
        const pageWrapper = document.querySelector('.page__wrapper');
        if (pageWrapper) {
            setScrollAmount(pageWrapper.scrollTop)
        }
        function handleScroll(this: Document, e: Event) {
            if (pageWrapper) {
                setScrollAmount(pageWrapper.scrollTop)
            }
        }
        if (pageWrapper) {
            pageWrapper.addEventListener("scroll", handleScroll);
            return () => {
                pageWrapper.removeEventListener("scroll", handleScroll);
            }
        }
    }, [])
    return scrollAmount;
}
