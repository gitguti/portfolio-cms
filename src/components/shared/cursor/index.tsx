import gsap from 'gsap';
import React, { useEffect, useRef } from 'react'; // Make sure to import React

export const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null); // Specify the type of ref

  const moveCursor = (e: MouseEvent): void => {
    gsap.to(cursorRef.current, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.2,
    });
  };

  useEffect(() => {
    gsap.set(cursorRef.current, {
      xPercent: -50, // Adjusted value to center the cursor horizontally
      yPercent: -50, // Adjusted value to center the cursor vertically
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', moveCursor);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []); // Adding a cleanup function to remove the event listener

  return (
    <>
      <div ref={cursorRef} className="cursor"></div>
    </>
  );
};
