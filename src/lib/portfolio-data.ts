export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const aboutStats = [
  { number: 100, suffix: "%", label: "Test Coverage @ CDM" },
  { number: 3, suffix: "", label: "Internships" },
  { number: 21, suffix: "", label: "Certifications" },
  { number: 5, prefix: "~", suffix: "%", label: "API Performance Gain" },
];

export const languages = [
  { flag: "🇫🇷", name: "Français" },
  { flag: "🇲🇦", name: "Arabe" },
  { flag: "🇬🇧", name: "English" },
];

export const experiences = [
  {
    period: "Feb 2026 – Aug 2026",
    company: "Inetum Offshore",
    role: "Développeur Java Spring Boot · PFE",
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
    role: "Ingénieur Développement Backend",
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
    role: "Développeur Web",
    bullets: [
      "Built full vehicle fleet management system in C# / .NET",
      "Designed SQL Server database schema",
      "Delivered supervision dashboard for operations agents",
    ],
    tags: ["C#", ".NET", "SQL Server", "Dashboard"],
  },
];

export const skillCategories = [
  { label: "Languages", tags: ["Java", "Python", "C#", "Dart", "SQL"] },
  {
    label: "Backend",
    tags: ["Spring Boot", "JPA/Hibernate", "Maven", "REST APIs", "Microservices"],
  },
  { label: "Testing", tags: ["JUnit 5", "Mockito", "TDD"] },
  { label: "Tooling", tags: ["Git", "Postman", "Agile/Scrum", "Oracle DB", "SQL Server"] },
  { label: "Data", tags: ["Data Analytics", "IBM Cloud", "Python/Pandas"] },
];

export const projects = [
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
];

export const certifications = [
  { initial: "O", name: "Oracle Java SE 17 Developer", issuer: "Oracle" },
  { initial: "M", name: "Meta Back-End Developer", issuer: "Meta" },
  { initial: "I", name: "IBM Full Stack Developer", issuer: "IBM" },
  { initial: "U", name: "Python & Data", issuer: "University of Michigan" },
];

export const contact = {
  email: "hamzamoussaif23@gmail.com",
  phone: "+212 653 609 768",
  location: "Casablanca, Morocco",
  linkedin: "https://www.linkedin.com/in/hamza-moussaif-86ba6a228/",
};

export const contactLinks = [
  { label: "Email", value: contact.email, href: `mailto:${contact.email}` },
  { label: "Phone", value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, "")}` },
  { label: "LinkedIn", value: "hamza-moussaif ↗", href: contact.linkedin },
  { label: "Location", value: contact.location, href: null as string | null },
];
