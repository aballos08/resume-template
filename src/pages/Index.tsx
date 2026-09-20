import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Terminal,
  Users,
  Mail,
  MapPin,
  ExternalLink,
  Star,
  GitFork,
  Code2,
  Briefcase,
  GraduationCap,
  Cpu,
  Award,
  ChevronRight,
  Download,
  Globe,
  GitBranch,
} from "lucide-react";

const TABS = ["resume", "github", "community"] as const;
type Tab = (typeof TABS)[number];

// ── Edit your data here ───────────────────────────────────────────────────────
const profile = {
  name: "Your Name",
  title: "Senior Software Engineer",
  location: "San Francisco, CA",
  email: "you@example.com",
  website: "yoursite.dev",
  summary:
    "Write a short bio here. What you build, what you care about, and what makes you tick.",
};

const experience = [
  {
    company: "Company A",
    role: "Staff Engineer",
    period: "2022 — Present",
    bullets: [
      "Key achievement or responsibility",
      "Another impact metric or project",
      "Team or process improvement",
    ],
  },
  {
    company: "Company B",
    role: "Senior Engineer",
    period: "2019 — 2022",
    bullets: [
      "Key achievement or responsibility",
      "Another impact metric or project",
      "Team or process improvement",
    ],
  },
];

const education = [
  {
    school: "Your University",
    degree: "B.S. Computer Science",
    period: "2013 — 2017",
    note: "Honors, awards, or track",
  },
];

const skills = [
  { category: "Languages", items: ["TypeScript", "Go", "Rust", "Python"] },
  { category: "Infrastructure", items: ["Kubernetes", "Terraform", "AWS"] },
  { category: "Frontend", items: ["React", "Next.js", "Vite"] },
  { category: "Data", items: ["PostgreSQL", "Redis", "Kafka"] },
];

const repos = [
  {
    name: "your-repo",
    description: "Short description of what this project does and why it matters",
    lang: "TypeScript",
    stars: 0,
    forks: 0,
    url: "https://github.com/yourusername/your-repo",
  },
];

const langColors: Record<string, string> = {
  TypeScript: "#3178c6",
  Go: "#00add8",
  Rust: "#dea584",
  Python: "#3572a5",
  Ruby: "#cc342d",
  HCL: "#7b42bc",
};

