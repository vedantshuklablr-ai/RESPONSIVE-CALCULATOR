import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeftRight } from "lucide-react";

type Category = "length" | "weight" | "temperature" | "volume" | "speed" | "time";

const units: Record<Category, { name: string; toBase: (v: number) => number; fromBase: (v: number) => number }[]> = {
  length: [
    { name: "Meters", toBase: (v) => v, fromBase: (v) => v },
    { name: "Kilometers", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    { name: "Miles", toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
    { name: "Feet", toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
    { name: "Inches", toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
    { name: "Centimeters", toBase: (v) => v * 0.01, fromBase: (v) => v / 0.01 },
  ],
  weight: [
    { name: "Kilograms", toBase: (v) => v, fromBase: (v) => v },
    { name: "Grams", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    { name: "Pounds", toBase: (v) => v * 0.453592, fromBase: (v) => v / 0.453592 },
    { name: "Ounces", toBase: (v) => v * 0.0283495, fromBase: (v) => v / 0.0283495 },
    { name: "Tons", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
  ],
  temperature: [
    { name: "Celsius", toBase: (v) => v, fromBase: (v) => v },
    { name: "Fahrenheit", toBase: (v) => (v - 32) * 5 / 9, fromBase: (v) => v * 9 / 5 + 32 },
    { name: "Kelvin", toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
  ],
  volume: [
    { name: "Liters", toBase: (v) => v, fromBase: (v) => v },
    { name: "Milliliters", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
    { name: "Gallons (US)", toBase: (v) => v * 3.78541, fromBase: (v) => v / 3.78541 },
    { name: "Cups", toBase: (v) => v * 0.236588, fromBase: (v) => v / 0.236588 },
  ],
  speed: [
    { name: "m/s", toBase: (v) => v, fromBase: (v) => v },
    { name: "km/h", toBase: (v) => v / 3.6, fromBase: (v) => v * 3.6 },
    { name: "mph", toBase: (v) => v * 0.44704, fromBase: (v) => v / 0.44704 },
    { name: "knots", toBase: (v) => v * 0.514444, fromBase: (v) => v / 0.514444 },
  ],
  time: [
    { name: "Seconds", toBase: (v) => v, fromBase: (v) => v },
    { name: "Minutes", toBase: (v) => v * 60, fromBase: (v) => v / 60 },
    { name: "Hours", toBase: (v) => v * 3600, fromBase: (v) => v / 3600 },
    { name: "Days", toBase: (v) => v * 86400, fromBase: (v) => v / 86400 },
  ],
};

const categories: { key: Category; label: string }[] = [
  { key: "length", label: "Length" },
  { key: "weight", label: "Weight" },
  { key: "temperature", label: "Temperature" },
  { key: "volume", label: "Volume" },
  { key: "speed", label: "Speed" },
  { key: "time", label: "Time" },
];

const UnitConverterPage = () => {
  const [category, setCategory] = useState<Category>("length");
  const [fromIdx, setFromIdx] = useState(0);
  const [toIdx, setToIdx] = useState(1);
  const [value, setValue] = useState("1");

  const unitList = units[category];
  const numValue = parseFloat(value) || 0;
  const baseValue = unitList[fromIdx].toBase(numValue);
  const result = unitList[toIdx].fromBase(baseValue);

  const swap = () => { setFromIdx(toIdx); setToIdx(fromIdx); };

  return (
    <div className="min-h-screen bg-gradient-mesh p-4 md:p-8 pt-16 md:pt-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-6">Unit Converter</h1>

        {/* Categories */}
        <div className="flex gap-2 flex-wrap mb-6">
          {categories.map((c) => (
            <button key={c.key} onClick={() => { setCategory(c.key); setFromIdx(0); setToIdx(1); setValue("1"); }} className={`px-4 py-2 rounded-lg text-sm transition-colors ${category === c.key ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}>{c.label}</button>
          ))}
        </div>

        <div className="glass-card p-6">
          <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-4 items-end">
            {/* From */}
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">From</label>
              <select value={fromIdx} onChange={(e) => setFromIdx(parseInt(e.target.value))} className="w-full bg-secondary rounded-lg px-3 py-2 text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary mb-2">
                {unitList.map((u, i) => <option key={i} value={i}>{u.name}</option>)}
              </select>
              <input type="number" value={value} onChange={(e) => setValue(e.target.value)} className="w-full bg-secondary rounded-lg px-4 py-3 text-foreground font-mono text-xl focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>

            {/* Swap */}
            <button onClick={swap} className="p-3 rounded-full bg-primary/20 text-primary hover:bg-primary/30 transition-colors self-center mx-auto">
              <ArrowLeftRight className="w-5 h-5" />
            </button>

            {/* To */}
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">To</label>
              <select value={toIdx} onChange={(e) => setToIdx(parseInt(e.target.value))} className="w-full bg-secondary rounded-lg px-3 py-2 text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary mb-2">
                {unitList.map((u, i) => <option key={i} value={i}>{u.name}</option>)}
              </select>
              <div className="w-full bg-secondary/50 rounded-lg px-4 py-3 font-mono text-xl text-foreground">
                {parseFloat(result.toPrecision(10))}
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-4">
            {numValue} {unitList[fromIdx].name} = {parseFloat(result.toPrecision(10))} {unitList[toIdx].name}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default UnitConverterPage;