// src/App.jsx
import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FOOD_DB = {
  Poultry: {
    Raw: {
      "Chicken mixed cuts (100g)": { kcal: 205, protein: 27, carbs: 0, fat: 9.5, per: 100 },
      "Chicken breast (100g)": { kcal: 165, protein: 31, carbs: 0, fat: 3.6, per: 100 },
      "Chicken thigh (100g)": { kcal: 209, protein: 26, carbs: 0, fat: 10.9, per: 100 },
      "Chicken drumstick (100g)": { kcal: 172, protein: 28, carbs: 0, fat: 7.8, per: 100 }
    },
    Cooked: {
      "Chicken mixed cuts (100g cooked)": { kcal: 293, protein: 38.5, carbs: 0, fat: 13.5, per: 100 },
      "Chicken breast (100g cooked)": { kcal: 235, protein: 44, carbs: 0, fat: 5, per: 100 },
      "Chicken thigh (100g cooked)": { kcal: 250, protein: 30, carbs: 0, fat: 14, per: 100 },
      "Chicken drumstick (100g cooked)": { kcal: 210, protein: 32, carbs: 0, fat: 10, per: 100 }
    }
  },
  "Meat (Red)": {
    Raw: {
      "Beef lean (100g)": { kcal: 250, protein: 26, carbs: 0, fat: 15, per: 100 },
      "Pork loin (100g)": { kcal: 242, protein: 27, carbs: 0, fat: 14, per: 100 }
    },
    Cooked: {
      "Beef cooked (100g est)": { kcal: 290, protein: 31, carbs: 0, fat: 18, per: 100 },
      "Pork cooked (100g est)": { kcal: 290, protein: 29, carbs: 0, fat: 19, per: 100 }
    }
  },
  Seafood: {
    Raw: {
      "Salmon (100g)": { kcal: 208, protein: 20, carbs: 0, fat: 13, per: 100 },
      "Shrimp (100g)": { kcal: 99, protein: 24, carbs: 0.2, fat: 0.3, per: 100 }
    },
    Cooked: {
      "Salmon cooked (100g)": { kcal: 280, protein: 26, carbs: 0, fat: 18, per: 100 },
      "Shrimp cooked (100g)": { kcal: 120, protein: 26, carbs: 1, fat: 1, per: 100 }
    }
  },
  "Dairy & Eggs": {
    General: {
      "Egg (1 large)": { kcal: 72, protein: 6.3, carbs: 0.4, fat: 4.8, per: 1 },
      "Greek yogurt (100g)": { kcal: 59, protein: 10, carbs: 3.6, fat: 0.4, per: 100 },
      "Milk whole (100g)": { kcal: 61, protein: 3.2, carbs: 4.8, fat: 3.3, per: 100 },
      "Paneer (100g)": { kcal: 265, protein: 18.3, carbs: 1.2, fat: 20.8, per: 100 },
      "Omelette (100g)": { kcal: 154, protein: 12, carbs: 1.5, fat: 11, per: 100 },
      "Omelette (1 egg)": { kcal: 90, protein: 6.3, carbs: 0.4, fat: 6.7, per: 1 },
      "Boiled egg (1 egg)": { kcal: 72, protein: 6.3, carbs: 0.4, fat: 5.3, per: 1 }
    }
  },
  Legumes: {
    Raw: {
      "Lentils (100g)": { kcal: 353, protein: 25, carbs: 60, fat: 1.1, per: 100 },
      "Chickpeas (100g)": { kcal: 364, protein: 19.3, carbs: 61, fat: 6, per: 100 }
    },
    Cooked: {
      "Lentils cooked (100g)": { kcal: 116, protein: 9, carbs: 20, fat: 0.4, per: 100 },
      "Chickpeas cooked (100g)": { kcal: 164, protein: 8.9, carbs: 27, fat: 2.6, per: 100 }
    }
  },
  Grains: {
    Raw: {
      "Rice white (100g)": { kcal: 360, protein: 6.6, carbs: 80, fat: 0.6, per: 100 },
      "Pasta (100g)": { kcal: 371, protein: 13, carbs: 75, fat: 1.5, per: 100 }
    },
    Cooked: {
      "Rice white cooked (100g)": { kcal: 130, protein: 2.7, carbs: 28, fat: 0.3, per: 100 },
      "Pasta boiled (100g)": { kcal: 158, protein: 5.8, carbs: 31, fat: 0.9, per: 100 }
    },
    General: {
      "Bread slice - Multigrain (1 slice ~30g)": { kcal: 80, protein: 4, carbs: 12, fat: 1.5, per: 30 },
      "Bread slice - Whole wheat (1 slice ~30g)": { kcal: 69, protein: 3.6, carbs: 12, fat: 1.1, per: 30 },
      "Bread slice - White (1 slice ~30g)": { kcal: 75, protein: 2.5, carbs: 13, fat: 1, per: 30 }
    }
  },
  Vegetables: {
    Raw: {
      "Potato (100g)": { kcal: 77, protein: 2, carbs: 17, fat: 0.1, per: 100 },
      "Broccoli (100g)": { kcal: 34, protein: 2.8, carbs: 6.6, fat: 0.4, per: 100 }
    },
    Cooked: {
      "Potato boiled (100g)": { kcal: 87, protein: 1.9, carbs: 20, fat: 0.1, per: 100 },
      "Broccoli steamed (100g)": { kcal: 35, protein: 2.4, carbs: 7.2, fat: 0.4, per: 100 }
    }
  },
  Fruits: {
    General: {
      "Banana (100g)": { kcal: 89, protein: 1.1, carbs: 23, fat: 0.3, per: 100 },
      "Apple (100g)": { kcal: 52, protein: 0.3, carbs: 14, fat: 0.2, per: 100 }
    }
  },
  "Nuts & Seeds": {
    General: {
      "Almonds (28g)": { kcal: 161, protein: 6, carbs: 6, fat: 14, per: 28 },
      "Peanut butter (16g tbsp)": { kcal: 94, protein: 3.5, carbs: 3, fat: 8, per: 16 }
    }
  },
  "Fats & Oils": {
    General: {
      "Olive oil (1 tbsp ~13.5g)": { kcal: 119, protein: 0, carbs: 0, fat: 13.5, per: 13.5 },
      "Butter (1 tbsp ~14g)": { kcal: 102, protein: 0.1, carbs: 0, fat: 11.5, per: 14 }
    }
  },
  Drinks: {
    General: {
      "Black coffee (1 cup ~240ml)": { kcal: 2, protein: 0.3, carbs: 0, fat: 0, per: 240 }
    }
  }
};

