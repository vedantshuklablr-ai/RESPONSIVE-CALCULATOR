import { useState, useEffect } from "react";
import { Toaster } from "@/compenents/ui/toaster";
import { Toaster as Sonner } from "@/compenents/ui/sonner";
import { TooltipProvider } from "@/compenents/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "@/compenents/Sidebar";
import SearchModal from "@/compenents/SearchModal";
import Dashboard from "./pages/Dashboard";
import CalculatorPage from "./pages/CalculatorPage";
import NotesPage from "./pages/NotesPage";
import TimerPage from "./pages/TimerPage";
import TodoPage from "./pages/TodoPage";
import PomodoroPage from "./pages/PomodoroPage";
import UnitConverterPage from "./pages/UnitConverterPage";
import WeatherPage from "./pages/WeatherPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  // Global Ctrl+K handler
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <Sidebar onSearch={() => setSearchOpen(true)} />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      <div className="md:ml-56 transition-all duration-300">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/timer" element={<TimerPage />} />
          <Route path="/todo" element={<TodoPage />} />
          <Route path="/pomodoro" element={<PomodoroPage />} />
          <Route path="/converter" element={<UnitConverterPage />} />
          <Route path="/weather" element={<WeatherPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;