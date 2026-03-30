'use client';
import { useEffect, useRef, useState } from 'react';

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
const REALITIES = [
  {
    icon: '🏚️',
    title: 'Dormant Provinces & Dying Chapters',
    body: 'Dozens of ACYA chapters across provinces and dioceses have gone silent. No meetings, no programs, no contact — whole regions of our youth body exist only on paper. This is not acceptable.',
  },
  {
    icon: '📣',
    title: 'Youth Voices Are Being Ignored',
    body: 'Many young people in ACYA feel unseen and unheard. Decisions are made without them. Programs happen without them. Is it any surprise they stop showing up? We lost them by not listening.',
  },
  {
    icon: '⚔️',
    title: 'Politics Over Purpose',
    body: 'Position-seeking, factionalism, and internal tensions have stolen energy that belongs to the Kingdom. While we fight each other, our mission suffers. This must end — now.',
  },
  {
    icon: '📋',
    title: 'Programs Without Impact',
    body: 'We have calendars full of events but empty of transformation. We measure success by attendance and forget to ask: did any life change? Counting heads is not the same as building futures.',
  },
  {
    icon: '💸',
    title: 'Financial Confusion & Mistrust',
    body: 'Unclear assessment structures, opaque financial reporting, and inconsistent delegate representation have bred mistrust. People question where their money goes. That question deserves an honest answer.',
  },
  {
    icon: '🚪',
    title: 'Willing Youths Turned Away Empty',
    body: 'The saddest reality: we have motivated, gifted young people who want to serve — but find no mentors, no structure, and no open door. Wasted potential is a leadership failure.',
  },
];

const MISSIONS = [
  { icon: '🤝', num: '01', title: 'Unifying the Body', body: 'Foster deep unity, love, and cooperation among all ACYA members across every tribe, region, and background. Transcend differences; build a family.' },
  { icon: '🧠', num: '02', title: 'Building Human Capacity', body: 'Equip members with skills, knowledge, and spiritual gifts for effective Kingdom service. Investment in people is investment in ACYA\'s future.' },
  { icon: '🔥', num: '03', title: 'Spirit-Filled Programs', body: 'Design and deliver transformative, Spirit-led initiatives that inspire real growth and real outreach — not box-ticking, but life-changing encounters.' },
  { icon: '🌱', num: '04', title: 'Youth Empowerment', body: 'Unite, mentor, and deliberately empower young people for leadership and service. Identify potential early. Train intentionally. Release confidently.' },
  { icon: '🌍', num: '05', title: 'Regional Engagement', body: 'Establish regional ACYA hubs where every youth can connect, grow, and serve meaningfully — so ACYA feels close to home, not distant and abstract.' },
  { icon: '📢', num: '06', title: 'Evangelism First', body: 'Share the Gospel boldly. Reach the unreached. Make disciples who make disciples. Evangelism is not optional — it is the heartbeat of everything we do.' },
];

