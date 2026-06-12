import React, { useEffect, useMemo, useRef, useState } from "react";
import { Hammer, MousePointerClick } from "lucide-react";

type IntroState = "waiting" | "armed" | "breaking" | "gone";

type Point = {
  x: number;
  y: number;
};

const shards = [
  { clip: "polygon(0 0, 18% 0, 13% 34%, 0 27%)", x: -28, y: -42, r: -16 },
  { clip: "polygon(18% 0, 39% 0, 32% 30%, 13% 34%)", x: -12, y: -52, r: 9 },
  { clip: "polygon(39% 0, 61% 0, 55% 28%, 32% 30%)", x: 8, y: -55, r: -7 },
  { clip: "polygon(61% 0, 82% 0, 74% 34%, 55% 28%)", x: 24, y: -48, r: 13 },
  { clip: "polygon(82% 0, 100% 0, 100% 29%, 74% 34%)", x: 42, y: -36, r: 18 },
  { clip: "polygon(0 27%, 13% 34%, 18% 57%, 0 66%)", x: -43, y: 0, r: 12 },
  { clip: "polygon(13% 34%, 32% 30%, 31% 54%, 18% 57%)", x: -18, y: 14, r: -19 },
  { clip: "polygon(32% 30%, 55% 28%, 51% 51%, 31% 54%)", x: -4, y: 19, r: 23 },
  { clip: "polygon(55% 28%, 74% 34%, 70% 56%, 51% 51%)", x: 17, y: 13, r: -13 },
  { clip: "polygon(74% 34%, 100% 29%, 100% 61%, 70% 56%)", x: 39, y: 4, r: 16 },
  { clip: "polygon(0 66%, 18% 57%, 21% 82%, 0 100%)", x: -38, y: 44, r: -24 },
  { clip: "polygon(18% 57%, 31% 54%, 39% 79%, 21% 82%)", x: -16, y: 58, r: 21 },
  { clip: "polygon(31% 54%, 51% 51%, 55% 78%, 39% 79%)", x: 0, y: 66, r: -12 },
  { clip: "polygon(51% 51%, 70% 56%, 73% 82%, 55% 78%)", x: 16, y: 60, r: 19 },
  { clip: "polygon(70% 56%, 100% 61%, 100% 100%, 73% 82%)", x: 42, y: 47, r: -17 },
  { clip: "polygon(21% 82%, 39% 79%, 44% 100%, 0 100%)", x: -20, y: 82, r: 8 },
  { clip: "polygon(39% 79%, 55% 78%, 61% 100%, 44% 100%)", x: 1, y: 90, r: -8 },
  { clip: "polygon(55% 78%, 73% 82%, 100% 100%, 61% 100%)", x: 26, y: 78, r: 11 },
];

