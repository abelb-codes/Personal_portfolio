import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useMotionValue, useSpring } from "framer-motion";
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  Braces,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronDown,
  Code2,
  Cpu,
  Database,
  Download,
  ExternalLink,
  Github,
  GitCommitHorizontal,
  Globe,
  Heart,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Network,
  Radio,
  Server,
  ShieldCheck,
  Sparkles,
  Star,
  TerminalSquare,
  Workflow,
  Zap,
  BookOpen,
  Cloud,
  Rocket,
  Users,
  BarChart3,
  Copy,
  Check,
  Smartphone,
} from "lucide-react";

type Metric = {
  label: string;
  value: number;
  suffix?: string;
  detail: string;
};

type NodeData = {
  id: string;
  label: string;
  type: string;
  x: number;
  y: number;
  icon: typeof Code2;
  details: string[];
};

type Project = {
  name: string;
  status: string;
  url?: string;
  architecture: string[];
  tech: string[];
  problem: string;
  solution: string;
  architectureSummary: string;
  role: string;
  contribution: string;
  accent: string;
};

type SkillCategory = {
  category: string;
  skills: string[];
  icon: typeof Code2;
};

type LearningItem = {
  title: string;
  description: string;
  icon: typeof Code2;
};

type DeploymentTool = {
  name: string;
  description: string;
  icon: typeof Code2;
};

const contactLinks = {
  email: "mailto:abelbekele785@gmail.com",
  github: "https://github.com/abelb-codes",
  linkedin: "https://www.linkedin.com/in/abel-bekele-302482413",
  phone: "tel:+251915801101",
};

const metrics: Metric[] = [
  { label: "REST API Endpoints", value: 40, suffix: "+", detail: "Secure, role-validated Django views" },
  { label: "Core System Modules", value: 6, suffix: "", detail: "Cases, Chats, AI, Admin, Notifications, Auth" },
  { label: "AI Chats Logged", value: 100, suffix: "+", detail: "Context-aware student advisory sessions" },
  { label: "OTP Verification Rate", value: 100, suffix: "%", detail: "Hashed SHA-256 validation for signups/reset" },
];

const architectureNodes: NodeData[] = [
  {
    id: "frontend",
    label: "Interface Layer",
    type: "React 19 & TS",
    x: 15,
    y: 26,
    icon: Braces,
    details: [
      "Dynamic dashboards for Students, Staff, and Admins",
      "Custom hooks for case queries, messages, and alerts",
      "Strict type validation for all component interfaces"
    ],
  },
  {
    id: "api",
    label: "API Gateway",
    type: "Django REST",
    x: 45,
    y: 18,
    icon: Server,
    details: [
      "Over 40 structured REST API endpoints exposed",
      "Semantic case categorizer and auto-routing rules",
      "Upload security checks for size (5MB) and mime types"
    ],
  },
  {
    id: "auth",
    label: "Identity Service",
    type: "OTP & Session Auth",
    x: 72,
    y: 35,
    icon: ShieldCheck,
    details: [
      "6-digit OTP codes hashed with salt + SECRET_KEY using SHA-256",
      "Enforced rate limit windows and request cooling guards",
      "Domain restrictions for official Hawassa University emails"
    ],
  },
  {
    id: "data",
    label: "Data Store",
    type: "PostgreSQL & SQLite",
    x: 58,
    y: 72,
    icon: Database,
    details: [
      "Durable schemas for Cases, messages, files, and AI history",
      "Foreign key indexing linking students and assigned advisors",
      "Optimized query prefetching for dashboard loads"
    ],
  },
  {
    id: "ops",
    label: "Service Layer",
    type: "SMTP & AI Services",
    x: 22,
    y: 67,
    icon: Workflow,
    details: [
      "OpenAI GPT-4o-mini chatbot with user context injection",
      "Custom local fallback chatbot on OpenAI service offline",
      "SMTP server configuration for mail verification loops"
    ],
  },
];

