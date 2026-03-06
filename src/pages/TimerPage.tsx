import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, Clock } from "lucide-react";

const TimerPage = () => {
  const [mode, setMode] = useState<"stopwatch" | "countdown">("stopwatch");

  // Stopwatch
  const [swTime, setSwTime] = useState(0);
  const [swRunning, setSwRunning] = useState(false);
  const swRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (swRunning) {
      swRef.current = setInterval(() => setSwTime((t) => t + 10), 10);
    } else if (swRef.current) clearInterval(swRef.current);
    return () => { if (swRef.current) clearInterval(swRef.current); };
  }, [swRunning]);

  // Countdown
  const [cdMinutes, setCdMinutes] = useState(5);
  const [cdTime, setCdTime] = useState(0);
  const [cdRunning, setCdRunning] = useState(false);
  const cdRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCountdown = () => {
    if (cdTime === 0) setCdTime(cdMinutes * 60 * 1000);
    setCdRunning(true);
  };

  useEffect(() => {
    if (cdRunning && cdTime > 0) {
      cdRef.current = setInterval(() => {
        setCdTime((t) => {
          if (t <= 10) {
            setCdRunning(false);
            // Simple alert sound
            try { new Audio("data:audio/wav;base64,UklGRl9vT19telephone...").play(); } catch {}
            return 0;
          }
          return t - 10;
        });
      }, 10);
    } else if (cdRef.current) clearInterval(cdRef.current);
    return () => { if (cdRef.current) clearInterval(cdRef.current); };
  }, [cdRunning, cdTime]);

  const formatTime = (ms: number) => {
    const h = Math.floor(ms / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    const cs = Math.floor((ms % 1000) / 10);
    return `${h > 0 ? h.toString().padStart(2, "0") + ":" : ""}${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}.${cs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-mesh p-4 md:p-8 pt-16 md:pt-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-6">Timer</h1>

        <div className="flex gap-2 mb-6">
          <button onClick={() => setMode("stopwatch")} className={`px-4 py-2 rounded-lg text-sm transition-colors ${mode === "stopwatch" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>Stopwatch</button>
          <button onClick={() => setMode("countdown")} className={`px-4 py-2 rounded-lg text-sm transition-colors ${mode === "countdown" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>Countdown</button>
        </div>

        <div className="glass-card p-8 text-center">
          {mode === "stopwatch" ? (
            <>
              <div className="text-6xl md:text-7xl font-mono font-bold text-foreground mb-8">
                {formatTime(swTime)}
              </div>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setSwRunning(!swRunning)}
                  className={`p-4 rounded-full transition-colors ${swRunning ? "bg-destructive/20 text-destructive" : "bg-primary/20 text-primary"}`}
                >
                  {swRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </button>
                <button onClick={() => { setSwRunning(false); setSwTime(0); }} className="p-4 rounded-full bg-secondary text-muted-foreground hover:text-foreground transition-colors">
                  <RotateCcw className="w-6 h-6" />
                </button>
              </div>
            </>
          ) : (
            <>
              {!cdRunning && cdTime === 0 && (
                <div className="mb-6">
                  <label className="text-sm text-muted-foreground mb-2 block">Duration (minutes)</label>
                  <input
                    type="number"
                    min={1}
                    max={999}
                    value={cdMinutes}
                    onChange={(e) => setCdMinutes(parseInt(e.target.value) || 1)}
                    className="w-32 text-center bg-secondary rounded-lg px-4 py-2 text-foreground font-mono text-lg focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              )}
              <div className="text-6xl md:text-7xl font-mono font-bold text-foreground mb-8">
                {formatTime(cdTime || cdMinutes * 60 * 1000)}
              </div>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => cdRunning ? setCdRunning(false) : startCountdown()}
                  className={`p-4 rounded-full transition-colors ${cdRunning ? "bg-destructive/20 text-destructive" : "bg-primary/20 text-primary"}`}
                >
                  {cdRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </button>
                <button onClick={() => { setCdRunning(false); setCdTime(0); }} className="p-4 rounded-full bg-secondary text-muted-foreground hover:text-foreground transition-colors">
                  <RotateCcw className="w-6 h-6" />
                </button>
              </div>
              {cdTime === 0 && !cdRunning && cdMinutes > 0 && (
                <p className="text-sm text-muted-foreground mt-4 flex items-center justify-center gap-1">
                  <Clock className="w-4 h-4" /> Set duration and press play
                </p>
              )}
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default TimerPage;