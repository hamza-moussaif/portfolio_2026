import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Lang = "fr" | "en";

export interface Experience {
  period: string;
  company: string;
  role: string;
  current?: boolean;
  bullets: string[];
  tags: string[];
}

export interface Project {
  number: string;
  title: string;
  description: string;
  tags: string[];
  featured?: boolean;
}

export interface Certification {
  initial: string;
  name: string;
  issuer: string;
}

export interface Dictionary {
  meta: { title: string; description: string };
  skipToContent: string;
  nav: { about: string; work: string; skills: string; projects: string; contact: string };
  menu: { open: string; close: string };
  theme: { toLight: string; toDark: string };
  langToggle: { label: string; target: string };
  hero: {
    eyebrow: string;
    typingText: string;
    pillText: string;
    viewWork: string;
    downloadCv: string;
    scroll: string;
    badge: string;
  };
  about: {
    label: string;
    title: string;
    body: string;
    languages: { flag: string; name: string }[];
    stats: { number: number; prefix?: string; suffix: string; label: string }[];
  };
  experience: { label: string; title: string; current: string; items: Experience[] };
  skills: { label: string; title: string; categories: { label: string; tags: string[] }[] };
  projects: { label: string; title: string; viewDetails: string; items: Project[] };
  certifications: { label: string; title: string; items: Certification[] };
  contact: {
    label: string;
    titleLines: [string, string, string];
    availability: string;
    links: { label: string; value: string; href: string | null }[];
  };
  footer: { name: string };
}

