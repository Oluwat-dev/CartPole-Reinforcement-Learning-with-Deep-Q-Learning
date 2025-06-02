import { useState, useEffect, useRef, RefObject } from 'react';

interface InViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

interface InViewResult {
  ref: RefObject<HTMLElement>;
  inView: boolean;
}

export const useInView = (options: InViewOptions = {}): InViewResult => {
  const { threshold = 0, rootMargin = '0px', triggerOnce = false } = options;
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isInView = entry.isIntersecting;
        setInView(isInView);
        
        if (isInView && triggerOnce && element) {
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin }
    );
    
    observer.observe(element);
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);
  
  return { ref, inView };
};