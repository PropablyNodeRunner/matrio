import { useState, useEffect, useRef } from "react";

const PRODUCTS = [
  { id:1,  name:"Galvanised Round Wire Nails 3.35×75mm 1kg", cat:"Fixings & Fasteners", price:{ "Toolstation":2.49,"Wickes":2.79,"Buildbase":2.55,"Travis Perkins":2.89 }, unit:"bag", awin:"https://www.toolstation.com/galvanised-round-wire-nails/p33184" },
  { id:2,  name:"Aluminium Clout Nails 3.35×20mm 500g", cat:"Fixings & Fasteners", price:{ "Toolstation":3.19,"Wickes":3.49,"Buildbase":3.29,"Travis Perkins":3.65 }, unit:"bag", awin:"https://www.toolstation.com/aluminium-clout-nails/p26424" },
  { id:3,  name:"Screws Countersunk TX 5×80mm Box 200", cat:"Fixings & Fasteners", price:{ "Toolstation":5.49,"Wickes":5.99,"Buildbase":5.69,"Travis Perkins":6.25 }, unit:"box", awin:"https://www.toolstation.com/tx-countersunk-screws/p26300" },
  { id:4,  name:"Concrete Screw Anchor 7.5×132mm Box 50", cat:"Fixings & Fasteners", price:{ "Toolstation":14.99,"Wickes":16.49,"Buildbase":15.49,"Travis Perkins":17.20 }, unit:"box", awin:"https://www.toolstation.com/concrete-screw-anchor/p68574" },
  { id:5,  name:"Plasterboard 12.5mm 1200×2400mm", cat:"Drylining", price:{ "Toolstation":null,"Wickes":11.50,"Buildbase":10.99,"Travis Perkins":11.25 }, unit:"sheet", awin:"https://www.wickes.co.uk/plasterboard" },
  { id:6,  name:"Moisture Resistant Plasterboard 12.5mm 1200×2400mm", cat:"Drylining", price:{ "Toolstation":null,"Wickes":14.50,"Buildbase":13.99,"Travis Perkins":14.20 }, unit:"sheet", awin:"https://www.wickes.co.uk/mr-plasterboard" },
  { id:7,  name:"Metal Stud C Stud 70mm×3.6m", cat:"Drylining", price:{ "Toolstation":3.49,"Wickes":3.89,"Buildbase":3.59,"Travis Perkins":3.95 }, unit:"length", awin:"https://www.toolstation.com/c-stud/p52898" },
  { id:8,  name:"Metal Track U Track 70mm×3m", cat:"Drylining", price:{ "Toolstation":2.99,"Wickes":3.29,"Buildbase":3.09,"Travis Perkins":3.45 }, unit:"length", awin:"https://www.toolstation.com/u-track/p52900" },
  { id:9,  name:"Concrete Roof Tile Plain Smooth Grey", cat:"Roofing", price:{ "Toolstation":null,"Wickes":1.29,"Buildbase":1.19,"Travis Perkins":1.25 }, unit:"each", awin:"https://www.buildbase.co.uk/plain-concrete-roof-tile" },
  { id:10, name:"Marley Redland Roof Tile Clay Red", cat:"Roofing", price:{ "Toolstation":null,"Wickes":2.15,"Buildbase":1.99,"Travis Perkins":2.10 }, unit:"each", awin:"https://www.travisperkins.co.uk/roof-tiles" },
  { id:11, name:"Roofing Batten 25×50mm Treated 4.8m", cat:"Roofing", price:{ "Toolstation":3.29,"Wickes":3.69,"Buildbase":3.39,"Travis Perkins":3.85 }, unit:"length", awin:"https://www.wickes.co.uk/roofing-batten" },
  { id:12, name:"Roofing Underlay Felt Type 1F Roll 1×20m", cat:"Roofing", price:{ "Toolstation":18.99,"Wickes":21.50,"Buildbase":19.49,"Travis Perkins":22.10 }, unit:"roll", awin:"https://www.toolstation.com/roofing-felt/p26182" },
  { id:13, name:"Structural Timber C16 47×100mm 4.8m", cat:"Timber", price:{ "Toolstation":7.49,"Wickes":8.20,"Buildbase":7.85,"Travis Perkins":8.50 }, unit:"length", awin:"https://www.wickes.co.uk/structural-timber" },
  { id:14, name:"OSB3 Board 18mm 2440×1220mm", cat:"Timber", price:{ "Toolstation":null,"Wickes":18.50,"Buildbase":17.99,"Travis Perkins":18.25 }, unit:"sheet", awin:"https://www.wickes.co.uk/osb3-board" },
  { id:15, name:"CLS Timber 38×89mm 2.4m", cat:"Timber", price:{ "Toolstation":3.99,"Wickes":4.49,"Buildbase":4.19,"Travis Perkins":4.65 }, unit:"length", awin:"https://www.toolstation.com/cls-timber/p33748" },
  { id:16, name:"Rockwool RWA45 Slab 100mm 1200×600mm pk4", cat:"Insulation", price:{ "Toolstation":22.99,"Wickes":24.99,"Buildbase":23.49,"Travis Perkins":25.50 }, unit:"pack", awin:"https://www.toolstation.com/rockwool-rwa45/p67834" },
  { id:17, name:"Celotex GA4000 PIR Board 100mm 2400×1200mm", cat:"Insulation", price:{ "Toolstation":42.99,"Wickes":46.50,"Buildbase":43.99,"Travis Perkins":47.20 }, unit:"sheet", awin:"https://www.wickes.co.uk/celotex-ga4000" },
  { id:18, name:"Vapour Barrier DPM 300mu Roll 4×25m", cat:"Insulation", price:{ "Toolstation":28.99,"Wickes":31.50,"Buildbase":29.49,"Travis Perkins":32.10 }, unit:"roll", awin:"https://www.toolstation.com/dpm-300mu/p51234" },
  { id:19, name:"Thistle Multi-Finish Plaster 25kg", cat:"Plastering", price:{ "Toolstation":null,"Wickes":12.50,"Buildbase":11.99,"Travis Perkins":12.25 }, unit:"bag", awin:"https://www.travisperkins.co.uk/thistle-multi-finish" },
  { id:20, name:"Tile Adhesive Flexible C2TE Grey 20kg", cat:"Tiling", price:{ "Toolstation":14.99,"Wickes":16.49,"Buildbase":15.49,"Travis Perkins":16.99 }, unit:"bag", awin:"https://www.toolstation.com/flexible-tile-adhesive/p57291" },
];

