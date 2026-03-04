import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html, body, #root {
    height: 100%;
    width: 100%;
  }

  body {
    background: #0a0a0f;
    font-family: 'DM Sans', sans-serif;
  }

  .app {
    min-height: 100%;
    width: 100%;
    background: #0a0a0f;
    position: relative;
    overflow-x: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 48px 24px;
  }

  .bg-orbs {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
  }

  .orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.25;
    animation: float 8s ease-in-out infinite;
  }

  .orb-1 { width: 500px; height: 500px; background: #f97316; top: -150px; left: -100px; animation-delay: 0s; }
  .orb-2 { width: 400px; height: 400px; background: #8b5cf6; top: 30%; right: -100px; animation-delay: -3s; }
  .orb-3 { width: 350px; height: 350px; background: #06b6d4; bottom: -100px; left: 30%; animation-delay: -5s; }

  @keyframes float {
    0%, 100% { transform: translateY(0px) scale(1); }
    50% { transform: translateY(-30px) scale(1.05); }
  }

  .container {
    position: relative;
    z-index: 1;
    max-width: 780px;
    width: 100%;
  }

  .header {
    text-align: center;
    margin-bottom: 48px;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(249,115,22,0.15);
    border: 1px solid rgba(249,115,22,0.3);
    color: #fb923c;
    padding: 6px 16px;
    border-radius: 100px;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 20px;
  }

  .badge-dot {
    width: 6px; height: 6px;
    background: #f97316;
    border-radius: 50%;
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.4); }
  }

  h1 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2.2rem, 5vw, 3.4rem);
    font-weight: 800;
    line-height: 1.1;
    color: #f1f0ee;
    letter-spacing: -0.02em;
    margin-bottom: 14px;
  }

  h1 span {
    background: linear-gradient(135deg, #f97316, #ec4899, #8b5cf6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .subtitle {
    color: #6b7280;
    font-size: 1rem;
    font-weight: 300;
    max-width: 420px;
    margin: 0 auto;
    line-height: 1.6;
  }

  .card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 24px;
    padding: 36px;
    backdrop-filter: blur(20px);
    margin-bottom: 20px;
  }

  .section-title {
    font-family: 'Syne', sans-serif;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #4b5563;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .section-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,0.06);
  }

  .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 7px;
  }

  label {
    font-size: 0.78rem;
    font-weight: 500;
    color: #9ca3af;
    letter-spacing: 0.02em;
  }

  input, select {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.09);
    color: #f1f0ee;
    padding: 11px 14px;
    border-radius: 10px;
    font-size: 0.9rem;
    font-family: 'DM Sans', sans-serif;
    transition: all 0.2s;
    outline: none;
    width: 100%;
    appearance: none;
  }

  input::placeholder { color: #374151; }

  input:focus, select:focus {
    border-color: rgba(249,115,22,0.5);
    background: rgba(249,115,22,0.06);
    box-shadow: 0 0 0 3px rgba(249,115,22,0.1);
  }

  select option { background: #1a1a2e; color: #f1f0ee; }

  .icon-field { position: relative; }

  .icon-field .field-icon {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #374151;
    font-size: 13px;
    pointer-events: none;
  }

  .icon-field input, .icon-field select { padding-right: 36px; }

  .toggle-group { display: flex; gap: 8px; }

  .toggle-btn {
    flex: 1;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.09);
    background: rgba(255,255,255,0.04);
    color: #6b7280;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .toggle-btn.active {
    background: rgba(249,115,22,0.15);
    border-color: rgba(249,115,22,0.4);
    color: #fb923c;
    font-weight: 500;
  }

  .predict-btn {
    width: 100%;
    padding: 16px;
    background: linear-gradient(135deg, #f97316, #ec4899);
    color: white;
    border: none;
    border-radius: 14px;
    font-family: 'Syne', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    cursor: pointer;
    transition: all 0.25s;
    position: relative;
    overflow: hidden;
  }

  .predict-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #fb923c, #f472b6);
    opacity: 0;
    transition: opacity 0.25s;
  }

  .predict-btn:hover::before { opacity: 1; }
  .predict-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(249,115,22,0.35); }
  .predict-btn:active { transform: translateY(0); }
  .predict-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

  .btn-text { position: relative; z-index: 1; }

  .spinner {
    display: inline-block;
    width: 16px; height: 16px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    margin-right: 8px;
    vertical-align: middle;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  .result-card {
    border-radius: 24px;
    padding: 36px;
    animation: slideUp 0.4s cubic-bezier(0.16,1,0.3,1);
    margin-top: 20px;
  }

  .result-churn {
    background: linear-gradient(135deg, rgba(239,68,68,0.12), rgba(236,72,153,0.08));
    border: 1px solid rgba(239,68,68,0.25);
  }

  .result-stay {
    background: linear-gradient(135deg, rgba(16,185,129,0.12), rgba(6,182,212,0.08));
    border: 1px solid rgba(16,185,129,0.25);
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .result-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 28px;
  }

  .result-icon {
    width: 56px; height: 56px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
    flex-shrink: 0;
  }

  .result-churn .result-icon { background: rgba(239,68,68,0.2); }
  .result-stay .result-icon { background: rgba(16,185,129,0.2); }

  .result-title {
    font-family: 'Syne', sans-serif;
    font-size: 1.5rem;
    font-weight: 800;
    color: #f1f0ee;
    letter-spacing: -0.01em;
  }

  .result-subtitle { color: #6b7280; font-size: 0.875rem; margin-top: 2px; }

  .prob-bar-wrap { margin-bottom: 24px; }

  .prob-label {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
    font-size: 0.8rem;
    color: #6b7280;
  }

  .prob-pct {
    font-family: 'Syne', sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: #f1f0ee;
  }

  .prob-track {
    height: 8px;
    background: rgba(255,255,255,0.07);
    border-radius: 100px;
    overflow: hidden;
  }

  .prob-fill {
    height: 100%;
    border-radius: 100px;
    transition: width 1s cubic-bezier(0.16,1,0.3,1);
  }

  .result-churn .prob-fill { background: linear-gradient(90deg, #ef4444, #ec4899); }
  .result-stay .prob-fill { background: linear-gradient(90deg, #10b981, #06b6d4); }

  .risk-chips { display: flex; gap: 8px; flex-wrap: wrap; }

  .chip {
    padding: 5px 12px;
    border-radius: 100px;
    font-size: 0.75rem;
    font-weight: 500;
  }

  .result-churn .chip { background: rgba(239,68,68,0.15); color: #f87171; border: 1px solid rgba(239,68,68,0.2); }
  .result-stay .chip { background: rgba(16,185,129,0.15); color: #34d399; border: 1px solid rgba(16,185,129,0.2); }

  .error-box {
    background: rgba(239,68,68,0.1);
    border: 1px solid rgba(239,68,68,0.2);
    color: #f87171;
    padding: 14px 18px;
    border-radius: 12px;
    font-size: 0.875rem;
    margin-top: 16px;
  }

  @media (max-width: 560px) {
    .grid-2 { grid-template-columns: 1fr; }
    .card { padding: 24px; }
    .app { padding: 32px 16px; }
  }
`;

const NUMERIC = [
  { name: "credit_score",     label: "Credit Score",    placeholder: "350–850",    icon: "★" },
  { name: "age",              label: "Age",             placeholder: "18–92",      icon: "♦" },
  { name: "tenure",           label: "Tenure (years)",  placeholder: "0–10",       icon: "◆" },
  { name: "balance",          label: "Balance ($)",     placeholder: "e.g. 50000", icon: "$" },
  { name: "products_number",  label: "No. of Products", placeholder: "1–4",        icon: "#" },
  { name: "estimated_salary", label: "Est. Salary ($)", placeholder: "e.g. 60000", icon: "$" },
];

const COUNTRIES = [
  "France", "Germany", "Spain", "United Kingdom", "Italy",
  "Portugal", "Netherlands", "Belgium", "Switzerland", "Austria",
  "Poland", "Sweden", "Norway", "Denmark", "United States",
  "Canada", "Australia", "India", "Brazil", "Mexico",
  "Japan", "China", "Singapore", "South Africa", "UAE",
];

export default function App() {
  const [form, setForm] = useState({
    credit_score: "", age: "", tenure: "", balance: "",
    products_number: "", estimated_salary: "",
    country: "France", gender: "Male", credit_card: "1", active_member: "1",
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    setLoading(true); setError(null); setResult(null);
    try {
      const payload = {
        ...form,
        credit_score: Number(form.credit_score),
        age: Number(form.age),
        tenure: Number(form.tenure),
        balance: Number(form.balance),
        products_number: Number(form.products_number),
        estimated_salary: Number(form.estimated_salary),
        credit_card: Number(form.credit_card),
        active_member: Number(form.active_member),
      };
      const res = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const pct = result ? Math.round(result.probability * 100) : 0;
  const isChurn = result?.churn === 1;

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className="bg-orbs">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
        </div>

        <div className="container">
          <div className="header">
            <div className="badge"><span className="badge-dot" />ML-Powered Prediction</div>
            <h1>Will Your Customer<br /><span>Stay or Leave?</span></h1>
            <p className="subtitle">Enter customer details below to predict churn probability using Gradient Boosting.</p>
          </div>

          <div className="card">
            <div className="section-title">Financial & Demographic</div>
            <div className="grid-2">
              {NUMERIC.map(f => (
                <div className="field icon-field" key={f.name}>
                  <label>{f.label}</label>
                  <input
                    type="number" placeholder={f.placeholder}
                    value={form[f.name]}
                    onChange={e => set(f.name, e.target.value)}
                  />
                  <span className="field-icon">{f.icon}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="section-title">Account Details</div>
            <div className="grid-2">
              <div className="field icon-field">
                <label>Country</label>
                <select value={form.country} onChange={e => set("country", e.target.value)}>
                  {COUNTRIES.map(o => <option key={o}>{o}</option>)}
                </select>
                <span className="field-icon">▾</span>
              </div>
              <div className="field icon-field">
                <label>Gender</label>
                <select value={form.gender} onChange={e => set("gender", e.target.value)}>
                  {["Male", "Female", "Non-binary", "Prefer not to say"].map(o => <option key={o}>{o}</option>)}
                </select>
                <span className="field-icon">▾</span>
              </div>
              <div className="field">
                <label>Has Credit Card</label>
                <div className="toggle-group">
                  {[["1","Yes ✓"],["0","No ✗"]].map(([v,l]) => (
                    <button key={v} className={`toggle-btn ${form.credit_card === v ? "active" : ""}`}
                      onClick={() => set("credit_card", v)}>{l}</button>
                  ))}
                </div>
              </div>
              <div className="field">
                <label>Active Member</label>
                <div className="toggle-group">
                  {[["1","Active ✓"],["0","Inactive ✗"]].map(([v,l]) => (
                    <button key={v} className={`toggle-btn ${form.active_member === v ? "active" : ""}`}
                      onClick={() => set("active_member", v)}>{l}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button className="predict-btn" onClick={handleSubmit} disabled={loading}>
            <span className="btn-text">
              {loading ? <><span className="spinner" />Analysing...</> : "⚡ Predict Churn"}
            </span>
          </button>

          {error && <div className="error-box">⚠️ {error}</div>}

          {result && (
            <div className={`result-card ${isChurn ? "result-churn" : "result-stay"}`}>
              <div className="result-header">
                <div className="result-icon">{isChurn ? "⚠️" : "✅"}</div>
                <div>
                  <div className="result-title">{isChurn ? "High Churn Risk" : "Low Churn Risk"}</div>
                  <div className="result-subtitle">
                    {isChurn ? "This customer is likely to leave" : "This customer is likely to stay"}
                  </div>
                </div>
              </div>
              <div className="prob-bar-wrap">
                <div className="prob-label">
                  <span>Churn Probability</span>
                  <span className="prob-pct">{pct}%</span>
                </div>
                <div className="prob-track">
                  <div className="prob-fill" style={{ width: `${pct}%` }} />
                </div>
              </div>
              <div className="risk-chips">
                <span className="chip">
                  {pct < 20 ? "Very Low Risk" : pct < 40 ? "Low Risk" : pct < 60 ? "Moderate Risk" : pct < 80 ? "High Risk" : "Critical Risk"}
                </span>
                <span className="chip">Model: Gradient Boosting</span>
                <span className="chip">AUC 0.87</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