const COMMITMENTS = [
  {
    num: '01', icon: '🏗️', tag: 'Structural',
    title: 'Revive Every Dormant Chapter',
    body: 'We will map every inactive province, diocese, and chapter. Within the first 90 days, dedicated revival teams will make contact, assess needs, and deploy resources. We will track progress publicly — no region left behind, no excuse accepted.',
  },
  {
    num: '02', icon: '🎓', tag: 'Capacity',
    title: 'ACYA Leadership Academy',
    body: 'Launch a structured, year-round leadership and skills training programme. Topics will include public speaking, financial literacy, business development, digital skills, and spiritual formation. Every ACYA member deserves access to tools for life — not just for church.',
  },
  {
    num: '03', icon: '💬', tag: 'Inclusion',
    title: 'Youth Voice Councils',
    body: 'Create formal Youth Voice Councils at provincial and national level. These are not symbolic — they will have real power to propose, review, and hold leadership accountable. Your voice will shape the agenda, not just decorate it.',
  },
  {
    num: '04', icon: '💰', tag: 'Transparency',
    title: 'Financial Clarity & Accountability',
    body: 'Publish clear, regular financial reports. Establish a transparent assessment framework that every chapter understands. Create an independent oversight committee. We will not handle God\'s money in darkness — ever.',
  },
  {
    num: '05', icon: '🌐', tag: 'Digital',
    title: 'Digital Infrastructure for ACYA',
    body: 'Build a centralized ACYA digital platform — a members portal, event hub, resource library, and communication system. Meet this generation where they are. Use technology as a bridge, not a barrier.',
  },
  {
    num: '06', icon: '🤲', tag: 'Mentorship',
    title: 'Structured Mentorship Network',
    body: 'Connect experienced ACYA leaders with young members through formal one-on-one and group mentorship. No young person should navigate ACYA — or life — without a guide. We will institutionalize mentorship, not leave it to chance.',
  },
  {
    num: '07', icon: '🏘️', tag: 'Community',
    title: 'Regional Youth Hubs',
    body: 'Establish physical and virtual regional gathering points for ACYA youth. These hubs will host quarterly events, local leadership training, evangelism drives, and fellowship — bringing the national vision home to your community.',
  },
  {
    num: '08', icon: '📖', tag: 'Spiritual',
    title: 'Deep Discipleship Framework',
    body: 'Move beyond Sunday service attendance to intentional discipleship. Introduce standardized Bible study curricula, prayer initiatives, and accountability groups across chapters. Spiritual depth will be our most prized metric.',
  },
  {
    num: '09', icon: '🌍', tag: 'Outreach',
    title: 'National Evangelism Drive',
    body: 'Organise bi-annual coordinated outreach campaigns across all regions simultaneously — so the whole country feels ACYA\'s presence. Street evangelism, campus missions, hospital visits, prison ministry. The Great Commission is our mandate.',
  },
  {
    num: '10', icon: '💼', tag: 'Economic',
    title: 'Youth Economic Empowerment',
    body: 'Partner with businesses, NGOs, and government bodies to create internship, apprenticeship, and entrepreneurship opportunities for ACYA members. An empowered youth economically is more effective spiritually and socially.',
  },
  {
    num: '11', icon: '☮️', tag: 'Unity',
    title: 'Zero-Tolerance for Division',
    body: 'Introduce a formal conflict resolution and reconciliation process. Any dispute — personal, political, or structural — will be addressed through proper channels within 30 days. Division will not be tolerated. Unity will be protected as a sacred value.',
  },
  {
    num: '12', icon: '📊', tag: 'Accountability',
    title: 'Measurable Impact Reports',
    body: 'At the end of every quarter, publish a public ACYA Impact Report: chapters revived, members trained, souls won, funds spent, goals met. If we cannot measure it, we cannot manage it — and you deserve to see the results.',
  },
];

const PILLARS = [
  { icon: '✝️', title: 'Rooted in Christ', body: 'Every decision, programme, and policy will be anchored in Scripture and driven by the Holy Spirit. Without God, we build nothing of eternal value.' },
  { icon: '👥', title: 'Powered by People', body: 'Leadership is only as strong as the people it serves. We will listen, involve, and trust ACYA members at every level to co-create the future.' },
  { icon: '📈', title: 'Driven by Results', body: 'Good intentions without measurable outcomes are not enough. We will set clear goals, track progress transparently, and be accountable for delivery.' },
];

const VALUES = [
  { e: '🤝', v: 'Unity in Diversity' },
  { e: '🙏', v: 'Spiritual Growth' },
  { e: '🌍', v: 'Service & Outreach' },
  { e: '⚖️', v: 'Integrity & Accountability' },
  { e: '🌱', v: 'Inclusivity — No One Left Behind' },
  { e: '💡', v: 'Innovation & Relevance' },
  { e: '✝️', v: 'Empowerment & Discipleship' },
  { e: '☮️', v: 'Peace & Stability' },
  { e: '📣', v: 'Bold Evangelism' },
  { e: '💰', v: 'Economic Empowerment' },
];

const TICKER_ITEMS = [
  'Unity', 'Spiritual Depth', 'Youth Empowerment', 'Transparency',
  'Innovation', 'Evangelism', 'Mentorship', 'Accountability',
  'Regional Growth', 'Discipleship', 'Service', 'Purpose',
];

