import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Check, Circle, Tag } from "lucide-react";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  category: string;
  createdAt: number;
}

const STORAGE_KEY = "onepiece-todos";
const CATEGORIES = ["General", "Work", "Personal", "Study", "Urgent"];

const loadTodos = (): Todo[] => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch { return []; }
};

const TodoPage = () => {
  const [todos, setTodos] = useState<Todo[]>(loadTodos);
  const [input, setInput] = useState("");
  const [category, setCategory] = useState("General");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([{ id: crypto.randomUUID(), text: input.trim(), completed: false, category, createdAt: Date.now() }, ...todos]);
    setInput("");
  };

  const toggleTodo = (id: string) => setTodos(todos.map((t) => t.id === id ? { ...t, completed: !t.completed } : t));
  const deleteTodo = (id: string) => setTodos(todos.filter((t) => t.id !== id));

  const filtered = todos.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const completedCount = todos.filter((t) => t.completed).length;

  return (
    <div className="min-h-screen bg-gradient-mesh p-4 md:p-8 pt-16 md:pt-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-6">To-Do List</h1>

        {/* Add todo */}
        <div className="glass-card p-4 mb-6">
          <div className="flex gap-2 mb-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTodo()}
              placeholder="Add a new task..."
              className="flex-1 bg-secondary rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button onClick={addTodo} className="px-4 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {CATEGORIES.map((c) => (
              <button key={c} onClick={() => setCategory(c)} className={`px-3 py-1 rounded-full text-xs transition-colors ${category === c ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2">
            {(["all", "active", "completed"] as const).map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-lg text-sm capitalize transition-colors ${filter === f ? "bg-primary/15 text-primary font-medium" : "text-muted-foreground hover:text-foreground"}`}>{f}</button>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">{completedCount}/{todos.length} done</p>
        </div>

        {/* Todo list */}
        <div className="space-y-2">
          <AnimatePresence>
            {filtered.map((todo) => (
              <motion.div
                key={todo.id}
                layout
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="glass-card p-3 flex items-center gap-3 group"
              >
                <button onClick={() => toggleTodo(todo.id)} className={`flex-shrink-0 ${todo.completed ? "text-accent" : "text-muted-foreground hover:text-foreground"}`}>
                  {todo.completed ? <Check className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                </button>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${todo.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>{todo.text}</p>
                  <span className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                    <Tag className="w-3 h-3" /> {todo.category}
                  </span>
                </div>
                <button onClick={() => deleteTodo(todo.id)} className="opacity-0 group-hover:opacity-100 text-destructive hover:text-destructive/80 transition-opacity">
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground text-sm py-12">
              {filter === "all" ? "No tasks yet. Add one above!" : `No ${filter} tasks.`}
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default TodoPage;