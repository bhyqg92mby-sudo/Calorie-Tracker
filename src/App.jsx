import React, { useState, useEffect, useMemo } from "react";

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


function flattenDB(db) {
  const flat = [];
  Object.keys(db).forEach(cat => {
    const subcats = db[cat];
    Object.keys(subcats).forEach(sub => {
      const items = subcats[sub];
      Object.keys(items).forEach(name => {
        flat.push({ category: cat, subcategory: sub, name, ...items[name] });
      });
    });
  });
  return flat;
}

function round(n){ return Math.round(n*10)/10; }

function toCSV(rows){
  if(!rows || rows.length === 0) return "";
  const headers = Object.keys(rows[0]);
  const lines = [headers.join(",")];
  rows.forEach(r => lines.push(headers.map(h => JSON.stringify(r[h] ?? "")).join(",")));
  return lines.join("\n");
}

function fromCSV(text){
  if(!text) return [];
  const [headerLine, ...lines] = text.split(/\r?\n/).filter(Boolean);
  const headers = headerLine.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/).map(h => h.replace(/^"|"$/g,""));
  return lines.map(line => {
    const cols = line.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/).map(c => c.replace(/^"|"$/g,""));
    const obj = {};
    headers.forEach((h,i) => obj[h] = cols[i]);
    return obj;
  });
}

