import { useEffect } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Linkedin, Twitter, Mail, ArrowRight, Code2, Database, Layout, Terminal, Sparkles, ExternalLink } from "lucide-react";
import { SiTypescript, SiReact, SiNodedotjs, SiPostgresql, SiFigma, SiTailwindcss, SiNextdotjs } from "react-icons/si";

import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Section({ children, id, className = "" }: { children: React.ReactNode; id?: string; className?: string }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`py-24 md:py-32 w-full max-w-5xl mx-auto px-6 ${className}`}
    >
      {children}
    </motion.section>
  );
}

function Nav() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [0, 1]);
  const blur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(12px)"]);

  return (
    <motion.nav 
      style={{ 
        backgroundColor: useTransform(scrollY, [0, 100], ["rgba(10, 10, 15, 0)", "rgba(10, 10, 15, 0.8)"]),
        backdropFilter: blur,
        borderBottom: useTransform(scrollY, [0, 100], ["1px solid rgba(255,255,255,0)", "1px solid rgba(255,255,255,0.05)"])
      }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
        <span className="font-bold text-lg tracking-tight text-white flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(10,194,255,0.7)]" />
          AM.
        </span>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#skills" className="hover:text-white transition-colors">Skills</a>
          <a href="#projects" className="hover:text-white transition-colors">Projects</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
        <Button variant="outline" className="hidden md:flex border-primary/20 hover:border-primary/50 text-primary hover:bg-primary/10 transition-all">
          Resume
        </Button>
      </div>
    </motion.nav>
  );
}

function Hero() {
  return (
    <section className="min-h-[100dvh] flex flex-col justify-center max-w-5xl mx-auto px-6 relative pt-20">
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8 w-fit"
      >
        <Sparkles size={16} />
        <span>Available for new opportunities</span>
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.1] mb-6"
      >
        Alex Morgan
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/50">
          Creative Developer.
        </span>
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed font-light"
      >
        I build digital experiences that live at the intersection of precise engineering and beautiful design. Crafting interfaces that feel alive.
      </motion.p>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 font-semibold">
          See my work <ArrowRight size={18} />
        </Button>
        <Button size="lg" variant="outline" className="gap-2 border-border hover:bg-white/5">
          <Github size={18} /> GitHub
        </Button>
      </motion.div>
    </section>
  );
}

function About() {
  return (
    <Section id="about">
      <div className="grid md:grid-cols-[1fr_1.5fr] gap-12 md:gap-24 items-start">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">About Me</h2>
          <div className="w-12 h-1 bg-primary rounded-full" />
        </div>
        <div className="space-y-6 text-muted-foreground text-lg leading-relaxed font-light">
          <p>
            I'm a Full-Stack Developer & UI Designer based in San Francisco. I've spent the last 5 years building products that people love to use, focusing on the details that make an interface feel intuitive and magical.
          </p>
          <p>
            My approach is rooted in the belief that great software requires both rigorous engineering and deep empathy for the user. I don't just write code; I craft experiences.
          </p>
          <p>
            When I'm not in my editor, you'll find me exploring generative art, brewing pour-over coffee, or contributing to open-source UI libraries.
          </p>
        </div>
      </div>
    </Section>
  );
}

