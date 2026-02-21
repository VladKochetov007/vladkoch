"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import {
    Github,
    Linkedin,
    Mail,
    Send,
    ExternalLink,
    ChevronDown,
    ArrowUpRight,
} from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────────────────────
interface Book {
    title: string;
    author: string;
    folder: string;
    opinion: string;
}

// ── Data ──────────────────────────────────────────────────────────────────────
const projects = [
    {
        name: "MLTT",
        tagline: "Machine Learning Trading Toolkit",
        description:
            "Library for portfolio rebalancing strategy research and development.",
        repo: "https://github.com/VladKochetov007/MLTT",
        img: "https://github.com/VladKochetov007/MLTT/blob/main/static/buckets.png?raw=true",
    },
    {
        name: "Option Portfolio Pricer",
        tagline: "GPU-accelerated options analytics",
        description:
            "Interactive web app for options portfolio analysis with GPU-accelerated pricing.",
        repo: "https://github.com/VladKochetov007/OptionPortfolioPricer",
        live: "https://optionportfolio.streamlit.app/",
        img: "https://github.com/VladKochetov007/OptionPortfolioPricer/blob/main/image.png?raw=true",
    },
    {
        name: "Xoney",
        tagline: "Event-Driven Algo Trading (Go)",
        description:
            "High-performance event-driven algorithmic trading library written in Go.",
        repo: "https://github.com/quick-trade/xoney",
        img: "https://github.com/quick-trade/xoney/raw/main/assets/logo.png",
    },
    {
        name: "Xoney Py",
        tagline: "Event-Driven Algo Trading (Python)",
        description:
            "Python port of the Xoney event-driven algorithmic trading library.",
        repo: "https://github.com/quick-trade/xoney_py",
        img: "https://github.com/quick-trade/xoney_py/raw/dev/img/logo.png?raw=true",
    },
    {
        name: "Quick Trade",
        tagline: "Strategy Research & Optimization",
        description:
            "Algorithmic trading library for implementing strategies and optimization.",
        repo: "https://github.com/quick-trade/quick_trade",
        img: "https://raw.githubusercontent.com/quick-trade/quick_trade/main/img/plot.png",
    },
];

const socials = [
    {
        icon: <Github className="h-6 w-6" />,
        label: "GitHub",
        href: "https://github.com/VladKochetov007",
        color: "hover:text-white hover:border-zinc-400",
    },
    {
        icon: <Linkedin className="h-6 w-6" />,
        label: "LinkedIn",
        href: "https://linkedin.com/in/vladkochetov07",
        color: "hover:text-blue-400 hover:border-blue-400",
    },
    {
        icon: <Send className="h-6 w-6" />,
        label: "Telegram",
        href: "https://t.me/VladKochetov07",
        color: "hover:text-sky-400 hover:border-sky-400",
    },
    {
        icon: <Mail className="h-6 w-6" />,
        label: "Email",
        href: "mailto:vladkoch070@gmail.com",
        color: "hover:text-emerald-400 hover:border-emerald-400",
    },
];

// ── Reveal wrapper ─────────────────────────────────────────────────────────────
function RevealSection({
    children,
    className,
    delay = 0,
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// ── Section heading ────────────────────────────────────────────────────────────
function SectionHeading({ title }: { title: string }) {
    return (
        <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
                {title}
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto rounded-full" />
        </div>
    );
}

// ── Navbar ─────────────────────────────────────────────────────────────────────
function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                scrolled
                    ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-lg"
                    : "bg-transparent"
            )}
        >
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                <a
                    href="#hero"
                    className="font-display font-bold text-xl tracking-tight gradient-text-green"
                >
                    Vlad Koch
                </a>
                <div className="hidden md:flex items-center gap-8">
                    {["About", "Projects", "Books", "Social"].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
                        >
                            {item}
                        </a>
                    ))}
                </div>
                <ThemeToggle />
            </div>
        </motion.nav>
    );
}