const round = (n) => Math.round(n * 10) / 10;

function flattenDB(db) {
  const flat = [];
  Object.keys(db).forEach((cat) => {
    const sub = db[cat];
    Object.keys(sub).forEach((subcat) => {
      const items = sub[subcat];
      Object.keys(items).forEach((name) => {
        flat.push({ category: cat, subcategory: subcat, name, ...items[name] });
      });
    });
  });
  return flat;
}

function toCSV(rows) {
  if (!rows || rows.length === 0) return "";
  const headers = Object.keys(rows[0]);
  const lines = [headers.join(",")];
  rows.forEach((r) => lines.push(headers.map(h => JSON.stringify(r[h] ?? "")).join(",")));
  return lines.join("\n");
}

function fromCSV(text) {
  if (!text) return [];
  const [headerLine, ...lines] = text.split(/\r?\n/).filter(Boolean);
  if (!headerLine) return [];
  const headers = headerLine.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/).map(h => h.replace(/^"|"$/g, ""));
  return lines.map(line => {
    const cols = line.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/).map(c => c.replace(/^"|"$/g, ""));
    const obj = {};
    headers.forEach((h, i) => obj[h] = cols[i]);
    return obj;
  });
}

function getTodayISO(offset = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  const iso = d.toISOString().slice(0, 10);
  return iso;
}