/* ─────────────────────────────────────────────────────────────
   COMPONENTS
───────────────────────────────────────────────────────────── */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    ['#vision', 'Vision'],
    ['#reality', 'The Problem'],
    ['#commitments', 'Commitments'],
    ['#values', 'Values'],
  ];
  return (
    <nav className="nav">
      <div className="container nav-inner">
        <a href="#top" className="nav-logo">
          Oyeyipo <span>Oluwaseun</span>
        </a>
        <ul className="nav-links">
          {links.map(([href, label]) => (
            <li key={href}>
              <a href={href}>{label}</a>
            </li>
          ))}
          <li>
            <a href="#conference" className="nav-btn">
              Abuja 2026 ↗
            </a>
          </li>
        </ul>
        <button className="nav-mobile-btn" onClick={() => setOpen(!open)}>
          {open ? 'Close' : 'Menu'}
        </button>
      </div>
      {open && (
        <div
          style={{
            background: 'rgba(6,15,30,0.98)',
            padding: '20px 24px',
            borderTop: '1px solid rgba(201,162,39,0.1)',
          }}
        >
          {links.map(([href, label]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              style={{
                display: 'block',
                color: 'rgba(255,255,255,0.7)',
                padding: '12px 0',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                fontSize: '0.9rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section
      id="top"
      className="hero"
      style={{ paddingTop: '120px' }}
    >
      <div className="hero-bg" />
      <div className="hero-grid" />

      <div className="hero-content">
        <div className="hero-badge">
          ✦ &nbsp; ACYA National Presidential Candidate &nbsp; · &nbsp; Abuja 2026 &nbsp; ✦
        </div>

        <h1 className="hero-name">
          <span className="first">Oyeyipo</span>
          <span className="surname">Oluwaseun</span>
        </h1>

        <div className="hero-divider">
          <span />
          <i>✝</i>
          <span />
        </div>

        <p className="hero-tagline">"Empowered for Independence"</p>
        <p className="hero-sub">A Manifesto for a New Season of ACYA</p>

        <p className="hero-desc">
          This is not a campaign — it is a covenant. A detailed, honest, and Spirit-led plan to
          rebuild, reunite, and re-ignite the African Church Youth Association from the ground up.
          Every problem named. Every solution promised. Every promise accountable.
        </p>

        <div className="hero-actions">
          <a href="#commitments" className="btn-gold">
            Read the Full Plan ↓
          </a>
          <a href="#reality" className="btn-glass">
            The Honest Truth
          </a>
        </div>

        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">12</span>
            <span className="stat-label">Concrete Commitments</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">3</span>
            <span className="stat-label">Core Pillars</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">1</span>
            <span className="stat-label">Non-Negotiable Goal: ACYA for Christ</span>
          </div>
        </div>
      </div>

      <div
        className="hero-scroll"
        onClick={() => document.getElementById('ticker')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}

function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div id="ticker" className="ticker-bar">
      <div className="ticker-track">
        {items.map((item, i) => (
          <span key={i} className="ticker-item">
            <span className="ticker-dot" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function Intro() {
  return (
    <section className="intro-section section-pad">
      <div className="container">
        <div className="intro-grid">
          <div className="intro-text reveal">
            <p className="label">Who Is Oyeyipo Oluwaseun</p>
            <h2 className="display-title" style={{ marginBottom: '28px' }}>
              A Leader Who Has Been in the Room — And Knows What's Missing
            </h2>
            <p>
              Oyeyipo Oluwaseun is not a stranger to ACYA. He has served, observed, questioned, and
              listened — deeply. He has seen the passion in our youth and the frustration in their
              eyes. He has watched talented people walk away because no door was opened. He has
              sat in meetings where politics drowned out purpose.
            </p>
            <p>
              This manifesto is not written from a distance. It is written by someone who has
              been in the trenches of ACYA — and refuses to accept that this is as good as it
              gets. The Association deserves more. Our youth deserve more. God expects more.
            </p>
            <p>
              <strong style={{ color: 'var(--navy)', fontWeight: 600 }}>
                Empowered for Independence means
              </strong>{' '}
              raising a generation that does not wait for permission to lead, to create, to serve,
              and to impact. It means building systems that set people free to be everything God
              called them to be — inside the church and in the world.
            </p>
          </div>
          <div className="reveal reveal-delay-2">
            <div className="intro-quote-block">
              <p className="big-quote">
                "Leadership is inbuilt — but impact is intentional. I am not here to hold a
                position. I am here to leave ACYA unrecognisably better than I found it."
              </p>
              <p className="quote-attr">— Oyeyipo Oluwaseun, Presidential Candidate 2026</p>
            </div>
            <div
              style={{
                marginTop: '20px',
                background: 'var(--gold-faint)',
                padding: '28px',
                borderRadius: '4px',
                borderLeft: '4px solid var(--gold)',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontStyle: 'italic',
                  fontSize: '1rem',
                  color: 'var(--navy)',
                  lineHeight: 1.7,
                }}
              >
                "So then, just as you received Christ Jesus as Lord, continue to live your lives
                in him, rooted and built up in him, strengthened in the faith."
              </p>
              <p
                style={{
                  fontSize: '0.72rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                  fontWeight: 700,
                  marginTop: '10px',
                }}
              >
                Colossians 2:6–7 · Conference Theme
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Reality() {
  return (
    <section id="reality" className="reality-section section-pad">
      <div className="container">
        <div className="reality-header">
          <p className="label" style={{ color: 'var(--gold)' }}>
            Honest Assessment
          </p>
          <h2 className="display-title light reveal" style={{ marginBottom: '20px' }}>
            The Problems We Cannot Pretend Away
          </h2>
          <p className="lead light reveal reveal-delay-1" style={{ maxWidth: '620px' }}>
            A leader who cannot name the problem cannot solve it. These are not accusations.
            They are honest observations that demand honest action. Read them — and judge this
            manifesto by how specifically it addresses each one.
          </p>
        </div>
        <div className="reality-grid">
          {REALITIES.map((r, i) => (
            <div key={i} className={`reality-card reveal reveal-delay-${(i % 3) + 1}`}>
              <div className="reality-icon">{r.icon}</div>
              <div>
                <h4>{r.title}</h4>
                <p>{r.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Vision() {
  return (
    <section id="vision" className="vision-section section-pad">
      <div className="container">
        <p className="label">Our Foundation</p>
        <h2 className="display-title reveal" style={{ marginBottom: '16px' }}>
          Vision &amp; Mission
        </h2>
        <p className="lead reveal reveal-delay-1" style={{ marginBottom: '0' }}>
          A vibrant, unified ACYA that empowers individuals, nurtures spiritual depth, and
          transforms young people into leaders who reshape the Church and society.
        </p>
        <div className="vision-cards">
          {MISSIONS.map((m, i) => (
            <div key={i} className={`vision-card reveal reveal-delay-${(i % 4) + 1}`}>
              <div className="vc-num">{m.num}</div>
              <div className="vc-icon">{m.icon}</div>
              <h3>{m.title}</h3>
              <p>{m.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pillars() {
  return (
    <section className="pillars-section section-pad">
      <div className="container">
        <p className="label">The Three Pillars</p>
        <h2 className="display-title reveal" style={{ marginBottom: '16px' }}>
          Everything Rests on These
        </h2>
        <p className="lead reveal reveal-delay-1">
          Three uncompromising foundations. If any one of these collapses, the rest means
          nothing. These are not ideals — they are non-negotiable operating principles.
        </p>
        <div className="pillars-row">
          {PILLARS.map((p, i) => (
            <div key={i} className={`pillar reveal reveal-delay-${i + 1}`}>
              <div className="pillar-icon">{p.icon}</div>
              <h3 className="pillar-title">{p.title}</h3>
              <p className="pillar-desc">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Commitments() {
  return (
    <section id="commitments" className="commitments-section section-pad">
      <div className="container">
        <p className="label" style={{ color: 'var(--gold)' }}>
          12 Concrete Commitments
        </p>
        <h2 className="display-title light reveal" style={{ marginBottom: '16px' }}>
          Not Promises. A Covenant.
        </h2>
        <p className="lead light reveal reveal-delay-1">
          Each commitment below is specific, measurable, and deliverable. These are the
          things Oyeyipo Oluwaseun will be held personally responsible for. Hold him to them.
        </p>
        <div className="commitments-grid">
          {COMMITMENTS.map((c, i) => (
            <div key={i} className={`commit-card reveal reveal-delay-${(i % 3) + 1}`}>
              <div className="commit-num">{c.num}</div>
              <div className="commit-icon">{c.icon}</div>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
              <span className="commit-tag">{c.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Values() {
  return (
    <section id="values" className="values-section section-pad">
      <div className="container">
        <p className="label" style={{ color: 'var(--gold-light)' }}>
          What We Stand For
        </p>
        <h2 className="display-title light reveal" style={{ marginBottom: '16px' }}>
          Our Core Values
        </h2>
        <p className="lead light reveal reveal-delay-1">
          These values are not slogans — they are guardrails. Every decision made under this
          administration will be tested against them.
        </p>
        <div className="values-list reveal reveal-delay-2">
          {VALUES.map((v, i) => (
            <div key={i} className="val-pill">
              <span>{v.e}</span>
              {v.v}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pledge() {
  const points = [
    'Listen first, decide second — always',
    'Build systems that carry everyone, not just a few',
    'Publish progress reports every quarter',
    'Never prioritise position over purpose',
    'Be accessible to every province and diocese',
    'Work across divides — no inner circle',
    'Protect the spiritual integrity of ACYA above all',
    'Leave ACYA stronger than I met it',
  ];
  return (
    <section className="pledge-section section-pad">
      <div className="container">
        <p className="label">A Personal Pledge</p>
        <h2 className="display-title reveal" style={{ marginBottom: '40px' }}>
          My Commitment to Every ACYA Member
        </h2>
        <div className="pledge-card reveal reveal-delay-1">
          <p className="pledge-quote">
            "I will not come here to act like I can do this alone — or like I already know all
            the answers. I come with humility, with a plan, and with an unshakeable conviction
            that God did not bring this far to leave us here. Leadership is inbuilt. Impact is
            intentional. And this — all of this — is for Christ."
          </p>
          <div className="pledge-grid">
            {points.map((pt, i) => (
              <div key={i} className="pledge-point">
                <div className="pledge-bullet">✦</div>
                <span>{pt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ConferenceBanner() {
  return (
    <section id="conference" className="conf-banner">
      <div className="container">
        <p
          style={{
            fontSize: '0.72rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            fontWeight: 700,
            color: 'rgba(6,15,30,0.5)',
            marginBottom: '8px',
          }}
        >
          ACYA National Youth Conference
        </p>
        <h2>Rooted in Christ · Abuja 2026</h2>
        <p>This is where the next chapter begins. Be there.</p>
        <div className="conf-details">
          <div className="conf-detail">📅 April 9 – 12, 2026</div>
          <div className="conf-detail">📍 African Church Cathedral Bethel, Abuja</div>
          <div className="conf-detail">✝ Colossians 2:6–7</div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>
              Oyeyipo <span>Oluwaseun</span>
            </h3>
            <p>
              ACYA National Presidential Candidate · Abuja 2026
              <br />
              Empowered for Independence
              <br />
              ACYA… For Christ ✝
            </p>
          </div>
          <div className="footer-col">
            <h4>Manifesto Sections</h4>
            <ul>
              {[
                ['#top', 'Home'],
                ['#vision', 'Vision & Mission'],
                ['#reality', 'The Problem'],
                ['#commitments', '12 Commitments'],
                ['#values', 'Core Values'],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Key Commitments</h4>
            <ul>
              {[
                'Revive Dormant Chapters',
                'ACYA Leadership Academy',
                'Financial Transparency',
                'Youth Voice Councils',
                'Digital Infrastructure',
                'National Evangelism Drive',
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Oyeyipo Oluwaseun · ACYA Presidential Campaign · All Rights Reserved</p>
          <span className="footer-cross">✝</span>
          <p>Built for the glory of God and the good of ACYA youth</p>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────── */
export default function Page() {
  useScrollReveal();

  return (
    <>
      <Nav />
      <Hero />
      <Ticker />
      <Intro />
      <Reality />
      <Vision />
      <Pillars />
      <Commitments />
      <Values />
      <Pledge />
      <ConferenceBanner />
      <Footer />
    </>
  );
}
