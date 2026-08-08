'use client';

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { AnimatePresence, motion, useInView, useMotionValue, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import {
  ArrowDownRight, ArrowUpRight, Check, ChevronRight, Download, ExternalLink, Linkedin, Mail,
  Menu, Network, PanelTop, Send, ServerCog, Terminal, Workflow, X,
} from 'lucide-react';

const resumePath = '/riddhi-khanpara-resume.pdf';
const navItems = [
  ['home', 'Home'], ['about', 'About'], ['experience', 'Experience'], ['projects', 'Projects'],
  ['skills', 'Skills'], ['education', 'Education'], ['contact', 'Contact'],
] as const;

type Project = {
  name: string; category: string; description: string; problem: string; solution: string;
  features: string[]; stack: string[]; accent: string; link?: string; image?: string;
};
const projects: Project[] = [
  {
    name: 'HoABL', category: 'Real Estate · Live',
    description: 'Digital-first land and property discovery for House of Abhinandan Lodha — CMS-driven pages with enquiry forms as the main conversion path.',
    problem: 'Buyers needed a clear way to explore projects online and reach sales without digging through fragmented information.',
    solution: 'Shipped a production Next.js frontend on headless Strapi, translating Figma into responsive SSR/SSG layouts with SEO, performance, and lead capture built in.',
    features: ['CMS-driven project content', 'Enquiry-led lead generation', 'SSR / SSG for SEO', 'Figma-accurate responsive UI', 'Image & page-speed optimization'],
    stack: ['Next.js', 'Strapi', 'Tailwind CSS', 'SSR / SSG'], accent: 'mint',
    link: 'https://www.hoabl.com/',
    image: '/projects/hoabl.png',
  },
  {
    name: 'GLA Diamond Trading', category: 'Trading · Inventory',
    description: 'Multi-vendor diamond trading workspace with hard inventory rules — ownership, sale state, and duplicate purchases stay explicit.',
    problem: 'Diamond inventory is high-trust: vendors and buyers need clear ownership, and sold stones must not be purchased or resold twice.',
    solution: 'Built transactional UI flows around each stone record — inventory status, vendor boundaries, and sale guardrails that block invalid purchases.',
    features: ['Diamond inventory tracking', 'Multi-vendor support', 'Transaction lifecycle', 'Duplicate-purchase prevention', 'Post-sale resale locks'],
    stack: ['Next.js', 'TanStack Query', 'Axios', 'MUI', 'Tailwind CSS'], accent: 'copper',
    image: '/projects/gla-diamond.jpg',
  },
  {
    name: 'Happy Pet', category: 'Pet Services',
    description: 'Discovery platform connecting breeders and pet seekers across categories, with breed-focused search and profile-led listings.',
    problem: 'Users got lost moving from broad pet browsing to a specific breed without a clear, responsive discovery path.',
    solution: 'Designed a profile-first listing experience with category filters and breed search that stays usable on mobile and desktop.',
    features: ['Breeder profiles', 'Pet listings', 'Multi-category browse', 'Breed-specific search', 'Responsive UI'],
    stack: ['Next.js', 'Tailwind CSS', 'Redux Toolkit', 'Axios'], accent: 'mint',
    image: '/projects/happy-pet.png',
  },
  {
    name: 'WriteSeen', category: 'Publishing',
    description: 'Author publishing platform where readers discover books, purchase titles, and message authors in one product flow.',
    problem: 'Publishing, discovery, checkout, and author chat lived as separate steps instead of one coherent journey.',
    solution: 'Unified author-led discovery with a clear path from browsing a title to purchase and direct communication.',
    features: ['Author publishing', 'Book discovery', 'Purchase flow', 'Author messaging', 'Responsive UI'],
    stack: ['React.js', 'Redux', 'Redux Saga', 'Tailwind CSS'], accent: 'blue',
    image: '/projects/writeseen.png',
  },
  {
    name: 'GMS', category: 'Ops · Pet Grooming',
    description: 'Operations hub for grooming businesses — staff, customers, appointments, services, and role-based access in one place.',
    problem: 'Grooming teams juggled people, bookings, and services across tools without clear roles or a shared operational view.',
    solution: 'Built a role-aware management UI with day-to-day ops views and an analytics dashboard for grooming workflows.',
    features: ['Staff & customer management', 'Appointments & services', 'Role-based access', 'Analytics dashboard'],
    stack: ['Next.js', 'Tailwind CSS', 'Redux Toolkit', 'Axios'], accent: 'copper',
    image: '/projects/gms.png',
  },
];
const experiences = [
  {
    date: 'DEC 2025 — PRESENT', role: 'Full Stack Developer', company: 'Codisco Tech', tag: 'Full Stack',
    points: ['Develop responsive and high-performance web applications using React.js and Next.js.', 'Collaborate with clients to understand requirements and deliver scalable solutions.', 'Focus on clean UI, performance optimization, and user experience.', 'Work with Redux Toolkit and integrate APIs using Axios.', 'Work with modern frontend architecture.'],
  },
  {
    date: 'NOV 2022 — NOV 2025', role: 'Frontend Developer / Team Lead', company: 'TametaTech (Micrasol LLP)', tag: 'Frontend leadership',
    points: ['Led frontend development for multiple projects across different domains.', 'Built scalable applications using Next.js, React, and Tailwind CSS.', 'Managed state using Redux Toolkit and integrated APIs using Axios.', 'Mentored team members and helped ensure timely project delivery.', 'Worked on pet services, marketplaces, and management systems.'],
  },
];
const skillGroups = [
  { title: 'Frontend', icon: PanelTop, items: ['React.js', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap'] },
  { title: 'Backend', icon: ServerCog, items: ['Node.js', 'NestJS'] },
  { title: 'State Management', icon: Workflow, items: ['Redux', 'Redux Toolkit', 'Redux Saga', 'TanStack Query'] },
  { title: 'API & Data', icon: Network, items: ['Axios', 'REST APIs'] },
  { title: 'Tools, Cloud & Other', icon: Terminal, items: ['Git', 'AWS', 'SEO', 'Performance Optimization', 'Responsive Web Design'] },
];
const buildPrinciples = [
  ['01', 'Scalable Frontend Architecture', 'Structure interfaces so the product can grow without making the next feature harder.'],
  ['02', 'Backend API Development', 'Work across the stack with Node.js and NestJS as part of a full-stack toolkit.'],
  ['03', 'State Management', 'Choose clear state boundaries with Redux, Redux Toolkit, Redux Saga, or TanStack Query.'],
  ['04', 'API Integration', 'Connect product surfaces to REST APIs with deliberate loading and data flows.'],
  ['05', 'Responsive UI', 'Make the experience feel considered from a compact screen to a wide desktop.'],
  ['06', 'Performance Optimization', 'Keep the interface fast, focused, and respectful of the user’s attention.'],
  ['07', 'SEO', 'Build discoverable product surfaces with attention to structure and content.'],
  ['08', 'User Experience', 'Translate requirements into flows that are easy to understand and hard to misuse.'],
  ['09', 'Team Collaboration', 'Share context, mentor developers, and keep delivery moving with the team.'],
];

const premiumEase = [0.16, 1, 0.3, 1] as const;
const springTap = { type: 'spring', stiffness: 400, damping: 22 } as const;

type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';

const revealFrom: Record<RevealDirection, { opacity: number; x?: number; y?: number; scale?: number; filter?: string }> = {
  up: { opacity: 0, y: 48 },
  down: { opacity: 0, y: -32 },
  left: { opacity: 0, x: -40 },
  right: { opacity: 0, x: 40 },
  scale: { opacity: 0, y: 28, scale: 0.94 },
  fade: { opacity: 0 },
};

const revealTo = { opacity: 1, x: 0, y: 0, scale: 1, filter: 'blur(0px)' };

function Reveal({
  children,
  delay = 0,
  className = '',
  direction = 'up',
  duration = 0.75,
  amount = 0.18,
  contents = false,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: RevealDirection;
  duration?: number;
  amount?: number;
  contents?: boolean;
}) {
  const elementRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(elementRef, { once: true, amount, margin: '0px 0px -8% 0px' });
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.div
      ref={elementRef}
      className={className}
      style={contents ? { display: 'contents' } : undefined}
      initial={prefersReducedMotion ? false : revealFrom[direction]}
      animate={isInView ? revealTo : undefined}
      transition={{ duration, delay, ease: premiumEase }}
    >
      {children}
    </motion.div>
  );
}

function SectionReveal({ children, className = '', id }: { children: ReactNode; className?: string; id?: string }) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.12, margin: '0px 0px -10% 0px' });
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial={prefersReducedMotion ? false : { opacity: 0.35 }}
      animate={isInView ? { opacity: 1 } : undefined}
      transition={{ duration: 0.55, ease: premiumEase }}
    >
      {children}
    </motion.section>
  );
}

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />;
}

