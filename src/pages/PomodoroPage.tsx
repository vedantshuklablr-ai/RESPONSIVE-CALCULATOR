import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, Coffee, Brain } from "lucide-react";

const PomodoroPage = () => {
  const [workMin, setWorkMin] = useState(25);
  const [breakMin, setBreakMin] = useState(5);
  const [timeLeft, setTimeLeft] = useState(25 * 60 * 1000);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalMs = (isBreak ? breakMin : workMin) * 60 * 1000;
  const progress = ((totalMs - timeLeft) / totalMs) * 100;

  useEffect(() => {
    const saved = parseInt(localStorage.getItem("onepiece-focus-minutes") || "0");
    setSessions(Math.floor(saved / workMin));
  }, [workMin]);

  const saveFocusMinutes = useCallback((mins: number) => {
    const current = parseInt(localStorage.getItem("onepiece-focus-minutes") || "0");
    localStorage.setItem("onepiece-focus-minutes", String(current + mins));
  }, []);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => setTimeLeft((t) => t - 100), 100);
    } else if (timeLeft <= 0) {
      setIsRunning(false);
      if (!isBreak) {
        saveFocusMinutes(workMin);
        setSessions((s) => s + 1);
      }
      // Switch mode
      setIsBreak((b) => !b);
      setTimeLeft(isBreak ? workMin * 60 * 1000 : breakMin * 60 * 1000);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isRunning, timeLeft, isBreak, workMin, breakMin, saveFocusMinutes]);

  const reset = () => {
    setIsRunning(false);
    setIsBreak(false);
    setTimeLeft(workMin * 60 * 1000);
  };

  const formatTime = (ms: number) => {
    const m = Math.floor(ms / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const circumference = 2 * Math.PI * 120;

  return (
    <div className="min-h-screen bg-gradient-mesh p-4 md:p-8 pt-16 md:pt-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-lg mx-auto text-center">
        <h1 className="text-2xl font-bold text-foreground mb-6">Pomodoro Timer</h1>

        <div className="glass-card p-8 mb-6">
          {/* Status */}
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-6 ${isBreak ? "bg-accent/20 text-accent" : "bg-primary/20 text-primary"}`}>
            {isBreak ? <Coffee className="w-4 h-4" /> : <Brain className="w-4 h-4" />}
            {isBreak ? "Break Time" : "Focus Time"}
          </div>

          {/* Circular progress */}
          <div className="relative w-64 h-64 mx-auto mb-6">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 256 256">
              <circle cx="128" cy="128" r="120" fill="none" stroke="hsl(var(--secondary))" strokeWidth="6" />
              <circle
                cx="128" cy="128" r="120" fill="none"
                stroke={isBreak ? "hsl(var(--accent))" : "hsl(var(--primary))"}
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference - (progress / 100) * circumference}
                className="transition-all duration-100"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-5xl font-mono font-bold text-foreground">{formatTime(timeLeft)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4">
            <button onClick={() => setIsRunning(!isRunning)} className={`p-4 rounded-full transition-colors ${isRunning ? "bg-destructive/20 text-destructive" : "bg-primary/20 text-primary"}`}>
              {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>
            <button onClick={reset} className="p-4 rounded-full bg-secondary text-muted-foreground hover:text-foreground transition-colors">
              <RotateCcw className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Settings */}
        {!isRunning && (
          <div className="glass-card p-5 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Work (min)</label>
                <input type="number" min={1} max={120} value={workMin} onChange={(e) => { const v = parseInt(e.target.value) || 25; setWorkMin(v); if (!isBreak) setTimeLeft(v * 60 * 1000); }} className="w-full bg-secondary rounded-lg px-3 py-2 text-foreground font-mono text-center focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Break (min)</label>
                <input type="number" min={1} max={60} value={breakMin} onChange={(e) => { const v = parseInt(e.target.value) || 5; setBreakMin(v); if (isBreak) setTimeLeft(v * 60 * 1000); }} className="w-full bg-secondary rounded-lg px-3 py-2 text-foreground font-mono text-center focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
            </div>
          </div>
        )}

        <p className="text-muted-foreground text-sm">Sessions completed today: <span className="text-foreground font-semibold">{sessions}</span></p>
      </motion.div>
    </div>
  );
};

export default PomodoroPage;