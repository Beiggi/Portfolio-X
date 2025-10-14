// /src/hooks/useHoverElement.ts
import { useState, useEffect } from 'react';

export const useHoverElement = (selector: string) => {
  const [hoveredElement, setHoveredElement] = useState<Element | null>(null);

  useEffect(() => {
    const handleMouseOver = (event: MouseEvent) => {
      const target = event.target as Element;
      const matchingElement = target.closest(selector);
      setHoveredElement(matchingElement);
    };

    document.addEventListener('mouseover', handleMouseOver);
    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [selector]);

  return hoveredElement;
};