const projects: Project[] = [
  {
    name: "Academic Advisory & Case Management Portal",
    status: "Hawassa University Enterprise System",
    url: "",
    architecture: ["React 19", "Django REST API", "OpenAI API", "PostgreSQL"],
    tech: ["React 19", "TypeScript", "Django 5.2", "Python", "OpenAI GPT-4o-mini", "Hashed OTP", "PostgreSQL", "CORS & Security Policies", "Tailwind CSS"],
    problem: "University administrations struggle to handle academic complaints, student advising requests, and welfare cases efficiently, leaving students with slow feedback loops and staff with manual routing overhead.",
    solution: "A secure, role-based case resolution portal and AI advisor where students submit complaints, receive automatic routing to department staff, discuss issues in secure threads with file uploads, and chat 24/7 with a personalized AI academic assistant.",
    architectureSummary: "React 19 single-page application communicating with a Django REST API. Leverages SQLite/PostgreSQL schemas, custom cache-based rate limits, secure SHA-256 salted OTP signup/reset, and OpenAI GPT-4o-mini with local rule-based trigger fallbacks.",
    role: "Lead Full-Stack Software Engineer & AI System Architect",
    contribution: "Designed and implemented custom salted SHA-256 OTP verification flows for signup/reset; built a semantic classification engine to auto-route cases based on text hints; integrated OpenAI's API with context-aware user profile injection; built message threads with file size and type validation; and developed custom rate limiters for auth and AI endpoints.",
    accent: "#5eead4",
  },
  {
    name: "Interactive Developer Portfolio OS",
    status: "Interactive Workstation Dashboard",
    url: "",
    architecture: ["React 19", "TypeScript", "Framer Motion", "Tailwind CSS"],
    tech: ["React 19", "TypeScript", "Framer Motion", "Tailwind CSS", "Lucide Icons", "JetBrains Mono Font"],
    problem: "Traditional linear resume templates fail to display system thinking, component architecture, and engineering judgment to technical recruiters.",
    solution: "An interactive developer workstation displaying competencies, career timelines, and deployment credentials inside a dashboard with responsive panels, tabbed consoles, and terminal commands.",
    architectureSummary: "Vite-powered React application using strict TypeScript typings, component isolation, Framer Motion transitions, and fully responsive layouts that adapt from high-res monitors to mobile viewports.",
    role: "UI/UX Designer & Frontend Engineer",
    contribution: "Architected the responsive dashboard structure; developed the SVG interactive system architecture graph; built the command-line terminal emulator; optimized animation curves for high-rate displays; and implemented comprehensive viewport style sheets for mobile responsiveness.",
    accent: "#60a5fa",
  },
];

const skillChains = [
  {
    path: ["React", "TypeScript"],
    use: "Builds typed, responsive frontend interfaces for full-stack web systems.",
  },
  {
    path: ["Django", "REST APIs", "JWT Authentication"],
    use: "Develops backend APIs with authenticated access and clear resource boundaries.",
  },
  {
    path: ["PostgreSQL", "REST APIs"],
    use: "Designs relational data models and connects database behavior to API workflows.",
  },
  {
    path: ["Git & GitHub"],
    use: "Uses version control to manage feature development and maintain clean project history.",
  },
];

const highlights = [
  {
    title: "Secure Authentication Flow",
    detail: "Salted SHA-256 OTP verification codes for user signup and password reset with cooldown guards.",
    icon: ShieldCheck,
  },
  {
    title: "REST API & Rate Limiting",
    detail: "Resource-oriented Django views with file validation and cache-backed windowed rate limiters.",
    icon: Server,
  },
  {
    title: "Relational Database Design",
    detail: "Relational tables in PostgreSQL/SQLite for cases, threads, documents, logs, and notification feeds.",
    icon: Database,
  },
  {
    title: "Context-Aware AI Advisor",
    detail: "OpenAI completions API integration dynamically supplied with student metrics and case histories.",
    icon: Workflow,
  },
];

