import { useEffect } from 'react';

export function useOnClickOutside(refs, handler) {
  useEffect(() => {
    const listener = event => {
      const refArray = Array.isArray(refs) ? refs : [refs]
      if (refArray.some(ref => ref.current && ref.current.contains(event.target))) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [refs, handler]);
}