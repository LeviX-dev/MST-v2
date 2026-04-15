import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowDown, Shield, Cpu, Users, Zap, ChevronRight } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import TorusEnergyRing from "@/components/three/TorusEnergyRing";
import ParticleField from "@/components/three/ParticleField";

const CountUp = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stats = [
  { value: 5765, suffix: "+", label: "Community Members" },
  { value: 50, suffix: "+", label: "Expert Team" },
  { value: 8, suffix: "+", label: "Solution Verticals" },
  { value: 1, suffix: "st", label: "Layer 1 in India" },
];

const features = [
  { icon: Zap, title: "Low-cost Transactions", desc: "Lightning-fast settlements at minimal cost" },
  { icon: Cpu, title: "EVM Compatible", desc: "Deploy Ethereum contracts without modification" },
  { icon: Users, title: "Developer Grants", desc: "Funding, mentorship, and global exposure" },
  { icon: Shield, title: "Enterprise Ready", desc: "Built for scale with institutional security" },
];

const solutions = [
  { title: "NFTs & Art", desc: "Tokenize art, culture, and digital collectibles", size: "col-span-1" },
  { title: "Enterprise Apps", desc: "Build scalable consumer and business apps", size: "col-span-1" },
  { title: "Gaming & Web3", desc: "Next-gen gaming with on-chain assets", size: "md:col-span-2" },
  { title: "Digital Identity", desc: "Tokenized Identity & Credentials on Blockchain — as discussed at SmartTech Asia 2026", size: "md:col-span-2" },
  { title: "Supply Chain", desc: "Transparent, traceable, tamper-proof logistics", size: "col-span-1" },
  { title: "DeFi & Smart Contracts", desc: "Decentralized financial infrastructure", size: "col-span-1" },
];

const partners = ["SafePal", "Kann Audits", "D.Y. Patil College", "Binance", "Krayptoon", "FSV Labs", "India Blockchain Forum"];

const events = [
  { emoji: "🔥", title: "IGNITE 2026", desc: "Internal innovation summit" },
  { emoji: "📍", title: "SmartTech Asia 2026", desc: "Jio World Convention Centre, Mumbai — Stall SE52" },
  { emoji: "🎙️", title: "Pramod Borate Podcast", desc: "\"Tokenized Identity & Credentials\" with Kamlesh Nagware" },
  { emoji: "🤝", title: "MoU — D.Y. Patil College", desc: "Engineering, Akurdi Pune" },
  { emoji: "🌍", title: "15th Business Meet", desc: "Awareness & Training — Heria, West Bengal" },
  { emoji: "🛡️", title: "SafePal Partnership", desc: "MSTC live on hardware + Web3 wallet" },
];

const ticker = "🚀 SafePal Partnership Live · 📍 SmartTech Asia 2026 · 🔗 MSTC on SafePal Hardware Wallet · 📄 Roadmap 2026 featured on Binance · 🤝 MoU signed with D.Y. Patil College of Engineering · 🛡️ Kann Audits Security Partnership · 🌐 mstscan.com Live";

