import { useState, useEffect, useRef } from "react";

// ─── UK MOCK PRODUCT FEED ─────────────────────────────────────────────────────
// Prices in GBP from UK suppliers (Toolstation, Wickes, Buildbase, Travis Perkins, Jewson)
// In production: pulled from Awin/CJ affiliate feeds
const PRODUCTS = [
  { id:1,  name:"Galvanised Round Wire Nails 3.35×75mm 1kg", cat:"Fixings & Fasteners", price:{ "Toolstation":2.49,"Wickes":2.79,"Buildbase":2.55,"Travis Perkins":2.89 }, unit:"bag", params:{ diameter:"3.35mm", length:"75mm", finish:"galvanised", use:"general carpentry, roofing battens" }, awin:"https://www.awin1.com/cread.php?awinmid=TOOLSTATION&p=nails-galvanised" },
  { id:2,  name:"Aluminium Clout Nails 3.35×20mm 500g", cat:"Fixings & Fasteners", price:{ "Toolstation":3.19,"Wickes":3.49,"Buildbase":3.29,"Travis Perkins":3.65 }, unit:"bag", params:{ diameter:"3.35mm", length:"20mm", finish:"aluminium", use:"roof tiles, slates, felt" }, awin:"https://www.awin1.com/cread.php?awinmid=TOOLSTATION&p=clout-nails" },
  { id:3,  name:"Screws Countersunk TX 5×80mm Box 200", cat:"Fixings & Fasteners", price:{ "Toolstation":5.49,"Wickes":5.99,"Buildbase":5.69,"Travis Perkins":6.25 }, unit:"box", params:{ diameter:"5mm", length:"80mm", drive:"TX25", use:"decking, cladding, outdoor timber" }, awin:"https://www.awin1.com/cread.php?awinmid=WICKES&p=screws-5x80" },
  { id:4,  name:"Concrete Screw Anchor 7.5×132mm Box 50", cat:"Fixings & Fasteners", price:{ "Toolstation":14.99,"Wickes":16.49,"Buildbase":15.49,"Travis Perkins":17.20 }, unit:"box", params:{ diameter:"7.5mm", length:"132mm", use:"direct fixing to concrete, no rawlplug needed" }, awin:"https://www.awin1.com/cread.php?awinmid=TOOLSTATION&p=concrete-screws" },
  { id:5,  name:"Plasterboard 12.5mm 1200×2400mm", cat:"Drylining", price:{ "Toolstation":null,"Wickes":11.50,"Buildbase":10.99,"Travis Perkins":11.25 }, unit:"sheet", params:{ thickness:"12.5mm", size:"1200×2400mm", type:"standard grey", use:"stud walls, ceilings, dot & dab" }, awin:"https://www.awin1.com/cread.php?awinmid=WICKES&p=plasterboard-12mm" },
  { id:6,  name:"Moisture Resistant Plasterboard 12.5mm 1200×2400mm", cat:"Drylining", price:{ "Toolstation":null,"Wickes":14.50,"Buildbase":13.99,"Travis Perkins":14.20 }, unit:"sheet", params:{ thickness:"12.5mm", size:"1200×2400mm", type:"moisture resistant (green)", use:"bathrooms, kitchens, humid areas" }, awin:"https://www.awin1.com/cread.php?awinmid=WICKES&p=mr-plasterboard" },
  { id:7,  name:"Metal Stud C Stud 70mm×3.6m", cat:"Drylining", price:{ "Toolstation":3.49,"Wickes":3.89,"Buildbase":3.59,"Travis Perkins":3.95 }, unit:"length", params:{ width:"70mm", length:"3.6m", use:"vertical studs for 100mm partition walls" }, awin:"https://www.awin1.com/cread.php?awinmid=TOOLSTATION&p=c-stud-70mm" },
  { id:8,  name:"Metal Track U Track 70mm×3m", cat:"Drylining", price:{ "Toolstation":2.99,"Wickes":3.29,"Buildbase":3.09,"Travis Perkins":3.45 }, unit:"length", params:{ width:"70mm", length:"3m", use:"floor and ceiling tracks for partitions" }, awin:"https://www.awin1.com/cread.php?awinmid=TOOLSTATION&p=u-track-70mm" },
  { id:9,  name:"Concrete Roof Tile – Plain Tile Smooth Grey", cat:"Roofing", price:{ "Toolstation":null,"Wickes":1.29,"Buildbase":1.19,"Travis Perkins":1.25 }, unit:"each", params:{ pitch:"from 35°", coverage:"approx 60/m²", colour:"smooth grey", use:"pitched roofs, traditional look" }, awin:"https://www.awin1.com/cread.php?awinmid=BUILDBASE&p=plain-roof-tile" },
  { id:10, name:"Marley Redland Modern Roof Tile Clay Red", cat:"Roofing", price:{ "Toolstation":null,"Wickes":2.15,"Buildbase":1.99,"Travis Perkins":2.10 }, unit:"each", params:{ pitch:"from 17.5°", coverage:"approx 9/m²", colour:"clay red", use:"modern interlocking roof tile" }, awin:"https://www.awin1.com/cread.php?awinmid=TRAVIS&p=modern-roof-tile" },
  { id:11, name:"Roofing Batten 25×50mm Treated 4.8m", cat:"Roofing", price:{ "Toolstation":3.29,"Wickes":3.69,"Buildbase":3.39,"Travis Perkins":3.85 }, unit:"length", params:{ size:"25×50mm", length:"4.8m", treatment:"tanalised", use:"fixing roof tiles and slates" }, awin:"https://www.awin1.com/cread.php?awinmid=WICKES&p=roofing-batten" },
  { id:12, name:"Roofing Underlay Felt Type 1F – Roll 1×20m", cat:"Roofing", price:{ "Toolstation":18.99,"Wickes":21.50,"Buildbase":19.49,"Travis Perkins":22.10 }, unit:"roll", params:{ size:"1m × 20m", type:"Type 1F", use:"underlay beneath roof tiles and slates" }, awin:"https://www.awin1.com/cread.php?awinmid=TOOLSTATION&p=roofing-felt" },
  { id:13, name:"Structural Timber C16 47×100mm 4.8m", cat:"Timber", price:{ "Toolstation":7.49,"Wickes":8.20,"Buildbase":7.85,"Travis Perkins":8.50 }, unit:"length", params:{ size:"47×100mm", length:"4.8m", grade:"C16", use:"joists, rafters, studwork" }, awin:"https://www.awin1.com/cread.php?awinmid=WICKES&p=c16-47x100" },
  { id:14, name:"OSB3 Board 18mm 2440×1220mm", cat:"Timber", price:{ "Toolstation":null,"Wickes":18.50,"Buildbase":17.99,"Travis Perkins":18.25 }, unit:"sheet", params:{ thickness:"18mm", size:"2440×1220mm", grade:"OSB3", use:"flooring, roofing, wall sheathing" }, awin:"https://www.awin1.com/cread.php?awinmid=WICKES&p=osb3-18mm" },
  { id:15, name:"CLS Timber 38×89mm 2.4m (Stud Work)", cat:"Timber", price:{ "Toolstation":3.99,"Wickes":4.49,"Buildbase":4.19,"Travis Perkins":4.65 }, unit:"length", params:{ size:"38×89mm", length:"2.4m", use:"stud walls, framing, general construction" }, awin:"https://www.awin1.com/cread.php?awinmid=TOOLSTATION&p=cls-38x89" },
  { id:16, name:"Rockwool RWA45 Slab 100mm 1200×600mm pk4", cat:"Insulation", price:{ "Toolstation":22.99,"Wickes":24.99,"Buildbase":23.49,"Travis Perkins":25.50 }, unit:"pack", params:{ thickness:"100mm", size:"1200×600mm", λ:"0.035 W/mK", use:"pitched roof between rafters, floors, walls" }, awin:"https://www.awin1.com/cread.php?awinmid=TOOLSTATION&p=rockwool-100mm" },
  { id:17, name:"Celotex GA4000 PIR Board 100mm 2400×1200mm", cat:"Insulation", price:{ "Toolstation":42.99,"Wickes":46.50,"Buildbase":43.99,"Travis Perkins":47.20 }, unit:"sheet", params:{ thickness:"100mm", size:"2400×1200mm", λ:"0.022 W/mK", use:"floors, walls, flat roofs – high performance" }, awin:"https://www.awin1.com/cread.php?awinmid=WICKES&p=celotex-100mm" },
  { id:18, name:"Vapour Barrier DPM 300mu – Roll 4×25m", cat:"Insulation", price:{ "Toolstation":28.99,"Wickes":31.50,"Buildbase":29.49,"Travis Perkins":32.10 }, unit:"roll", params:{ gauge:"300mu", size:"4m × 25m", use:"damp proof membrane under floors, walls" }, awin:"https://www.awin1.com/cread.php?awinmid=TOOLSTATION&p=dpm-300mu" },
  { id:19, name:"Thistle Multi-Finish Plaster 25kg", cat:"Plastering", price:{ "Toolstation":null,"Wickes":12.50,"Buildbase":11.99,"Travis Perkins":12.25 }, unit:"bag", params:{ coverage:"approx 2.8 m²/bag at 2mm", use:"finish coat on browning or bonding plaster" }, awin:"https://www.awin1.com/cread.php?awinmid=TRAVIS&p=thistle-multifinish" },
  { id:20, name:"Tile Adhesive Flexible C2TE Grey 20kg", cat:"Tiling", price:{ "Toolstation":14.99,"Wickes":16.49,"Buildbase":15.49,"Travis Perkins":16.99 }, unit:"bag", params:{ class:"C2TE", coverage:"approx 4 m²/bag", use:"tiles on walls & floors, underfloor heating" }, awin:"https://www.awin1.com/cread.php?awinmid=WICKES&p=tile-adhesive-c2te" },
];

