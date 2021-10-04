import { useEffect, useState } from 'react';

export default function useOnScreen(ref) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    try {
      const observer = new IntersectionObserver(([entry]) =>
        setIntersecting(entry.isIntersecting)
      );
      if (ref.current) {
        observer.observe(ref.current);
      }
      return () => {
        observer.unobserve(ref.current);
      };
    } catch (err) {
      console.log(err);
    }
  }, []);

  return isIntersecting;
}
