import { useEffect, useMemo, useState, MutableRefObject } from 'react';

interface IntersectionObserverOptions {
    root?: Element | null;
    rootMargin?: string;
    threshold?: number | number[];
}

function useElementOnScreen(
    options: IntersectionObserverOptions,
    targetRef: MutableRefObject<Element | null>
): boolean | undefined {
    const [isVisible, setIsVisible] = useState<boolean | undefined>(undefined);

    const callbackFunction: IntersectionObserverCallback = (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
    };

    const optionsMemo = useMemo(() => {
        return options;
    }, [options]);

    useEffect(() => {
        const observer = new IntersectionObserver(callbackFunction, optionsMemo);
        const currentTarget = targetRef.current;
        if (currentTarget) observer.observe(currentTarget);

        return () => {
            if (currentTarget) observer.unobserve(currentTarget);
        };
    }, [targetRef, optionsMemo]);

    return isVisible;
}

export default useElementOnScreen;