const fr: Dictionary = {
  meta: {
    title: "Hamza Moussaif — Ingénieur Backend Java",
    description:
      "Portfolio de Hamza Moussaif, ingénieur Java Spring Boot et diplômé MIAGE EMSI basé à Casablanca.",
  },
  skipToContent: "Aller au contenu",
  nav: { about: "À propos", work: "Expérience", skills: "Compétences", projects: "Projets", contact: "Contact" },
  menu: { open: "Ouvrir le menu", close: "Fermer le menu" },
  theme: { toLight: "Passer en mode clair", toDark: "Passer en mode sombre" },
  langToggle: { label: "Changer de langue", target: "EN" },
  hero: {
    eyebrow: "Portfolio · 2026",
    typingText: "Ingénieur Backend Java · Spring Boot · Microservices",
    pillText: "Ouvert à un CDI — Sept 2026",
    viewWork: "Voir mes projets",
    downloadCv: "Télécharger le CV",
    scroll: "DÉFILER",
    badge: "OUVERT AU CDI · CASABLANCA 2026 · ",
  },
  about: {
    label: "À propos",
    title: "Ingénieur backend. Code propre. Testé à 100%.",
    body: "Ingénieur EMSI MIAGE en fin d'études à Casablanca, avec une expérience concrète chez Crédit du Maroc et Inetum. Je conçois des microservices, sécurise des APIs REST et teste mon code de manière rigoureuse. Je travaille avec Java et Spring Boot, je raisonne en sprints, et je communique couramment en français, arabe et anglais.",
    languages: [
      { flag: "🇫🇷", name: "Français" },
      { flag: "🇲🇦", name: "Arabe" },
      { flag: "🇬🇧", name: "Anglais" },
    ],
    stats: [
      { number: 100, suffix: "%", label: "Couverture de tests @ CDM" },
      { number: 3, suffix: "", label: "Stages" },
      { number: 21, suffix: "", label: "Certifications" },
      { number: 5, prefix: "~", suffix: "%", label: "Gain de performance API" },
    ],
  },
  experience: {
    label: "Expérience",
    title: "Où j'ai travaillé.",
    current: "Actuel",
    items: [
      {
        period: "Fév 2026 – Août 2026",
        company: "Inetum Offshore",
        role: "Développeur Java Spring Boot · PFE",
        current: true,
        bullets: [
          "Développement d'APIs REST sécurisées et de microservices avec Spring Boot",
          "Couverture de tests complète avec JUnit 5 & Mockito",
          "Travail en cycles Agile / Scrum complets",
        ],
        tags: ["Java", "Spring Boot", "JUnit", "Mockito", "Agile"],
      },
      {
        period: "Juil – Août 2025",
        company: "Crédit du Maroc (CDM)",
        role: "Ingénieur Développement Backend",
        bullets: [
          "Optimisation d'APIs Java — gain de performance mesurable d'environ 5%",
          "Atteinte de 100% de couverture de tests sur tous les services",
          "Rédaction de spécifications techniques, coordination frontend/backend",
        ],
        tags: ["Spring Boot", "TDD", "Optimisation API", "100% Couverture"],
      },
      {
        period: "Juil 2024",
        company: "Marsa Maroc",
        role: "Développeur Web",
        bullets: [
          "Développement complet d'un système de gestion de flotte de véhicules en C# / .NET",
          "Conception du schéma de base de données SQL Server",
          "Livraison d'un tableau de bord de supervision pour les agents d'exploitation",
        ],
        tags: ["C#", ".NET", "SQL Server", "Dashboard"],
      },
    ],
  },
  skills: {
    label: "Compétences",
    title: "Avec quoi je travaille.",
    categories: [
      { label: "Langages", tags: ["Java", "Python", "C#", "Dart", "SQL"] },
      {
        label: "Backend",
        tags: ["Spring Boot", "JPA/Hibernate", "Maven", "REST APIs", "Microservices"],
      },
      { label: "Tests", tags: ["JUnit 5", "Mockito", "TDD"] },
      { label: "Outils", tags: ["Git", "Postman", "Agile/Scrum", "Oracle DB", "SQL Server"] },
      { label: "Data", tags: ["Data Analytics", "IBM Cloud", "Python/Pandas"] },
    ],
  },
  projects: {
    label: "Projets",
    title: "Ce que j'ai construit.",
    viewDetails: "Voir les détails",
    items: [
      {
        number: "01",
        title: "SaaS de recrutement IA",
        description:
          "Une plateforme intelligente qui automatise le matching des candidatures — le système lit les profils des candidats, scanne les offres ouvertes et postule automatiquement. Conçue pour réduire le temps de recrutement manuel et la friction pour les candidats.",
        tags: ["IA", "SaaS", "Automatisation", "Java", "Spring Boot"],
        featured: true,
      },
      {
        number: "02",
        title: "Suivi de projet Jira",
        description:
          "Tableau de bord personnalisé qui affiche en temps réel la progression des sprints, la vélocité des tâches et les blocages d'équipe. Conçu pour les équipes qui vivent dans Jira mais veulent une vue plus claire.",
        tags: ["Jira API", "Dashboard", "Agile", "Data Viz"],
      },
      {
        number: "03",
        title: "Outil de rétro-documentation",
        description:
          "Application de base de connaissances interne qui a réduit de 50% le temps de compréhension des livrables legacy. Les ingénieurs ne demandent plus, ils cherchent.",
        tags: ["Documentation", "Base de connaissances", "DX", "Spring Boot"],
      },
      {
        number: "04",
        title: "Système de gestion de flotte de véhicules",
        description:
          "Système complet en C#/.NET pour Marsa Maroc permettant de suivre et gérer le matériel roulant. Inclut l'intégration SQL Server, un tableau de bord d'exploitation et un suivi en temps réel.",
        tags: ["C#", ".NET", "SQL Server", "Exploitation", "Dashboard"],
      },
      {
        number: "05",
        title: "Application de présence par reconnaissance faciale",
        description:
          "Système de gestion des absences des étudiants par reconnaissance faciale. Conçu pour simplifier le suivi de présence et réduire la charge administrative.",
        tags: ["Reconnaissance faciale", "Gestion des présences", "Python", "OpenCV", "Flask"],
      },
    ],
  },
  certifications: {
    label: "Certifications",
    title: "Comment je le prouve.",
    items: [
      { initial: "O", name: "Oracle Java SE 17 Developer", issuer: "Oracle" },
      { initial: "M", name: "Meta Back-End Developer", issuer: "Meta" },
      { initial: "I", name: "IBM Full Stack Developer", issuer: "IBM" },
      { initial: "U", name: "Python & Data", issuer: "University of Michigan" },
    ],
  },
  contact: {
    label: "Contact",
    titleLines: ["Créons", "quelque chose", "de propre."],
    availability: "Disponible pour un CDI — Casablanca & Télétravail — à partir de septembre 2026.",
    links: [
      { label: "Email", value: "hamzamoussaif23@gmail.com", href: "mailto:hamzamoussaif23@gmail.com" },
      { label: "Téléphone", value: "+212 653 609 768", href: "tel:+212653609768" },
      {
        label: "LinkedIn",
        value: "hamza-moussaif ↗",
        href: "https://www.linkedin.com/in/hamza-moussaif-86ba6a228/",
      },
      { label: "Localisation", value: "Casablanca, Maroc", href: null },
    ],
  },
  footer: { name: "Hamza Moussaif" },
};