const commits = [
  ["a18c9d2", "Hawassa University CS Student", "Began computer science studies, mastering data structures and algorithms."],
  ["c42e01f", "Backend Fundamentals with Django", "Built initial database schemas, relational models, and view controllers."],
  ["f77b3a9", "Frontend Engineering with React", "Learned single-page architectures, TypeScript typing, and state hooks."],
  ["19e6aa4", "Case Resolution & Chat Engine", "Developed case submission flows, thread-based messaging, and document uploading."],
  ["8bd28f1", "AI Advisory & Security Hardening", "Integrated OpenAI API, constructed rule fallback, and applied hashed OTP and rate limits."],
  ["main", "CS Graduation & Portfolio OS", "Completed Computer Science degree and deployed the engineering command center."],
];

// New: Categorized Skills
const skillsCategories: SkillCategory[] = [
  {
    category: "Frontend UI/UX",
    skills: ["React 19", "JavaScript", "TypeScript", "HTML5", "CSS3", "Tailwind CSS", "Framer Motion"],
    icon: Braces,
  },
  {
    category: "Backend Services",
    skills: ["Django 5.2", "Django REST Framework", "Python", "OpenAI API Integration"],
    icon: Server,
  },
  {
    category: "Databases & ORMs",
    skills: ["PostgreSQL", "SQLite", "Django ORM", "SQL Schema Design"],
    icon: Database,
  },
  {
    category: "Security & Operations",
    skills: ["Hashed OTP Signup", "Cache Rate Limiting", "Session Authentication", "CORS/CSRF Policies"],
    icon: ShieldCheck,
  },
  {
    category: "Development Tools",
    skills: ["Git & GitHub", "Vite", "Postman API Testing", "VS Code"],
    icon: Zap,
  },
];

// New: Currently Learning
const currentlyLearning: LearningItem[] = [
  {
    title: "Advanced Django Patterns",
    description: "Mastering Django signals, custom query prefetching, and advanced request/response middleware.",
    icon: BookOpen,
  },
  {
    title: "Docker Containerization",
    description: "Packaging distributed React and Django apps for reproducible cloud deployments.",
    icon: Cloud,
  },
  {
    title: "Enterprise System Design",
    description: "Designing highly available message queues, cache architectures, and distributed systems.",
    icon: Network,
  },
  {
    title: "CI/CD & Deployment Loops",
    description: "Building automated testing pipelines, linting guards, and automated cloud delivery loops.",
    icon: Rocket,
  },
  {
    title: "Software Architecture",
    description: "SOLID design principles, clean architecture, and decoupled service layers.",
    icon: Layers3,
  },
];

// New: Deployment Experience
const deploymentTools: DeploymentTool[] = [
  {
    name: "PostgreSQL Config",
    description: "Configuring production database settings, connection limits, and connection timeouts.",
    icon: Database,
  },
  {
    name: "SMTP Mail Gateways",
    description: "Integrating secure SMTP mail transmission for verification OTPs and alerts.",
    icon: Globe,
  },
  {
    name: "Environment Configs",
    description: "Secure handling of OpenAI API keys, database credentials, and production flags.",
    icon: ShieldCheck,
  },
  {
    name: "Security Middleware",
    description: "Configuring CORS origins, trusted CSRF sites, cookie flags, and HTTP headers.",
    icon: ShieldCheck,
  },
  {
    name: "Upload Gateways",
    description: "Restricting file uploads with extension whitelists, MIME validations, and size caps.",
    icon: Cloud,
  },
  {
    name: "Cache Rate Limiting",
    description: "Preventing auth brute-forcing and AI quota abuse via windowed cache gates.",
    icon: Workflow,
  },
];

