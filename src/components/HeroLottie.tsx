import React, { useEffect, useRef, useState } from "react";
import type { AnimationItem } from "lottie-web";

const animationPath = "/82904880-4170-11ee-b79a-1393cb46dd49.json";

export default function HeroLottie() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<AnimationItem | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    let isMounted = true;
    const container = containerRef.current;
    const handleLoaded = () => setIsLoaded(true);

    import("lottie-web/build/player/lottie_light").then(({ default: lottie }) => {
      if (!isMounted || !container) return;

      animationRef.current = lottie.loadAnimation({
        container,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: animationPath,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid meet",
          progressiveLoad: true,
        },
      });

      animationRef.current.addEventListener("DOMLoaded", handleLoaded);
    });

    return () => {
      isMounted = false;
      animationRef.current?.removeEventListener("DOMLoaded", handleLoaded);
      animationRef.current?.destroy();
      animationRef.current = null;
    };
  }, []);

  return (
    <div className="hero-lottie-shell" aria-label="Welcome animation" role="img">
      {!isLoaded && <div className="hero-lottie-loading" aria-hidden="true" />}
      <div ref={containerRef} className="hero-lottie-canvas" />
    </div>
  );
}
