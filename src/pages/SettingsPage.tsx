import { useState } from "react";
import { motion } from "framer-motion";
import { Palette, Moon, Sun, Monitor } from "lucide-react";

const SettingsPage = () => {
  const [isDark, setIsDark] = useState(!document.documentElement.classList.contains("light"));

  const toggleTheme = (dark: boolean) => {
    setIsDark(dark);
    if (dark) document.documentElement.classList.remove("light");
    else document.documentElement.classList.add("light");
  };

  const clearData = (key: string, label: string) => {
    localStorage.removeItem(key);
    alert(`${label} cleared!`);
  };

  return (
    <div className="min-h-screen bg-gradient-mesh p-4 md:p-8 pt-16 md:pt-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-6">Settings</h1>

        {/* Theme */}
        <div className="glass-card p-5 mb-4">
          <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2"><Palette className="w-5 h-5 text-primary" /> Appearance</h2>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => toggleTheme(true)} className={`p-4 rounded-lg border transition-colors flex items-center gap-3 ${isDark ? "border-primary bg-primary/10" : "border-border hover:border-muted-foreground"}`}>
              <Moon className="w-5 h-5" />
              <div className="text-left">
                <p className="font-medium text-sm text-foreground">Dark</p>
                <p className="text-xs text-muted-foreground">Easy on the eyes</p>
              </div>
            </button>
            <button onClick={() => toggleTheme(false)} className={`p-4 rounded-lg border transition-colors flex items-center gap-3 ${!isDark ? "border-primary bg-primary/10" : "border-border hover:border-muted-foreground"}`}>
              <Sun className="w-5 h-5" />
              <div className="text-left">
                <p className="font-medium text-sm text-foreground">Light</p>
                <p className="text-xs text-muted-foreground">Bright and clean</p>
              </div>
            </button>
          </div>
        </div>

        {/* Data Management */}
        <div className="glass-card p-5 mb-4">
          <h2 className="font-semibold text-foreground mb-3">Data Management</h2>
          <p className="text-sm text-muted-foreground mb-3">All data is stored locally in your browser.</p>
          <div className="space-y-2">
            {[
              { key: "onepiece-notes", label: "Notes" },
              { key: "onepiece-todos", label: "To-Do List" },
              { key: "onepiece-calc-history", label: "Calculator History" },
              { key: "onepiece-focus-minutes", label: "Focus Minutes" },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between py-2">
                <span className="text-sm text-foreground">{item.label}</span>
                <button onClick={() => clearData(item.key, item.label)} className="px-3 py-1 rounded-lg text-xs bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors">Clear</button>
              </div>
            ))}
          </div>
        </div>

        {/* About */}
        <div className="glass-card p-5">
          <h2 className="font-semibold text-foreground mb-2">About ONE PIECE</h2>
          <p className="text-sm text-muted-foreground">All-in-one productivity dashboard. Version 1.0</p>
          <p className="text-sm text-muted-foreground mt-1">Built with React, Tailwind CSS, and Framer Motion.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default SettingsPage;