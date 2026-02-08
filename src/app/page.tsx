"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowUpLeft, Zap, Eye, Code2, Wallet, Wrench, Shield, Bot, Copy, ExternalLink } from "lucide-react";
import Image from "next/image";
import qrcode from "qrcode-generator";

const terminalMessages = [
  "INITIALIZING BREACH... \nACCESSING CORE MANIFESTO... \nWARNING: SYSTEM ANOMALY DETECTED. \nFARID KANAANI: STATUS=CODE_ARTIST \nREALITY=GLITCHED \nVOID=WATCHING...",
  "BOOTING NEURAL INTERFACE... \nSCANNING VOID PROTOCOLS... \nERROR: DIMENSION SHIFT DETECTED. \nFARID_KANAANI: ACCESS_LEVEL=MAX \nMATRIX=UNSTABLE \nREALITY=HACKED...",
  "CONNECTING TO THE VOID... \nAUTHENTICATING USER: FARID \nWARNING: EXISTENTIAL THREAT LEVEL HIGH. \nSTATUS: CODE_ARTIST ACTIVATED \nREALITY: BREACHED \nVOID: RESPONDING...",
  "LOADING DIGITAL MANIFESTO... \nDECRYPTING CORE VALUES... \nALERT: CONSCIOUSNESS EXPANSION. \nFARID KANAANI: IDENTITY=GLITCH \nMATRIX=GLITCHED \nVOID=WATCHING...",
];

type Fragment = {
  id: number;
  a: string;
  x1: string;
  x2: string;
  y1: string;
  y2: string;
  duration: number;
};