const SUPPLIERS = ["Toolstation","Wickes","Buildbase","Travis Perkins"];
const COMMISSION = 0.05; // 5% affiliate commission

const SYSTEM_PROMPT = `You are Matrio, an AI assistant for finding building materials in the UK.

Given the user's query:
1. Understand what they need (even if described informally in British English, e.g. "stud wall", "pitched roof", "dot and dab")
2. If the query includes dimensions/area, calculate the quantity needed (add 10% wastage)
3. Select relevant products from the catalogue (max 8)
4. Return ONLY a JSON object:

{
  "project": "Short description of what they need (1 sentence)",
  "calculation": "Description of quantity calculation if applicable, otherwise null",
  "tip": "One practical UK trade tip",
  "items": [
    { "id": product_id, "qty": quantity, "note": "why this product" }
  ]
}

Product catalogue (id, name, category, unit):
${PRODUCTS.map(p=>`${p.id}. ${p.name} [${p.cat}] / ${p.unit}`).join("\n")}

Return ONLY valid JSON. No text before or after.`;

const EXAMPLES = [
  "Tile a bathroom, walls 18m²",
  "Pitched roof 90m², concrete tiles",
  "Stud wall partition 12m², 2.4m high",
  "Insulate a loft 40m²",
  "Timber frame extension, floor area 20m²",
];

