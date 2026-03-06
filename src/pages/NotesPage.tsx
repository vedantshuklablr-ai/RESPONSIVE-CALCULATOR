import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Search } from "lucide-react";

interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: number;
}

const STORAGE_KEY = "onepiece-notes";

const loadNotes = (): Note[] => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch { return []; }
};

const NotesPage = () => {
  const [notes, setNotes] = useState<Note[]>(loadNotes);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const save = useCallback((updated: Note[]) => {
    setNotes(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, []);

  const addNote = () => {
    const note: Note = { id: crypto.randomUUID(), title: "Untitled", content: "", updatedAt: Date.now() };
    const updated = [note, ...notes];
    save(updated);
    setActiveId(note.id);
  };

  const deleteNote = (id: string) => {
    save(notes.filter((n) => n.id !== id));
    if (activeId === id) setActiveId(null);
  };

  const updateNote = (id: string, field: "title" | "content", value: string) => {
    save(notes.map((n) => n.id === id ? { ...n, [field]: value, updatedAt: Date.now() } : n));
  };

  const active = notes.find((n) => n.id === activeId);
  const filtered = notes.filter((n) => n.title.toLowerCase().includes(search.toLowerCase()) || n.content.toLowerCase().includes(search.toLowerCase()));

  // Auto-save indicator
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  return (
    <div className="min-h-screen bg-gradient-mesh p-4 md:p-8 pt-16 md:pt-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-6">Notes</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100vh-10rem)]">
          {/* Notes list */}
          <div className="glass-card p-4 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search notes..." className="w-full bg-secondary rounded-lg pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <button onClick={addNote} className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"><Plus className="w-4 h-4" /></button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-1">
              <AnimatePresence>
                {filtered.map((note) => (
                  <motion.button
                    key={note.id}
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    onClick={() => setActiveId(note.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors group ${
                      activeId === note.id ? "bg-primary/15 text-primary" : "text-foreground hover:bg-secondary"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm truncate">{note.title || "Untitled"}</p>
                      <button onClick={(e) => { e.stopPropagation(); deleteNote(note.id); }} className="opacity-0 group-hover:opacity-100 text-destructive hover:text-destructive/80"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">{note.content || "No content"}</p>
                  </motion.button>
                ))}
              </AnimatePresence>
              {filtered.length === 0 && <p className="text-sm text-muted-foreground text-center py-8">No notes yet</p>}
            </div>
          </div>

          {/* Editor */}
          <div className="glass-card p-4 md:col-span-2 flex flex-col">
            {active ? (
              <>
                <input
                  value={active.title}
                  onChange={(e) => updateNote(active.id, "title", e.target.value)}
                  className="text-xl font-bold text-foreground bg-transparent focus:outline-none mb-1 border-b border-border pb-2"
                  placeholder="Note title..."
                />
                <p className="text-xs text-muted-foreground mb-3">
                  Last edited: {new Date(active.updatedAt).toLocaleString()}
                </p>
                <textarea
                  value={active.content}
                  onChange={(e) => updateNote(active.id, "content", e.target.value)}
                  className="flex-1 bg-transparent text-foreground focus:outline-none resize-none text-sm leading-relaxed"
                  placeholder="Start typing..."
                />
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground">
                <p>Select a note or create a new one</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotesPage;