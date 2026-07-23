import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  useActiveSection,
  useCountUp,
  useParallax,
  useReveal,
  useTyping,
} from "@/hooks/use-portfolio";
import { Cursor } from "@/components/Cursor";
import { useLanguage, type Experience, type Project } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";

export const Route = createFileRoute("/")({ component: Index });

const SECTION_IDS = [
  "hero",
  "about",
  "experience",
  "skills",
  "projects",
  "certifications",
  "contact",
];

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? t.theme.toLight : t.theme.toDark}
      className={`icon-btn ${className}`}
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

function LangToggle({ className = "" }: { className?: string }) {
  const { t, toggleLang } = useLanguage();
  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={t.langToggle.label}
      className={`icon-btn font-mono text-[11px] font-semibold tracking-wider ${className}`}
    >
      {t.langToggle.target}
    </button>
  );
}

function Nav() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);
  const linksRef = useRef<HTMLUListElement>(null);
  const [dot, setDot] = useState({ left: 0, width: 0 });

  const navLinks: { label: string; href: string }[] = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.work, href: "#experience" },
    { label: t.nav.skills, href: "#skills" },
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.contact, href: "#contact" },
  ];

  useEffect(() => {
    let raf = 0;
    const check = () => setScrolled(window.scrollY > 80);
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    const ul = linksRef.current;
    if (!ul) return;
    const idx = navLinks.findIndex((l) => l.href.slice(1) === active);
    if (idx < 0) {
      setDot({ left: 0, width: 0 });
      return;
    }
    const li = ul.children[idx] as HTMLElement | undefined;
    if (li) setDot({ left: li.offsetLeft + li.offsetWidth / 2 - 2.5, width: 5 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, t]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled ? "backdrop-blur-xl bg-(--header-bg) border-b border-border" : ""
      }`}
    >
      <nav className="max-w-[1200px] mx-auto px-8 h-20 flex items-center justify-between">
        <a
          href="#hero"
          className="font-display text-2xl font-bold text-orange anim-nav-item"
          style={{ animationDelay: "200ms" }}
        >
          HM
        </a>
        <ul ref={linksRef} className="hidden md:flex items-center gap-10 text-sm relative">
          {navLinks.map((l, i) => {
            const id = l.href.slice(1);
            return (
              <li
                key={l.href}
                className="anim-nav-item"
                style={{ animationDelay: `${240 + i * 40}ms` }}
              >
                <a
                  href={l.href}
                  className={`nav-link text-foreground/70 hover:text-foreground transition-colors ${active === id ? "active" : ""}`}
                >
                  {l.label}
                </a>
              </li>
            );
          })}
          <span
            className="absolute -bottom-3 h-[5px] w-[5px] rounded-full bg-orange transition-[left] duration-500"
            style={{ left: dot.left, opacity: dot.width ? 1 : 0 }}
          />
        </ul>
        <div
          className="hidden md:flex items-center gap-3 anim-nav-item"
          style={{ animationDelay: "460ms" }}
        >
          <LangToggle />
          <ThemeToggle />
        </div>
        <div
          className="md:hidden flex items-center gap-2 anim-nav-item"
          style={{ animationDelay: "240ms" }}
        >
          <LangToggle />
          <ThemeToggle />
          <button
            aria-label={t.menu.open}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
            className="flex flex-col gap-1.5 p-2"
          >
            <span className="w-6 h-px bg-ink" />
            <span className="w-6 h-px bg-ink" />
          </button>
        </div>
      </nav>
      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center gap-8 md:hidden"
        >
          <button
            aria-label={t.menu.close}
            onClick={() => setOpen(false)}
            className="absolute top-7 right-8 text-3xl"
          >
            ×
          </button>
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-display text-4xl"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

function RotatingBadge() {
  const { t } = useLanguage();
  return (
    <div className="relative w-[140px] h-[140px] md:w-[160px] md:h-[160px]">
      <svg viewBox="0 0 200 200" className="w-full h-full anim-spin-slow">
        <defs>
          <path id="circlePath" d="M 100, 100 m -78, 0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0" />
        </defs>
        <text
          fill="var(--ink)"
          style={{ fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.55em" }}
        >
          <textPath href="#circlePath">{t.hero.badge}</textPath>
        </text>
      </svg>
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-orange" />
    </div>
  );
}

function Hero() {
  const { t } = useLanguage();
  const typed = useTyping(t.hero.typingText, 28, 800);
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center px-8 max-w-[1200px] mx-auto pt-32 pb-20 relative"
    >
      <div className="absolute top-28 right-8 hidden sm:block anim-rise-1200">
        <RotatingBadge />
      </div>
      <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-ghost anim-rise-800">
        {t.hero.eyebrow}
      </p>
      <h1
        className="mt-8 font-display font-bold text-ink leading-[0.9] tracking-[-0.03em]"
        style={{ fontSize: "clamp(64px, 11vw, 132px)" }}
      >
        <span className="block anim-name">HAMZA</span>
        <span className="block anim-name" style={{ animationDelay: "700ms" }}>
          MOUSSAIF
        </span>
      </h1>
      <div className="anim-line mt-6 h-[2px] w-[180px] bg-orange origin-left" />
      <p className="mt-8 text-lg md:text-xl text-muted-foreground caret max-w-2xl min-h-[1.6em]">
        {typed}
      </p>
      <div className="anim-rise-1000 mt-6">
        <span className="pill">
          <span className="dot" /> {t.hero.pillText}
        </span>
      </div>
      <div className="anim-rise-1200 mt-10 flex flex-wrap gap-4">
        <a href="#projects" className="btn-primary">
          <span>{t.hero.viewWork}</span>
          <span className="arrow">→</span>
        </a>
        <a href="/hamza-moussaif-cv.pdf" download className="btn-secondary">
          <span>{t.hero.downloadCv}</span>
        </a>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 anim-rise-1200">
        <span className="font-mono text-[10px] tracking-[0.3em] text-ghost">{t.hero.scroll}</span>
        <span className="anim-bounce text-ghost text-xl leading-none">↓</span>
      </div>
    </section>
  );
}

function SectionHead({ num, label, title }: { num: string; label: string; title: string }) {
  const parallax = useParallax<HTMLDivElement>(0.6);
  const titleRef = useReveal<HTMLDivElement>();
  return (
    <div className="relative mb-20">
      <div ref={parallax} className="ghost-num absolute -top-16 -left-4 md:-left-8 z-0">
        {num}
      </div>
      <div ref={titleRef} className="reveal relative z-10">
        <p className="section-label">
          {num} / {label}
        </p>
        <h2
          className="mt-4 font-display font-semibold text-ink"
          style={{ fontSize: "clamp(36px, 5vw, 56px)", letterSpacing: "-0.02em", lineHeight: 1.05 }}
        >
          {title}
        </h2>
      </div>
    </div>
  );
}

function Stat({
  n,
  prefix = "",
  suffix,
  label,
}: {
  n: number;
  prefix?: string;
  suffix: string;
  label: string;
}) {
  const { ref, val } = useCountUp(n, 1400);
  return (
    <div className="stat-card">
      <div
        className="font-display font-bold text-orange leading-none"
        style={{ fontSize: "clamp(40px, 5vw, 56px)" }}
      >
        {prefix}
        <span ref={ref}>{val}</span>
        {suffix}
      </div>
      <div className="mt-3 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

function About() {
  const { t } = useLanguage();
  const grid = useReveal<HTMLDivElement>();
  return (
    <section id="about" className="max-w-[1200px] mx-auto px-8 py-32 scroll-mt-24 relative z-10">
      <SectionHead num="02" label={t.about.label} title={t.about.title} />
      <div ref={grid} className="reveal grid md:grid-cols-2 gap-16 items-start">
        <div>
          <p className="text-base leading-[1.9] text-muted-foreground">{t.about.body}</p>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {t.about.languages.map((l) => (
              <span
                key={l.name}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface text-sm"
              >
                <span>{l.flag}</span>
                {l.name}
              </span>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {t.about.stats.map((s) => (
            <Stat key={s.label} n={s.number} prefix={s.prefix} suffix={s.suffix} label={s.label} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceItem({
  x,
  i,
  currentLabel,
}: {
  x: Experience;
  i: number;
  currentLabel: string;
}) {
  const ref = useReveal<HTMLLIElement>(0.2);
  return (
    <li
      ref={ref}
      className="reveal-right relative grid md:grid-cols-[160px_1fr] gap-8 pb-16 last:pb-0"
      style={{ transitionDelay: `${i * 120}ms` }}
    >
      <span className="absolute left-[-5px] md:left-[155px] top-2 w-[11px] h-[11px] rounded-full bg-orange ring-4 ring-background z-10" />
      <div className="md:pt-1 pl-6 md:pl-0">
        <div className="font-mono text-[11px] tracking-[0.08em] uppercase text-muted-foreground">
          {x.period}
        </div>
        <div className="mt-1 font-medium text-ink">{x.company}</div>
      </div>
      <div className="pl-6 md:pl-12">
        <div className="flex items-center gap-3 flex-wrap">
          <h3 className="font-display text-2xl text-ink">{x.role}</h3>
          {x.current && (
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] px-2 py-1 bg-orange text-white rounded">
              {currentLabel}
            </span>
          )}
        </div>
        <ul className="mt-5 space-y-2.5 text-muted-foreground leading-[1.7]">
          {x.bullets.map((b) => (
            <li key={b} className="flex gap-3">
              <span className="text-orange mt-3 shrink-0 w-3 h-px bg-orange" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
          {x.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </li>
  );
}

function Experience() {
  const { t } = useLanguage();
  return (
    <section
      id="experience"
      className="max-w-[1200px] mx-auto px-8 py-32 scroll-mt-24 relative z-10"
    >
      <SectionHead num="03" label={t.experience.label} title={t.experience.title} />
      <ol className="relative">
        <div className="absolute left-[5px] md:left-[160px] top-2 bottom-2 w-px bg-orange/30" />
        {t.experience.items.map((x, i) => (
          <ExperienceItem key={x.company} x={x} i={i} currentLabel={t.experience.current} />
        ))}
      </ol>
    </section>
  );
}

function Skills() {
  const { t } = useLanguage();
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="skills" className="max-w-[1200px] mx-auto px-8 py-32 scroll-mt-24 relative z-10">
      <SectionHead num="04" label={t.skills.label} title={t.skills.title} />
      <div ref={ref} className="reveal-stagger space-y-10">
        {t.skills.categories.map((c) => (
          <div key={c.label} className="grid md:grid-cols-[120px_1fr] gap-8 items-start">
            <h3 className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground pt-2">
              {c.label}
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {c.tags.map((tag) => (
                <span key={tag} className="skill-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ p, viewDetailsLabel }: { p: Project; viewDetailsLabel: string }) {
  return (
    <article className={`project-card ${p.featured ? "featured md:col-span-2" : ""}`}>
      <div
        className="font-display font-bold leading-none"
        style={{ fontSize: "64px", color: p.featured ? "rgba(255,92,26,0.15)" : "var(--surface)" }}
      >
        {p.number}
      </div>
      <h3 className="mt-6 font-medium text-ink" style={{ fontSize: "22px" }}>
        {p.title}
      </h3>
      <p className="mt-3 text-[15px] leading-[1.7] text-muted-foreground">{p.description}</p>
      <div className="mt-6 flex items-end justify-between gap-4 flex-wrap">
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {p.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
        <a href="#contact" className="details">
          {viewDetailsLabel} <span className="a">→</span>
        </a>
      </div>
    </article>
  );
}

function Projects() {
  const { t } = useLanguage();
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="projects" className="max-w-[1200px] mx-auto px-8 py-32 scroll-mt-24 relative z-10">
      <SectionHead num="05" label={t.projects.label} title={t.projects.title} />
      <div ref={ref} className="reveal-stagger grid md:grid-cols-2 gap-6">
        {t.projects.items.map((p) => (
          <ProjectCard key={p.number} p={p} viewDetailsLabel={t.projects.viewDetails} />
        ))}
      </div>
    </section>
  );
}

function Certifications() {
  const { t } = useLanguage();
  const ref = useReveal<HTMLDivElement>();
  return (
    <section
      id="certifications"
      className="max-w-[1200px] mx-auto px-8 py-32 scroll-mt-24 relative z-10"
    >
      <SectionHead num="06" label={t.certifications.label} title={t.certifications.title} />
      <div ref={ref} className="reveal-stagger grid grid-cols-2 lg:grid-cols-4 gap-5">
        {t.certifications.items.map((c) => (
          <div key={c.name} className="cert-card">
            <div
              className="font-display font-bold text-orange leading-none"
              style={{ fontSize: "48px" }}
            >
              {c.initial}
            </div>
            <h3 className="mt-6 font-medium text-ink text-[15px] leading-snug">{c.name}</h3>
            <p className="mt-2 text-[13px] text-muted-foreground">{c.issuer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const { t } = useLanguage();
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="contact" className="max-w-[1200px] mx-auto px-8 py-32 scroll-mt-24 relative z-10">
      <SectionHead num="07" label={t.contact.label} title={t.contact.titleLines.join(" ")} />
      <div ref={ref} className="reveal grid md:grid-cols-[3fr_2fr] gap-16 items-start">
        <div>
          <h3
            className="font-display font-semibold text-ink"
            style={{
              fontSize: "clamp(44px, 7vw, 72px)",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
            }}
          >
            {t.contact.titleLines[0]}
            <br />
            {t.contact.titleLines[1]}
            <br />
            {t.contact.titleLines[2]}
          </h3>
          <p className="mt-8 text-lg text-muted-foreground max-w-md leading-[1.7]">
            {t.contact.availability}
          </p>
        </div>
        <div>
          {t.contact.links.map((l) =>
            l.href ? (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="contact-link"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                  {l.label}
                </span>
                <span className="value text-ink text-base transition-colors">{l.value}</span>
                <span className="arrow text-base">→</span>
              </a>
            ) : (
              <div key={l.label} className="contact-link" style={{ cursor: "default" }}>
                <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                  {l.label}
                </span>
                <span className="value text-ink text-base">{l.value}</span>
                <span />
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="relative z-10 max-w-[1200px] mx-auto px-8">
      <div className="h-px bg-border" />
      <p className="py-10 text-center text-xs text-ghost">
        {t.footer.name}{" "}
        <span className="relative group" data-cursor="hover">
          ©
        </span>{" "}
        2026
      </p>
    </footer>
  );
}

function Index() {
  const { t, lang } = useLanguage();

  useEffect(() => {
    document.title = t.meta.title;
  }, [t]);

  return (
    <main className="relative">
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:px-4 focus:py-2 focus:bg-ink focus:text-background focus:rounded"
      >
        {t.skipToContent}
      </a>
      <div className="grain" />
      <Cursor />
      <Nav />
      <Hero key={lang} />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Certifications />
      <Contact />
      <Footer />
    </main>
  );
}