export default function App() {
  const DB_KEY = "cm_db_v4";
  const LOG_KEY = "cm_log_v4";
  const META_KEY = "cm_meta_v4";
  const GOAL_KEY = "cm_goals_v2";

  const [db, setDb] = useState(() => {
    try {
      const raw = localStorage.getItem(DB_KEY);
      return raw ? JSON.parse(raw) : FOOD_DB;
    } catch {
      return FOOD_DB;
    }
  });

  const [meta, setMeta] = useState(() => {
    try {
      const raw = localStorage.getItem(META_KEY);
      return raw ? JSON.parse(raw) : { favorites: {}, counts: {}, meals: {} , settings: { theme: "light", show: "Both", sortBy: "name" } };
    } catch {
      return { favorites: {}, counts: {}, meals: {}, settings: { theme: "light", show: "Both", sortBy: "name" } };
    }
  });

  const [log, setLog] = useState(() => {
    try {
      const raw = localStorage.getItem(LOG_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  const [goals, setGoals] = useState(() => {
    try {
      const raw = localStorage.getItem(GOAL_KEY);
      return raw ? JSON.parse(raw) : { kcal: 2500, protein: 150, carbs: 250, fat: 70 };
    } catch {
      return { kcal: 2500, protein: 150, carbs: 250, fat: 70 };
    }
  });

  const [search, setSearch] = useState("");
  const [filterShow, setFilterShow] = useState(meta.settings?.show || "Both");
  const [sortBy, setSortBy] = useState(meta.settings?.sortBy || "name");
  const [theme, setTheme] = useState(meta.settings?.theme || "light");
  const [selectedDate, setSelectedDate] = useState(getTodayISO());
  const [viewMode, setViewMode] = useState("today");
  const [editingMealName, setEditingMealName] = useState("");
  const [editingMealComponents, setEditingMealComponents] = useState([]);
  const [showQuickAdd, setShowQuickAdd] = useState(false);

  const flatList = useMemo(() => flattenDB(db), [db]);

  useEffect(() => {
    try { localStorage.setItem(DB_KEY, JSON.stringify(db)); } catch (e) {}
  }, [db]);
  useEffect(() => {
    try { localStorage.setItem(META_KEY, JSON.stringify(meta)); } catch (e) {}
  }, [meta]);
  useEffect(() => {
    try { localStorage.setItem(LOG_KEY, JSON.stringify(log)); } catch (e) {}
  }, [log]);
  useEffect(() => {
    try { localStorage.setItem(GOAL_KEY, JSON.stringify(goals)); } catch (e) {}
  }, [goals]);

  useEffect(() => {
    document.documentElement.style.background = theme === "dark" ? "#0f1720" : "#f7fafc";
    document.documentElement.style.color = theme === "dark" ? "#e6eef6" : "#0b1220";
  }, [theme]);

  const filteredList = useMemo(() => {
    const q = (search || "").trim().toLowerCase();
    let items = flatList.filter(it => {
      if (filterShow === "Raw" && it.subcategory !== "Raw") return false;
      if (filterShow === "Cooked" && it.subcategory !== "Cooked") return false;
      if (!q) return true;
      return (it.name + " " + it.category + " " + it.subcategory).toLowerCase().includes(q);
    });
    if (sortBy === "kcal") items.sort((a, b) => (b.kcal || 0) - (a.kcal || 0));
    else if (sortBy === "protein") items.sort((a, b) => (b.protein || 0) - (a.protein || 0));
    else items.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    return items;
  }, [flatList, search, filterShow, sortBy]);

  function getLogsForDate(dateISO) {
    return (log[dateISO] || []);
  }
  function setLogsForDate(dateISO, entries) {
    setLog(prev => {
      const next = { ...prev, [dateISO]: entries };
      return next;
    });
  }

  function approxForItem(item, amount) {
    const amt = Number(amount) || item.per || 100;
    const ratio = amt / (item.per || 100);
    return {
      kcal: round((item.kcal || 0) * ratio),
      protein: round((item.protein || 0) * ratio),
      carbs: round((item.carbs || 0) * ratio),
      fat: round((item.fat || 0) * ratio)
    };
  }

  function addLogEntry(item, qty, dateISO = selectedDate) {
    if (!item || !item.name) return;
    const amt = Number(qty) || item.per || 100;
    const macros = approxForItem(item, amt);
    const entry = {
      id: Date.now() + Math.random(),
      category: item.category,
      subcategory: item.subcategory,
      name: item.name,
      qty: amt,
      per: item.per,
      ...macros
    };
    const prev = getLogsForDate(dateISO);
    setLogsForDate(dateISO, [entry, ...prev]);
    const key = `${item.name}|||${item.category}`;
    setMeta(m => {
      const nm = { ...m };
      nm.counts = nm.counts || {};
      nm.counts[key] = (nm.counts[key] || 0) + 1;
      return nm;
    });
  }

  function removeEntry(dateISO, id) {
    const prev = getLogsForDate(dateISO);
    setLogsForDate(dateISO, prev.filter(e => e.id !== id));
  }

  function clearDate(dateISO) {
    setLogsForDate(dateISO, []);
  }

  function toggleFavorite(itemKey) {
    setMeta(m => {
      const nm = { ...m };
      nm.favorites = nm.favorites || {};
      nm.favorites[itemKey] = !nm.favorites[itemKey];
      return nm;
    });
  }

  function saveMeal(name, components) {
    if (!name || !components || !components.length) return;
    setMeta(m => {
      const nm = { ...m };
      nm.meals = nm.meals || {};
      nm.meals[name] = components;
      return nm;
    });
    setEditingMealName("");
    setEditingMealComponents([]);
  }

  function deleteMeal(name) {
    setMeta(m => {
      const nm = { ...m };
      if (nm.meals) delete nm.meals[name];
      return nm;
    });
  }

  function addMealToLog(name, dateISO = selectedDate) {
    if (!meta.meals || !meta.meals[name]) return;
    meta.meals[name].forEach(c => {
      const found = flatList.find(i => i.name === c.name && i.category === c.category);
      addLogEntry(found || c, c.qty || c.per || 100, dateISO);
    });
  }

  const frequent = useMemo(() => {
    return Object.entries(meta.counts || {})
      .map(([k, v]) => ({ key: k, count: v }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8)
      .map(e => {
        const [name, category] = e.key.split("|||");
        const found = flatList.find(i => i.name === name && i.category === category);
        return found ? { ...found, count: e.count } : null;
      })
      .filter(Boolean);
  }, [meta.counts, flatList]);

  function exportDB() {
    try {
      const rows = flattenDB(db).map(i => ({ category: i.category, subcategory: i.subcategory, name: i.name, kcal: i.kcal, protein: i.protein, carbs: i.carbs, fat: i.fat, per: i.per }));
      const csv = toCSV(rows);
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "food_db_export.csv";
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      alert("Export DB failed");
    }
  }

  function exportLogCSV() {
    try {
      const all = [];
      Object.keys(log).forEach(d => {
        (log[d] || []).forEach(e => all.push({ date: d, name: e.name, qty: e.qty, kcal: e.kcal, protein: e.protein, carbs: e.carbs, fat: e.fat }));
      });
      const csv = toCSV(all);
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "food_log_export.csv";
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      alert("Export log failed");
    }
  }

  function importDB(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const rows = fromCSV(e.target.result || "");
        const newDb = { ...db };
        if (!newDb.Imported) newDb.Imported = { General: {} };
        rows.forEach(r => {
          const name = r.name || `Imported ${Date.now()}`;
          newDb.Imported.General[name] = { kcal: Number(r.kcal) || 0, protein: Number(r.protein) || 0, carbs: Number(r.carbs) || 0, fat: Number(r.fat) || 0, per: Number(r.per) || 100 };
        });
        setDb(newDb);
        alert('Imported into category "Imported"');
      } catch (err) {
        alert("Import failed: " + (err && err.message ? err.message : err));
      }
    };
    reader.readAsText(file);
  }

  const weeklyAgg = useMemo(() => {
    const res = [];
    for (let i = 6; i >= 0; i--) {
      const d = getTodayISO(-i);
      const entries = getLogsForDate(d) || [];
      const sum = entries.reduce((acc, e) => {
        acc.kcal += (e.kcal || 0);
        acc.protein += (e.protein || 0);
        return acc;
      }, { kcal: 0, protein: 0 });
      res.push({ date: d, kcal: sum.kcal, protein: sum.protein });
    }
    return res;
  }, [log]);

  const TopBar = () => (
    <div style={styles.topbar}>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <h2 style={{ margin: 0 }}>Calorie & Macro Tracker</h2>
        <div style={{ fontSize: 13, color: "#666" }}>— quick logging, goals, history</div>
      </div>

      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <button onClick={() => { setViewMode("today"); setSelectedDate(getTodayISO()); }} style={styles.button}>Today</button>
        <button onClick={() => setViewMode("history")} style={styles.button}>History</button>
        <button onClick={() => setViewMode("settings")} style={styles.button}>Settings</button>

        <div style={{ width: 1, height: 22, background: theme === "dark" ? "#233" : "#e6eef6", margin: "0 8px" }} />

        <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input type="checkbox" checked={theme === "dark"} onChange={() => { const t = theme === "dark" ? "light" : "dark"; setTheme(t); setMeta(m => ({ ...m, settings: { ...(m.settings || {}), theme: t } })); }} />
          <small>Dark</small>
        </label>
      </div>
    </div>
  );

  const ProgressBar = ({ value, goal }) => {
    const pct = goal > 0 ? Math.min(100, Math.round((value / goal) * 100)) : 0;
    return (
      <div style={{ height: 10, background: theme === "dark" ? "#112" : "#eee", borderRadius: 6, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: pct >= 100 ? "#16a34a" : "#2563eb" }} />
      </div>
    );
  };

  const WeeklyChart = ({ data, field }) => {
    const max = Math.max(...data.map(d => d[field]), 10);
    const w = 420, h = 120, pad = 20;
    const bw = Math.floor((w - pad * 2) / data.length) - 6;
    return (
      <svg width={w} height={h} style={{ background: theme === "dark" ? "transparent" : "transparent", borderRadius: 6 }}>
        {data.map((d, i) => {
          const x = pad + i * (bw + 6);
          const val = d[field];
          const height = max ? Math.max(2, Math.round((val / max) * (h - pad * 2))) : 2;
          const y = h - pad - height;
          return (
            <g key={d.date}>
              <rect x={x} y={y} width={bw} height={height} rx={4} fill={field === "kcal" ? "#fb923c" : "#60a5fa"} />
              <text x={x + bw / 2} y={h - 4} fontSize={10} textAnchor="middle" fill={theme === "dark" ? "#cfe8ff" : "#333"}>
                {d.date.slice(5)}
              </text>
            </g>
          );
        })}
      </svg>
    );
  };

  const totals = getLogsForDate(selectedDate).reduce((acc, e) => {
    acc.kcal += (e.kcal || 0);
    acc.protein += (e.protein || 0);
    acc.carbs += (e.carbs || 0);
    acc.fat += (e.fat || 0);
    return acc;
  }, { kcal: 0, protein: 0, carbs: 0, fat: 0 });

  function addCustomFood(name, kcal, protein, carbs, fat, per = 100, category = "Custom", subcategory = "General") {
    setDb(prev => {
      const n = { ...prev };
      if (!n[category]) n[category] = {};
      if (!n[category][subcategory]) n[category][subcategory] = {};
      n[category][subcategory][name] = { kcal: Number(kcal) || 0, protein: Number(protein) || 0, carbs: Number(carbs) || 0, fat: Number(fat) || 0, per: Number(per) || 100 };
      return n;
    });
  }

  function itemKey(it) {
    return `${it.name}|||${it.category}`;
  }

  return (
    <div style={{ maxWidth: 1100, margin: "18px auto", padding: 14 }}>
      <TopBar />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 16, marginTop: 12 }}>
        <div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search foods (e.g. chicken, rice)" style={styles.input} />
            <select value={filterShow} onChange={e => { setFilterShow(e.target.value); setMeta(m => ({ ...m, settings: { ...(m.settings || {}), show: e.target.value } })); }} style={styles.select}>
              <option value="Both">Both</option>
              <option value="Raw">Raw</option>
              <option value="Cooked">Cooked</option>
            </select>
            <select value={sortBy} onChange={e => { setSortBy(e.target.value); setMeta(m => ({ ...m, settings: { ...(m.settings || {}), sortBy: e.target.value } })); }} style={styles.select}>
              <option value="name">Name</option>
              <option value="kcal">kcal</option>
              <option value="protein">protein</option>
            </select>
            <button onClick={() => { setShowQuickAdd(s => !s); }} style={styles.button}>+ Custom</button>
          </div>

          <AnimatePresence>
            {showQuickAdd && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} style={{ overflow: "hidden", marginBottom: 12 }}>
                <QuickAdd onAdd={addCustomFood} onClose={() => setShowQuickAdd(false)} />
              </motion.div>
            )}
          </AnimatePresence>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 10 }}>
            {filteredList.map(it => {
              const key = itemKey(it);
              return (
                <motion.div key={key} layout initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={cardStyle(theme)}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontWeight: 700 }}>{it.name}</div>
                      <div style={{ fontSize: 12, color: theme === "dark" ? "#cfe8ff" : "#4b5563" }}>{it.category} • {it.subcategory} • per {it.per}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontWeight: 700 }}>{it.kcal} kcal</div>
                      <div style={{ fontSize: 12 }}>{it.protein}P • {it.carbs}C • {it.fat}F</div>
                    </div>
                  </div>

                  <div style={{ marginTop: 8, display: "flex", gap: 8, alignItems: "center" }}>
                    <input defaultValue={it.per} id={`qty-${key}`} style={{ width: 84, padding: 6, borderRadius: 6 }} />
                    <button onClick={() => { const v = document.getElementById(`qty-${key}`).value; addLogEntry(it, v); }} style={styles.button}>Add</button>
                    <button onClick={() => toggleFavorite(key)} title="Favorite" style={styles.iconButton}>{meta.favorites && meta.favorites[key] ? "★" : "☆"}</button>
                    <button onClick={() => setEditingMealComponents(s => [...s, { category: it.category, subcategory: it.subcategory, name: it.name, qty: it.per }])} title="Add to meal" style={styles.iconButton}>＋meal</button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <aside>
          <div style={{ padding: 12, borderRadius: 8, ...panelStyle(theme) }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div><strong>Goals</strong></div>
              <div style={{ fontSize: 12, color: "#888" }}>Daily</div>
            </div>

            <div style={{ marginTop: 8 }}>
              <div style={{ fontSize: 13, marginBottom: 4, display: "flex", justifyContent: "space-between" }}>
                <div>Calories</div>
                <div>{Math.round(totals.kcal)} / {goals.kcal} kcal</div>
              </div>
              <ProgressBar value={totals.kcal} goal={goals.kcal} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginTop: 6 }}>
                <div>{Math.round(totals.kcal)} kcal</div>
                <div>{Math.max(0, Math.round(goals.kcal - totals.kcal))} left</div>
              </div>

              <div style={{ marginTop: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                  <div>Protein</div><div>{round(totals.protein)} / {goals.protein} g</div>
                </div>
                <ProgressBar value={totals.protein} goal={goals.protein} />
                <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>{Math.max(0, round(goals.protein - totals.protein))} g remaining</div>
              </div>

              <div style={{ marginTop: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                  <div>Carbs</div><div>{round(totals.carbs)} / {goals.carbs} g</div>
                </div>
                <ProgressBar value={totals.carbs} goal={goals.carbs} />
                <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>{Math.max(0, round(goals.carbs - totals.carbs))} g remaining</div>
              </div>

              <div style={{ marginTop: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                  <div>Fat</div><div>{round(totals.fat)} / {goals.fat} g</div>
                </div>
                <ProgressBar value={totals.fat} goal={goals.fat} />
                <div style={{ fontSize: 12, color: "#666", marginTop: 4 }}>{Math.max(0, round(goals.fat - totals.fat))} g remaining</div>
              </div>

              <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
                <button onClick={() => { const newGoals = { ...goals }; const gk = prompt("Daily calories:", String(goals.kcal)); if (gk) newGoals.kcal = Number(gk); const gp = prompt("Protein (g):", String(goals.protein)); if (gp) newGoals.protein = Number(gp); setGoals(newGoals); }} style={styles.button}>Edit goals</button>
                <button onClick={() => { exportLogCSV(); }} style={styles.button}>Export log</button>
              </div>
            </div>
          </div>

          <div style={{ height: 12 }} />

          <div style={{ padding: 12, borderRadius: 8, ...panelStyle(theme) }}>
            <div style={{ fontWeight: 700 }}>Last 7 days</div>
            <div style={{ marginTop: 8 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <div>
                  <div style={{ fontSize: 12, marginBottom: 6 }}>Calories</div>
                  <WeeklyChart data={weeklyAgg} field="kcal" />
                </div>
                <div>
                  <div style={{ fontSize: 12, marginBottom: 6 }}>Protein</div>
                  <WeeklyChart data={weeklyAgg} field="protein" />
                </div>
              </div>
            </div>
          </div>

          <div style={{ height: 12 }} />

          <div style={{ padding: 12, borderRadius: 8, ...panelStyle(theme) }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontWeight: 700 }}>Saved meals</div>
              <div style={{ fontSize: 12, color: "#888" }}>{Object.keys(meta.meals || {}).length}</div>
            </div>

            <div style={{ marginTop: 8 }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                <input placeholder="Meal name" value={editingMealName} onChange={e => setEditingMealName(e.target.value)} style={styles.input} />
                <button onClick={() => { if (editingMealName && editingMealComponents.length) saveMeal(editingMealName, editingMealComponents); }} style={styles.button}>Save</button>
              </div>

              <div style={{ fontSize: 13, marginBottom: 6 }}>Components</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {editingMealComponents.map((c, idx) => (
                  <div key={idx} style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                    <div style={{ fontSize: 13 }}>{c.name} • {c.qty}</div>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button onClick={() => setEditingMealComponents(s => s.filter((_, i) => i !== idx))} style={styles.smallButton}>Remove</button>
                    </div>
                  </div>
                ))}
                <div style={{ display: "flex", gap: 8 }}>
                  <select style={styles.select} onChange={e => {
                    const selected = flatList.find(f => f.name === e.target.value);
                    if (selected) setEditingMealComponents(s => [...s, { category: selected.category, subcategory: selected.subcategory, name: selected.name, qty: selected.per }]);
                    e.target.value = "";
                  }}>
                    <option value="">Add item...</option>
                    {flatList.slice(0, 80).map(f => <option key={f.name + f.category} value={f.name}>{f.name} — {f.category}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ marginTop: 8 }}>
                {Object.keys(meta.meals || {}).length === 0 && <div style={{ fontSize: 12, color: "#777" }}>No saved meals</div>}
                {Object.keys(meta.meals || {}).map(name => (
                  <div key={name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
                    <div>
                      <div style={{ fontWeight: 600 }}>{name}</div>
                      <div style={{ fontSize: 12, color: "#777" }}>{(meta.meals[name] || []).map(c => `${c.name} (${c.qty})`).join(", ")}</div>
                    </div>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button onClick={() => addMealToLog(name)} style={styles.button}>Add</button>
                      <button onClick={() => deleteMeal(name)} style={styles.smallButton}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </aside>
      </div>

      <div style={{ marginTop: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{ fontWeight: 700 }}>{viewMode === "today" ? "Today's Log" : viewMode === "history" ? "History" : "Settings"}</div>
            {viewMode !== "settings" && <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} style={styles.inputDate} />}
            <div style={{ fontSize: 13, color: "#666" }}>{getLogsForDate(selectedDate).length} entries</div>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => exportDB()} style={styles.button}>Export DB</button>
            <label style={{ cursor: "pointer" }}>
              <input type="file" accept=".csv" style={{ display: "none" }} onChange={e => importDB(e.target.files[0])} />
              <span style={styles.button}>Import DB</span>
            </label>
            <button onClick={() => exportLogCSV()} style={styles.button}>Export all logs</button>
            <button onClick={() => { if (window.confirm("Clear all logs? This cannot be undone.")) { setLog({}); } }} style={styles.smallButton}>Clear all</button>
          </div>
        </div>

        <div style={{ marginTop: 10 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 12 }}>
            <div style={{ padding: 12, borderRadius: 8, ...panelStyle(theme) }}>
              {getLogsForDate(selectedDate).length === 0 && <div style={{ color: "#888" }}>No entries for {selectedDate}.</div>}
              {getLogsForDate(selectedDate).map(e => (
                <div key={e.id} style={{ display: "flex", justifyContent: "space-between", padding: 8, borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
                  <div>
                    <div style={{ fontWeight: 700 }}>{e.name}</div>
                    <div style={{ fontSize: 12, color: "#666" }}>{e.category} • {e.subcategory} • {e.qty}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 700 }}>{e.kcal} kcal</div>
                    <div style={{ fontSize: 12 }}>{e.protein}P • {e.carbs}C • {e.fat}F</div>
                    <div style={{ marginTop: 6, display: "flex", gap: 6, justifyContent: "flex-end" }}>
                      <button onClick={() => removeEntry(selectedDate, e.id)} style={styles.smallButton}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}
              {getLogsForDate(selectedDate).length > 0 && <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                <button onClick={() => { if (window.confirm(`Clear entries for ${selectedDate}?`)) clearDate(selectedDate); }} style={styles.smallButton}>Clear date</button>
              </div>}
            </div>

            <div style={{ padding: 12, borderRadius: 8, ...panelStyle(theme) }}>
              <div style={{ fontWeight: 700 }}>Favorites & Frequent</div>
              <div style={{ marginTop: 8 }}>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {Object.keys(meta.favorites || {}).filter(k => meta.favorites[k]).map(k => {
                    const [name, cat] = k.split("|||");
                    const found = flatList.find(f => f.name === name && f.category === cat);
                    if (!found) return null;
                    return <button key={k} onClick={() => addLogEntry(found, found.per)} style={styles.smallButton}>{found.name}</button>;
                  })}
                  {(Object.keys(meta.favorites || {}).filter(k => meta.favorites[k]).length === 0) && <div style={{ color: "#777", fontSize: 13 }}>No favorites yet</div>}
                </div>

                <div style={{ marginTop: 10 }}>
                  <div style={{ fontWeight: 600 }}>Frequently eaten</div>
                  <div style={{ marginTop: 8, display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {frequent.map(f => <button key={f.name} onClick={() => addLogEntry(f, f.per)} style={styles.smallButton}>{f.name}</button>)}
                    {frequent.length === 0 && <div style={{ color: "#777" }}>No data</div>}
                  </div>
                </div>

                <div style={{ marginTop: 10 }}>
                  <div style={{ fontWeight: 600 }}>Saved meal templates</div>
                  <div style={{ marginTop: 8, display: "flex", gap: 6, flexDirection: "column" }}>
                    {Object.keys(meta.meals || {}).map(name => (
                      <div key={name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ fontWeight: 600 }}>{name}</div>
                        <div style={{ display: "flex", gap: 6 }}>
                          <button onClick={() => addMealToLog(name)} style={styles.smallButton}>Add</button>
                          <button onClick={() => deleteMeal(name)} style={styles.smallButton}>Delete</button>
                        </div>
                      </div>
                    ))}
                    {Object.keys(meta.meals || {}).length === 0 && <div style={{ color: "#777" }}>No saved meals</div>}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}

function QuickAdd({ onAdd, onClose }) {
  const [name, setName] = useState("");
  const [kcal, setKcal] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");
  const [per, setPer] = useState("100");

  return (
    <div style={{ padding: 10, borderRadius: 8, background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
      <div style={{ display: "flex", gap: 8 }}>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} style={styles.input} />
        <input placeholder="kcal" value={kcal} onChange={e => setKcal(e.target.value)} style={styles.inputSmall} />
        <input placeholder="protein" value={protein} onChange={e => setProtein(e.target.value)} style={styles.inputSmall} />
        <input placeholder="carbs" value={carbs} onChange={e => setCarbs(e.target.value)} style={styles.inputSmall} />
        <input placeholder="fat" value={fat} onChange={e => setFat(e.target.value)} style={styles.inputSmall} />
        <input placeholder="per" value={per} onChange={e => setPer(e.target.value)} style={styles.inputSmall} />
        <button onClick={() => { if (!name) return alert("Give a name"); onAdd(name, kcal, protein, carbs, fat, per); setName(""); setKcal(""); setProtein(""); setCarbs(""); setFat(""); setPer("100"); onClose(); }} style={styles.button}>Add</button>
        <button onClick={() => onClose()} style={styles.smallButton}>Cancel</button>
      </div>
    </div>
  );
}

const styles = {
  input: { padding: 8, borderRadius: 8, border: "1px solid rgba(0,0,0,0.08)", minWidth: 160 },
  inputSmall: { padding: 6, borderRadius: 6, border: "1px solid rgba(0,0,0,0.08)", width: 64 },
  select: { padding: 8, borderRadius: 8, border: "1px solid rgba(0,0,0,0.08)" },
  button: { padding: "8px 10px", borderRadius: 8, border: "none", background: "#2563eb", color: "#fff", cursor: "pointer" },
  smallButton: { padding: "6px 8px", borderRadius: 8, border: "1px solid rgba(0,0,0,0.06)", background: "transparent", cursor: "pointer" },
  iconButton: { padding: 6, borderRadius: 8, border: "none", background: "transparent", cursor: "pointer", fontSize: 16 }
};

const panelStyle = (theme) => ({
  background: theme === "dark" ? "rgba(20,20,30,0.6)" : "#fff",
  border: theme === "dark" ? "1px solid rgba(255,255,255,0.04)" : "1px solid rgba(0,0,0,0.04)",
});

const cardStyle = (theme) => ({
  padding: 10,
  borderRadius: 8,
  background: theme === "dark" ? "rgba(10,15,22,0.6)" : "#fff",
  border: theme === "dark" ? "1px solid rgba(255,255,255,0.03)" : "1px solid rgba(0,0,0,0.04)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

const stylesTop = {
  topbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }
};

Object.assign(styles, { topbar: stylesTop.topbar });