const playGlassBreakSound = () => {
  const AudioContextClass =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

  if (!AudioContextClass) return;

  const audioContext = new AudioContextClass();
  const now = audioContext.currentTime;
  const compressor = audioContext.createDynamicsCompressor();
  const masterGain = audioContext.createGain();

  compressor.threshold.setValueAtTime(-18, now);
  compressor.knee.setValueAtTime(12, now);
  compressor.ratio.setValueAtTime(5, now);
  compressor.attack.setValueAtTime(0.003, now);
  compressor.release.setValueAtTime(0.16, now);
  masterGain.gain.setValueAtTime(0.0001, now);
  masterGain.gain.exponentialRampToValueAtTime(0.62, now + 0.01);
  masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.08);
  masterGain.connect(compressor);
  compressor.connect(audioContext.destination);

  const createNoiseBuffer = (duration: number, curve = 2) => {
    const noiseLength = Math.floor(audioContext.sampleRate * duration);
    const noiseBuffer = audioContext.createBuffer(1, noiseLength, audioContext.sampleRate);
    const noiseData = noiseBuffer.getChannelData(0);

    for (let index = 0; index < noiseLength; index += 1) {
      const fade = 1 - index / noiseLength;
      noiseData[index] = (Math.random() * 2 - 1) * Math.pow(fade, curve);
    }

    return noiseBuffer;
  };

  const connectWithPan = (node: AudioNode, panValue: number) => {
    const panner = audioContext.createStereoPanner();
    panner.pan.setValueAtTime(panValue, now);
    node.connect(panner);
    panner.connect(masterGain);
  };

  const impactLength = Math.floor(audioContext.sampleRate * 0.08);
  const impactBuffer = audioContext.createBuffer(1, impactLength, audioContext.sampleRate);
  const impactData = impactBuffer.getChannelData(0);

  for (let index = 0; index < impactLength; index += 1) {
    const fade = 1 - index / impactLength;
    impactData[index] = (Math.random() * 2 - 1) * Math.pow(fade, 5);
  }

  const impact = audioContext.createBufferSource();
  const impactLowPass = audioContext.createBiquadFilter();
  const impactGain = audioContext.createGain();

  impact.buffer = impactBuffer;
  impactLowPass.type = "lowpass";
  impactLowPass.frequency.setValueAtTime(760, now);
  impactGain.gain.setValueAtTime(0.55, now);
  impactGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);
  impact.connect(impactLowPass);
  impactLowPass.connect(impactGain);
  connectWithPan(impactGain, -0.08);
  impact.start(now);
  impact.stop(now + 0.09);

  const noiseBuffer = createNoiseBuffer(0.62, 2.35);
  const noiseData = noiseBuffer.getChannelData(0);

  for (let index = 0; index < noiseData.length; index += 1) {
    if (index % 1400 < 20) {
      noiseData[index] *= 2.2;
    }
  }

  const noise = audioContext.createBufferSource();
  const highPass = audioContext.createBiquadFilter();
  const bandPass = audioContext.createBiquadFilter();
  const shimmer = audioContext.createBiquadFilter();
  const noiseGain = audioContext.createGain();

  noise.buffer = noiseBuffer;
  highPass.type = "highpass";
  highPass.frequency.setValueAtTime(1150, now);
  bandPass.type = "bandpass";
  bandPass.frequency.setValueAtTime(3150, now);
  bandPass.Q.setValueAtTime(0.78, now);
  shimmer.type = "peaking";
  shimmer.frequency.setValueAtTime(6200, now);
  shimmer.Q.setValueAtTime(1.35, now);
  shimmer.gain.setValueAtTime(10, now);
  noiseGain.gain.setValueAtTime(0.28, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.52);

  noise.connect(highPass);
  highPass.connect(bandPass);
  bandPass.connect(shimmer);
  shimmer.connect(noiseGain);
  connectWithPan(noiseGain, 0.12);
  noise.start(now);
  noise.stop(now + 0.62);

  const earlyCracks = [1240, 1710, 2180, 2890, 3650, 4380];
  earlyCracks.forEach((frequency, index) => {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const start = now + 0.018 + index * 0.018;

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, start);
    oscillator.frequency.exponentialRampToValueAtTime(frequency * (0.76 + Math.random() * 0.1), start + 0.16);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.08 - index * 0.006, start + 0.006);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.17);

    oscillator.connect(gain);
    connectWithPan(gain, index % 2 === 0 ? -0.48 + Math.random() * 0.18 : 0.3 + Math.random() * 0.4);
    oscillator.start(start);
    oscillator.stop(start + 0.19);
  });

  Array.from({ length: 18 }).forEach((_, index) => {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const start = now + 0.08 + Math.random() * 0.58;
    const duration = 0.08 + Math.random() * 0.2;
    const frequency = 2100 + Math.random() * 7200;
    const pan = Math.random() * 1.8 - 0.9;

    oscillator.type = Math.random() > 0.45 ? "triangle" : "sine";
    oscillator.frequency.setValueAtTime(frequency, start);
    oscillator.frequency.exponentialRampToValueAtTime(frequency * (0.55 + Math.random() * 0.28), start + duration);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.02 + Math.random() * 0.045, start + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

    oscillator.connect(gain);
    connectWithPan(gain, pan);
    oscillator.start(start);
    oscillator.stop(start + duration + 0.02);

    if (index % 4 === 0) {
      const shardNoise = audioContext.createBufferSource();
      const shardFilter = audioContext.createBiquadFilter();
      const shardGain = audioContext.createGain();
      const shardStart = start + 0.01;

      shardNoise.buffer = createNoiseBuffer(0.06 + Math.random() * 0.04, 3.4);
      shardFilter.type = "highpass";
      shardFilter.frequency.setValueAtTime(3600 + Math.random() * 2200, shardStart);
      shardGain.gain.setValueAtTime(0.018 + Math.random() * 0.025, shardStart);
      shardGain.gain.exponentialRampToValueAtTime(0.0001, shardStart + 0.08);
      shardNoise.connect(shardFilter);
      shardFilter.connect(shardGain);
      connectWithPan(shardGain, pan * 0.86);
      shardNoise.start(shardStart);
      shardNoise.stop(shardStart + 0.1);
    }
  });

  window.setTimeout(() => {
    void audioContext.close();
  }, 1300);
};

