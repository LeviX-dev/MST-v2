import { motion } from "framer-motion";
import { ArrowRight, Code2, Cpu, Users, Rocket, Zap, Globe, Shield } from "lucide-react";
import PageTransition from "@/components/PageTransition";

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const devFeatures = [
  { icon: Cpu, title: "EVM Compatibility", desc: "Deploy Solidity contracts directly — no modifications needed." },
  { icon: Code2, title: "API Support", desc: "Comprehensive API suite for building Web3 applications." },
  { icon: Users, title: "Developer Grants", desc: "Funding, mentorship, and exposure for promising projects." },
];

const roadmap = [
  { q: "Q1 2026", title: "Mainnet Stability", desc: "Enhanced consensus, security audits, network optimization." },
  { q: "Q2 2026", title: "Ecosystem Expansion", desc: "Developer grants, SafePal integration, SmartTech Asia presence." },
  { q: "Q3 2026", title: "Enterprise Adoption", desc: "Enterprise SDK, tokenized credentials, supply chain solutions." },
  { q: "Q4 2026", title: "Global Scale", desc: "Cross-chain bridges, international partnerships, DeFi protocols." },
];

const grantSteps = [
  { icon: "📝", title: "Apply", desc: "Submit your project proposal and vision." },
  { icon: "🔨", title: "Build", desc: "Get funding and mentorship to develop your solution." },
  { icon: "🚀", title: "Launch", desc: "Deploy on MST mainnet with full support." },
  { icon: "📈", title: "Scale", desc: "Grow with ecosystem-wide exposure and partnerships." },
];

const BuildWithMST = () => {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="min-h-[70vh] flex items-center justify-center bg-gradient-hero pt-24">
        <div className="container mx-auto px-6 text-center">
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Develop next-gen{" "}
            <span className="text-gradient-primary">Web3 projects</span>
          </motion.h1>
          <motion.p
            className="text-lg text-muted-foreground max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            on MST Blockchain.
          </motion.p>
        </div>
      </section>

      {/* Dev Features */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {devFeatures.map((f) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                className="glass rounded-2xl p-8 text-center hover:border-primary/40 transition-all"
                whileHover={{ y: -8 }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <f.icon className="text-primary" size={28} />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Code Window */}
      <section className="py-24 bg-gradient-section">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.h2
            className="text-3xl md:text-5xl font-display font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Deploy in <span className="text-gradient-primary">minutes</span>
          </motion.h2>
          <motion.div
            className="glass rounded-2xl overflow-hidden border-glow-teal"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-muted/50 px-6 py-4 flex items-center gap-3 border-b border-border/50">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-accent/60" />
                <div className="w-3 h-3 rounded-full bg-secondary/60" />
              </div>
              <span className="text-sm text-muted-foreground font-mono">terminal</span>
            </div>
            <div className="p-6 font-mono text-sm leading-relaxed">
              <div className="text-muted-foreground">
                <span className="text-secondary">$</span> npx hardhat deploy --network mst-mainnet
              </div>
              <div className="text-muted-foreground mt-2">
                Compiling 1 Solidity file...
              </div>
              <div className="text-muted-foreground mt-1">
                ✓ Compiled successfully
              </div>
              <div className="text-muted-foreground mt-2">
                Deploying <span className="text-primary">MSTToken</span> to MST Mainnet...
              </div>
              <div className="mt-1">
                <span className="text-secondary">✓</span> Contract deployed at: <span className="text-primary">0x7a3b...f92d</span>
              </div>
              <div className="mt-1">
                <span className="text-secondary">✓</span> Verified on <span className="text-primary">mstscan.com</span>
              </div>
              <div className="text-muted-foreground mt-2">
                Gas used: <span className="text-secondary">0.0012 MSTC</span>
              </div>
              <div className="mt-3 text-secondary animate-pulse">█</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.h2
            className="text-3xl md:text-5xl font-display font-bold text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Roadmap <span className="text-gradient-primary">2026</span>
          </motion.h2>
          <div className="relative">
            <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-secondary/50 to-transparent" />
            <motion.div
              className="space-y-12"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {roadmap.map((item) => (
                <motion.div key={item.q} variants={fadeUp} className="relative pl-16 md:pl-24">
                  <div className="absolute left-2.5 md:left-6.5 w-3 h-3 rounded-full bg-primary glow-primary" />
                  <div className="glass rounded-xl p-6 hover:border-primary/40 transition-all">
                    <span className="text-xs font-mono text-primary mb-2 block">{item.q}</span>
                    <h3 className="font-display font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Grant Steps */}
      <section className="py-24 bg-gradient-section">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.h2
            className="text-3xl md:text-5xl font-display font-bold text-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Developer <span className="text-gradient-primary">Grant Program</span>
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-center mb-16 max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            From idea to launch — we support you at every step.
          </motion.p>
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {grantSteps.map((step, i) => (
              <motion.div
                key={step.title}
                variants={fadeUp}
                className="glass rounded-2xl p-6 text-center relative overflow-hidden"
                whileHover={{ y: -5 }}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary" />
                <span className="text-4xl block mb-4">{step.icon}</span>
                <div className="text-xs font-mono text-muted-foreground mb-2">STEP {String(i + 1).padStart(2, "0")}</div>
                <h3 className="font-display font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            className="text-3xl md:text-5xl font-display font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Join India's most innovative{" "}
            <span className="text-gradient-primary">blockchain ecosystem.</span>
          </motion.h2>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <a href="#" className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition">
              Apply for Grant <ArrowRight className="inline ml-2" size={18} />
            </a>
            <a href="https://mstscan.com" target="_blank" rel="noopener noreferrer" className="px-8 py-4 border border-primary/40 text-foreground font-semibold rounded-xl hover:bg-primary/10 transition">
              Explore MST Explorer
            </a>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};

export default BuildWithMST;
