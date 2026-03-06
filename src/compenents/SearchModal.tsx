import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, LayoutDashboard, Calculator, StickyNote, Timer, CheckSquare, Cloud, Focus, ArrowLeftRight, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

const tools = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard, keywords: "home main" },
  { path: "/calculator", label: "Calculator", icon: Calculator, keywords: "math add subtract multiply" },
  { path: "/notes", label: "Notes", icon: StickyNote, keywords: "write text memo" },
  { path: "/timer", label: "Timer", icon: Timer, keywords: "stopwatch countdown clock" },
  { path: "/todo", label: "To-Do List", icon: CheckSquare, keywords: "tasks checklist" },
  { path: "/pomodoro", label: "Pomodoro", icon: Focus, keywords: "focus work study" },
  { path: "/converter", label: "Unit Converter", icon: ArrowLeftRight, keywords: "length weight temperature" },
  { path: "/weather", label: "Weather", icon: Cloud, keywords: "forecast temperature" },
  { path: "/settings", label: "Settings", icon: Settings, keywords: "theme preferences" },
];

const SearchModal = ({ open, onClose }: SearchModalProps) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
      }
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const filtered = tools.filter((t) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return t.label.toLowerCase().includes(q) || t.keywords.includes(q);
  });

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-[15%] left-1/2 -translate-x-1/2 z-[70] w-full max-w-lg px-4"
          >
            <div className="glass-card overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search tools..."
                  className="flex-1 bg-transparent text-foreground text-sm placeholder:text-muted-foreground focus:outline-none"
                />
                <button onClick={onClose}><X className="w-4 h-4 text-muted-foreground" /></button>
              </div>
              <div className="max-h-72 overflow-y-auto p-2">
                {filtered.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <button key={tool.path} onClick={() => handleSelect(tool.path)} className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-secondary transition-colors flex items-center gap-3">
                      <Icon className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-foreground">{tool.label}</span>
                    </button>
                  );
                })}
                {filtered.length === 0 && <p className="text-center text-muted-foreground text-sm py-6">No results found</p>}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;