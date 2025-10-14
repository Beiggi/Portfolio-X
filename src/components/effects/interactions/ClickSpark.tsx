import React, { useState, useCallback, useEffect } from 'react';

const SPARK_COLOR = 'hsl(308, 100%, 50%)'; // --primary color

const generateSpark = () => {
  const a = Math.random() * 2 * Math.PI;
  const r = Math.random();
  return {
    x: Math.cos(a) * r,
    y: Math.sin(a) * r,
    color: SPARK_COLOR,
    scale: 1.05,
    opacity: 1,
  };
};

const useSparkAnimation = () => {
  const [sparks, setSparks] = useState<any[]>([]);

  useEffect(() => {
    let animationFrame: number;
    const update = () => {
      setSparks((currentSparks) =>
        currentSparks
          .map((spark) => ({
            ...spark,
            scale: spark.scale - 0.02,
            opacity: spark.opacity - 0.02,
          }))
          .filter((spark) => spark.opacity > 0)
      );
      animationFrame = requestAnimationFrame(update);
    };
    animationFrame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const createSparks = useCallback((x: number, y: number) => {
    const newSparks = Array.from({ length: 12 }, generateSpark).map((spark) => ({
      ...spark,
      left: x,
      top: y,
    }));
    setSparks((s) => [...s, ...newSparks]);
  }, []);

  return { sparks, createSparks };
};

const ClickSpark = () => {
  const { sparks, createSparks } = useSparkAnimation();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      createSparks(e.clientX, e.clientY);
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [createSparks]);

  return (
    <>
      {sparks.map((spark, i) => (
        <svg
          key={i}
          viewBox="0 0 1 1"
          style={{
            position: 'fixed',
            left: spark.left,
            top: spark.top,
            width: 25,
            height: 25,
            transform: `translate(-50%, -50%) translate(${spark.x * 25}px, ${spark.y * 25}px) scale(${spark.scale})`,
            opacity: spark.opacity,
            pointerEvents: 'none',
            zIndex: 9999,
          }}
        >
          <circle cx="0.5" cy="0.5" r="0.5" fill={spark.color} />
        </svg>
      ))}
    </>
  );
};

export default ClickSpark;