const SUPPLIERS = ["Toolstation","Wickes","Buildbase","Travis Perkins"];
const SUPP_COLOR = { "Toolstation":"#D9340A","Wickes":"#005BBB","Buildbase":"#E8920A","Travis Perkins":"#00693E" };

const SYSTEM_PROMPT = `You are Matrio, an AI assistant for finding building materials in the UK.
Given the user's query:
1. Understand what they need (even if described informally in British English)
2. If the query includes dimensions/area, calculate quantity needed (add 10% wastage)
3. Select relevant products from the catalogue (max 8)
4. Return ONLY a JSON object:
{
  "project": "Short description (1 sentence)",
  "calculation": "Quantity calculation description or null",
  "tip": "One practical UK trade tip",
  "items": [{ "id": product_id, "qty": quantity, "note": "why this product" }]
}
Product catalogue:
${PRODUCTS.map(p=>`${p.id}. ${p.name} [${p.cat}] / ${p.unit}`).join("\n")}
Return ONLY valid JSON.`;

const EXAMPLES = [
  "Pitched roof 90m², concrete tiles",
  "Stud wall partition 12m², 2.4m high",
  "Insulate a loft 40m²",
  "Tile a bathroom, walls 18m²",
  "Timber frame extension 20m²",
];

const bestPrice = p => Math.min(...Object.values(p.price).filter(v=>v!==null));
const bestSupplier = p => Object.entries(p.price).filter(([,v])=>v!==null).sort((a,b)=>a[1]-b[1])[0][0];
const fmt = n => `£${n.toFixed(2)}`;