const Home = () => {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <TorusEnergyRing />

        {/* Hexagonal sonar ping grid */}
        <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden flex items-center justify-center">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-primary/10"
              style={{ width: 200, height: 200 }}
              animate={{
                scale: [1, 8],
                opacity: [0.3, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 1,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          {/* Letter-drop headline */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight mb-6">
            {"Building the Future".split("").map((char, i) => (
              <motion.span
                key={`a-${i}`}
                className="inline-block"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 1.8 + i * 0.03,
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
            <br />
            {"of Web3".split("").map((char, i) => (
              <motion.span
                key={`b-${i}`}
                className="inline-block text-gradient-primary"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 2.4 + i * 0.03,
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </h1>
          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.8 }}
          >
            India's 1st Layer 1 Blockchain — Secure, Scalable, Sustainable.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 3.1 }}
          >
            <Link
              to="/ecosystem"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-all hover:-translate-y-1"
            >
              Explore Ecosystem <ArrowRight size={18} />
            </Link>
            <a
              href="/images/pdf/MSTWhitepaper.pdf"
              className="inline-flex items-center gap-2 px-8 py-4 border border-primary/40 text-foreground font-semibold rounded-xl hover:bg-primary/10 transition-all hover:-translate-y-1"
            >
              Read Whitepaper
            </a>
          </motion.div>
          <motion.div
            className="mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ opacity: { delay: 3.5 }, y: { duration: 2, repeat: Infinity, delay: 3.5 } }}
          >
            <ArrowDown className="mx-auto text-muted-foreground" size={24} />
          </motion.div>
        </div>
      </section>

      {/* Ticker */}
      <div className="bg-muted/30 border-y border-border/50 py-3 overflow-hidden">
        <div className="marquee whitespace-nowrap">
          <span className="inline-block text-sm text-muted-foreground">
            {ticker} &nbsp;&nbsp; {ticker}
          </span>
        </div>
      </div>

      {/* Stats */}
      <section className="py-24 bg-gradient-section">
        <div className="container mx-auto px-6">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className="glass rounded-2xl p-8 text-center border-glow"
              >
                <div className="text-3xl md:text-5xl font-display font-bold text-gradient-primary mb-2">
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
          <motion.p
            className="text-center text-muted-foreground mt-8 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Powering enterprises, retail, gaming, and Web3 developers across India and beyond.
          </motion.p>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-3xl md:text-5xl font-display font-bold text-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Why <span className="text-gradient-primary">MST Blockchain</span>
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-center max-w-lg mx-auto mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            A sustainable Layer 1 platform built for India, ready for the world.
          </motion.p>
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                className="glass rounded-2xl p-8 group hover:border-primary/40 transition-all duration-300"
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:glow-primary transition-shadow">
                  <f.icon className="text-primary" size={24} />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-24 bg-gradient-section">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-3xl md:text-5xl font-display font-bold text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Solutions for <span className="text-gradient-primary">Every Vertical</span>
          </motion.h2>
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {solutions.map((s) => (
              <motion.div
                key={s.title}
                variants={fadeUp}
                className={`glass rounded-2xl p-6 group hover:border-secondary/40 transition-all cursor-pointer ${s.size}`}
                whileHover={{ y: -5, rotateX: 2, rotateY: 2 }}
              >
                <h3 className="font-display font-semibold mb-2 group-hover:text-secondary transition-colors">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
                <ChevronRight className="mt-4 text-muted-foreground group-hover:text-secondary transition-colors" size={18} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Developer Grant */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
                Great ideas deserve the{" "}
                <span className="text-gradient-primary">right support.</span>
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Turn your bold Web3 ideas into real-world solutions. From funding to mentorship and global exposure — we help you build, launch, and scale.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {["Apply", "Build", "Launch", "Scale"].map((step, i) => (
                  <motion.div
                    key={step}
                    className="glass rounded-xl p-4 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                  >
                    <div className="text-2xl font-display font-bold text-gradient-primary mb-1">{String(i + 1).padStart(2, "0")}</div>
                    <div className="text-sm font-medium">{step}</div>
                  </motion.div>
                ))}
              </div>
              <Link
                to="/build-with-mst"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition"
              >
                Join Developer Grant Program <ArrowRight size={18} />
              </Link>
            </motion.div>
            <motion.div
              className="h-[400px] hidden lg:block"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-full h-full rounded-2xl border-glow glass flex items-center justify-center">
                <div className="text-6xl animate-float">🚀</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-24 bg-gradient-section">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-3xl md:text-4xl font-display font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Trusted by the best in <span className="text-gradient-primary">Web3</span>
          </motion.h2>
          <motion.div
            className="flex flex-wrap justify-center gap-6 mb-16"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {partners.map((p) => (
              <motion.div
                key={p}
                variants={fadeUp}
                className="glass rounded-xl px-8 py-4 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
              >
                {p}
              </motion.div>
            ))}
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { name: "SafePal", desc: "MSTC now live on SafePal Hardware + Web3 Wallet. Store assets securely, backed by one of Web3's most trusted wallet infrastructures." },
              { name: "Kann Audits", desc: "Enhanced smart contract security and auditing standards — every innovation on MST stands on a layer of trust." },
            ].map((card, i) => (
              <motion.div
                key={card.name}
                className="glass rounded-2xl p-8 border-glow"
                initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="font-display font-semibold text-lg mb-3">{card.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.h2
            className="text-3xl md:text-4xl font-display font-bold text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Recent <span className="text-gradient-primary">Events</span>
          </motion.h2>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-secondary/50 to-transparent" />
            {events.map((event, i) => (
              <motion.div
                key={event.title}
                className={`relative flex ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 mb-12`}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="hidden md:block flex-1" />
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-primary glow-primary mt-2" />
                <div className="flex-1 ml-12 md:ml-0 glass rounded-xl p-6">
                  <span className="text-xl mr-2">{event.emoji}</span>
                  <h3 className="font-display font-semibold inline">{event.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{event.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Decent Den */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-primary/5" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-destructive/20 text-destructive text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
              LIVE
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
              The World's 1st{" "}
              <span className="text-gradient-violet">Blockchain Reality Show</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-8">
              Where every vote is on-chain and the power belongs to YOU.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://decentden.com/live" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition">
                Watch Live
              </a>
              <a href="#" className="px-8 py-4 border border-primary/40 text-foreground font-semibold rounded-xl hover:bg-primary/10 transition">
                Learn More
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision Quote */}
      <section className="py-24 bg-gradient-section">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <motion.blockquote
            className="text-2xl md:text-3xl font-display font-medium leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            "Beyond the noise — toward becoming real infrastructure for{" "}
            <span className="text-gradient-primary">trust, identity, and value exchange.</span>"
          </motion.blockquote>
          <motion.p
            className="text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            — Pramod Borate, Chairman & Founder Director, MST Blockchain
          </motion.p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <ParticleField />
        <div className="relative z-10 text-center px-6">
          <motion.h2
            className="text-4xl md:text-6xl font-display font-bold mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ready to build on{" "}
            <span className="text-gradient-primary">MST</span>?
          </motion.h2>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link to="/build-with-mst" className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition hover:-translate-y-1">
              Start Building ↗
            </Link>
            <a href="/images/pdf/MSTWhitepaper.pdf" className="px-8 py-4 border border-primary/40 text-foreground font-semibold rounded-xl hover:bg-primary/10 transition hover:-translate-y-1">
              Explore Whitepaper
            </a>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <span>🔒 Audited by Kann Audits</span>
            <span>💼 EVM Compatible</span>
            <span>🇮🇳 India's Layer 1</span>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Home;