// ── Hero ───────────────────────────────────────────────────────────────────────
function Hero() {
    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-mesh"
        >
            {/* Background orbs */}
            <div
                className="orb w-96 h-96 bg-emerald-500/10 top-20 left-10"
                style={{ animationDelay: "0s" }}
            />
            <div
                className="orb w-80 h-80 bg-blue-500/10 bottom-20 right-10"
                style={{ animationDelay: "2s" }}
            />
            <div
                className="orb w-64 h-64 bg-purple-500/08 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ animationDelay: "4s" }}
            />

            <div className="relative z-10 max-w-6xl mx-auto px-6 py-32">
                <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-20">
                    {/* Text */}
                    <div className="flex-1 text-center md:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/8 text-emerald-400 text-sm font-medium mb-6"
                        >
                            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                            Open to opportunities
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                            className="font-display text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1] mb-4"
                        >
                            Vlad{" "}
                            <span className="gradient-text">Kochetov</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.45 }}
                            className="text-xl md:text-2xl text-muted-foreground font-light mb-8"
                        >
                            Quantitative Developer &amp; Researcher
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.55 }}
                            className="text-muted-foreground max-w-xl leading-relaxed mb-10 text-base md:text-lg"
                        >
                            Exploring academic literature, implementing cutting-edge
                            methodologies, and solving complex problems at the intersection of
                            machine learning and quantitative finance.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.65 }}
                            className="flex flex-wrap gap-3 justify-center md:justify-start"
                        >
                            <a
                                href="#projects"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 hover:-translate-y-0.5"
                            >
                                View Projects
                                <ArrowUpRight className="h-4 w-4" />
                            </a>
                            <a
                                href="#social"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border hover:border-foreground/30 text-foreground font-semibold transition-all duration-300 hover:-translate-y-0.5 glass-card"
                            >
                                Get in Touch
                            </a>
                        </motion.div>
                    </div>

                    {/* Profile image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="relative flex-shrink-0"
                    >
                        {/* Glow ring */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 blur-xl opacity-40 scale-110 animate-pulse" />
                        {/* Rotating border */}
                        <div className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-500/30 animate-[spin_20s_linear_infinite]" />
                        <div className="relative w-52 h-52 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-background shadow-2xl">
                            <Image
                                src="/images/me.jpg"
                                alt="Vlad Kochetov"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll cue */}
            <motion.a
                href="#about"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
                <span className="text-xs tracking-widest uppercase">Scroll</span>
                <ChevronDown className="h-5 w-5 animate-bounce" />
            </motion.a>
        </section>
    );
}

// ── About ──────────────────────────────────────────────────────────────────────
function About() {
    return (
        <section id="about" className="py-32 relative">
            <div className="max-w-6xl mx-auto px-6">
                <RevealSection>
                    <SectionHeading title="About Me" />
                </RevealSection>
                <RevealSection delay={0.15} className="max-w-4xl mx-auto">
                    <div className="glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden">
                        {/* Subtle accent */}
                        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-500 via-blue-500 to-transparent" />
                        <p className="text-lg md:text-xl leading-[1.9] text-muted-foreground font-light text-center">
                            Quantitative researcher and developer focused on{" "}
                            <span className="text-foreground font-medium">
                                systematic trading and market structure
                            </span>
                            . Experienced in building{" "}
                            <span className="gradient-text-green font-semibold">
                                execution systems, simulation environments, and machine learning pipelines
                            </span>{" "}
                            for data-driven strategy development.
                        </p>
                    </div>
                </RevealSection>
            </div>
        </section>
    );
}