export default function GlassBreakIntro() {
  const [introState, setIntroState] = useState<IntroState>("waiting");
  const [hammerPoint, setHammerPoint] = useState<Point>({ x: 0, y: 0 });
  const [impactPoint, setImpactPoint] = useState<Point>({ x: 50, y: 50 });
  const breakFrameRef = useRef<number | null>(null);

  const isActive = introState !== "gone";
  const isArmed = introState === "armed";
  const isBreaking = introState === "breaking";

  const fractureLines = useMemo(
    () =>
      Array.from({ length: 14 }, (_, index) => ({
        angle: index * 25 + (index % 2 === 0 ? 8 : -6),
        length: 18 + (index % 5) * 7,
        delay: index * 0.012,
      })),
    [],
  );

  useEffect(() => {
    if (!isActive) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isActive]);

  useEffect(() => {
    if (!isBreaking) return;

    const timer = window.setTimeout(() => {
      setIntroState("gone");
    }, 980);

    return () => window.clearTimeout(timer);
  }, [isBreaking]);

  useEffect(() => {
    return () => {
      if (breakFrameRef.current) {
        window.cancelAnimationFrame(breakFrameRef.current);
      }
    };
  }, []);

  const armGlass = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setHammerPoint({ x: event.clientX, y: event.clientY });
    setIntroState("armed");
  };

  const updateHammer = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isArmed) return;
    setHammerPoint({ x: event.clientX, y: event.clientY });
  };

  const breakGlass = (event?: React.PointerEvent<HTMLDivElement>) => {
    if (!isArmed) return;

    const x = event ? (event.clientX / window.innerWidth) * 100 : 50;
    const y = event ? (event.clientY / window.innerHeight) * 100 : 50;

    setImpactPoint({ x, y });
    playGlassBreakSound();
    breakFrameRef.current = window.requestAnimationFrame(() => {
      setIntroState("breaking");
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isArmed) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      breakGlass();
    }
  };

  if (!isActive) return null;

  return (
    <div
      className={`glass-break-intro glass-break-intro-${introState}`}
      onPointerMove={updateHammer}
      onPointerDown={breakGlass}
      onKeyDown={handleKeyDown}
      role="presentation"
      tabIndex={isArmed ? 0 : -1}
      style={
        {
          "--impact-x": `${impactPoint.x}%`,
          "--impact-y": `${impactPoint.y}%`,
        } as React.CSSProperties
      }
    >
      <div className="glass-preview-glow" />
      <div className="glass-sheet" aria-hidden="true">
        <div className="glass-frost" />
        <div className="glass-crack-web">
          {fractureLines.map((line, index) => (
            <span
              key={index}
              style={
                {
                  "--line-angle": `${line.angle}deg`,
                  "--line-length": `${line.length}vmin`,
                  "--line-delay": `${line.delay}s`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      </div>

      <div className="glass-shard-layer" aria-hidden="true">
        {shards.map((shard, index) => (
          <span
            key={shard.clip}
            className="glass-shard"
            style={
              {
                "--clip": shard.clip,
                "--tx": `${shard.x}vw`,
                "--ty": `${shard.y}vh`,
                "--rot": `${shard.r}deg`,
                "--delay": `${index * 0.012}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <div className="glass-intro-copy">
        <div className="glass-intro-mark">
          {isArmed ? <Hammer className="h-5 w-5" /> : <MousePointerClick className="h-5 w-5" />}
        </div>
        <p>{isArmed ? "Aim anywhere on the glass" : "Click to arm the hammer"}</p>
        <button type="button" className="glass-break-button" onClick={armGlass} disabled={introState !== "waiting"}>
          Break the Glass to See through
        </button>
      </div>

      {isArmed && (
        <div
          className="hammer-cursor"
          aria-hidden="true"
          style={{
            transform: `translate3d(${hammerPoint.x}px, ${hammerPoint.y}px, 0)`,
          }}
        >
          <Hammer className="h-16 w-16" strokeWidth={1.8} />
        </div>
      )}
    </div>
  );
}