function CursorGlow() {
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(-240);
  const y = useMotionValue(-240);
  const springX = useSpring(x, { stiffness: 90, damping: 24, mass: .45 });
  const springY = useSpring(y, { stiffness: 90, damping: 24, mass: .45 });

  useEffect(() => {
    if (prefersReducedMotion) return;
    const handlePointerMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [prefersReducedMotion, x, y]);

  if (prefersReducedMotion) return null;
  return <motion.div className="cursor-glow" style={{ x: springX, y: springY }} aria-hidden="true" />;
}

function Navbar({ active, mobileOpen, setMobileOpen }: { active: string; mobileOpen: boolean; setMobileOpen: (value: boolean) => void }) {
  return (
    <div className="nav-wrap">
      <nav className="nav" aria-label="Primary navigation">
        <button className="brand" onClick={() => scrollToSection('home')} aria-label="Go to home">
          <span className="brand-mark">RK</span><span>Riddhi Khanpara</span>
        </button>
        <div className="nav-links">
          {navItems.map(([id, label]) => <button key={id} className={`nav-link ${active === id ? 'active' : ''}`} onClick={() => scrollToSection(id)}>{active === id && <motion.span className="nav-active-pill" layoutId="nav-active-pill" transition={{ type: 'spring', stiffness: 420, damping: 30 }} />}<span>{label}</span></button>)}
        </div>
        <motion.a className="nav-action" href="mailto:riddhikhanpara1605@gmail.com" whileHover={{ scale: 1.04 }} whileTap={{ scale: .97 }} transition={springTap}><Mail size={14} /> Let’s talk</motion.a>
        <button className="menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-expanded={mobileOpen} aria-label={mobileOpen ? 'Close menu' : 'Open menu'}>{mobileOpen ? <X size={22} /> : <Menu size={22} />}</button>
      </nav>
      <AnimatePresence>
        {mobileOpen && <motion.div className="mobile-nav" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
          {navItems.map(([id, label]) => <button key={id} className={`nav-link ${active === id ? 'active' : ''}`} onClick={() => { scrollToSection(id); setMobileOpen(false); }}>{label}</button>)}
        </motion.div>}
      </AnimatePresence>
    </div>
  );
}

const heroSnippets = [
  { file: 'page.tsx', lines: ['export default function Page() {', '  return <ProductShell />', '}'] },
  { file: 'api.route.ts', lines: ['app.post("/enquiry", async (req) => {', '  return saveLead(req.body)', '})'] },
  { file: 'schema.ts', lines: ['model Project {', '  id     String @id', '  status Status', '}'] },
] as const;

function HeroTerminal() {
  const reduceMotion = useReducedMotion();
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [typed, setTyped] = useState('');
  const [lineIndex, setLineIndex] = useState(0);
  const snippet = heroSnippets[snippetIndex];
  const fullText = snippet.lines.join('\n');

  useEffect(() => {
    if (reduceMotion) {
      setTyped(fullText);
      return;
    }
    setTyped('');
    setLineIndex(0);
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setTyped(fullText.slice(0, i));
      setLineIndex(fullText.slice(0, i).split('\n').length - 1);
      if (i >= fullText.length) {
        window.clearInterval(id);
        window.setTimeout(() => setSnippetIndex((n) => (n + 1) % heroSnippets.length), 1600);
      }
    }, 28);
    return () => window.clearInterval(id);
  }, [snippetIndex, fullText, reduceMotion]);

  return (
    <div className="hero-terminal" aria-hidden="true">
      <div className="terminal-aura" />
      <motion.div
        className="terminal-window"
        initial={{ opacity: 0, y: 24, rotateX: 8 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="terminal-chrome">
          <span className="terminal-dots"><i /><i /><i /></span>
          <span className="terminal-path">~/riddhi/{snippet.file}</span>
          <span className="terminal-live"><span className="terminal-pulse" /> live</span>
        </div>
        <pre className="terminal-body">
          <code>
            {typed.split('\n').map((line, idx) => (
              <span key={`${snippet.file}-${idx}`} className="terminal-line">
                <span className="terminal-gutter">{String(idx + 1).padStart(2, ' ')}</span>
                <span className="terminal-code">{line}{!reduceMotion && idx === lineIndex && idx === typed.split('\n').length - 1 ? <span className="terminal-caret" /> : null}</span>
              </span>
            ))}
          </code>
        </pre>
        <div className="terminal-status">
          <span>TypeScript · strict</span>
          <span>SSR ready</span>
          <span>0 errors</span>
        </div>
      </motion.div>
      <motion.div
        className="terminal-chip terminal-chip-a"
        animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <PanelTop size={14} /> UI systems
      </motion.div>
      <motion.div
        className="terminal-chip terminal-chip-b"
        animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
      >
        <ServerCog size={14} /> APIs
      </motion.div>
      <motion.div
        className="terminal-chip terminal-chip-c"
        animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
      >
        <Network size={14} /> Data
      </motion.div>
    </div>
  );
}

function Hero() {
  return <section id="home" className="hero">
    <div className="hero-grid-lines" aria-hidden="true" />
    <div className="glow hero-glow" />
    <div className="container-wide">
      <div className="hero-grid">
        <div>
          <Reveal><div className="eyebrow"><span className="eyebrow-dot" /> Open to full-stack roles</div></Reveal>
          <Reveal delay={.08}><h1 className="hero-title display">Hi, I’m<br /><span className="outline">Riddhi</span><br />Khanpara<span style={{ color: 'var(--copper)' }}>.</span></h1></Reveal>
          <Reveal delay={.16}><p className="hero-copy">Full Stack Developer building scalable, responsive and high-performance web applications with modern frontend and backend technologies.</p><div className="hero-tech">React.js&nbsp; · &nbsp;Next.js&nbsp; · &nbsp;TypeScript&nbsp; · &nbsp;Node.js&nbsp; · &nbsp;NestJS</div></Reveal>
          <Reveal delay={.24}><div className="hero-actions">
            <motion.button className="button button-primary" onClick={() => scrollToSection('projects')} whileHover={{ scale: 1.03 }} whileTap={{ scale: .97 }} transition={springTap}>View projects <ArrowDownRight size={16} /></motion.button>
            <motion.a className="button button-ghost" href={resumePath} download="Riddhi-Khanpara-Resume.pdf" whileHover={{ scale: 1.03 }} whileTap={{ scale: .97 }} transition={springTap}><Download size={15} /> Download resume</motion.a>
            <motion.button className="button button-ghost" onClick={() => scrollToSection('contact')} whileHover={{ scale: 1.03 }} whileTap={{ scale: .97 }} transition={springTap}>Contact me <ArrowUpRight size={15} /></motion.button>
          </div></Reveal>
        </div>
        <Reveal delay={.18} direction="scale" className="hero-aside">
          <HeroTerminal />
          <span className="hero-aside-caption">frontend-first / full-stack range</span>
        </Reveal>
      </div>
      <div className="hero-foot">
        <Reveal delay={0.35} direction="fade"><span className="mono">03+ years / building for the web</span></Reveal>
        <Reveal delay={0.42} direction="right"><span className="scroll-cue"><span className="scroll-line" /> Scroll to explore</span></Reveal>
      </div>
    </div>
  </section>;
}

function About() {
  const focuses = [
    { n: '01', title: 'Frontend craft', body: 'React, Next.js, TypeScript and Tailwind — responsive UI, performance, SEO, and interfaces that feel considered.' },
    { n: '02', title: 'Full-stack range', body: 'Comfortable across APIs and NestJS/Node when the product needs it — not just the view layer.' },
    { n: '03', title: 'Team & delivery', body: 'Client collaboration, clear requirements, mentoring, and shipping scalable apps with the team.' },
  ] as const;

  return (
    <SectionReveal id="about" className="section about-section">
      <div className="container-wide">
        <div className="about-layout">
          <Reveal direction="left">
            <div className="about-intro">
              <span className="section-label">01 / About</span>
              <h2 className="section-title">Frontend-first.<br /><span className="about-title-accent">Full-stack ready.</span></h2>
              <p className="about-quote">I turn product requirements into interfaces people can trust — and systems that stay maintainable as they grow.</p>
            </div>
          </Reveal>
          <Reveal direction="right" delay={0.12}>
            <div className="about-copy">
              <p className="section-lede">I’m a Full Stack Developer with 3+ years building web products. My strongest edge is frontend craft with React.js and Next.js, backed by the range to contribute across the stack when the work calls for it.</p>
              <p className="section-lede" style={{ marginTop: 16 }}>I care about clear product behavior, client collaboration, and making complex flows feel simple — whether that’s a real-estate platform, a trading system, or an ops tool.</p>
              <div className="signal-row">
                {[
                  ['3+', 'years shipping'],
                  ['5', 'featured products'],
                  ['FE', 'core strength'],
                ].map(([value, label], index) => (
                  <Reveal key={label} delay={0.2 + index * 0.08} direction="up" contents>
                    <div className="signal"><strong>{value}</strong><span>{label}</span></div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
        <div className="about-focus">
          {focuses.map((item, index) => (
            <Reveal key={item.n} delay={0.1 + index * 0.1} direction="up" contents>
              <div className="about-focus-item">
                <span className="about-focus-n">{item.n}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}

function Experience() {
  return (
    <SectionReveal id="experience" className="section">
      <div className="container-wide">
        <Reveal direction="left">
          <span className="section-label">02 / Experience</span>
          <h2 className="section-title">A track record<br />of making things work.</h2>
        </Reveal>
        <div className="timeline">
          {experiences.map((item, index) => (
            <Reveal key={item.company} delay={0.1 + index * 0.14} direction="up" className="timeline-item">
              <div className="timeline-date">{item.date}</div>
              <div className="timeline-content">
                <h3 className="timeline-role">{item.role}</h3>
                <p className="timeline-company">{item.company}</p>
                <span className="role-tag">{item.tag}</span>
                <ul className="timeline-list">{item.points.map(point => <li key={point}>{point}</li>)}</ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}

function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: (project: Project) => void }) {
  const webp = project.image?.match(/\.png$/i) ? project.image.replace(/\.png$/i, '.webp') : null;
  const direction: RevealDirection = index % 2 === 0 ? 'left' : 'right';
  return (
    <Reveal delay={index * 0.08} direction={direction} amount={0.15}>
      <article className="project-card">
        <button type="button" className="project-media" onClick={() => onOpen(project)} aria-label={`View details for ${project.name}`}>
          {project.image ? (
            <picture>
              {webp ? <source srcSet={webp} type="image/webp" /> : null}
              <img className="project-thumb" src={project.image} alt="" width={960} height={600} loading="lazy" decoding="async" />
            </picture>
          ) : (
            <div className="project-thumb project-thumb-empty" aria-hidden="true" />
          )}
          <span className="project-index">0{index + 1}</span>
        </button>
        <div className="project-card-inner">
          <div>
            <p className="project-category">{project.category}</p>
            <h3 className="project-title">{project.name}</h3>
            <p className="project-description">{project.description}</p>
            <div className="project-tags">{project.stack.map(tech => <span className="tag" key={tech}>{tech}</span>)}</div>
          </div>
          <button className="project-cta" onClick={() => onOpen(project)} aria-label={`Open ${project.name}`}><ChevronRight size={18} /></button>
        </div>
      </article>
    </Reveal>
  );
}

function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  return (
    <SectionReveal id="projects" className="section projects-section">
      <div className="container-wide">
        <Reveal direction="up">
          <span className="section-label">03 / Selected work</span>
          <div className="split-heading" style={{ marginTop: 16 }}>
            <h2 className="section-title" style={{ marginTop: 0 }}>Shipped products,<br />clear systems.</h2>
            <p className="section-lede">Real estate, diamond trading, pet services, publishing, and ops tools — each one a frontend surface with real business rules underneath.</p>
          </div>
        </Reveal>
        <div className="project-list">{projects.map((project, index) => <ProjectCard key={project.name} project={project} index={index} onOpen={setSelected} />)}</div>
      </div>
      <AnimatePresence>
        {selected && (
          <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}>
            <motion.div
              className="modal"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.35, ease: premiumEase }}
              onClick={event => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
            >
              <div className="modal-head">
                <div>
                  <h2 id="project-modal-title">{selected.name}</h2>
                  <p className="project-category">{selected.category}</p>
                </div>
                <button className="modal-close" onClick={() => setSelected(null)} aria-label="Close project details"><X size={21} /></button>
              </div>
              {selected.image ? (
                <picture>
                  {/\.png$/i.test(selected.image) ? <source srcSet={selected.image.replace(/\.png$/i, '.webp')} type="image/webp" /> : null}
                  <img className="modal-preview" src={selected.image} alt={`${selected.name} preview`} width={960} height={540} loading="eager" decoding="async" />
                </picture>
              ) : null}
              <div className="modal-content">
                <div className="detail-block"><h4>Business problem</h4><p>{selected.problem}</p></div>
                <div className="detail-block"><h4>Solution</h4><p>{selected.solution}</p></div>
                <div className="detail-block"><h4>Key features</h4><ul>{selected.features.map(feature => <li key={feature}>{feature}</li>)}</ul></div>
                <div className="detail-block"><h4>Technology stack</h4><div className="project-tags">{selected.stack.map(tech => <span className="tag" key={tech}>{tech}</span>)}</div></div>
                {selected.link ? <a className="button button-primary" style={{ width: 'fit-content', marginTop: 18 }} href={selected.link} target="_blank" rel="noreferrer">Visit live site <ExternalLink size={14} /></a> : null}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionReveal>
  );
}

function Skills() {
  const architecture = [['01', 'User', 'the person at the center'], ['02', 'Next.js / React.js Frontend', 'responsive product surface'], ['03', 'API Layer', 'the connection between experiences'], ['04', 'Node.js / NestJS Backend', 'server-side range'], ['05', 'Database / External Services', 'conceptual downstream systems']];
  return (
    <SectionReveal id="skills" className="section">
      <div className="container-wide">
        <Reveal direction="left">
          <span className="section-label">04 / Skills & approach</span>
          <h2 className="section-title">The stack is a tool.<br />The thinking is the edge.</h2>
        </Reveal>
        <div className="skills-layout">
          <Reveal delay={0.1} direction="up">
            <div>
              <p className="skill-intro">A frontend-first full-stack toolkit, grounded in clear state, API integration, responsive design, and the practical work of turning requirements into reliable products.</p>
              <div className="architecture">
                <p className="mono" style={{ color: 'var(--paper-muted)', fontSize: 10, margin: '0 0 2px' }}>CONCEPTUAL ARCHITECTURE / NOT A SPECIFIC PROJECT</p>
                {architecture.map((node, index) => (
                  <Reveal key={node[1]} delay={0.12 + index * 0.07} direction="left">
                    <div>
                      <div className="arch-node"><span className="number">{node[0]}</span><div><strong>{node[1]}</strong><span>{node[2]}</span></div></div>
                      {index < architecture.length - 1 && <div className="arch-connector" />}
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
          <div className="skill-groups">
            {skillGroups.map((group, index) => {
              const Icon = group.icon;
              return (
                <Reveal key={group.title} delay={0.08 + index * 0.07} direction="scale">
                  <div className="skill-group">
                    <div className="skill-group-title"><Icon size={16} />{group.title}</div>
                    <div className="skill-badges">{group.items.map(item => <span className="skill-badge" key={item}>{item}</span>)}</div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
        <div style={{ marginTop: 96 }}>
          <Reveal direction="up"><span className="section-label">How I build products</span></Reveal>
          <div className="build-grid">
            {buildPrinciples.map(([number, title, description], index) => (
              <Reveal key={number} delay={0.05 + index * 0.05} direction="up" amount={0.2} contents>
                <div className="build-card">
                  <span className="build-number">{number}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}

function Education() {
  return (
    <SectionReveal id="education" className="section">
      <div className="container-wide">
        <Reveal direction="up">
          <span className="section-label">05 / Education</span>
          <div className="split-heading" style={{ marginTop: 16 }}>
            <h2 className="section-title" style={{ marginTop: 0 }}>Always learning.<br />Always shipping.</h2>
            <p className="section-lede">A foundation in computer applications, carried forward through product work and the everyday practice of staying curious.</p>
          </div>
        </Reveal>
        <div className="education-grid">
          <Reveal delay={0.12} direction="left">
            <div className="education-card">
              <span className="education-year">2023 — 2025</span>
              <h3>Master of Computer Applications (MCA)</h3>
              <p>JAIN (Deemed-to-be University)</p>
            </div>
          </Reveal>
          <Reveal delay={0.2} direction="right">
            <div className="education-card">
              <span className="education-year">2020 — 2023</span>
              <h3>Bachelor of Computer Applications (BCA)</h3>
              <p>Sutex Bank College of Computer Applications & Science</p>
            </div>
          </Reveal>
        </div>
      </div>
    </SectionReveal>
  );
}

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  function handleSubmit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSubmitted(true); }
  return (
    <SectionReveal id="contact" className="section contact-section">
      <div className="container-wide">
        <Reveal direction="fade"><span className="section-label">06 / Contact</span></Reveal>
        <div className="contact-wrap">
          <Reveal direction="left" delay={0.08}>
            <div>
              <h2 className="contact-big">Let’s build<br /><span style={{ color: 'var(--mint)' }}>something</span><br />useful.</h2>
              <p className="contact-copy">Have a thoughtful product, a complicated interface, or a team that cares about the details? I’d like to hear about it.</p>
              <div className="contact-links">
                <a className="contact-link" href="mailto:riddhikhanpara1605@gmail.com"><Mail size={17} /> riddhikhanpara1605@gmail.com <ArrowUpRight size={14} /></a>
                <a className="contact-link" href="https://www.linkedin.com/in/riddhi-khanpara/" target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn profile <ExternalLink size={14} /></a>
                <motion.a className="button button-ghost" style={{ width: 'fit-content', marginTop: 16 }} href={resumePath} download="Riddhi-Khanpara-Resume.pdf" whileHover={{ scale: 1.03 }} whileTap={{ scale: .97 }} transition={springTap}><Download size={15} /> Download resume</motion.a>
              </div>
            </div>
          </Reveal>
          <Reveal direction="right" delay={0.16}>
            <form className="contact-form" onSubmit={handleSubmit}>
              <p className="form-note">Prefer email or LinkedIn for the fastest reply — or send a short note below.</p>
              {submitted ? (
                <div className="form-success"><Check size={16} style={{ verticalAlign: 'middle', marginRight: 7 }} /> Thanks — please follow up by email or LinkedIn so nothing gets missed.</div>
              ) : (
                <>
                  <div className="field"><label htmlFor="name">Name</label><input id="name" name="name" required placeholder="Your name" /></div>
                  <div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" required placeholder="you@company.com" /></div>
                  <div className="field"><label htmlFor="message">Message</label><textarea id="message" name="message" required placeholder="Tell me a little about what you’re building…" /></div>
                  <motion.button className="button button-primary form-submit" type="submit" whileHover={{ scale: 1.015 }} whileTap={{ scale: .985 }} transition={springTap}>Draft message <Send size={15} /></motion.button>
                </>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </SectionReveal>
  );
}

export function Portfolio() {
  const [active, setActive] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const sections = navItems.map(([id]) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); }), { rootMargin: '-25% 0px -65% 0px' });
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  return <div className="site-shell"><ScrollProgress /><CursorGlow /><Navbar active={active} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} /><main><Hero /><About /><Experience /><Projects /><Skills /><Education /><Contact /></main>
    <Reveal direction="up" amount={0.2}>
      <footer className="footer">
        <div className="container-wide footer-inner">
          <div className="footer-brand">
            <span className="footer-mark">RK</span>
            <div>
              <strong>Riddhi Khanpara</strong>
              <p>Full Stack Developer · React, Next.js & NestJS</p>
            </div>
          </div>
          <nav className="footer-nav" aria-label="Footer">
            {([['projects', 'Projects'], ['experience', 'Experience'], ['skills', 'Skills'], ['contact', 'Contact']] as const).map(([id, label]) => (
              <button key={id} type="button" onClick={() => scrollToSection(id)}>{label}</button>
            ))}
          </nav>
          <div className="footer-actions">
            <a href="mailto:riddhikhanpara1605@gmail.com" aria-label="Email"><Mail size={15} /></a>
            <a href="https://www.linkedin.com/in/riddhi-khanpara/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={15} /></a>
            <a href={resumePath} download="Riddhi-Khanpara-Resume.pdf" aria-label="Download resume"><Download size={15} /></a>
            <button type="button" className="footer-top" onClick={() => scrollToSection('home')}>
              Top <ArrowUpRight size={13} />
            </button>
          </div>
        </div>
        <div className="container-wide footer-meta">
          <span>© {new Date().getFullYear()} Riddhi Khanpara</span>
          <span>Built with care · frontend-first</span>
        </div>
      </footer>
    </Reveal>
  </div>;
}
