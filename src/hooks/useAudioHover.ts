import { useEffect } from 'react';

export function useAudioHover() {
  useEffect(() => {
    let hoverAudio: HTMLAudioElement;
    let clickAudio: HTMLAudioElement;

    fetch('/config/audio.json')
      .then(res => res.json())
      .then(data => {
        if(data.hoverSound) {
          hoverAudio = new Audio(data.hoverSound);
          hoverAudio.volume = 0.2;
        }
        if(data.clickSound) {
          clickAudio = new Audio(data.clickSound);
          clickAudio.volume = 0.3;
        }
      })
      .catch(console.error);

    const playHover = () => {
      if (hoverAudio) {
        hoverAudio.currentTime = 0;
        hoverAudio.play().catch(() => {});
      }
    };

    const playClick = () => {
      if (clickAudio) {
        clickAudio.currentTime = 0;
        clickAudio.play().catch(() => {});
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button'
      ) {
        playHover();
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button'
      ) {
        playClick();
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);
}
