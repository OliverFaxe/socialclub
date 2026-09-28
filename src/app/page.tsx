"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

type Step = "account" | "club" | "done";

export default function Home() {
  const [step, setStep] = useState<Step>("account");
  const [account, setAccount] = useState({ name: "", email: "", password: "" });
  const [club, setClub] = useState({ name: "", description: "" });
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function createAccount(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/accounts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(account),
    });
    const data = await response.json();

    if (!response.ok) {
      setError(data.error ?? "Något gick fel. Försök igen.");
    } else {
      setUserId(data.user.id);
      setStep("club");
    }
    setLoading(false);
  }

  async function createClub(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/socialclubs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...club, ownerId: userId }),
    });
    const data = await response.json();

    if (!response.ok) {
      setError(data.error ?? "Något gick fel. Försök igen.");
    } else {
      setStep("done");
    }
    setLoading(false);
  }

  return (
    <main className="site-shell">
      <nav className="topbar">
        <Link className="wordmark" href="/">socialclub<span>.</span></Link>
        <span className="nav-note">Din plats för bättre sammanhang</span>
      </nav>

      <section className="hero-grid">
        <div className="intro">
          <p className="eyebrow">MVP / 01 — bygg gemenskap</p>
          <h1>Gör plats för <em>dina</em> människor.</h1>
          <p className="intro-copy">Skapa ett rum för det ni faktiskt bryr er om. Ett socialclub börjar med en idé och några bra personer.</p>
          <div className="signal-row"><span className="signal-dot" /> Bara konto och club — precis lagom för att börja.</div>
        </div>

        <div className="flow-panel">
          <div className="panel-topline"><span>Kom igång</span><span>{step === "account" ? "01" : step === "club" ? "02" : "✓"} / 02</span></div>
          {step === "account" && (
            <form onSubmit={createAccount}>
              <div className="form-heading"><h2>Vem är du?</h2><p>Skapa ditt konto på några sekunder.</p></div>
              <label>Förnamn<input required value={account.name} onChange={(event) => setAccount({ ...account, name: event.target.value })} placeholder="Ada" /></label>
              <label>E-post<input required type="email" value={account.email} onChange={(event) => setAccount({ ...account, email: event.target.value })} placeholder="du@exempel.se" /></label>
              <label>Lösenord<input required minLength={6} type="password" value={account.password} onChange={(event) => setAccount({ ...account, password: event.target.value })} placeholder="Minst 6 tecken" /></label>
              <button disabled={loading} type="submit">{loading ? "Skapar konto..." : "Fortsätt till din club"}<span>↗</span></button>
            </form>
          )}
          {step === "club" && (
            <form onSubmit={createClub}>
              <div className="form-heading"><h2>Vad samlar ni kring?</h2><p>Ge er första socialclub en tydlig start.</p></div>
              <label>Clubnamn<input required value={club.name} onChange={(event) => setClub({ ...club, name: event.target.value })} placeholder="Söndagsklubben" /></label>
              <label>Vad är det här för gäng?<textarea required rows={4} value={club.description} onChange={(event) => setClub({ ...club, description: event.target.value })} placeholder="Vi ses för att..." /></label>
              <button disabled={loading} type="submit">{loading ? "Skapar club..." : "Skapa socialclub"}<span>↗</span></button>
            </form>
          )}
          {step === "done" && <div className="success-state"><div className="success-mark">✓</div><h2>Er club är live.</h2><p>Det här är början på något bra. Bjud in de första personerna när ni är redo.</p><button type="button" onClick={() => { setStep("club"); setClub({ name: "", description: "" }); }}>Skapa en till club <span>↗</span></button></div>}
          {error && <p className="error-message">{error}</p>}
          {step !== "done" && <div className="progress"><span className={step === "account" ? "active" : "complete"} /><span className={step === "club" ? "active" : ""} /></div>}
        </div>
      </section>
      <footer><span>socialclub / 2026</span><span>Små grupper. Stora idéer.</span></footer>
    </main>
  );
}