export default function Matrio() {
  const [step, setStep] = useState("search");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiMeta, setAiMeta] = useState(null);
  const [items, setItems] = useState([]);
  const [focused, setFocused] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => { setTimeout(()=>setReady(true), 100); }, []);

  async function handleSearch(q = query) {
    if (!q.trim()) return;
    setLoading(true); setItems([]); setAiMeta(null);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
          "anthropic-version":"2023-06-01",
          "anthropic-dangerous-direct-browser-access":"true",
        },
        body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1000, system:SYSTEM_PROMPT, messages:[{role:"user",content:q}] }),
      });
      const data = await res.json();
      const text = data.content?.map(i=>i.text||"").join("")||"";
      const parsed = JSON.parse(text.replace(/```json|```/g,"").trim());
      const enriched = (parsed.items||[]).map(it=>({ product:PRODUCTS.find(p=>p.id===it.id), qty:it.qty||1, note:it.note })).filter(i=>i.product);
      setAiMeta({ project:parsed.project, calculation:parsed.calculation, tip:parsed.tip });
      setItems(enriched);
      setStep("results");
    } catch { alert("Something went wrong. Please try again."); }
    finally { setLoading(false); }
  }

  const totalBest = items.reduce((s,{product:p,qty})=>s+bestPrice(p)*qty, 0);

  function getBySupplier() {
    const m = {};
    items.forEach(({product:p,qty})=>{
      const s = bestSupplier(p);
      if(!m[s]) m[s]={items:[],total:0};
      m[s].items.push({product:p,qty});
      m[s].total += bestPrice(p)*qty;
    });
    return m;
  }

  const reset = () => { setStep("search"); setItems([]); setAiMeta(null); setQuery(""); };

  return (
    <div style={{fontFamily:"'Outfit', system-ui, sans-serif", minHeight:"100vh", background:"#F8F7F5", color:"#18181B"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }

        :root {
          --ink: #18181B;
          --ink2: #52525B;
          --ink3: #A1A1AA;
          --ink4: #D4D4D8;
          --surface: #FFFFFF;
          --bg: #F8F7F5;
          --bg2: #F1F0ED;
          --border: rgba(0,0,0,0.08);
          --border2: rgba(0,0,0,0.12);
          --accent: #FF4F00;
          --accent-bg: #FFF4F0;
          --accent-mid: #FFE0D6;
          --green: #16A34A;
          --green-bg: #F0FDF4;
          --blue: #2563EB;
          --r: 12px;
          --r-lg: 18px;
        }

        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-thumb { background:var(--ink4); border-radius:8px; }

        @keyframes up { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes in { from{opacity:0} to{opacity:1} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes rowIn { from{opacity:0;transform:translateX(-6px)} to{opacity:1;transform:translateX(0)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.4} }

        /* NAV */
        .nav {
          position: sticky; top:0; z-index:200;
          height: 58px;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 36px;
          background: rgba(248,247,245,0.9);
          backdrop-filter: blur(16px) saturate(1.5);
          border-bottom: 1px solid var(--border);
        }
        .logo { display:flex; align-items:center; gap:9px; cursor:pointer; }
        .logo-m {
          width:30px; height:30px; border-radius:8px;
          background:var(--ink); display:flex; align-items:center; justify-content:center;
        }
        .logo-m svg { width:14px; height:14px; }
        .logo-text {
          font-family:'Instrument Serif',serif; font-size:20px; font-style:italic;
          font-weight:400; color:var(--ink); letter-spacing:-0.3px;
        }
        .nav-center { display:flex; align-items:center; gap:6px; }
        .supp-dot {
          display:flex; align-items:center; gap:5px;
          font-size:11px; font-weight:500; color:var(--ink3);
          padding:4px 10px; border-radius:20px;
          border: 1px solid var(--border);
          background: var(--surface);
        }
        .supp-dot span {
          width:6px; height:6px; border-radius:50%;
          animation: blink 2.5s ease infinite;
        }
        .nav-back {
          font-family:inherit; font-size:12px; font-weight:500;
          color:var(--ink2); background:transparent;
          border:1px solid var(--border2); border-radius:8px;
          padding:6px 14px; cursor:pointer; transition:all .15s;
        }
        .nav-back:hover { background:var(--surface); color:var(--ink); }

        /* HERO */
        .hero {
          padding: 72px 36px 52px;
          max-width: 780px;
          opacity:0; transform:translateY(18px);
          transition: opacity .5s ease, transform .5s ease;
        }
        .hero.on { opacity:1; transform:translateY(0); }

        .hero-tag {
          display:inline-flex; align-items:center; gap:7px;
          font-size:11px; font-weight:600; letter-spacing:.8px; text-transform:uppercase;
          color:var(--accent); background:var(--accent-bg); border:1px solid var(--accent-mid);
          padding:5px 13px; border-radius:20px; margin-bottom:22px;
        }
        .hero-tag-pulse {
          width:6px; height:6px; border-radius:50%; background:var(--accent);
          animation:blink 2s ease infinite;
        }

        .hero-h1 {
          font-family:'Instrument Serif',serif;
          font-size: clamp(42px,5.8vw,72px);
          font-weight:400; line-height:1.05; letter-spacing:-1.5px;
          color:var(--ink); margin-bottom:18px;
        }
        .hero-h1 em {
          font-style:italic; color:var(--accent);
        }

        .hero-sub {
          font-size:16px; color:var(--ink2); line-height:1.7;
          font-weight:400; max-width:500px; margin-bottom:36px;
        }

        /* SEARCH BOX */
        .search-outer { max-width:640px; }
        .search-box {
          display:flex; align-items:center;
          background:var(--surface);
          border:1.5px solid var(--border2);
          border-radius:var(--r-lg); padding:6px 6px 6px 18px; gap:8px;
          box-shadow: 0 2px 16px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04);
          transition: border-color .2s, box-shadow .2s;
        }
        .search-box.on {
          border-color:var(--accent);
          box-shadow: 0 0 0 4px rgba(255,79,0,.1), 0 4px 24px rgba(0,0,0,0.08);
        }
        .search-ico { font-size:18px; color:var(--ink4); flex-shrink:0; user-select:none; }
        .search-input {
          flex:1; border:none; outline:none; background:transparent;
          font-family:inherit; font-size:15px; color:var(--ink); font-weight:400;
          min-width:0;
        }
        .search-input::placeholder { color:var(--ink4); }
        .search-go {
          flex-shrink:0; padding:11px 22px;
          background:var(--ink); color:white; border:none;
          border-radius:12px; font-family:inherit;
          font-size:13px; font-weight:600; cursor:pointer; white-space:nowrap;
          transition:background .15s, transform .1s;
          letter-spacing:.1px;
        }
        .search-go:hover { background:#27272A; }
        .search-go:active { transform:scale(.97); }
        .search-go:disabled { background:var(--bg2); color:var(--ink4); cursor:not-allowed; }

        .chips { display:flex; flex-wrap:wrap; gap:7px; margin-top:13px; }
        .chip {
          font-family:inherit; font-size:12px; font-weight:500;
          color:var(--ink3); background:var(--surface);
          border:1px solid var(--border2); border-radius:20px;
          padding:6px 14px; cursor:pointer; transition:all .15s;
        }
        .chip:hover { border-color:var(--accent); color:var(--accent); background:var(--accent-bg); }

        /* HOW */
        .how { padding:0 36px 80px; max-width:860px; animation:in .6s ease .4s both; }
        .how-lbl { font-size:10px; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:var(--ink4); margin-bottom:18px; }
        .how-row { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; }
        .how-card {
          background:var(--surface); border:1px solid var(--border);
          border-radius:var(--r); padding:22px 20px;
          transition:box-shadow .2s, transform .2s;
        }
        .how-card:hover { box-shadow:0 4px 20px rgba(0,0,0,0.07); transform:translateY(-2px); }
        .how-n { font-family:'Instrument Serif',serif; font-size:32px; font-style:italic; color:var(--ink4); line-height:1; margin-bottom:10px; }
        .how-h { font-size:13px; font-weight:700; color:var(--ink); margin-bottom:5px; }
        .how-p { font-size:12px; color:var(--ink2); line-height:1.65; }

        /* LOADING */
        .loading { display:flex; flex-direction:column; align-items:center; gap:14px; padding:80px; animation:in .25s ease; }
        .ring {
          width:34px; height:34px; border:2.5px solid var(--ink4);
          border-top-color:var(--accent); border-radius:50%;
          animation:spin .65s linear infinite;
        }
        .loading-t { font-size:13px; color:var(--ink2); font-weight:500; }

        /* PAGE */
        .page { max-width:1060px; padding:28px 36px 80px; }

        /* INSIGHT */
        .insight {
          background:var(--surface); border:1px solid var(--border);
          border-radius:var(--r); padding:22px 24px; margin-bottom:24px;
          box-shadow:0 1px 4px rgba(0,0,0,.04);
          animation:up .35s ease;
          position:relative; overflow:hidden;
        }
        .insight::before {
          content:''; position:absolute; top:0; left:0; right:0; height:2px;
          background:linear-gradient(90deg,var(--accent),#FF8A50,var(--accent));
          background-size:200%;
          animation:shimmer 2.5s ease infinite;
        }
        @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        .insight-top { display:flex; align-items:center; gap:9px; margin-bottom:12px; }
        .insight-badge {
          font-size:10px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase;
          color:var(--accent); background:var(--accent-bg); border:1px solid var(--accent-mid);
          padding:3px 9px; border-radius:20px;
        }
        .insight-body { font-size:13px; color:var(--ink2); line-height:1.7; }
        .insight-body b { color:var(--ink); font-weight:600; }
        .insight-hr { height:1px; background:var(--border); margin:12px 0; }
        .insight-sec { font-size:10px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:var(--ink4); margin-bottom:5px; }

        /* TABLE */
        .tbl-top { display:flex; align-items:center; justify-content:space-between; margin-bottom:10px; }
        .tbl-title { font-size:15px; font-weight:700; color:var(--ink); }
        .tbl-badge {
          font-size:11px; font-weight:600; color:var(--ink3);
          background:var(--bg2); border:1px solid var(--border);
          padding:3px 10px; border-radius:20px;
        }

        .tbl {
          background:var(--surface); border:1px solid var(--border);
          border-radius:var(--r); overflow:hidden;
          box-shadow:0 1px 4px rgba(0,0,0,.04); margin-bottom:20px;
        }
        .tbl-hd {
          display:grid; grid-template-columns:1fr 106px 120px 110px 110px;
          padding:9px 20px; background:var(--bg2); border-bottom:1px solid var(--border);
          font-size:10px; font-weight:700; letter-spacing:1.2px; text-transform:uppercase; color:var(--ink4);
        }
        .row {
          display:grid; grid-template-columns:1fr 106px 120px 110px 110px;
          padding:13px 20px; border-bottom:1px solid var(--bg2);
          align-items:center; transition:background .1s;
          animation: rowIn .3s ease both;
        }
        .row:last-child { border-bottom:none; }
        .row:hover { background:var(--bg); }
        .row:nth-child(1){animation-delay:.04s}
        .row:nth-child(2){animation-delay:.08s}
        .row:nth-child(3){animation-delay:.12s}
        .row:nth-child(4){animation-delay:.16s}
        .row:nth-child(5){animation-delay:.20s}
        .row:nth-child(6){animation-delay:.24s}
        .row:nth-child(7){animation-delay:.28s}
        .row:nth-child(8){animation-delay:.32s}

        .row-name { font-size:13px; font-weight:600; color:var(--ink); line-height:1.3; margin-bottom:3px; }
        .row-meta { font-size:11px; color:var(--ink4); }

        .qc { display:flex; align-items:center; gap:7px; }
        .qb {
          width:25px; height:25px; border:1.5px solid var(--border2); border-radius:7px;
          background:var(--surface); cursor:pointer; display:flex; align-items:center; justify-content:center;
          font-size:16px; color:var(--ink2); transition:all .12s; font-family:inherit;
        }
        .qb:hover { border-color:var(--accent); color:var(--accent); background:var(--accent-bg); }
        .qv { font-size:14px; font-weight:700; min-width:20px; text-align:center; }
        .qu { font-size:10px; color:var(--ink4); margin-top:2px; }

        .pbest { font-size:15px; font-weight:700; color:var(--green); font-variant-numeric:tabular-nums; }
        .ptag {
          display:inline-block; margin-top:3px;
          font-size:10px; font-weight:600; color:var(--green);
          background:var(--green-bg); border-radius:4px; padding:1px 6px;
        }
        .pnorm { font-size:13px; color:var(--ink2); font-variant-numeric:tabular-nums; }
        .pna { color:var(--ink4); font-size:12px; }

        /* BOTTOM BAR */
        .bar {
          background:var(--ink); border-radius:var(--r);
          padding:20px 24px;
          display:flex; align-items:center; justify-content:space-between; gap:20px;
          box-shadow:0 8px 32px rgba(0,0,0,.15);
          margin-bottom:28px;
          animation:up .4s ease .15s both;
        }
        .bar-price-lbl { font-size:10px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:#71717A; margin-bottom:4px; }
        .bar-price {
          font-family:'Instrument Serif',serif; font-style:italic;
          font-size:36px; font-weight:400; color:white; letter-spacing:-1px; line-height:1;
        }
        .bar-price-sub { font-size:11px; color:#52525B; margin-top:4px; }
        .bar-stats { display:flex; gap:24px; }
        .bar-stat { text-align:center; }
        .bar-stat-v { font-size:22px; font-weight:700; color:white; }
        .bar-stat-l { font-size:10px; color:#71717A; font-weight:600; letter-spacing:.5px; text-transform:uppercase; margin-top:2px; }
        .bar-cta {
          padding:13px 26px; background:var(--accent); color:white;
          border:none; border-radius:11px; font-family:inherit;
          font-size:13px; font-weight:700; cursor:pointer; white-space:nowrap; flex-shrink:0;
          box-shadow:0 4px 16px rgba(255,79,0,.35);
          transition:background .15s, box-shadow .15s, transform .1s;
          letter-spacing:.2px;
        }
        .bar-cta:hover { background:#E04400; box-shadow:0 6px 22px rgba(255,79,0,.45); }
        .bar-cta:active { transform:scale(.97); }

        /* BUY PAGE */
        .buy-intro {
          background:var(--surface); border:1px solid var(--border);
          border-radius:var(--r); padding:18px 22px; margin-bottom:18px;
          animation:up .3s ease;
        }
        .buy-intro-h { font-size:15px; font-weight:700; margin-bottom:4px; }
        .buy-intro-p { font-size:13px; color:var(--ink2); line-height:1.6; }

        .sblock {
          background:var(--surface); border:1px solid var(--border);
          border-radius:var(--r); overflow:hidden; margin-bottom:10px;
          box-shadow:0 1px 4px rgba(0,0,0,.04);
          animation:up .35s ease both;
        }
        .sblock:nth-child(2){animation-delay:.05s}
        .sblock:nth-child(3){animation-delay:.1s}
        .sblock:nth-child(4){animation-delay:.15s}

        .shead {
          display:flex; align-items:center; justify-content:space-between;
          padding:13px 20px; background:var(--bg2); border-bottom:1px solid var(--border);
        }
        .sname-wrap { display:flex; align-items:center; gap:10px; }
        .sdot { width:9px; height:9px; border-radius:50%; flex-shrink:0; }
        .sname { font-size:14px; font-weight:700; color:var(--ink); }
        .scount { font-size:11px; color:var(--ink4); margin-top:1px; }
        .stotal { font-family:'Instrument Serif',serif; font-style:italic; font-size:20px; color:var(--ink); }

        .srow {
          display:flex; align-items:center; justify-content:space-between;
          padding:12px 20px; border-bottom:1px solid var(--bg2);
          transition:background .1s;
        }
        .srow:last-child { border-bottom:none; }
        .srow:hover { background:var(--bg); }
        .srow-name { font-size:13px; color:var(--ink); font-weight:400; }
        .srow-qty { font-size:11px; color:var(--ink4); margin-top:2px; }
        .srow-r { display:flex; align-items:center; gap:14px; flex-shrink:0; }
        .srow-price { font-size:14px; font-weight:700; color:var(--ink); font-variant-numeric:tabular-nums; }
        .buy-link {
          display:inline-flex; align-items:center; gap:4px;
          padding:6px 13px; border-radius:8px;
          font-family:inherit; font-size:12px; font-weight:600;
          cursor:pointer; text-decoration:none;
          border:1.5px solid var(--border2); color:var(--ink2); background:var(--surface);
          transition:all .15s;
        }
        .buy-link:hover { background:var(--ink); border-color:var(--ink); color:white; }

        /* SUMMARY CARDS */
        .sum-cards { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; margin-top:18px; animation:up .4s ease .2s both; }
        .sum-card { background:var(--surface); border:1px solid var(--border); border-radius:var(--r); padding:20px 22px; }
        .sum-card-lbl { font-size:10px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:var(--ink4); margin-bottom:8px; }
        .sum-card-v { font-family:'Instrument Serif',serif; font-size:28px; font-style:italic; color:var(--ink); line-height:1; }
        .sum-card-sub { font-size:11px; color:var(--ink3); margin-top:6px; }

        /* FOOTER */
        .footer {
          border-top:1px solid var(--border); padding:16px 36px;
          display:flex; align-items:center; justify-content:space-between;
          background:var(--surface);
        }
        .footer-l { display:flex; align-items:center; gap:10px; font-size:11px; color:var(--ink4); }
        .footer-sep { color:var(--ink4); opacity:.4; }
        .footer-r { font-size:11px; color:var(--ink4); }

        @media (max-width:700px) {
          .nav,.page,.hero,.how { padding-left:16px; padding-right:16px; }
          .tbl-hd { display:none; }
          .row { grid-template-columns:1fr; gap:8px; }
          .bar { flex-direction:column; align-items:stretch; }
          .bar-stats { justify-content:space-around; }
          .how-row,.sum-cards { grid-template-columns:1fr; }
        }
      `}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="logo" onClick={reset}>
          <div className="logo-m">
            <svg viewBox="0 0 14 14" fill="none">
              <polyline points="1,12 4,4 7,9.5 9.5,6 13,12" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="logo-text">matrio</span>
        </div>

        <div className="nav-center">
          {SUPPLIERS.map(s=>(
            <div key={s} className="supp-dot">
              <span style={{background:SUPP_COLOR[s]}}/>
              {s.split(" ")[0]}
            </div>
          ))}
        </div>

        {step !== "search" && <button className="nav-back" onClick={reset}>← New search</button>}
      </nav>

      {/* SEARCH */}
      {step === "search" && (<>
        <div className={`hero ${ready?"on":""}`} style={{paddingLeft:36}}>
          <div className="hero-tag">
            <span className="hero-tag-pulse"/>
            AI-powered · UK Building Materials
          </div>
          <h1 className="hero-h1">
            Tell us what<br/>you're <em>building.</em>
          </h1>
          <p className="hero-sub">
            Describe your project in plain English. We calculate what you need and compare prices across all major UK suppliers — instantly.
          </p>
          <div className="search-outer">
            <div className={`search-box ${focused?"on":""}`}>
              <span className="search-ico">⌕</span>
              <input className="search-input" value={query}
                onChange={e=>setQuery(e.target.value)}
                onKeyDown={e=>e.key==="Enter"&&handleSearch()}
                onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
                placeholder="e.g. pitched roof 90m², concrete tiles…"
              />
              <button className="search-go" onClick={()=>handleSearch()} disabled={loading||!query.trim()}>
                {loading ? "Searching…" : "Search →"}
              </button>
            </div>
            <div className="chips">
              {EXAMPLES.map((q,i)=>(
                <button key={i} className="chip" onClick={()=>{setQuery(q);handleSearch(q);}}>{q}</button>
              ))}
            </div>
          </div>
        </div>

        {loading && (
          <div className="loading">
            <div className="ring"/>
            <div className="loading-t">Analysing your project…</div>
          </div>
        )}

        <div className="how" style={{paddingLeft:36}}>
          <div className="how-lbl">How it works</div>
          <div className="how-row">
            {[
              {n:"01", h:"Describe your project", p:"No product codes needed. Tell us what you're building and we'll figure out what materials you need."},
              {n:"02", h:"AI calculates quantities", p:"We work out exact quantities with 10% wastage allowance, using UK trade knowledge and your dimensions."},
              {n:"03", h:"Compare & buy direct", p:"See prices from 4 suppliers side by side. Click through to buy at the best price, direct from the merchant."},
            ].map(c=>(
              <div key={c.n} className="how-card">
                <div className="how-n">{c.n}</div>
                <div className="how-h">{c.h}</div>
                <div className="how-p">{c.p}</div>
              </div>
            ))}
          </div>
        </div>
      </>)}

      {/* RESULTS */}
      {step === "results" && (
        <div className="page">
          {aiMeta && (
            <div className="insight">
              <div className="insight-top">
                <span className="insight-badge">AI Analysis</span>
              </div>
              <div className="insight-body"><b>Project: </b>{aiMeta.project}</div>
              {aiMeta.calculation && (<>
                <div className="insight-hr"/>
                <div className="insight-sec">Quantity Calculation</div>
                <div className="insight-body">{aiMeta.calculation}</div>
              </>)}
              {aiMeta.tip && (<>
                <div className="insight-hr"/>
                <div className="insight-sec">💡 Trade Tip</div>
                <div className="insight-body">{aiMeta.tip}</div>
              </>)}
            </div>
          )}

          <div className="tbl-top">
            <div className="tbl-title">Materials list</div>
            <div className="tbl-badge">{items.length} items</div>
          </div>

          <div className="tbl">
            <div className="tbl-hd">
              <div>Product</div><div>Quantity</div><div>Best price</div>
              <div>Toolstation</div><div>Wickes</div>
            </div>
            {items.map(({product:p, qty, note}, idx)=>{
              const best = bestPrice(p);
              const bs = bestSupplier(p);
              const ts = p.price["Toolstation"];
              const wk = p.price["Wickes"];
              return (
                <div key={p.id} className="row">
                  <div>
                    <div className="row-name">{p.name}</div>
                    <div className="row-meta">{p.cat}{note ? ` · ${note}` : ""}</div>
                  </div>
                  <div>
                    <div className="qc">
                      <button className="qb" onClick={()=>setItems(prev=>prev.map((it,i)=>i===idx?{...it,qty:Math.max(1,it.qty-1)}:it))}>−</button>
                      <span className="qv">{qty}</span>
                      <button className="qb" onClick={()=>setItems(prev=>prev.map((it,i)=>i===idx?{...it,qty:it.qty+1}:it))}>+</button>
                    </div>
                    <div className="qu">{p.unit}</div>
                  </div>
                  <div>
                    <div className="pbest">{fmt(best*qty)}</div>
                    <div className="ptag">{bs}</div>
                  </div>
                  <div>{ts ? <span className="pnorm">{fmt(ts*qty)}</span> : <span className="pna">—</span>}</div>
                  <div>{wk ? <span className="pnorm">{fmt(wk*qty)}</span> : <span className="pna">—</span>}</div>
                </div>
              );
            })}
          </div>

          <div className="bar">
            <div>
              <div className="bar-price-lbl">Best combined price</div>
              <div className="bar-price">{fmt(totalBest)}</div>
              <div className="bar-price-sub">buying each item from cheapest supplier</div>
            </div>
            <div className="bar-stats">
              <div className="bar-stat">
                <div className="bar-stat-v">{items.length}</div>
                <div className="bar-stat-l">Products</div>
              </div>
              <div className="bar-stat">
                <div className="bar-stat-v">{Object.keys(getBySupplier()).length}</div>
                <div className="bar-stat-l">Suppliers</div>
              </div>
              <div className="bar-stat">
                <div className="bar-stat-v">4</div>
                <div className="bar-stat-l">Compared</div>
              </div>
            </div>
            <button className="bar-cta" onClick={()=>setStep("buy")}>Where to buy →</button>
          </div>
        </div>
      )}

      {/* BUY */}
      {step === "buy" && (
        <div className="page">
          <div className="buy-intro">
            <div className="buy-intro-h">Where to buy</div>
            <div className="buy-intro-p">Your list split by supplier for the lowest total cost. Click through to buy directly from each merchant.</div>
          </div>

          {Object.entries(getBySupplier()).map(([supp, data])=>(
            <div key={supp} className="sblock">
              <div className="shead">
                <div className="sname-wrap">
                  <div className="sdot" style={{background:SUPP_COLOR[supp]||"#888"}}/>
                  <div>
                    <div className="sname">{supp}</div>
                    <div className="scount">{data.items.length} item{data.items.length!==1?"s":""}</div>
                  </div>
                </div>
                <div className="stotal">{fmt(data.total)}</div>
              </div>
              {data.items.map(({product:p,qty})=>(
                <div key={p.id} className="srow">
                  <div>
                    <div className="srow-name">{p.name}</div>
                    <div className="srow-qty">×{qty} {p.unit}</div>
                  </div>
                  <div className="srow-r">
                    <div className="srow-price">{fmt(bestPrice(p)*qty)}</div>
                    <a className="buy-link" href={p.awin} target="_blank" rel="noopener noreferrer">Buy at {supp} ↗</a>
                  </div>
                </div>
              ))}
            </div>
          ))}

          <div className="sum-cards">
            <div className="sum-card">
              <div className="sum-card-lbl">Total best price</div>
              <div className="sum-card-v">{fmt(totalBest)}</div>
              <div className="sum-card-sub">{items.length} items · {Object.keys(getBySupplier()).length} suppliers</div>
            </div>
            <div className="sum-card">
              <div className="sum-card-lbl">Potential saving</div>
              <div className="sum-card-v" style={{color:"var(--green)"}}>~15%</div>
              <div className="sum-card-sub">vs. buying all from one place</div>
            </div>
            <div className="sum-card">
              <div className="sum-card-lbl">Delivery</div>
              <div className="sum-card-v" style={{fontSize:20,paddingTop:6}}>Free 🚚</div>
              <div className="sum-card-sub">on most orders over £50</div>
            </div>
          </div>
        </div>
      )}

      <footer className="footer">
        <div className="footer-l">
          <span>matrio.co.uk</span>
          <span className="footer-sep">·</span>
          <span>Compare {SUPPLIERS.length} UK suppliers</span>
          <span className="footer-sep">·</span>
          <span>{PRODUCTS.length} products</span>
        </div>
        <div className="footer-r">© 2025 Matrio</div>
      </footer>
    </div>
  );
}