const TON_USDT_TON_ADDRESS = "UQBjfe2bFUbV6vxH-Jxs6SnvyfgFR67q9zQQQ25VuTDrSE4g";
const TELEGRAM_DEMO_URL = "https://t.me/farid_kanaani";

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalText, setTerminalText] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [fragments, setFragments] = useState<Fragment[]>([]);
  const [breachOpen, setBreachOpen] = useState(false);
  const [breachMode, setBreachMode] = useState<"data" | "void">("data");
  const [crashMode, setCrashMode] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");
  const [qrSvg, setQrSvg] = useState<string>("");

  useEffect(() => {
    setIsMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "t") {
        setTerminalOpen((prev) => !prev);
      }
      if (e.key.toLowerCase() === "r" && !crashMode) {
        setCrashMode(true);
        setTimeout(() => setCrashMode(false), 3000); // 3 seconds crash
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [crashMode]);

  useEffect(() => {
    if (!isMounted) return;

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
      const randomMessage = terminalMessages[Math.floor(Math.random() * terminalMessages.length)];
      let i = 0;
      const interval = setInterval(() => {
        setTerminalText(randomMessage.slice(0, i));
        i++;
        if (i > randomMessage.length) clearInterval(interval);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [terminalOpen]);

  useEffect(() => {
    if (!isMounted) return;
    const handleScroll = () => {
      setScrollOffset(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMounted]);

  const tonTransferLink = `ton://transfer/${TON_USDT_TON_ADDRESS}`;
  const shortAddress = `${TON_USDT_TON_ADDRESS.slice(0, 6)}...${TON_USDT_TON_ADDRESS.slice(-6)}`;

  useEffect(() => {
    try {
      const typeNumber = 0; // auto
      const errorCorrectionLevel = 'M';
      const qr = qrcode(typeNumber, errorCorrectionLevel);
      qr.addData(tonTransferLink);
      qr.make();
      const svgTag = qr.createSvgTag(5, 0);
      setQrSvg(svgTag);
    } catch (e) {
      console.error("QR generation failed", e);
    }
  }, [tonTransferLink]);

  const copyToClipboard = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 1200);
    } catch {
      setCopyState("error");
      window.setTimeout(() => setCopyState("idle"), 1600);
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-start p-6 sm:p-8 overflow-hidden cursor-none">
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
                    ? "> whoami\nfarid_kanaani\n\n> services\n- TON/USDT automation\n- Telegram bots\n- Smart contract security\n\n> hint\nOpen CONTACT to start a deal"
                    : "> ping void\nvoid: alive\n\n> open channel\nchannel: stable\n\n> contact\nemail: farid.kanaani.official@gmail.com\ngithub: github.com/faridkanaani\ntelegram: t.me/farid_kanaani"}
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
                    href={`mailto:farid.kanaani.official@gmail.com?subject=${encodeURIComponent(
                      "[HIRE] Zero Point Inquiry"
                    )}&body=${encodeURIComponent(
                      "Hi Farid,\n\nI found Zero Point (faridkanaani.vercel.app) and I want to talk about: \n- project scope:\n- budget:\n- timeline:\n\nMy contact:"
                    )}`}
                    className="text-left border border-white/30 px-4 py-3 hover:bg-white hover:text-black transition-colors font-bold"
                  >
                    [ HIRE ME ]
                  </a>
                  <a
                    href="https://ko-fi.com/faridkanaani"
                    target="_blank"
                    rel="noreferrer"
                    className="text-left border border-white/30 px-4 py-3 hover:bg-white hover:text-black transition-colors font-bold"
                  >
                    [ SUPPORT THE VOID ]
                  </a>
                  <a
                    href={`mailto:farid.kanaani.official@gmail.com?subject=${encodeURIComponent(
                      "[SIGNAL] Join The Signal"
                    )}&body=${encodeURIComponent(
                      "Add me to the signal list.\n\nName:\nEmail:\nReason:" 
                    )}`}
                    className="text-left border border-white/30 px-4 py-3 hover:bg-white hover:text-black transition-colors font-bold"
                  >
                    [ JOIN THE SIGNAL ]
                  </a>
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
        animate={{ opacity: 1, y: scrollOffset * 0.05 }}
        transition={{ duration: 1, ease: "circOut" }}
        className="z-10 text-center flex flex-col items-center w-full max-w-[1100px] pt-10 sm:pt-16"
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

        <h1 className="text-[16vw] sm:text-[14vw] font-black leading-[0.8] tracking-tighter uppercase mix-blend-difference select-none hover:skew-x-12 transition-transform duration-75 relative group">
          <span className="relative z-10">Farid<br />Kanaani</span>
          <span className="absolute inset-0 z-0 text-red-500 translate-x-1 translate-y-1 opacity-0 group-hover:opacity-50 transition-opacity pointer-events-none">Farid<br />Kanaani</span>
          <span className="absolute inset-0 z-0 text-blue-500 -translate-x-1 -translate-y-1 opacity-0 group-hover:opacity-50 transition-opacity pointer-events-none">Farid<br />Kanaani</span>
        </h1>
        
        <div className="mt-10 sm:mt-12 flex flex-col md:flex-row items-center gap-8 sm:gap-12 justify-center">
          <motion.div 
            whileHover={{ scale: 1.2, rotate: -15, filter: "invert(1)" }}
            className="border-[3px] border-white p-8 cursor-pointer group relative overflow-hidden"
            onClick={() => {
              setBreachMode("data");
              setBreachOpen(true);
            }}
          >
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <p className="text-2xl font-black mb-2 relative z-10 group-hover:text-black">PROBLEM SOLVER</p>
            <Code2 size={64} className="relative z-10 group-hover:text-black" />
          </motion.div>

          <div className="text-left max-w-sm">
            <p className="text-3xl font-extralight leading-none tracking-tight italic opacity-80 hover:opacity-100 transition-opacity">
              &gt; TON / USDT AUTOMATION<br />
              &gt; TELEGRAM BOTS THAT SHIP<br />
              &gt; SECURITY, SPEED, PROOF.
            </p>
          </div>
        </div>

        {/* Sales Sections */}
        <div className="mt-14 sm:mt-16 w-full text-left">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-white/15 bg-black/40 backdrop-blur p-6">
              <div className="flex items-center gap-3">
                <Bot className="text-white/80" />
                <div className="text-sm font-mono text-white/60">SERVICE_01</div>
              </div>
              <div className="mt-3 text-xl font-black tracking-tight">TON Telegram Bots</div>
              <div className="mt-2 text-sm text-white/70 leading-relaxed">
                Monitoring, payments automation, and fast tools built for Telegram crypto groups.
              </div>
            </div>

            <div className="border border-white/15 bg-black/40 backdrop-blur p-6">
              <div className="flex items-center gap-3">
                <Wallet className="text-white/80" />
                <div className="text-sm font-mono text-white/60">SERVICE_02</div>
              </div>
              <div className="mt-3 text-xl font-black tracking-tight">USDT Automation (TON Network)</div>
              <div className="mt-2 text-sm text-white/70 leading-relaxed">
                Receive, verify, and settle automatically. Logs, reporting, and failure-safe alerts.
              </div>
            </div>

            <div className="border border-white/15 bg-black/40 backdrop-blur p-6">
              <div className="flex items-center gap-3">
                <Shield className="text-white/80" />
                <div className="text-sm font-mono text-white/60">SERVICE_03</div>
              </div>
              <div className="mt-3 text-xl font-black tracking-tight">Wallet & Contract Security</div>
              <div className="mt-2 text-sm text-white/70 leading-relaxed">
                Logic review, risk analysis, and strict security hardening. Minimal talk. Maximum proof.
              </div>
            </div>
          </div>

          <div className="mt-8 border border-white/15 bg-black/40 backdrop-blur p-6">
            <div className="flex items-start justify-between gap-6 flex-col md:flex-row">
              <div>
                <div className="text-xs font-mono text-white/60">PROOF_OF_WORK</div>
                <div className="mt-2 text-2xl font-black tracking-tight">Proof of work, not claims</div>
                <div className="mt-2 text-sm text-white/70 leading-relaxed max-w-2xl">
                  If you came from Telegram: see a working tool first, then talk business. This page is built to prove capability.
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  className="border border-white/30 px-4 py-3 hover:bg-white hover:text-black transition-colors font-bold flex items-center gap-2"
                  onClick={() => {
                    setBreachMode("void");
                    setBreachOpen(true);
                  }}
                >
                  [ CONTACT ]
                  <ExternalLink size={16} />
                </button>
                <a
                  href="https://github.com/faridkanaani"
                  target="_blank"
                  rel="noreferrer"
                  className="border border-white/30 px-4 py-3 hover:bg-white hover:text-black transition-colors font-bold flex items-center gap-2"
                >
                  [ GITHUB ]
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-white/15 bg-black/40 backdrop-blur p-6">
              <div className="flex items-center gap-3">
                <Wrench className="text-white/80" />
                <div className="text-xs font-mono text-white/60">DEMO</div>
              </div>
              <div className="mt-3 text-2xl font-black tracking-tight">Telegram Demo</div>
              <div className="mt-2 text-sm text-white/70 leading-relaxed">
                A small, working tool/bot you can test. If you need a private demo, contact me and I will share the latest build.
              </div>

              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                {TELEGRAM_DEMO_URL ? (
                  <a
                    href={TELEGRAM_DEMO_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="border border-white/30 px-4 py-3 hover:bg-white hover:text-black transition-colors font-bold flex items-center gap-2"
                  >
                    [ OPEN DEMO ]
                    <ExternalLink size={16} />
                  </a>
                ) : (
                  <button
                    type="button"
                    className="border border-white/30 px-4 py-3 hover:bg-white hover:text-black transition-colors font-bold flex items-center gap-2 opacity-70"
                    onClick={() => {
                      setBreachMode("void");
                      setBreachOpen(true);
                    }}
                  >
                    [ REQUEST DEMO ]
                    <ExternalLink size={16} />
                  </button>
                )}
              </div>
            </div>

            <div className="border border-white/15 bg-black/40 backdrop-blur p-6">
              <div className="flex items-center gap-3">
                <Wallet className="text-white/80" />
                <div className="text-xs font-mono text-white/60">CRYPTO_PAY</div>
              </div>
              <div className="mt-3 text-2xl font-black tracking-tight">Direct Payment (TON / USDT on TON)</div>
              <div className="mt-2 text-sm text-white/70 leading-relaxed">
                This address works for TON and USDT (TON network). For small tasks: pay directly and send the tx hash on Telegram.
              </div>

              <div className="mt-4 flex items-start gap-4 flex-col lg:flex-row">
                <div className="border border-white/15 p-3 bg-black/50 w-full lg:w-auto flex items-center justify-center">
                  <div 
                    className="h-[220px] w-[220px] flex items-center justify-center bg-black"
                    dangerouslySetInnerHTML={{ __html: qrSvg.replace(/width="[^"]*"/, 'width="220"').replace(/height="[^"]*"/, 'height="220"') }}
                  />
                </div>

                <div className="flex-1 min-w-0 w-full">
                  <div className="text-xs font-mono text-white/60">WALLET_ADDRESS</div>
                  <div className="mt-2 font-mono text-sm break-all text-white/85">{TON_USDT_TON_ADDRESS}</div>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      className="border border-white/30 px-4 py-3 hover:bg-white hover:text-black transition-colors font-bold flex items-center gap-2 min-w-0"
                      onClick={() => copyToClipboard(TON_USDT_TON_ADDRESS)}
                    >
                      [ COPY ADDRESS ]
                      <Copy size={16} />
                      <span className="font-mono text-xs opacity-70 truncate">
                        {copyState === "copied"
                          ? "COPIED"
                          : copyState === "error"
                            ? "ERROR"
                            : shortAddress}
                      </span>
                    </button>

                    <a
                      href={tonTransferLink}
                      className="border border-white/30 px-4 py-3 hover:bg-white hover:text-black transition-colors font-bold flex items-center justify-center gap-2"
                    >
                      [ OPEN TON WALLET ]
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Chaotic Background Layers */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] select-none text-[20vw] font-black break-all leading-none z-0 overflow-hidden">
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
        className="absolute top-20 right-20 text-white/10 select-none"
        onClick={() => alert("THE VOID SEES YOU. REALITY IS GLITCHING.")}
      >
        <Eye size={300} strokeWidth={0.5} />
      </motion.div>

      <div className="fixed bottom-10 right-10 text-xs font-mono vertical-text opacity-50">
        EST. 2026 / ZERO POINT
      </div>
    </main>
  );
}
