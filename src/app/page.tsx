"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowUpLeft, Zap, Eye, Code2 } from "lucide-react";
import Image from "next/image";

type Fragment = {
  id: number;
  a: string;
  x1: string;
  x2: string;
  y1: string;
  y2: string;
  duration: number;
};

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalText, setTerminalText] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [trailChar, setTrailChar] = useState("00");
  const [fragments, setFragments] = useState<Fragment[]>([]);
  const [breachOpen, setBreachOpen] = useState(false);
  const [breachMode, setBreachMode] = useState<"data" | "void">("data");

  useEffect(() => {
    setIsMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "t") {
        setTerminalOpen((prev) => !prev);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const mkHex2 = () => Math.floor(Math.random() * 256).toString(16).padStart(2, "0");
    setTrailChar(mkHex2());

    const mkFrag = (id: number): Fragment => {
      const msg = Math.random() > 0.5 ? `0x${Math.random().toString(16).slice(2, 8)}` : "ERROR_NOT_FOUND";
      const pct = () => `${Math.floor(Math.random() * 100)}%`;
      return {
        id,
        a: msg,
        x1: pct(),
        x2: pct(),
        y1: pct(),
        y2: pct(),
        duration: Math.random() * 10 + 5,
      };
    };

    setFragments(Array.from({ length: 20 }, (_, i) => mkFrag(i)));
  }, [isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    if (!breachOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setBreachOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [breachOpen, isMounted]);

  useEffect(() => {
    if (terminalOpen) {
      const fullText = "INITIALIZING BREACH... \nACCESSING CORE MANIFESTO... \nWARNING: SYSTEM ANOMALY DETECTED. \nFARID KANAANI: STATUS=CODE_ARTIST \nREALITY=GLITCHED \nVOID=WATCHING...";
      let i = 0;
      const interval = setInterval(() => {
        setTerminalText(fullText.slice(0, i));
        i++;
        if (i > fullText.length) clearInterval(interval);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [terminalOpen]);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-8 overflow-hidden cursor-none">
      {/* Hidden Terminal Overlay */}
      {terminalOpen && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl p-20 font-mono text-green-500 overflow-hidden"
        >
          <div className="max-w-4xl mx-auto whitespace-pre-wrap text-2xl leading-relaxed">
            {terminalText}
            <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }}>_</motion.span>
          </div>
          <button 
            onClick={() => setTerminalOpen(false)}
            className="absolute top-10 right-10 text-white border border-white px-4 py-2 hover:bg-white hover:text-black transition-colors"
          >
            [ DISCONNECT ]
          </button>
        </motion.div>
      )}

      {/* Breach Modal */}
      {breachOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-2xl"
          onClick={() => setBreachOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.35, ease: "circOut" }}
            className="absolute left-1/2 top-1/2 w-[min(960px,92vw)] -translate-x-1/2 -translate-y-1/2 border border-white/20 bg-black/60 p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <div className="text-xs font-mono text-white/60">PRESS ESC TO DISCONNECT</div>
                <div className="mt-2 text-2xl font-black tracking-tight">
                  {breachMode === "data" ? "BREACH_DATA" : "CONNECT_VOID"}
                </div>
              </div>
              <button
                onClick={() => setBreachOpen(false)}
                className="text-white border border-white/40 px-3 py-2 text-sm hover:bg-white hover:text-black transition-colors"
              >
                [ CLOSE ]
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-white/15 p-5">
                <div className="text-xs font-mono text-white/60">TERMINAL</div>
                <div className="mt-3 font-mono text-sm text-green-400 whitespace-pre-wrap leading-relaxed">
                  {breachMode === "data"
                    ? "> whoami\nfarid_kanaani\n\n> ls projects\n- zero_point_manifesto\n- nextmvp\n- experiments\n\n> hint\nClick the VOID to reveal contact"
                    : "> ping void\nvoid: alive\n\n> open channel\nchannel: unstable\n\n> contact\nemail: farid.kanaani.official@gmail.com\n\ngithub: github.com/faridkanaani"}
                </div>
              </div>

              <div className="border border-white/15 p-5">
                <div className="text-xs font-mono text-white/60">ACTIONS</div>
                <div className="mt-4 flex flex-col gap-3">
                  <button
                    className="text-left border border-white/30 px-4 py-3 hover:bg-white hover:text-black transition-colors font-bold"
                    onClick={() => setBreachMode("data")}
                  >
                    [ VIEW PROJECTS ]
                  </button>
                  <button
                    className="text-left border border-white/30 px-4 py-3 hover:bg-white hover:text-black transition-colors font-bold"
                    onClick={() => setBreachMode("void")}
                  >
                    [ OPEN CONTACT CHANNEL ]
                  </button>
                  <a
                    href="https://github.com/faridkanaani"
                    target="_blank"
                    rel="noreferrer"
                    className="text-left border border-white/30 px-4 py-3 hover:bg-white hover:text-black transition-colors font-bold"
                  >
                    [ GITHUB ]
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Mouse Trail Character */}
      {isMounted && (
        <motion.div
          animate={{ x: mousePos.x + 20, y: mousePos.y + 20 }}
          className="fixed pointer-events-none z-[60] text-white/50 font-mono text-xs mix-blend-difference"
        >
          {trailChar}
        </motion.div>
      )}

      {/* Background Effect */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-20"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, white 0%, transparent 20%)`,
        }}
      />

      {/* Floating Elements */}
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "circOut" }}
        className="z-10 text-center flex flex-col items-center"
      >
        {/* User Brand Image - Experimental Glitch Container */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="relative w-64 h-64 mb-8 grayscale hover:grayscale-0 transition-all duration-300 group cursor-none"
        >
          <div className="absolute inset-0 bg-white/10 blur-3xl rounded-full group-hover:bg-blue-500/20 transition-all duration-500" />
          <Image 
            src="/Brand-removebg-preview.png" 
            alt="Farid Kanaani" 
            fill 
            sizes="(max-width: 768px) 100vw, 256px"
            className="object-contain relative z-10 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] group-hover:drop-shadow-[0_0_50px_rgba(255,255,255,0.6)]"
            priority
          />
          {/* Glitch Overlay Elements */}
          <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-red-500 animate-glitch-line" />
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-blue-500 animate-glitch-line delay-100" />
          </div>
        </motion.div>

        <h1 className="text-[14vw] font-black leading-[0.8] tracking-tighter uppercase mix-blend-difference select-none hover:skew-x-12 transition-transform duration-75 relative group">
          <span className="relative z-10">Farid<br />Kanaani</span>
          <span className="absolute inset-0 z-0 text-red-500 translate-x-1 translate-y-1 opacity-0 group-hover:opacity-50 transition-opacity pointer-events-none">Farid<br />Kanaani</span>
          <span className="absolute inset-0 z-0 text-blue-500 -translate-x-1 -translate-y-1 opacity-0 group-hover:opacity-50 transition-opacity pointer-events-none">Farid<br />Kanaani</span>
        </h1>
        
        <div className="mt-12 flex flex-col md:flex-row items-center gap-12 justify-center">
          <motion.div 
            whileHover={{ scale: 1.2, rotate: -15, filter: "invert(1)" }}
            className="border-[3px] border-white p-8 cursor-pointer group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <p className="text-2xl font-black mb-2 relative z-10 group-hover:text-black">CODE ARTIST</p>
            <Code2 size={64} className="relative z-10 group-hover:text-black" />
          </motion.div>

          <div className="text-left max-w-sm">
            <p className="text-3xl font-extralight leading-none tracking-tight italic opacity-80 hover:opacity-100 transition-opacity">
              &gt; THIS IS NOT A WEBSITE.<br />
              &gt; IT IS A DIGITAL ANOMALY.<br />
              &gt; THE VOID IS WATCHING.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Chaotic Background Layers */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] select-none text-[20vw] font-black break-all leading-none z-0 overflow-hidden">
        SYSTEM FAILURE SYSTEM FAILURE SYSTEM FAILURE SYSTEM FAILURE SYSTEM FAILURE
      </div>

      {/* Cryptic Floating Fragments */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {isMounted && fragments.map((frag) => (
          <motion.div
            key={frag.id}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.2, 0],
              x: [frag.x1, frag.x2],
              y: [frag.y1, frag.y2],
            }}
            transition={{ 
              duration: frag.duration,
              repeat: Infinity,
              ease: "linear" 
            }}
            className="absolute text-[10px] font-mono text-white/40"
          >
            {frag.a}
          </motion.div>
        ))}
      </div>

      {/* Experimental Navigation */}
      <div className="fixed bottom-10 left-10 flex flex-col gap-6 z-50">
        <button
          type="button"
          className="text-lg font-bold flex items-center gap-3 hover:gap-6 transition-all group relative text-left"
          onClick={() => {
            setBreachMode("data");
            setBreachOpen(true);
          }}
        >
          <Zap className="group-hover:text-yellow-400 group-hover:animate-pulse" /> 
          <span className="group-hover:tracking-[0.2em] transition-all">[ BREACH_DATA ]</span>
          <div className="absolute -top-4 -right-4 w-2 h-2 bg-red-500 rounded-full animate-ping opacity-0 group-hover:opacity-100" />
        </button>
        <button
          type="button"
          className="text-lg font-bold flex items-center gap-3 hover:gap-6 transition-all group text-left"
          onClick={() => {
            setBreachMode("void");
            setBreachOpen(true);
          }}
        >
          <ArrowUpLeft className="group-hover:text-red-500 group-hover:-translate-y-2 group-hover:-translate-x-2 transition-transform" /> 
          <span className="group-hover:italic transition-all">[ CONNECT_VOID ]</span>
        </button>
      </div>

      {/* Reality Distortion Overlay */}
      <motion.div 
        animate={{ 
          opacity: [0, 0.05, 0, 0.1, 0],
          scale: [1, 1.05, 0.98, 1],
        }}
        transition={{ duration: 0.2, repeat: Infinity, repeatDelay: isMounted ? 2.7 : 0 }}
        className="fixed inset-0 bg-white pointer-events-none z-40 mix-blend-overlay"
      />

      <style jsx global>{`
        @keyframes glitch-line {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(1000%); }
        }
        .animate-glitch-line {
          animation: glitch-line 2s linear infinite;
        }
        .vertical-text {
          writing-mode: vertical-rl;
        }
      `}</style>

      {/* Strange Interactions */}
      <motion.div 
        animate={{ 
          x: mousePos.x / 10,
          y: mousePos.y / 10
        }}
        className="absolute top-20 right-20 text-white/10 select-none pointer-events-none"
      >
        <Eye size={300} strokeWidth={0.5} />
      </motion.div>

      <div className="fixed bottom-10 right-10 text-xs font-mono vertical-text opacity-50">
        EST. 2026 / ZERO POINT
      </div>
    </main>
  );
}