const communities = [
  {
    name: "Hacker News",
    role: "Active contributor",
    handle: "@yourhandle",
    joined: "2018",
    karma: "1 200",
    url: "https://news.ycombinator.com",
    description: "What you discuss and contribute there.",
  },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function Prompt({ text }: { text: string }) {
  return (
    <span className="font-mono text-xs text-primary/60 select-none">
      <span className="text-primary/40">~/</span>
      <span className="text-primary/70">{text}</span>
      <span className="text-primary animate-pulse">▊</span>
    </span>
  );
}

function SectionLabel({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <Icon className="w-4 h-4 text-primary" />
      <span className="font-mono text-xs tracking-widest uppercase text-primary/80">{label}</span>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}

function ResumeTab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
      className="space-y-10"
    >
      <section>
        <SectionLabel icon={Briefcase} label="Experience" />
        <div className="space-y-8">
          {experience.map((job, i) => (
            <motion.div
              key={job.company}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-1"
            >
              <div>
                <div className="flex items-center gap-2">
                  <ChevronRight className="w-3 h-3 text-primary shrink-0" />
                  <span className="font-mono font-semibold text-foreground">{job.role}</span>
                  <span className="text-muted-foreground font-mono text-xs">@ {job.company}</span>
                </div>
                <ul className="mt-2 space-y-1 pl-5">
                  {job.bullets.map((b) => (
                    <li key={b} className="text-sm text-muted-foreground flex gap-2">
                      <span className="text-primary/50 select-none shrink-0">—</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <span className="font-mono text-xs text-primary/60 whitespace-nowrap md:text-right">
                {job.period}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      <section>
        <SectionLabel icon={GraduationCap} label="Education" />
        {education.map((e) => (
          <div key={e.school} className="flex flex-col md:flex-row md:justify-between gap-1">
            <div>
              <div className="flex items-center gap-2">
                <ChevronRight className="w-3 h-3 text-primary shrink-0" />
                <span className="font-mono font-semibold text-foreground">{e.degree}</span>
                <span className="text-muted-foreground font-mono text-xs">@ {e.school}</span>
              </div>
              <p className="pl-5 text-sm text-muted-foreground mt-1">{e.note}</p>
            </div>
            <span className="font-mono text-xs text-primary/60 whitespace-nowrap md:text-right">
              {e.period}
            </span>
          </div>
        ))}
      </section>

      <section>
        <SectionLabel icon={Cpu} label="Skills" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {skills.map((s, i) => (
            <motion.div
              key={s.category}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.06 }}
              className="border border-border rounded p-3 bg-card"
            >
              <p className="font-mono text-xs text-primary/70 mb-2 tracking-wider uppercase">
                {s.category}
              </p>
              <div className="flex flex-wrap gap-2">
                {s.items.map((item) => (
                  <span
                    key={item}
                    className="font-mono text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section>
        <SectionLabel icon={Award} label="Recognition" />
        <div className="space-y-1 pl-1">
          {[
            "Award or speaking engagement — Year",
            "Open source contribution or publication",
          ].map((item) => (
            <div key={item} className="flex gap-2 items-center text-sm text-muted-foreground">
              <span className="text-primary text-xs select-none">✦</span>
              {item}
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}

function GithubTab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          { label: "Public repos", value: "—" },
          { label: "Total stars", value: "—" },
          { label: "Contributions", value: "—" },
        ].map((s) => (
          <div key={s.label} className="border border-border rounded p-3 bg-card text-center">
            <p className="font-mono text-xl font-bold text-primary">{s.value}</p>
            <p className="font-mono text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <SectionLabel icon={Code2} label="Pinned Repositories" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {repos.map((repo, i) => (
          <motion.a
            key={repo.name}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="border border-border rounded p-4 bg-card hover:border-primary/50 hover:bg-card/80 transition-colors group cursor-pointer block"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-1.5">
                <GitBranch className="w-3.5 h-3.5 text-primary/60" />
                <span className="font-mono text-sm font-semibold text-primary group-hover:text-primary/80">
                  {repo.name}
                </span>
              </div>
              <ExternalLink className="w-3 h-3 text-muted-foreground/40 group-hover:text-primary/60 transition-colors shrink-0 mt-0.5" />
            </div>
            <p className="text-xs text-muted-foreground mb-3 leading-relaxed">{repo.description}</p>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ background: langColors[repo.lang] ?? "#888" }}
                />
                <span className="font-mono text-xs text-muted-foreground">{repo.lang}</span>
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
                <Star className="w-3 h-3" /> {repo.stars.toLocaleString()}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
                <GitFork className="w-3 h-3" /> {repo.forks}
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}

function CommunityTab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <SectionLabel icon={Users} label="Communities & Forums" />
      <div className="space-y-3">
        {communities.map((c, i) => (
          <motion.a
            key={c.name}
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.07 }}
            className="block border border-border rounded p-4 bg-card hover:border-primary/50 transition-colors group cursor-pointer"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="font-mono font-semibold text-foreground text-sm group-hover:text-primary transition-colors">
                    {c.name}
                  </span>
                  <span className="font-mono text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded">
                    {c.role}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{c.description}</p>
              </div>
              <div className="flex flex-row sm:flex-col items-center sm:items-end gap-3 sm:gap-1 shrink-0">
                <span className="font-mono text-xs text-primary/60">{c.handle}</span>
                {c.karma && (
                  <span className="font-mono text-xs text-muted-foreground">
                    {c.karma} karma
                  </span>
                )}
                <span className="font-mono text-xs text-muted-foreground/50">
                  since {c.joined}
                </span>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("resume");
  const [typedName, setTypedName] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTypedName(profile.name.slice(0, i));
      if (i >= profile.name.length) clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background font-mono relative overflow-x-hidden">
      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, #00ff99 2px, #00ff99 3px)",
          backgroundSize: "100% 4px",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-12 md:py-20">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          {/* Terminal top bar */}
          <div className="border border-border rounded-t bg-card px-4 py-2 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-destructive/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-primary/70" />
            <span className="ml-2 text-xs text-muted-foreground tracking-widest">
              resume.sh — bash
            </span>
            <div className="ml-auto">
              <Terminal className="w-3 h-3 text-primary/60" />
            </div>
          </div>

          {/* Terminal body */}
          <div className="border border-t-0 border-border rounded-b bg-card/60 px-6 pt-6 pb-8">
            <div className="mb-4">
              <Prompt text="whoami" />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-end gap-4">
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                  {typedName}
                  {typedName.length < profile.name.length && (
                    <span className="animate-pulse text-primary">▊</span>
                  )}
                </h1>
                <p className="text-primary font-mono text-sm mt-1 tracking-wider">
                  {profile.title}
                </p>

                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {profile.location}
                  </span>
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex items-center gap-1 hover:text-primary transition-colors"
                  >
                    <Mail className="w-3 h-3" /> {profile.email}
                  </a>
                  <a
                    href={`https://${profile.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-primary transition-colors"
                  >
                    <Globe className="w-3 h-3" /> {profile.website}
                  </a>
                </div>

                <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-xl font-sans">
                  {profile.summary}
                </p>
              </div>

              <a
                href="#"
                className="inline-flex items-center gap-2 border border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground transition-colors text-xs px-4 py-2 rounded self-start sm:self-auto"
              >
                <Download className="w-3.5 h-3.5" />
                Download CV
              </a>
            </div>
          </div>
        </motion.header>

        {/* Tabs */}
        <div className="flex gap-0 mb-8 border-b border-border">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-5 py-2.5 text-xs tracking-widest uppercase font-mono transition-colors cursor-pointer ${
                activeTab === tab
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {activeTab === tab && (
                <motion.span
                  layoutId="tab-indicator"
                  className="absolute inset-x-0 bottom-0 h-px bg-primary"
                />
              )}
              {tab === "github" && (
                <GitBranch className="w-3 h-3 inline mr-1.5 -mt-0.5" />
              )}
              {tab === "community" && (
                <Users className="w-3 h-3 inline mr-1.5 -mt-0.5" />
              )}
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <div key={activeTab}>
            {activeTab === "resume" && <ResumeTab />}
            {activeTab === "github" && <GithubTab />}
            {activeTab === "community" && <CommunityTab />}
          </div>
        </AnimatePresence>

        {/* Footer */}
        <footer className="mt-16 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-2">
          <Prompt text="exit 0" />
          <span className="font-mono text-xs text-muted-foreground/50">
            © {new Date().getFullYear()} {profile.name}
          </span>
        </footer>
      </div>
    </div>
  );
}
