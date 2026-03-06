import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Delete, RotateCcw } from "lucide-react";

const CalculatorPage = () => {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [history, setHistory] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem("onepiece-calc-history") || "[]"); } catch { return []; }
  });
  const [isScientific, setIsScientific] = useState(false);

  const addToHistory = useCallback((entry: string) => {
    const next = [entry, ...history].slice(0, 20);
    setHistory(next);
    localStorage.setItem("onepiece-calc-history", JSON.stringify(next));
  }, [history]);

  const handleNumber = (num: string) => {
    if (display === "0" || display === "Error") setDisplay(num);
    else setDisplay(display + num);
  };

  const handleOperator = (op: string) => {
    setExpression(display + " " + op + " ");
    setDisplay("0");
  };

  const handleEquals = () => {
    try {
      const full = expression + display;
      // eslint-disable-next-line no-eval
      const result = Function('"use strict"; return (' + full.replace(/×/g, "*").replace(/÷/g, "/") + ')')();
      const rounded = parseFloat(Number(result).toPrecision(12));
      addToHistory(`${full} = ${rounded}`);
      setDisplay(String(rounded));
      setExpression("");
    } catch {
      setDisplay("Error");
      setExpression("");
    }
  };

  const handleClear = () => { setDisplay("0"); setExpression(""); };
  const handleBackspace = () => setDisplay(display.length > 1 ? display.slice(0, -1) : "0");

  const handleScientific = (fn: string) => {
    try {
      const num = parseFloat(display);
      let result: number;
      switch (fn) {
        case "sin": result = Math.sin(num * Math.PI / 180); break;
        case "cos": result = Math.cos(num * Math.PI / 180); break;
        case "tan": result = Math.tan(num * Math.PI / 180); break;
        case "log": result = Math.log10(num); break;
        case "ln": result = Math.log(num); break;
        case "√": result = Math.sqrt(num); break;
        case "x²": result = num * num; break;
        case "x³": result = num * num * num; break;
        case "1/x": result = 1 / num; break;
        case "π": result = Math.PI; break;
        case "e": result = Math.E; break;
        case "!": {
          let f = 1; for (let i = 2; i <= num; i++) f *= i;
          result = f; break;
        }
        default: result = num;
      }
      const rounded = parseFloat(Number(result).toPrecision(12));
      addToHistory(`${fn}(${num}) = ${rounded}`);
      setDisplay(String(rounded));
    } catch {
      setDisplay("Error");
    }
  };

  const numButtons = ["7","8","9","4","5","6","1","2","3","0",".","±"];
  const opButtons = ["÷","×","-","+"];
  const sciButtons = ["sin","cos","tan","log","ln","√","x²","x³","1/x","π","e","!"];

  return (
    <div className="min-h-screen bg-gradient-mesh p-4 md:p-8 pt-16 md:pt-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-6">Calculator</h1>

        <div className="flex gap-2 mb-4">
          <button onClick={() => setIsScientific(false)} className={`px-4 py-2 rounded-lg text-sm transition-colors ${!isScientific ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>Standard</button>
          <button onClick={() => setIsScientific(true)} className={`px-4 py-2 rounded-lg text-sm transition-colors ${isScientific ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>Scientific</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Calculator */}
          <div className={`glass-card p-4 ${isScientific ? "md:col-span-2" : "md:col-span-2"}`}>
            {/* Display */}
            <div className="bg-secondary/50 rounded-lg p-4 mb-4">
              <p className="text-sm text-muted-foreground h-5 font-mono">{expression}</p>
              <p className="text-3xl font-mono font-bold text-foreground text-right truncate">{display}</p>
            </div>

            {/* Scientific buttons */}
            {isScientific && (
              <div className="grid grid-cols-4 gap-1.5 mb-2">
                {sciButtons.map((btn) => (
                  <button key={btn} onClick={() => handleScientific(btn)} className="p-2 rounded-lg bg-muted hover:bg-muted/80 text-sm text-muted-foreground hover:text-foreground transition-colors font-mono">{btn}</button>
                ))}
              </div>
            )}

            {/* Main buttons */}
            <div className="flex gap-2">
              <div className="flex-1">
                {/* Top row */}
                <div className="grid grid-cols-3 gap-1.5 mb-1.5">
                  <button onClick={handleClear} className="p-3 rounded-lg bg-destructive/20 text-destructive hover:bg-destructive/30 font-semibold transition-colors">AC</button>
                  <button onClick={handleBackspace} className="p-3 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground transition-colors flex items-center justify-center"><Delete className="w-4 h-4" /></button>
                  <button onClick={() => handleOperator("%")} className="p-3 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground transition-colors font-mono">%</button>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {numButtons.map((btn) => (
                    <button key={btn} onClick={() => {
                      if (btn === "±") setDisplay(d => d.startsWith("-") ? d.slice(1) : "-" + d);
                      else handleNumber(btn);
                    }} className="p-3 rounded-lg bg-card hover:bg-card/80 text-foreground font-semibold transition-colors font-mono">{btn}</button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-1.5 w-14">
                {opButtons.map((op) => (
                  <button key={op} onClick={() => handleOperator(op)} className="flex-1 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary font-semibold transition-colors font-mono text-lg">{op}</button>
                ))}
                <button onClick={handleEquals} className="flex-1 rounded-lg bg-primary text-primary-foreground font-bold transition-colors text-lg">=</button>
              </div>
            </div>
          </div>

          {/* History */}
          <div className="glass-card p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-foreground">History</h3>
              <button onClick={() => { setHistory([]); localStorage.removeItem("onepiece-calc-history"); }} className="text-muted-foreground hover:text-foreground"><RotateCcw className="w-4 h-4" /></button>
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {history.length === 0 ? (
                <p className="text-sm text-muted-foreground">No history yet</p>
              ) : history.map((entry, i) => (
                <div key={i} className="text-sm font-mono text-muted-foreground py-1 border-b border-border last:border-0">{entry}</div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CalculatorPage;