// ── Projects ───────────────────────────────────────────────────────────────────
function ProjectCard({ project }: { project: (typeof projects)[number] }) {
    return (
        <div className="relative rounded-2xl border border-border p-1 h-full project-card-hover">
            <GlowingEffect
                spread={40}
                glow={false}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={2}
            />
            <div className="relative flex flex-col h-full rounded-xl bg-card border border-border/50 overflow-hidden">
                {/* Image */}
                <div className="w-full h-44 bg-background/50 overflow-hidden flex items-center justify-center p-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={project.img}
                        alt={project.name}
                        className="max-h-36 max-w-full object-contain rounded-lg"
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                        }}
                    />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6 gap-3">
                    <h3 className="font-display font-bold text-xl text-foreground">
                        {project.name}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                        {project.description}
                    </p>
                    <div className="flex gap-3 pt-2">
                        <a
                            href={project.repo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground border border-border hover:border-foreground/30 rounded-lg px-3 py-2 transition-all duration-200"
                        >
                            <Github className="h-4 w-4" />
                            GitHub
                        </a>
                        {project.live && (
                            <a
                                href={project.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 border border-emerald-500/30 hover:border-emerald-500/60 rounded-lg px-3 py-2 transition-all duration-200"
                            >
                                <ExternalLink className="h-4 w-4" />
                                Live Demo
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function Projects() {
    return (
        <section id="projects" className="py-32 relative">
            <div className="max-w-6xl mx-auto px-6">
                <RevealSection>
                    <SectionHeading title="Projects" />
                </RevealSection>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, i) => (
                        <RevealSection key={project.name} delay={i * 0.08}>
                            <ProjectCard project={project} />
                        </RevealSection>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ── Books ──────────────────────────────────────────────────────────────────────
function Books() {
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        fetch("/books/books.json")
            .then((res) => res.json())
            .then((data) => setBooks(data.books))
            .catch(() => { });
    }, []);

    return (
        <section id="books" className="py-32 relative">
            <div className="absolute top-1/2 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="max-w-6xl mx-auto px-6 relative">
                <RevealSection>
                    <SectionHeading title="Books I Like" />
                </RevealSection>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {books.map((book, i) => (
                        <RevealSection key={book.title} delay={i * 0.08}>
                            <div className="relative rounded-2xl border border-border p-1 h-full project-card-hover">
                                <GlowingEffect
                                    spread={30}
                                    glow={false}
                                    disabled={false}
                                    proximity={64}
                                    inactiveZone={0.01}
                                    borderWidth={2}
                                />
                                <div className="relative flex flex-col h-full rounded-xl bg-card border border-border/50 overflow-hidden">
                                    <div className="w-full h-auto bg-background/60 flex items-center justify-center p-4">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={`/books/${book.folder}/cover.png`}
                                            alt={book.title}
                                            className="max-h-64 max-w-full object-contain rounded shadow-lg"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.display = "none";
                                            }}
                                        />
                                    </div>
                                    <div className="p-6 flex flex-col gap-2 flex-1">
                                        <h3 className="font-display font-semibold text-lg text-foreground leading-snug">
                                            {book.title}
                                        </h3>
                                        <p className="text-emerald-400/80 text-sm font-medium">
                                            {book.author}
                                        </p>
                                        <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                                            {book.opinion}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </RevealSection>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ── Social ─────────────────────────────────────────────────────────────────────
function Social() {
    return (
        <section id="social" className="py-32 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="max-w-6xl mx-auto px-6 relative">
                <RevealSection>
                    <SectionHeading title="Get in Touch" />
                </RevealSection>
                <RevealSection delay={0.1}>
                    <p className="text-center text-muted-foreground text-lg mb-14">
                        Always open to interesting conversations, opportunities, and
                        collaborations.
                    </p>
                </RevealSection>
                <RevealSection
                    delay={0.2}
                    className="flex flex-wrap justify-center gap-5"
                >
                    {socials.map((s) => (
                        <a
                            key={s.label}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                                "flex flex-col items-center gap-3 px-8 py-6 rounded-2xl glass-card border border-border",
                                "text-muted-foreground transition-all duration-300 hover:-translate-y-2 hover:shadow-xl min-w-[120px]",
                                s.color
                            )}
                        >
                            {s.icon}
                            <span className="text-sm font-medium">{s.label}</span>
                        </a>
                    ))}
                </RevealSection>
            </div>
        </section>
    );
}

// ── Footer ─────────────────────────────────────────────────────────────────────
function Footer() {
    return (
        <footer className="py-10 border-t border-border">
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <span className="font-display font-bold gradient-text-green">
                    Vlad Koch
                </span>
                <p className="text-muted-foreground text-sm">
                    © 2024-2026 Vlad Kochetov · Licensed under GPL 3.0
                </p>
                <div className="flex gap-4">
                    {socials.map((s) => (
                        <a
                            key={s.label}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                            aria-label={s.label}
                        >
                            {s.icon}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function Page() {
    return (
        <main className="bg-mesh min-h-screen">
            <Navbar />
            <Hero />
            <About />
            <Projects />
            <Books />
            <Social />
            <Footer />
        </main>
    );
}