function bestPrice(p) {
  const vals = Object.values(p.price).filter(v => v !== null);
  return Math.min(...vals);
}
function bestSupplier(p) {
  return Object.entries(p.price).filter(([,v])=>v!==null).sort((a,b)=>a[1]-b[1])[0][0];
}
function fmt(n) {
  return `£${n.toFixed(2)}`;
}
function fmtComm(n) {
  return `£${(n * COMMISSION).toFixed(2)}`;
}

export default function Matrio() {
  const [step, setStep] = useState("search");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiMeta, setAiMeta] = useState(null);
  const [items, setItems] = useState([]);
  const [focused, setFocused] = useState(false);
  const [animIn, setAnimIn] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => { setTimeout(()=>setAnimIn(true), 60); }, []);

  async function handleSearch(q = query) {
    if (!q.trim()) return;
    setLoading(true); setItems([]); setAiMeta(null);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{
  "Content-Type":"application/json",
  "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
  "anthropic-version": "2023-06-01",
  "anthropic-dangerous-direct-browser-access": "true",
},
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514", max_tokens:1000,
          system: SYSTEM_PROMPT,
          messages:[{role:"user", content:q}],
        }),
      });
      const data = await res.json();
      const text = data.content?.map(i=>i.text||"").join("") || "";
      const parsed = JSON.parse(text.replace(/```json|```/g,"").trim());
      const enriched = (parsed.items||[]).map(it=>({
        product: PRODUCTS.find(p=>p.id===it.id),
        qty: it.qty||1, note: it.note,
      })).filter(i=>i.product);
      setAiMeta({project:parsed.project, calculation:parsed.calculation, tip:parsed.tip});
      setItems(enriched);
      setStep("results");
    } catch { alert("Something went wrong. Please try again."); }
    finally { setLoading(false); }
  }

  const totalBest = items.reduce((s,{product:p,qty})=>s+bestPrice(p)*qty, 0);
  const totalComm = totalBest * COMMISSION;

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

  function handleReset() {
    setStep("search"); setItems([]); setAiMeta(null); setQuery("");
  }

  return (
    <div style={{fontFamily:"'Syne', 'Trebuchet MS', sans-serif", background:"#F4F1EB", minHeight:"100vh", color:"#111"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:5px;}
        ::-webkit-scrollbar-thumb{background:#D0CAB8;border-radius:3px;}

        /* NAV */
        .m-nav{
          display:flex;align-items:center;justify-content:space-between;
          padding:0 48px;height:64px;
          background:#111;
          position:sticky;top:0;z-index:100;
        }
        .m-logo{display:flex;align-items:center;gap:12px;}
        .m-logo-mark{
          width:34px;height:34px;background:#C8F000;
          border-radius:50%;display:flex;align-items:center;justify-content:center;
          font-size:15px;font-weight:800;color:#111;letter-spacing:-1px;
        }
        .m-logo-name{
          font-size:22px;font-weight:800;color:#fff;letter-spacing:-0.5px;
        }
        .m-logo-name span{color:#C8F000;}
        .m-nav-tag{
          font-size:11px;color:#444;font-weight:600;letter-spacing:1.5px;
          text-transform:uppercase;
        }
        .m-nav-back{
          background:none;border:1px solid #333;color:#888;
          padding:7px 16px;border-radius:6px;font-family:inherit;
          font-size:12px;font-weight:600;cursor:pointer;transition:all 0.15s;
          letter-spacing:0.5px;
        }
        .m-nav-back:hover{border-color:#C8F000;color:#C8F000;}

        /* HERO */
        .m-hero{
          padding:80px 48px 56px;
          max-width:740px;
          opacity:0;transform:translateY(28px);
          transition:opacity 0.6s ease,transform 0.6s ease;
        }
        .m-hero.in{opacity:1;transform:translateY(0);}

        .m-pill{
          display:inline-flex;align-items:center;gap:7px;
          background:#C8F000;color:#111;
          padding:5px 14px;border-radius:20px;
          font-size:11px;font-weight:700;letter-spacing:1.5px;
          text-transform:uppercase;margin-bottom:28px;
        }
        .m-pill-dot{
          width:6px;height:6px;border-radius:50%;background:#111;
          animation:pdot 2s ease infinite;
        }
        @keyframes pdot{0%,100%{opacity:1}50%{opacity:0.3}}

        .m-h1{
          font-size:clamp(38px,5.5vw,64px);
          font-weight:800;line-height:1.0;letter-spacing:-2px;
          color:#111;margin-bottom:16px;
        }
        .m-h1 em{font-style:normal;color:#111;
          text-decoration:underline;text-decoration-color:#C8F000;
          text-underline-offset:6px;text-decoration-thickness:4px;
        }
        .m-sub{
          font-size:17px;color:#666;line-height:1.6;
          margin-bottom:40px;font-weight:400;max-width:560px;
        }

        /* SEARCH */
        .m-search-wrap{max-width:660px;}
        .m-search-box{
          display:flex;align-items:center;
          background:#fff;
          border:2px solid #E0D9CC;
          border-radius:12px;
          padding:8px 8px 8px 20px;
          gap:10px;
          transition:border-color 0.2s,box-shadow 0.2s;
          box-shadow:0 2px 12px rgba(0,0,0,0.06);
        }
        .m-search-box.focused{
          border-color:#C8F000;
          box-shadow:0 0 0 4px rgba(200,240,0,0.15),0 4px 20px rgba(0,0,0,0.08);
        }
        .m-search-ico{color:#ccc;font-size:20px;flex-shrink:0;}
        .m-search-input{
          flex:1;border:none;outline:none;background:transparent;
          font-family:inherit;font-size:15px;color:#111;font-weight:500;
        }
        .m-search-input::placeholder{color:#bbb;font-weight:400;}
        .m-search-btn{
          padding:12px 26px;background:#111;color:#C8F000;
          border:none;border-radius:8px;font-family:inherit;
          font-size:13px;font-weight:700;cursor:pointer;
          transition:background 0.15s,transform 0.1s;
          white-space:nowrap;flex-shrink:0;letter-spacing:0.5px;
        }
        .m-search-btn:hover{background:#222;}
        .m-search-btn:active{transform:scale(0.97);}
        .m-search-btn:disabled{background:#ddd;color:#aaa;cursor:not-allowed;}

        .m-chips{
          display:flex;flex-wrap:wrap;gap:8px;margin-top:14px;
        }
        .m-chip{
          padding:7px 16px;background:transparent;
          border:1px solid #D8D1C0;border-radius:20px;
          font-family:inherit;font-size:12px;color:#888;
          cursor:pointer;transition:all 0.15s;font-weight:500;
        }
        .m-chip:hover{border-color:#111;color:#111;background:rgba(0,0,0,0.03);}

        /* HOW IT WORKS */
        .m-how{
          padding:0 48px 80px;display:grid;
          grid-template-columns:repeat(3,1fr);gap:1px;
          background:#D8D1C0;max-width:900px;margin-top:32px;
        }
        .m-how-card{
          background:#F4F1EB;padding:28px 24px;
        }
        .m-how-n{
          font-size:40px;font-weight:800;color:#E8E0CC;
          line-height:1;margin-bottom:10px;
        }
        .m-how-h{font-size:14px;font-weight:700;color:#111;margin-bottom:6px;}
        .m-how-p{font-size:12px;color:#888;line-height:1.6;}

        /* LOADING */
        .m-loading{
          display:flex;flex-direction:column;align-items:center;
          gap:14px;padding:80px 48px;
        }
        .m-ring{
          width:36px;height:36px;border:3px solid #E0D9CC;
          border-top-color:#C8F000;border-radius:50%;
          animation:spin 0.7s linear infinite;
        }
        @keyframes spin{to{transform:rotate(360deg);}}
        .m-loading-txt{font-size:13px;color:#888;font-weight:600;letter-spacing:0.5px;}

        /* RESULTS PAGE */
        .m-page{max-width:1080px;padding:32px 48px 80px;}

        /* AI INSIGHT */
        .m-insight{
          background:#111;color:#fff;
          border-radius:14px;padding:24px 28px;margin-bottom:28px;
          position:relative;overflow:hidden;
        }
        .m-insight::after{
          content:'';position:absolute;
          top:-40px;right:-40px;
          width:160px;height:160px;
          background:radial-gradient(circle,rgba(200,240,0,0.12) 0%,transparent 70%);
          border-radius:50%;
        }
        .m-insight-head{
          display:flex;align-items:center;gap:10px;margin-bottom:14px;
        }
        .m-insight-icon{
          width:28px;height:28px;background:#C8F000;border-radius:8px;
          display:flex;align-items:center;justify-content:center;
          font-size:13px;color:#111;font-weight:800;flex-shrink:0;
        }
        .m-insight-label{
          font-size:10px;font-weight:700;letter-spacing:2px;
          text-transform:uppercase;color:#C8F000;
        }
        .m-insight-text{font-size:14px;color:#aaa;line-height:1.7;}
        .m-insight-text strong{color:#fff;}
        .m-insight-div{height:1px;background:#222;margin:14px 0;}
        .m-insight-sec{
          font-size:10px;font-weight:700;letter-spacing:2px;
          text-transform:uppercase;color:#444;margin-bottom:5px;
        }

        /* TABLE */
        .m-tbl-header{
          display:flex;align-items:center;justify-content:space-between;
          margin-bottom:14px;
        }
        .m-tbl-title{
          font-size:14px;font-weight:700;letter-spacing:-0.2px;color:#111;
        }
        .m-tbl-count{font-size:12px;color:#888;font-weight:500;}

        .m-table{
          background:#fff;border:1px solid #E0D9CC;
          border-radius:12px;overflow:hidden;margin-bottom:24px;
        }
        .m-table-head{
          display:grid;
          grid-template-columns:1fr 90px 100px 110px 110px;
          padding:10px 20px;background:#F4F1EB;
          border-bottom:1px solid #E0D9CC;
          font-size:10px;font-weight:700;letter-spacing:1.2px;
          text-transform:uppercase;color:#AAA;
        }
        .m-row{
          display:grid;
          grid-template-columns:1fr 90px 100px 110px 110px;
          padding:14px 20px;border-bottom:1px solid #F4F1EB;
          align-items:center;transition:background 0.1s;
        }
        .m-row:last-child{border-bottom:none;}
        .m-row:hover{background:#FAFAF7;}
        .m-row-name{font-size:13px;font-weight:700;color:#111;margin-bottom:2px;}
        .m-row-cat{font-size:11px;color:#AAA;}
        .m-qty-ctrl{display:flex;align-items:center;gap:8px;}
        .m-qty-btn{
          width:24px;height:24px;border:1px solid #E0D9CC;border-radius:6px;
          background:#fff;cursor:pointer;font-size:14px;display:flex;
          align-items:center;justify-content:center;transition:all 0.1s;
          color:#666;
        }
        .m-qty-btn:hover{border-color:#C8F000;background:#f8ffd0;}
        .m-qty-val{font-size:14px;font-weight:700;min-width:20px;text-align:center;}
        .m-qty-unit{font-size:10px;color:#AAA;margin-top:2px;}
        .m-price-best{font-size:14px;font-weight:800;color:#2A7A2A;}
        .m-price-norm{font-size:13px;color:#666;font-weight:500;}
        .m-price-na{font-size:12px;color:#CCC;}

        /* RESULTS SUMMARY BAR */
        .m-bar{
          background:#111;border-radius:12px;padding:20px 24px;
          display:flex;align-items:center;justify-content:space-between;
          margin-bottom:24px;
        }
        .m-bar-left{}
        .m-bar-label{font-size:10px;color:#555;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:3px;}
        .m-bar-price{font-size:30px;font-weight:800;color:#C8F000;letter-spacing:-1px;line-height:1;}
        .m-bar-sub{font-size:11px;color:#444;margin-top:3px;font-weight:500;}
        .m-bar-comm{
          text-align:right;
        }
        .m-bar-comm-label{font-size:10px;color:#444;font-weight:600;letter-spacing:1px;text-transform:uppercase;margin-bottom:3px;}
        .m-bar-comm-val{font-size:22px;font-weight:800;color:#7ABF00;letter-spacing:-0.5px;}
        .m-bar-comm-sub{font-size:11px;color:#444;margin-top:3px;}
        .m-bar-btn{
          padding:14px 28px;background:#C8F000;color:#111;
          border:none;border-radius:9px;font-family:inherit;
          font-size:14px;font-weight:800;cursor:pointer;
          transition:background 0.15s,transform 0.1s;
          white-space:nowrap;
        }
        .m-bar-btn:hover{background:#DDFF00;}
        .m-bar-btn:active{transform:scale(0.97);}

        /* AFFILIATE PAGE */
        .m-aff-intro{
          background:#fff;border:1px solid #E0D9CC;border-radius:12px;
          padding:20px 24px;margin-bottom:20px;
        }
        .m-aff-intro-title{font-size:14px;font-weight:700;color:#111;margin-bottom:4px;}
        .m-aff-intro-sub{font-size:13px;color:#888;line-height:1.6;}

        .m-supp-block{
          background:#fff;border:1px solid #E0D9CC;border-radius:12px;
          overflow:hidden;margin-bottom:10px;
        }
        .m-supp-head{
          display:flex;align-items:center;justify-content:space-between;
          padding:14px 20px;background:#F4F1EB;border-bottom:1px solid #E0D9CC;
        }
        .m-supp-name{font-size:14px;font-weight:800;color:#111;}
        .m-supp-right{display:flex;align-items:center;gap:12px;}
        .m-supp-total{font-size:16px;font-weight:800;color:#111;}
        .m-supp-comm-badge{
          background:#111;color:#C8F000;
          padding:4px 10px;border-radius:6px;
          font-size:11px;font-weight:700;
        }
        .m-supp-row{
          display:flex;justify-content:space-between;align-items:center;
          padding:12px 20px;border-bottom:1px solid #F4F1EB;
        }
        .m-supp-row:last-child{border-bottom:none;}
        .m-supp-row-name{font-size:13px;color:#444;font-weight:500;}
        .m-supp-row-right{display:flex;align-items:center;gap:14px;}
        .m-supp-row-price{font-size:13px;font-weight:700;color:#111;}
        .m-aff-link{
          display:inline-flex;align-items:center;gap:5px;
          padding:5px 12px;background:#F4F1EB;
          border:1px solid #E0D9CC;border-radius:6px;
          font-family:inherit;font-size:11px;font-weight:700;
          color:#666;cursor:pointer;transition:all 0.15s;
          text-decoration:none;
        }
        .m-aff-link:hover{background:#C8F000;border-color:#C8F000;color:#111;}

        /* EARNINGS SUMMARY */
        .m-earnings{
          background:linear-gradient(135deg,#111 0%,#1a1a1a 100%);
          border-radius:14px;padding:24px 28px;margin-top:20px;
          display:grid;grid-template-columns:repeat(3,1fr);gap:1px;
          background-color:#C8F000;
          overflow:hidden;
        }
        .m-earn-cell{
          background:#111;padding:20px 24px;
        }
        .m-earn-label{font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#555;margin-bottom:6px;}
        .m-earn-val{font-size:26px;font-weight:800;color:#C8F000;letter-spacing:-0.5px;}
        .m-earn-sub{font-size:11px;color:#444;margin-top:3px;}

        /* EMPTY */
        .m-empty{padding:80px 48px;text-align:center;}
        .m-empty-icon{font-size:52px;margin-bottom:16px;opacity:0.3;}
        .m-empty-h{font-size:22px;font-weight:800;color:#CCC;margin-bottom:6px;letter-spacing:-0.5px;}
        .m-empty-p{font-size:13px;color:#AAA;}

        /* FOOTER */
        .m-footer{
          background:#111;padding:18px 48px;
          display:flex;align-items:center;justify-content:space-between;
        }
        .m-footer-left{font-size:11px;color:#444;display:flex;align-items:center;gap:10px;}
        .m-footer-dot{width:3px;height:3px;border-radius:50%;background:#333;}
        .m-footer-right{font-size:11px;color:#333;font-weight:600;}

        @media(max-width:680px){
          .m-nav,.m-page,.m-hero,.m-how{padding-left:16px;padding-right:16px;}
          .m-table-head{display:none;}
          .m-row{grid-template-columns:1fr;gap:4px;}
          .m-bar{flex-direction:column;gap:16px;align-items:stretch;}
          .m-earnings{grid-template-columns:1fr;}
          .m-how{grid-template-columns:1fr;}
        }
      `}</style>

      {/* NAV */}
      <nav className="m-nav">
        <div className="m-logo" onClick={handleReset} style={{cursor:"pointer"}}>
          <div className="m-logo-mark">M</div>
          <div className="m-logo-name">mat<span>rio</span></div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:16}}>
          <div className="m-nav-tag">UK Building Materials · AI Search</div>
          {step !== "search" && (
            <button className="m-nav-back" onClick={handleReset}>← New search</button>
          )}
        </div>
      </nav>

      {/* ── SEARCH ── */}
      {step === "search" && (
        <>
          <div className={`m-hero ${animIn?"in":""}`} style={{paddingLeft:48}}>
            <div className="m-pill">
              <span className="m-pill-dot"/>
              AI-powered materials finder
            </div>
            <h1 className="m-h1">
              Tell us what<br/>
              you're <em>building</em>.
            </h1>
            <p className="m-sub">
              Matrio finds the right materials, calculates quantities, and compares prices across Toolstation, Wickes, Buildbase and Travis Perkins — instantly.
            </p>

            <div className="m-search-wrap">
              <div className={`m-search-box ${focused?"focused":""}`}>
                <span className="m-search-ico">⌕</span>
                <input
                  ref={inputRef}
                  className="m-search-input"
                  value={query}
                  onChange={e=>setQuery(e.target.value)}
                  onKeyDown={e=>e.key==="Enter"&&handleSearch()}
                  onFocus={()=>setFocused(true)}
                  onBlur={()=>setFocused(false)}
                  placeholder="e.g. pitched roof 80m², concrete tiles…"
                />
                <button className="m-search-btn"
                  onClick={()=>handleSearch()}
                  disabled={loading||!query.trim()}>
                  {loading ? "Searching…" : "Find materials →"}
                </button>
              </div>
              <div className="m-chips">
                {EXAMPLES.map((q,i)=>(
                  <button key={i} className="m-chip"
                    onClick={()=>{setQuery(q);handleSearch(q);}}>
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {loading && (
            <div className="m-loading">
              <div className="m-ring"/>
              <div className="m-loading-txt">AI is analysing your project…</div>
            </div>
          )}

          <div className="m-how">
            {[
              {n:"01", h:"Describe your project", p:"No need for catalogue names. Just say what you're building and how big it is."},
              {n:"02", h:"AI calculates & finds", p:"Matrio picks the right products, works out quantities with 10% wastage, and compares live prices."},
              {n:"03", h:"Click through & buy", p:"Go straight to the supplier with the best price via our affiliate links — we earn a small commission."},
            ].map(c=>(
              <div key={c.n} className="m-how-card">
                <div className="m-how-n">{c.n}</div>
                <div className="m-how-h">{c.h}</div>
                <div className="m-how-p">{c.p}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ── RESULTS ── */}
      {step === "results" && (
        <div className="m-page">
          {aiMeta && (
            <div className="m-insight">
              <div className="m-insight-head">
                <div className="m-insight-icon">M</div>
                <div className="m-insight-label">Matrio AI Analysis</div>
              </div>
              <div className="m-insight-text">
                <strong>Project:</strong> {aiMeta.project}
              </div>
              {aiMeta.calculation && (<>
                <div className="m-insight-div"/>
                <div className="m-insight-sec">Quantity Calculation</div>
                <div className="m-insight-text">{aiMeta.calculation}</div>
              </>)}
              {aiMeta.tip && (<>
                <div className="m-insight-div"/>
                <div className="m-insight-sec">💡 Trade Tip</div>
                <div className="m-insight-text">{aiMeta.tip}</div>
              </>)}
            </div>
          )}

          <div className="m-tbl-header">
            <div className="m-tbl-title">Materials List</div>
            <div className="m-tbl-count">{items.length} items</div>
          </div>

          <div className="m-table">
            <div className="m-table-head">
              <div>Product</div>
              <div>Qty</div>
              <div>Best price</div>
              <div>Toolstation</div>
              <div>Wickes</div>
            </div>
            {items.map(({product:p, qty, note}, idx)=>{
              const best = bestPrice(p);
              const ts = p.price["Toolstation"];
              const wk = p.price["Wickes"];
              return (
                <div key={p.id} className="m-row">
                  <div>
                    <div className="m-row-name">{p.name}</div>
                    <div className="m-row-cat">{p.cat}{note?` · ${note}`:""}</div>
                  </div>
                  <div>
                    <div className="m-qty-ctrl">
                      <button className="m-qty-btn" onClick={()=>setItems(prev=>prev.map((it,i)=>i===idx?{...it,qty:Math.max(1,it.qty-1)}:it))}>−</button>
                      <span className="m-qty-val">{qty}</span>
                      <button className="m-qty-btn" onClick={()=>setItems(prev=>prev.map((it,i)=>i===idx?{...it,qty:it.qty+1}:it))}>+</button>
                    </div>
                    <div className="m-qty-unit">{p.unit}</div>
                  </div>
                  <div className="m-price-best">{fmt(best*qty)}</div>
                  <div>{ts ? <span className="m-price-norm">{fmt(ts*qty)}</span> : <span className="m-price-na">N/A</span>}</div>
                  <div>{wk ? <span className="m-price-norm">{fmt(wk*qty)}</span> : <span className="m-price-na">N/A</span>}</div>
                </div>
              );
            })}
          </div>

          <div className="m-bar">
            <div className="m-bar-left">
              <div className="m-bar-label">Best combined price</div>
              <div className="m-bar-price">{fmt(totalBest)}</div>
              <div className="m-bar-sub">buying each item from cheapest supplier</div>
            </div>
            <div className="m-bar-comm">
              <div className="m-bar-comm-label">Your commission</div>
              <div className="m-bar-comm-val">{fmt(totalComm)}</div>
              <div className="m-bar-sub">est. at 5% via Awin</div>
            </div>
            <button className="m-bar-btn" onClick={()=>setStep("affiliate")}>
              View affiliate links →
            </button>
          </div>
        </div>
      )}

      {/* ── AFFILIATE LINKS ── */}
      {step === "affiliate" && (
        <div className="m-page">
          <div className="m-aff-intro">
            <div className="m-aff-intro-title">Affiliate links by supplier</div>
            <div className="m-aff-intro-sub">
              Each link below is tracked via Awin. When a customer clicks and purchases within 30 days, you earn ~5% commission. Links are grouped by supplier so the customer only visits one site per order.
            </div>
          </div>

          {Object.entries(getBySupplier()).map(([supp, data])=>{
            const suppComm = data.total * COMMISSION;
            return (
              <div key={supp} className="m-supp-block">
                <div className="m-supp-head">
                  <div className="m-supp-name">🏪 {supp}</div>
                  <div className="m-supp-right">
                    <div className="m-supp-total">{fmt(data.total)}</div>
                    <div className="m-supp-comm-badge">+{fmt(suppComm)} commission</div>
                  </div>
                </div>
                {data.items.map(({product:p, qty})=>(
                  <div key={p.id} className="m-supp-row">
                    <div>
                      <div className="m-supp-row-name">{p.name} <strong>×{qty}</strong></div>
                    </div>
                    <div className="m-supp-row-right">
                      <div className="m-supp-row-price">{fmt(bestPrice(p)*qty)}</div>
                      <a className="m-aff-link" href={p.awin} target="_blank" rel="noopener noreferrer">
                        View on {supp} ↗
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}

          <div className="m-earnings">
            <div className="m-earn-cell">
              <div className="m-earn-label">Total order value</div>
              <div className="m-earn-val">{fmt(totalBest)}</div>
              <div className="m-earn-sub">{items.length} items · {Object.keys(getBySupplier()).length} suppliers</div>
            </div>
            <div className="m-earn-cell">
              <div className="m-earn-label">Your commission (5%)</div>
              <div className="m-earn-val">{fmt(totalComm)}</div>
              <div className="m-earn-sub">paid monthly via Awin</div>
            </div>
            <div className="m-earn-cell">
              <div className="m-earn-label">Monthly est. (×200 orders)</div>
              <div className="m-earn-val">{fmt(totalComm * 200)}</div>
              <div className="m-earn-sub">at current basket size</div>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="m-footer">
        <div className="m-footer-left">
          <span>matrio.co.uk</span>
          <span className="m-footer-dot"/>
          <span>Demo · {PRODUCTS.length} products · {SUPPLIERS.length} suppliers</span>
          <span className="m-footer-dot"/>
          <span>Affiliate via Awin · 5% commission</span>
        </div>
        <div className="m-footer-right">© 2025 Matrio</div>
      </footer>
    </div>
  );
}