function Skills() {
  const skillCategories = [
    {
      title: "Frontend",
      icon: <Layout className="text-primary mb-4" size={24} />,
      skills: [
        { name: "React", icon: <SiReact /> },
        { name: "TypeScript", icon: <SiTypescript /> },
        { name: "Next.js", icon: <SiNextdotjs /> },
        { name: "Tailwind CSS", icon: <SiTailwindcss /> },
      ]
    },
    {
      title: "Backend",
      icon: <Database className="text-primary mb-4" size={24} />,
      skills: [
        { name: "Node.js", icon: <SiNodedotjs /> },
        { name: "PostgreSQL", icon: <SiPostgresql /> },
        { name: "REST APIs", icon: <Terminal /> },
      ]
    },
    {
      title: "Design",
      icon: <Sparkles className="text-primary mb-4" size={24} />,
      skills: [
        { name: "Figma", icon: <SiFigma /> },
        { name: "UI/UX", icon: <Layout /> },
        { name: "Prototyping", icon: <Code2 /> },
      ]
    }
  ];

  return (
    <Section id="skills">
      <div className="mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Technical Arsenal</h2>
        <div className="w-12 h-1 bg-primary rounded-full" />
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {skillCategories.map((category, i) => (
          <div key={i} className="p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-colors group">
            {category.icon}
            <h3 className="text-xl font-semibold text-white mb-6">{category.title}</h3>
            <ul className="space-y-4">
              {category.skills.map((skill, j) => (
                <li key={j} className="flex items-center gap-3 text-muted-foreground group-hover:text-white/80 transition-colors">
                  <span className="text-primary/70">{skill.icon}</span>
                  {skill.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Projects() {
  const projects = [
    {
      title: "Nexus Dashboard",
      description: "A high-performance analytics dashboard for fintech teams. Features real-time data visualization, customizable widgets, and sub-millisecond response times.",
      tags: ["React", "TypeScript", "Recharts", "Node.js"],
      link: "#",
      github: "#"
    },
    {
      title: "Aura Creative Suite",
      description: "Browser-based generative art tool for designers. Built with WebGL and a custom React state engine to handle complex layer rendering efficiently.",
      tags: ["WebGL", "React", "Zustand", "Tailwind"],
      link: "#",
      github: "#"
    },
    {
      title: "Lumina API Platform",
      description: "Developer-first API gateway management interface. Simplified complex routing configurations into a drag-and-drop node editor.",
      tags: ["Next.js", "PostgreSQL", "Prisma", "Framer Motion"],
      link: "#",
      github: "#"
    }
  ];

  return (
    <Section id="projects">
      <div className="mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Featured Work</h2>
        <div className="w-12 h-1 bg-primary rounded-full" />
      </div>

      <div className="space-y-12 md:space-y-24">
        {projects.map((project, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative"
          >
            {/* Project "Image" placeholder - in a real app this would be an actual image */}
            <div className="w-full h-64 md:h-[400px] rounded-xl bg-card border border-border/50 mb-8 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-background/80 to-transparent z-10" />
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20 font-mono text-9xl font-bold select-none">
                0{i + 1}
              </div>
            </div>

            <div className="grid md:grid-cols-[1fr_2fr] gap-6 md:gap-12">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                <div className="flex gap-4 mt-6">
                  <a href={project.github} className="text-muted-foreground hover:text-white transition-colors flex items-center gap-2 text-sm font-medium">
                    <Github size={16} /> Code
                  </a>
                  <a href={project.link} className="text-primary hover:text-primary/80 transition-colors flex items-center gap-2 text-sm font-medium">
                    <ExternalLink size={16} /> Live Demo
                  </a>
                </div>
              </div>
              
              <div>
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, j) => (
                    <Badge key={j} variant="secondary" className="bg-white/5 hover:bg-white/10 text-muted-foreground font-mono text-xs px-3 py-1">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function Contact() {
  return (
    <Section id="contact" className="pb-32">
      <div className="max-w-2xl mx-auto text-center border border-border/50 rounded-3xl p-12 md:p-24 bg-card relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[200px] bg-primary/20 blur-[100px] -z-10 pointer-events-none" />
        
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Let's build something.</h2>
        <p className="text-muted-foreground text-lg mb-10 max-w-md mx-auto">
          Currently open for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>
        
        <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 h-auto mb-16">
          <Mail className="mr-2" /> hello@alexmorgan.dev
        </Button>

        <div className="flex items-center justify-center gap-8">
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            <Github size={24} />
            <span className="sr-only">GitHub</span>
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            <Linkedin size={24} />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            <Twitter size={24} />
            <span className="sr-only">Twitter</span>
          </a>
        </div>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="py-8 text-center text-muted-foreground text-sm border-t border-border/50">
      <p>Designed & Built by Alex Morgan</p>
      <p className="mt-2 font-mono text-xs opacity-50">© {new Date().getFullYear()} All Rights Reserved</p>
    </footer>
  );
}

function Portfolio() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-white">
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Switch>
            <Route path="/" component={Portfolio} />
            <Route component={NotFound} />
          </Switch>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