function CountMetric({ metric, index }: { metric: Metric; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const rawValue = useMotionValue(0);
  const springValue = useSpring(rawValue, { damping: 26, stiffness: 90 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (inView) {
      rawValue.set(metric.value);
    }
  }, [inView, metric.value, rawValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplayValue(Math.round(latest));
    });
  }, [springValue]);

  return (
    <motion.div
      ref={ref}
      className="metric-cell"
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <span className="metric-label">{metric.label}</span>
      <div className="metric-value">
        <motion.span>{displayValue}</motion.span>
        {metric.suffix}
      </div>
      <span className="metric-detail">{metric.detail}</span>
    </motion.div>
  );
}

function ArchitectureDiagram() {
  const [active, setActive] = useState(architectureNodes[1]);

  return (
    <section className="panel xl:col-span-7" id="experience">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Experience as architecture</p>
          <h2>System graph of engineering capability</h2>
        </div>
        <Network className="h-5 w-5 text-signal-cyan" />
      </div>
      <div className="architecture-canvas">
        <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
          {architectureNodes.slice(1).map((node) => (
            <motion.line
              key={node.id}
              x1={`${architectureNodes[0].x}%`}
              y1={`${architectureNodes[0].y}%`}
              x2={`${node.x}%`}
              y2={`${node.y}%`}
              stroke="rgba(94,234,212,.28)"
              strokeWidth="1.5"
              strokeDasharray="5 7"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1 }}
            />
          ))}
        </svg>
        {architectureNodes.map((node) => {
          const Icon = node.icon;
          const selected = active.id === node.id;
          return (
            <motion.button
              key={node.id}
              className={`architecture-node ${selected ? "is-active" : ""}`}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              onClick={() => setActive(node)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className="h-4 w-4" />
              <span>{node.label}</span>
            </motion.button>
          );
        })}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          className="detail-console"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
        >
          <div>
            <span className="console-kicker">{active.type}</span>
            <h3>{active.label}</h3>
          </div>
          <ul>
            {active.details.map((detail) => (
              <li key={detail}>
                <CheckCircle2 className="h-4 w-4 text-signal-green" />
                {detail}
              </li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

function ProjectsSystems() {
  const [open, setOpen] = useState(projects[0].name);

  return (
    <section className="panel xl:col-span-5" id="projects">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Deployable systems</p>
          <h2>Project operations</h2>
        </div>
        <Layers3 className="h-5 w-5 text-signal-amber" />
      </div>
      <div className="space-y-3">
        {projects.map((project) => {
          const expanded = open === project.name;
          return (
            <motion.article
              key={project.name}
              className="system-row"
              style={{ "--accent": project.accent } as React.CSSProperties}
              layout
            >
              <button className="system-trigger" onClick={() => setOpen(expanded ? "" : project.name)}>
                <span>
                  <strong>{project.name}</strong>
                  <em>{project.status}</em>
                </span>
                <ChevronDown className={`h-4 w-4 transition ${expanded ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {expanded && (
                  <motion.div
                    className="system-detail"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <div className="mini-screen">
                      {project.architecture.map((item, index) => (
                        <span key={item}>
                          {item}
                          {index < project.architecture.length - 1 && <ArrowRight className="h-3 w-3" />}
                        </span>
                      ))}
                    </div>
                    <p><b>Problem solved:</b> {project.problem}</p>
                    <p><b>Solution overview:</b> {project.solution}</p>
                    <p><b>System architecture:</b> {project.architectureSummary}</p>
                    <p><b>My contribution:</b> {project.contribution}</p>
                    <p><b>Role:</b> {project.role}</p>
                    {project.url && (
                      <a className="project-link" href={project.url} target="_blank" rel="noreferrer">
                        <ExternalLink className="h-4 w-4" />
                        View live system
                      </a>
                    )}
                    <span className="tech-heading">Technologies used</span>
                    <div className="tech-list">
                      {project.tech.map((tech) => (
                        <span key={tech}>{tech}</span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

function AboutPanel() {
  return (
    <section className="panel about-panel" id="about">
      <div className="section-heading">
        <div>
          <p className="eyebrow">About Abel</p>
          <h2>Software Engineer / Full-Stack Developer</h2>
        </div>
        <BadgeCheck className="h-5 w-5 text-signal-green" />
      </div>
      <div className="about-content">
        <div className="about-section">
          <h3>Professional Background</h3>
          <p>
            I am a software engineer and full-stack developer with a strong foundation in building secure, scalable web systems. 
            I graduated from Hawassa University with a degree in Computer Science and am now focused on developing production-grade applications 
            using modern technologies like React, Django, PostgreSQL, and REST APIs.
          </p>
        </div>
        
        <div className="about-section">
          <h3>Technical Strengths</h3>
          <p>
            My strongest work is in backend API design, authentication systems, PostgreSQL schema design, and integrating 
            frontend interfaces with reliable application services. I specialize in building full-stack systems that are secure, maintainable, 
            and scalable.
          </p>
        </div>
        
        <div className="about-section">
          <h3>Problem-Solving Mindset</h3>
          <p>
            I approach problems systematically, breaking down complex requirements into manageable components. I focus on understanding the "why" 
            behind architectural decisions and write code that is not just functional, but also maintainable and testable.
          </p>
        </div>
        
        <div className="about-section">
          <h3>Continuous Learning</h3>
          <p>
            I am committed to continuous learning and professional growth. I actively explore advanced topics like Docker, System Design, 
            Cloud Deployment, and Software Architecture to stay at the forefront of technology and deliver better solutions.
          </p>
        </div>
      </div>
    </section>
  );
}

function SkillsMap() {
  const [hovered, setHovered] = useState(skillChains[0]);

  return (
    <section className="panel xl:col-span-7" id="skills">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Technology ecosystem</p>
          <h2>Connected engineering stack</h2>
        </div>
        <Cpu className="h-5 w-5 text-signal-blue" />
      </div>
      <div className="ecosystem">
        {skillChains.map((chain) => (
          <div
            key={chain.path.join("-")}
            className="skill-chain"
            onMouseEnter={() => setHovered(chain)}
            onFocus={() => setHovered(chain)}
            tabIndex={0}
          >
            {chain.path.map((skill, index) => (
              <span key={skill} className="skill-node">
                {skill}
                {index < chain.path.length - 1 && <ArrowRight className="h-4 w-4 text-slate-500" />}
              </span>
            ))}
          </div>
        ))}
      </div>
      <motion.div className="usage-panel" key={hovered.path.join("-")} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Radio className="h-4 w-4 text-signal-cyan" />
        <span>{hovered.use}</span>
      </motion.div>
    </section>
  );
}

function EngineeringHighlights() {
  return (
    <section className="panel highlights-panel" id="highlights">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Engineering highlights</p>
          <h2>Credibility signals for hiring teams</h2>
        </div>
        <ShieldCheck className="h-5 w-5 text-signal-cyan" />
      </div>
      <div className="highlight-grid">
        {highlights.map((item) => {
          const Icon = item.icon;
          return (
            <article className="highlight-item" key={item.title}>
              <Icon className="h-5 w-5 text-signal-cyan" />
              <div>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

// New: Categorized Skills Section
function CategorizedSkillsSection() {
  return (
    <section className="panel skills-categories-panel" id="skills-categories">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Professional Skills</p>
          <h2>Categorized Technology Stack</h2>
        </div>
        <Cpu className="h-5 w-5 text-signal-cyan" />
      </div>
      <div className="skills-grid">
        {skillsCategories.map((category) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={category.category}
              className="skill-category-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="skill-category-header">
                <Icon className="h-5 w-5 text-signal-cyan" />
                <h3>{category.category}</h3>
              </div>
              <div className="skill-badges">
                {category.skills.map((skill) => (
                  <span key={skill} className="skill-badge">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

// New: Currently Learning Section
function CurrentlyLearningSection() {
  return (
    <section className="panel learning-panel" id="learning">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Professional Growth</p>
          <h2>Currently Learning & Exploring</h2>
        </div>
        <BookOpen className="h-5 w-5 text-signal-cyan" />
      </div>
      <div className="learning-grid">
        {currentlyLearning.map((item) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              className="learning-card"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="learning-icon">
                <Icon className="h-6 w-6" />
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

// New: Deployment Experience Section
function DeploymentExperienceSection() {
  return (
    <section className="panel deployment-panel" id="deployment">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Production Experience</p>
          <h2>Deployment & DevOps Experience</h2>
        </div>
        <Rocket className="h-5 w-5 text-signal-amber" />
      </div>
      <div className="deployment-grid">
        {deploymentTools.map((tool) => {
          const Icon = tool.icon;
          return (
            <motion.div
              key={tool.name}
              className="deployment-card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Icon className="h-6 w-6 text-signal-amber" />
              <h3>{tool.name}</h3>
              <p>{tool.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

// New: GitHub Profile Section
function GitHubSection() {
  return (
    <section className="panel github-panel" id="github">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Open Source & Version Control</p>
          <h2>GitHub Profile & Contributions</h2>
        </div>
        <Github className="h-5 w-5 text-signal-green" />
      </div>
      <div className="github-content">
        <div className="github-stats">
          <div className="stat-item">
            <BarChart3 className="h-5 w-5 text-signal-cyan" />
            <div>
              <span className="stat-label">Public Repositories</span>
              <span className="stat-value">15+</span>
            </div>
          </div>
          <div className="stat-item">
            <Activity className="h-5 w-5 text-signal-green" />
            <div>
              <span className="stat-label">Active Contributions</span>
              <span className="stat-value">Year-round</span>
            </div>
          </div>
        </div>
        <p className="github-description">
          Actively maintaining projects, contributing to open-source initiatives, and collaborating with the developer community.
        </p>
        <a href={contactLinks.github} target="_blank" rel="noreferrer" className="github-button">
          <Github className="h-4 w-4" />
          Visit GitHub Profile
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}

// New: Footer Component
function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer-panel" id="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Abel Bekele</h3>
          <p>Full-Stack Software Developer | React & Django Specialist</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#skills-categories">Skills</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Connect</h4>
          <div className="footer-social">
            <a href={contactLinks.github} aria-label="GitHub"><Github className="h-4 w-4" /></a>
            <a href={contactLinks.linkedin} aria-label="LinkedIn"><Linkedin className="h-4 w-4" /></a>
            <a href={contactLinks.email} aria-label="Email"><Mail className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {currentYear} Abel Bekele. All rights reserved. | Available for opportunities</p>
      </div>
    </footer>
  );
}

function Journey() {
  return (
    <section className="panel xl:col-span-5" id="journey">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Engineering journey</p>
          <h2>Git commit history</h2>
        </div>
        <GitCommitHorizontal className="h-5 w-5 text-signal-green" />
      </div>
      <div className="commit-log">
        {commits.map(([hash, message, body], index) => (
          <motion.div
            key={message}
            className="commit"
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06 }}
          >
            <span className="commit-dot" />
            <code>{hash}</code>
            <div>
              <strong>{message}</strong>
              <p>{body}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function TerminalMode() {
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<string[]>([
    "portfolio-os v1.0 ready",
    "Run `help` to inspect available commands.",
  ]);

  const commandOutput = useMemo<Record<string, string>>(
    () => ({
      help: "Commands: about, skills, projects, contact, resume, clear",
      about: "Abel Bekele: Software Engineer / Full-Stack Developer and Computer Science graduate from Hawassa University.",
      skills: "React 19, TypeScript, Django 5.2, PostgreSQL, SQLite, OpenAI Integration, Hashed OTP, Rate Limiting.",
      projects: "Student Case Management & Academic Advisory Portal | Developer Portfolio OS.",
      contact: "Email: abelbekele785@gmail.com | Phone: 0915801101 | GitHub: github.com/abelb-codes | LinkedIn: linkedin.com/in/abel-bekele-302482413",
      resume: "Focus: secure full-stack systems, auto-routing algorithms, context-aware AI integration, custom rate limiting, SMTP gateways, and typed React frontends.",
    }),
    [],
  );

  function runCommand(event: FormEvent) {
    event.preventDefault();
    const command = input.trim().toLowerCase();
    if (!command) return;
    if (command === "clear") {
      setLines([]);
      setInput("");
      return;
    }
    setLines((current) => [
      ...current,
      `> ${command}`,
      commandOutput[command] ?? `Command not found: ${command}. Run help.`,
    ]);
    setInput("");
  }

  return (
    <section className="terminal-panel" id="terminal">
      <div className="terminal-top">
        <div className="window-controls"><span /><span /><span /></div>
        <span>terminal-mode</span>
        <TerminalSquare className="h-4 w-4" />
      </div>
      <div className="terminal-body">
        {lines.map((line, index) => (
          <p key={`${line}-${index}`} className={line.startsWith(">") ? "prompt-line" : ""}>{line}</p>
        ))}
        <form onSubmit={runCommand} className="terminal-form">
          <span>$</span>
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            aria-label="Terminal command"
            placeholder="help"
          />
        </form>
      </div>
    </section>
  );
}

function ProfilePanel() {
  return (
    <aside className="profile-panel">
      <div className="profile-image-shell">
        <img src="/profile.png" alt="Abel Bekele professional profile portrait" />
      </div>
      <div>
        <p className="eyebrow">Available for junior software engineering roles</p>
        <h1>Abel Bekele</h1>
        <p className="hero-role">Software Developer</p>
        <p className="hero-role-subtitle">Full-Stack & Django Specialist</p>
        <p className="hero-education">Computer Science Graduate, Hawassa University</p>
        <p className="profile-copy">
          Software Developer with experience building web and mobile applications using React, Django, Flutter, PostgreSQL, and REST APIs. 
          Passionate about creating scalable solutions and solving real-world problems through technology.
        </p>
      </div>
      <div className="hero-actions">
        <a href={contactLinks.email} className="btn-primary">
          <Mail className="h-4 w-4" />
          Contact Me
        </a>
        <a href={contactLinks.github} className="btn-secondary" target="_blank" rel="noreferrer">
          <Github className="h-4 w-4" />
          GitHub
        </a>
        <a href={contactLinks.linkedin} className="btn-secondary" target="_blank" rel="noreferrer">
          <Linkedin className="h-4 w-4" />
          LinkedIn
        </a>
        <a href="/resume.pdf" download className="btn-secondary">
          <Download className="h-4 w-4" />
          Download CV
        </a>
      </div>
      <div className="status-card">
        <span className="live-dot" />
        <strong>Computer Science Graduate, Hawassa University</strong>
      </div>
      <div className="status-card availability-card">
        <span className="live-dot" />
        <strong>Available for Software Engineering Opportunities</strong>
      </div>
      <div className="location-row">
        <MapPin className="h-4 w-4 text-signal-cyan" />
        <span>Open to full-time, remote, hybrid, and onsite roles</span>
      </div>
      <div className="quick-actions">
        <a href={contactLinks.email} aria-label="Email Abel Bekele" title="Email"><Mail className="h-4 w-4" /></a>
        <a href={contactLinks.github} aria-label="GitHub profile" title="GitHub" target="_blank" rel="noreferrer"><Github className="h-4 w-4" /></a>
        <a href={contactLinks.linkedin} aria-label="LinkedIn profile" title="LinkedIn" target="_blank" rel="noreferrer"><Linkedin className="h-4 w-4" /></a>
        <a href="#terminal" aria-label="Terminal" title="Terminal"><TerminalSquare className="h-4 w-4" /></a>
      </div>
    </aside>
  );
}

function ContactSection() {
  return (
    <section className="contact-panel" id="contact">
      <div>
        <p className="eyebrow">Contact</p>
        <h2>Let's Work Together</h2>
        <p>
          Hiring for a junior Software Engineer or Full-Stack Developer who can build reliable web systems, integrate
          APIs, and learn quickly inside a professional engineering team?
        </p>
        <div className="contact-meta">
          <a href={contactLinks.email}>abelbekele785@gmail.com</a>
          <a href={contactLinks.phone}>0915801101</a>
        </div>
      </div>
      <div className="contact-actions">
        <a href={contactLinks.github}><Github className="h-4 w-4" /> GitHub</a>
        <a href={contactLinks.linkedin}><Linkedin className="h-4 w-4" /> LinkedIn</a>
        <a href={contactLinks.email}><Mail className="h-4 w-4" /> Email</a>
      </div>
    </section>
  );
}

export default function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const closeMobileMenu = () => setIsNavOpen(false);

  return (
    <main className="app-shell">
      <div className="grid-overlay" />
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand-lockup">
            <Sparkles className="h-5 w-5 text-signal-cyan" />
            <span>abel-bekele.dev</span>
          </div>
          <button
            className={`nav-toggle ${isNavOpen ? "open" : ""}`}
            onClick={() => setIsNavOpen((current) => !current)}
            aria-label="Toggle navigation menu"
            aria-expanded={isNavOpen}
            type="button"
          >
            <span />
            <span />
            <span />
          </button>
          <nav className={`nav-links ${isNavOpen ? "open" : ""}`} aria-expanded={isNavOpen}>
            <a href="#home" onClick={closeMobileMenu}>Home</a>
            <a href="#about" onClick={closeMobileMenu}>About</a>
            <a href="#projects" onClick={closeMobileMenu}>Projects</a>
            <a href="#skills-categories" onClick={closeMobileMenu}>Skills</a>
            <a href="#experience" onClick={closeMobileMenu}>Experience</a>
            <a href="#learning" onClick={closeMobileMenu}>Learning</a>
            <a href="#deployment" onClick={closeMobileMenu}>Deployment</a>
            <a href="#github" onClick={closeMobileMenu}>GitHub</a>
            <a className="terminal-nav-link" href="#terminal" onClick={closeMobileMenu}>
              <TerminalSquare className="h-4 w-4" />
              Terminal
            </a>
            <a href="#contact" onClick={closeMobileMenu}>Contact</a>
          </nav>
        </div>
      </header>

      <div className="workspace">
        <ProfilePanel />
        <div className="main-panel">
          <section className="dashboard-panel" id="home">
            <div className="dashboard-header">
              <div>
                <p className="eyebrow">Engineering command center</p>
                <h2>Full-stack developer focused on secure, maintainable web systems</h2>
              </div>
              <div className="health-pill">
                <Activity className="h-4 w-4" />
                Interview ready
              </div>
            </div>
            <div className="metrics-grid">
              {metrics.map((metric, index) => (
                <CountMetric key={metric.label} metric={metric} index={index} />
              ))}
            </div>
            <div className="signal-strip">
              <span><Zap className="h-4 w-4" /> REST API design</span>
              <span><Globe className="h-4 w-4" /> Full-stack delivery</span>
              <span><BriefcaseBusiness className="h-4 w-4" /> Job-ready graduate</span>
              <span><ExternalLink className="h-4 w-4" /> System thinking</span>
            </div>
          </section>

          <div className="content-grid">
            <AboutPanel />
            <ArchitectureDiagram />
            <ProjectsSystems />
            <EngineeringHighlights />
            <SkillsMap />
            <CategorizedSkillsSection />
            <Journey />
            <CurrentlyLearningSection />
            <DeploymentExperienceSection />
            <GitHubSection />
          </div>
          <TerminalMode />
          <ContactSection />
          <Footer />
        </div>
      </div>
    </main>
  );
}
