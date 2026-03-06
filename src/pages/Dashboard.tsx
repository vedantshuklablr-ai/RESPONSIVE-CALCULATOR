import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Calculator,
  StickyNote,
  Timer,
  CheckSquare,
  Cloud,
  Focus,
  ArrowLeftRight,
  Clock,
  TrendingUp,
  Target,
} from "lucide-react";

const tools = [
  { path: "/calculator", label: "Calculator", icon: Calculator, desc: "Standard & Scientific", color: "from-purple-500/20 to-blue-500/20" },
  { path: "/notes", label: "Notes", icon: StickyNote, desc: "Quick notes with auto-save", color: "from-yellow-500/20 to-orange-500/20" },
  { path: "/timer", label: "Timer", icon: Timer, desc: "Stopwatch & Countdown", color: "from-green-500/20 to-teal-500/20" },
  { path: "/todo", label: "To-Do List", icon: CheckSquare, desc: "Task management", color: "from-pink-500/20 to-rose-500/20" },
  { path: "/pomodoro", label: "Pomodoro", icon: Focus, desc: "Focus timer", color: "from-red-500/20 to-orange-500/20" },
  { path: "/converter", label: "Unit Converter", icon: ArrowLeftRight, desc: "Length, weight, temp & more", color: "from-cyan-500/20 to-blue-500/20" },
  { path: "/weather", label: "Weather", icon: Cloud, desc: "Current conditions", color: "from-sky-500/20 to-indigo-500/20" },
];

const Dashboard = () => {
  const [time, setTime] = useState(new Date());
  const [stats, setStats] = useState({ tasks: 0, notes: 0, focusMin: 0 });

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    try {
      const todos = JSON.parse(localStorage.getItem("onepiece-todos") || "[]");
      const notes = JSON.parse(localStorage.getItem("onepiece-notes") || "[]");
      const focusMin = parseInt(localStorage.getItem("onepiece-focus-minutes") || "0");
      setStats({
        tasks: todos.filter((t: any) => t.completed).length,
        notes: notes.length,
        focusMin,
      });
    } catch {}
  }, []);

  const greeting = () => {
    const h = time.getHours();
    if (h < 12) return "Good Morning";
    if (h < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="min-h-screen bg-gradient-mesh p-4 md:p-8 pt-16 md:pt-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto space-y-8"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              {greeting()} 👋
            </h1>
            <p className="text-muted-foreground mt-1">
              Your productivity dashboard is ready.
            </p>
          </div>
          <div className="glass-card px-6 py-3 flex items-center gap-3">
            <Clock className="w-5 h-5 text-primary" />
            <span className="text-2xl font-mono font-semibold text-foreground">
              {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Tasks Completed", value: stats.tasks, icon: Target, color: "text-accent" },
            { label: "Notes Created", value: stats.notes, icon: StickyNote, color: "text-primary" },
            { label: "Focus Minutes", value: stats.focusMin, icon: TrendingUp, color: "text-accent" },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.02 }}
              className="glass-card p-5 flex items-center gap-4"
            >
              <div className={`${stat.color}`}>
                <stat.icon className="w-8 h-8" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tools Grid */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {tools.map((tool, i) => (
              <motion.div
                key={tool.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.03, y: -2 }}
              >
                <Link
                  to={tool.path}
                  className={`glass-card p-5 flex flex-col gap-3 hover:shadow-glow transition-shadow bg-gradient-to-br ${tool.color}`}
                >
                  <tool.icon className="w-8 h-8 text-primary" />
                  <div>
                    <h3 className="font-semibold text-foreground">{tool.label}</h3>
                    <p className="text-sm text-muted-foreground">{tool.desc}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Date */}
        <div className="text-center text-muted-foreground text-sm">
          {time.toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;