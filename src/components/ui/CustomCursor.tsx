import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';
import { cn } from '../../lib/utils';

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-gold rounded-full pointer-events-none z-[100] mix-blend-screen"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicking ? 0.5 : isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1
        }}
        transition={{ duration: 0.15 }}
      />
      <motion.div
        className={cn(
          "fixed top-0 left-0 w-10 h-10 border border-gold/50 rounded-full pointer-events-none z-[99] flex items-center justify-center mix-blend-screen backdrop-invert-[0.1]",
          isHovering && "bg-gold/10 border-gold"
        )}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        {isHovering && (
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-1 h-1 bg-gold rounded-full"
          />
        )}
      </motion.div>
    </>
  );
}