export default function App(){
  const DB_KEY = "cm_db_v3";
  const LOG_KEY = "cm_log_v3";
  const META_KEY = "cm_meta_v3";

  const [db, setDb] = useState(() => {
    const raw = localStorage.getItem(DB_KEY);
    try { return raw ? JSON.parse(raw) : FOOD_DB; } catch(e){ return FOOD_DB; }
  });
  const [log, setLog] = useState(() => {
    const raw = localStorage.getItem(LOG_KEY);
    try { return raw ? JSON.parse(raw) : []; } catch(e){ return []; }
  });
  const [meta, setMeta] = useState(() => {
    const raw = localStorage.getItem(META_KEY);
    try { return raw ? JSON.parse(raw) : { favorites: {}, counts: {}, settings: { show: "Both", sortBy: "name" }, meals: {} }; } catch(e){ return { favorites: {}, counts: {}, settings: { show: "Both", sortBy: "name" }, meals: {} }; }
  });

  const [search, setSearch] = useState("");
  const [filterShow, setFilterShow] = useState(meta.settings?.show || "Both");
  const [sortBy, setSortBy] = useState(meta.settings?.sortBy || "name");

  const [goalKcal, setGoalKcal] = useState(() => { try { const g = JSON.parse(localStorage.getItem('cm_goals_v1')||'null'); return (g && g.kcal) || 2500; } catch(e){ return 2500; } });
  const [goalProtein, setGoalProtein] = useState(() => { try { const g = JSON.parse(localStorage.getItem('cm_goals_v1')||'null'); return (g && g.protein) || 150; } catch(e){ return 150; } });
  const [goalCarbs, setGoalCarbs] = useState(() => { try { const g = JSON.parse(localStorage.getItem('cm_goals_v1')||'null'); return (g && g.carbs) || 250; } catch(e){ return 250; } });
  const [goalFat, setGoalFat] = useState(() => { try { const g = JSON.parse(localStorage.getItem('cm_goals_v1')||'null'); return (g && g.fat) || 70; } catch(e){ return 70; } });

  useEffect(()=>{ try{ localStorage.setItem(DB_KEY, JSON.stringify(db)); }catch(e){} }, [db]);
  useEffect(()=>{ try{ localStorage.setItem(LOG_KEY, JSON.stringify(log)); }catch(e){} }, [log]);
  useEffect(()=>{ try{ localStorage.setItem(META_KEY, JSON.stringify(meta)); }catch(e){} }, [meta]);
  useEffect(()=>{ try{ localStorage.setItem('cm_goals_v1', JSON.stringify({ kcal: goalKcal, protein: goalProtein, carbs: goalCarbs, fat: goalFat })); }catch(e){} }, [goalKcal, goalProtein, goalCarbs, goalFat]);

  const flatList = useMemo(() => flattenDB(db), [db]);

  const filteredList = useMemo(() => {
    const q = (search || "").trim().toLowerCase();
    let items = flatList.filter(it => {
      if (filterShow === "Raw" && it.subcategory !== "Raw") return false;
      if (filterShow === "Cooked" && it.subcategory !== "Cooked") return false;
      if (!q) return true;
      return (it.name + " " + it.category + " " + it.subcategory).toLowerCase().includes(q);
    });
    if (sortBy === "kcal") items.sort((a,b) => (b.kcal||0) - (a.kcal||0));
    else if (sortBy === "protein") items.sort((a,b) => (b.protein||0) - (a.protein||0));
    else items.sort((a,b) => (a.name||"").localeCompare(b.name||""));
    return items;
  }, [flatList, search, filterShow, sortBy]);

  function approxForItem(item, amount){
    const amt = Number(amount) || item.per || 100;
    const ratio = amt / (item.per || 100);
    return { kcal: round((item.kcal||0) * ratio), protein: round((item.protein||0) * ratio), carbs: round((item.carbs||0) * ratio), fat: round((item.fat||0) * ratio) };
  }

  function addLogEntry(item, qty){
    if(!item || !item.name) return;
    const amt = Number(qty) || item.per || 100;
    const macros = approxForItem(item, amt);
    const entry = { id: Date.now(), category: item.category, subcategory: item.subcategory, name: item.name, qty: amt, per: item.per, ...macros };
    setLog(s => [entry, ...s]);
    const key = `${item.name}|||${item.category}`;
    setMeta(m => { const nm = {...m}; nm.counts = nm.counts || {}; nm.counts[key] = (nm.counts[key] || 0) + 1; return nm; });
  }

  function exportDB(){
    try {
      const rows = flattenDB(db).map(i => ({ category: i.category, subcategory: i.subcategory, name: i.name, kcal: i.kcal, protein: i.protein, carbs: i.carbs, fat: i.fat, per: i.per }));
      const csv = toCSV(rows);
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = url; a.download = 'food_db_export.csv'; a.click(); URL.revokeObjectURL(url);
    } catch(e) { alert('Export failed'); }
  }

  function importDB(file){
    if(!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const rows = fromCSV(e.target.result || "");
        const newDb = JSON.parse(JSON.stringify(db));
        if (!newDb.Imported) newDb.Imported = { General: {} };
        rows.forEach(r => {
          const name = r.name || `Imported ${Date.now()}`;
          newDb.Imported.General[name] = { kcal: Number(r.kcal)||0, protein: Number(r.protein)||0, carbs: Number(r.carbs)||0, fat: Number(r.fat)||0, per: Number(r.per)||100 };
        });
        setDb(newDb);
        alert('Imported into category "Imported"');
      } catch(err) { alert('Failed to import: ' + (err && err.message ? err.message : err)); }
    };
    reader.readAsText(file);
  }

  const totals = log.reduce((acc,e) => { acc.kcal+=e.kcal||0; acc.protein+=e.protein||0; acc.carbs+=e.carbs||0; acc.fat+=e.fat||0; return acc; }, {kcal:0, protein:0, carbs:0, fat:0});

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial", padding: 16 }}>
      <header style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <h1>Calorie & Macro Tracker</h1>
        <div>
          <button onClick={exportDB} style={{marginRight:8}}>Export DB</button>
          <label style={{marginRight:8, cursor:"pointer"}}>Import DB<input type="file" accept=".csv" style={{display:"none"}} onChange={(e)=>importDB(e.target.files[0])} /></label>
        </div>
      </header>

      <div style={{display:"grid", gridTemplateColumns:"320px 1fr", gap:16, marginTop:16}}>
        <aside style={{padding:12, border:"1px solid #ddd", borderRadius:8}}>
          <input placeholder="Search food..." value={search} onChange={(e)=>setSearch(e.target.value)} style={{width:"100%", padding:8, marginBottom:8}} />
          <div style={{display:"flex", gap:8, marginBottom:8}}>
            <select value={filterShow} onChange={(e)=>{ setFilterShow(e.target.value); setMeta(m=>({...m, settings:{...(m.settings||{}), show: e.target.value}})); }}>
              <option value="Both">Both</option>
              <option value="Raw">Raw</option>
              <option value="Cooked">Cooked</option>
            </select>
            <select value={sortBy} onChange={(e)=>{ setSortBy(e.target.value); setMeta(m=>({...m, settings:{...(m.settings||{}), sortBy: e.target.value}})); }}>
              <option value="name">Sort: Name</option>
              <option value="kcal">Sort: kcal</option>
              <option value="protein">Sort: protein</option>
            </select>
          </div>

          <div>
            <h3>Daily Goals</h3>
            <label>Calories<input type="number" value={goalKcal} onChange={(e)=>setGoalKcal(Number(e.target.value)||0)} style={{width:"100%"}} /></label>
            <label>Protein<input type="number" value={goalProtein} onChange={(e)=>setGoalProtein(Number(e.target.value)||0)} style={{width:"100%"}} /></label>
            <label>Carbs<input type="number" value={goalCarbs} onChange={(e)=>setGoalCarbs(Number(e.target.value)||0)} style={{width:"100%"}} /></label>
            <label>Fat<input type="number" value={goalFat} onChange={(e)=>setGoalFat(Number(e.target.value)||0)} style={{width:"100%"}} /></label>

            <div style={{marginTop:8, padding:8, background:"#fafafa", borderRadius:6}}>
              <div>Consumed: {Math.round(totals.kcal)} kcal / Remaining: {Math.max(0, Math.round(goalKcal - totals.kcal))} kcal</div>
              <div>Protein: {round(totals.protein)}g / {Math.max(0, round(goalProtein - totals.protein))}g</div>
              <div>Carbs: {round(totals.carbs)}g / {Math.max(0, round(goalCarbs - totals.carbs))}g</div>
              <div>Fat: {round(totals.fat)}g / {Math.max(0, round(goalFat - totals.fat))}g</div>
            </div>
          </div>
        </aside>

        <main>
          <section style={{padding:12, border:"1px solid #ddd", borderRadius:8}}>
            <h3>Foods</h3>
            <div style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8}}>
              {filteredList.map(it => {
                const key = `${it.name}|||${it.category}`;
                return (
                  <div key={key} style={{padding:8, border:"1px solid #eee", borderRadius:6}}>
                    <div style={{fontWeight:600}}>{it.name}</div>
                    <div style={{fontSize:12, color:"#666"}}>{it.category} • {it.subcategory} • per {it.per}</div>
                    <div style={{marginTop:8}}>
                      <input type="number" defaultValue={it.per} id={`qty-${key}`} style={{width:80, padding:4}} />
                      <button onClick={() => { const v = document.getElementById(`qty-${key}`).value; addLogEntry(it, v); }} style={{marginLeft:8}}>Add</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section style={{marginTop:12, padding:12, border:"1px solid #ddd", borderRadius:8}}>
            <h3>Today's Log ({log.length})</h3>
            <div>
              {log.map(e => (
                <div key={e.id} style={{display:"flex", justifyContent:"space-between", padding:8, borderBottom:"1px solid #f0f0f0"}}>
                  <div>
                    <div style={{fontWeight:600}}>{e.name}</div>
                    <div style={{fontSize:12, color:"#666"}}>{e.category} • {e.subcategory} • Qty: {e.qty}</div>
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div>{e.kcal} kcal</div>
                    <div style={{fontSize:12}}>{e.protein}P • {e.carbs}C • {e.fat}F</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{marginTop:8}}>
              <button onClick={()=>{ if(window.confirm("Clear today's log?")) setLog([]); }}>Clear</button>
              <button onClick={()=>setLog([])} style={{marginLeft:8}}>Delete (no confirm)</button>
            </div>
          </section>
        </main>
      </div>

      <footer style={{marginTop:16, fontSize:12, color:"#666"}}>Built for you — data stored locally in your browser.</footer>
    </div>
  );
}