const en: Dictionary = {
  meta: {
    title: "Hamza Moussaif — Java Backend Engineer",
    description:
      "Portfolio of Hamza Moussaif, Java Spring Boot engineer and EMSI MIAGE graduate based in Casablanca.",
  },
  skipToContent: "Skip to content",
  nav: { about: "About", work: "Work", skills: "Skills", projects: "Projects", contact: "Contact" },
  menu: { open: "Open menu", close: "Close menu" },
  theme: { toLight: "Switch to light mode", toDark: "Switch to dark mode" },
  langToggle: { label: "Switch language", target: "FR" },
  hero: {
    eyebrow: "Portfolio · 2026",
    typingText: "Java Backend Engineer · Spring Boot · Microservices",
    pillText: "Open to CDI — Sept 2026",
    viewWork: "View Work",
    downloadCv: "Download CV",
    scroll: "SCROLL",
    badge: "AVAILABLE FOR CDI · CASABLANCA 2026 · ",
  },
  about: {
    label: "About",
    title: "Backend engineer. Clean code. Tested to 100%.",
    body: "Graduating EMSI MIAGE engineer from Casablanca with real-world experience at Crédit du Maroc and Inetum. I build microservices, secure REST APIs, and write tests obsessively. I work in Java and Spring Boot, think in sprints, and communicate fluently in French, Arabic, and English.",
    languages: [
      { flag: "🇫🇷", name: "French" },
      { flag: "🇲🇦", name: "Arabic" },
      { flag: "🇬🇧", name: "English" },
    ],
    stats: [
      { number: 100, suffix: "%", label: "Test Coverage @ CDM" },
      { number: 3, suffix: "", label: "Internships" },
      { number: 21, suffix: "", label: "Certifications" },
      { number: 5, prefix: "~", suffix: "%", label: "API Performance Gain" },
    ],
  },
  experience: {
    label: "Experience",
    title: "Where I've worked.",
    current: "Current",
    items: [
      {
        period: "Feb 2026 – Aug 2026",
        company: "Inetum Offshore",
        role: "Java Spring Boot Developer · Final-year Internship",
        current: true,
        bullets: [
          "Built secured REST APIs and microservices with Spring Boot",
          "Full test coverage with JUnit 5 & Mockito",
          "Worked in complete Agile / Scrum cycles",
        ],
        tags: ["Java", "Spring Boot", "JUnit", "Mockito", "Agile"],
      },
      {
        period: "Jul – Aug 2025",
        company: "Crédit du Maroc (CDM)",
        role: "Backend Development Engineer",
        bullets: [
          "Optimized Java APIs — ~5% measurable performance gain",
          "Achieved 100% test coverage across all services",
          "Authored technical specifications, coordinated frontend/backend",
        ],
        tags: ["Spring Boot", "TDD", "API Optimization", "100% Coverage"],
      },
      {
        period: "Jul 2024",
        company: "Marsa Maroc",
        role: "Web Developer",
        bullets: [
          "Built full vehicle fleet management system in C# / .NET",
          "Designed SQL Server database schema",
          "Delivered supervision dashboard for operations agents",
        ],
        tags: ["C#", ".NET", "SQL Server", "Dashboard"],
      },
    ],
  },
  skills: {
    label: "Skills",
    title: "What I work with.",
    categories: [
      { label: "Languages", tags: ["Java", "Python", "C#", "Dart", "SQL"] },
      {
        label: "Backend",
        tags: ["Spring Boot", "JPA/Hibernate", "Maven", "REST APIs", "Microservices"],
      },
      { label: "Testing", tags: ["JUnit 5", "Mockito", "TDD"] },
      { label: "Tooling", tags: ["Git", "Postman", "Agile/Scrum", "Oracle DB", "SQL Server"] },
      { label: "Data", tags: ["Data Analytics", "IBM Cloud", "Python/Pandas"] },
    ],
  },
  projects: {
    label: "Projects",
    title: "Things I've built.",
    viewDetails: "View details",
    items: [
      {
        number: "01",
        title: "AI Recruitment SaaS",
        description:
          "An intelligent platform that automates job application matching — the system reads candidate profiles, scans open positions, and submits applications autonomously. Built to cut manual recruitment time and remove friction for job seekers.",
        tags: ["AI", "SaaS", "Automation", "Java", "Spring Boot"],
        featured: true,
      },
      {
        number: "02",
        title: "Jira Project Tracker",
        description:
          "Custom dashboard that surfaces sprint progress, task velocity, and team blockers in real time. Built for teams that live in Jira but need a cleaner view.",
        tags: ["Jira API", "Dashboard", "Agile", "Data Viz"],
      },
      {
        number: "03",
        title: "Retro-Documentation Tool",
        description:
          "Internal knowledge-base app that reduced time-to-understanding on legacy deliverables by 50%. Engineers stop asking, they just search.",
        tags: ["Documentation", "Knowledge Base", "DX", "Spring Boot"],
      },
      {
        number: "04",
        title: "Vehicle Fleet Management System",
        description:
          "Full C#/.NET system for Marsa Maroc to track and manage rolling equipment. Includes SQL Server integration, operations dashboard, and real-time status monitoring.",
        tags: ["C#", ".NET", "SQL Server", "Operations", "Dashboard"],
      },
      {
        number: "05",
        title: "Developing a face recognition attendance application",
        description:
          "System for managing student absences using facial recognition technology. Built to streamline attendance tracking and reduce administrative overhead.",
        tags: ["Facial Recognition", "Attendance Management", "Python", "OpenCV", "Flask"],
      },
    ],
  },
  certifications: {
    label: "Certifications",
    title: "How I prove it.",
    items: [
      { initial: "O", name: "Oracle Java SE 17 Developer", issuer: "Oracle" },
      { initial: "M", name: "Meta Back-End Developer", issuer: "Meta" },
      { initial: "I", name: "IBM Full Stack Developer", issuer: "IBM" },
      { initial: "U", name: "Python & Data", issuer: "University of Michigan" },
    ],
  },
  contact: {
    label: "Contact",
    titleLines: ["Let's build", "something", "clean."],
    availability: "Available for CDI — Casablanca & Remote — from September 2026.",
    links: [
      { label: "Email", value: "hamzamoussaif23@gmail.com", href: "mailto:hamzamoussaif23@gmail.com" },
      { label: "Phone", value: "+212 653 609 768", href: "tel:+212653609768" },
      {
        label: "LinkedIn",
        value: "hamza-moussaif ↗",
        href: "https://www.linkedin.com/in/hamza-moussaif-86ba6a228/",
      },
      { label: "Location", value: "Casablanca, Morocco", href: null },
    ],
  },
  footer: { name: "Hamza Moussaif" },
};

export const dictionaries: Record<Lang, Dictionary> = { fr, en };

const LANG_STORAGE_KEY = "lang";

interface LanguageContextValue {
  lang: Lang;
  t: Dictionary;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    const stored = window.localStorage.getItem(LANG_STORAGE_KEY);
    if (stored === "fr" || stored === "en") {
      setLangState(stored);
      return;
    }
    const browserLang = window.navigator.language.toLowerCase().startsWith("fr") ? "fr" : "en";
    setLangState(browserLang);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (next: Lang) => {
    setLangState(next);
    window.localStorage.setItem(LANG_STORAGE_KEY, next);
  };

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      t: dictionaries[lang],
      setLang,
      toggleLang: () => setLang(lang === "fr" ? "en" : "fr"),
    }),
    [lang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
