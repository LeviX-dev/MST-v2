import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Code2, Building2, Wallet, Shield, Globe, Tv, Users, Zap, BookOpen, Rocket } from "lucide-react";
import PageTransition from "@/components/PageTransition";

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const ecosystemLayers = [
  { icon: Shield, label: "Validators", color: "text-secondary", desc: "Validators secure the network, propose and confirm blocks via MST's consensus mechanism." },
  { icon: Code2, label: "Developers", color: "text-primary", desc: "Developers build dApps, smart contracts, and Web3 tools using EVM compatibility and MST's API suite." },
  { icon: Globe, label: "dApps", color: "text-foreground", desc: "Decentralized applications running natively on MST Layer 1 — from DeFi to NFTs to identity platforms." },
  { icon: Building2, label: "Enterprises", color: "text-accent", desc: "Enterprises integrate MST infrastructure for supply chain, consumer apps, and digital identity solutions." },
  { icon: Wallet, label: "Token Holders", color: "text-secondary", desc: "MSTC token holders participate in governance, staking, and the broader ecosystem economy." },
];

const consensusSteps = [
  { num: "01", title: "Transaction Initiated", desc: "A wallet sends a transaction to the network, broadcasting it to all validator nodes." },
  { num: "02", title: "Nodes Validate", desc: "Every node independently verifies the transaction against the chain state." },
  { num: "03", title: "Block Confirmed", desc: "Agreement reached. Block added. Immutable. Transparent. Final." },
];

const grantBenefits = [
  { icon: "💰", title: "Funding", desc: "Direct financial support to kickstart your Web3 project without compromise." },
  { icon: "🧠", title: "Mentorship", desc: "Guidance from MST's core team and ecosystem partners with deep blockchain expertise." },
  { icon: "🌍", title: "Global Exposure", desc: "Get featured across MST's partner network, events like SmartTech Asia, and platforms like Binance." },
  { icon: "🚀", title: "Launch Support", desc: "Technical, marketing, and community support to help you go from testnet to mainnet." },
];

const evmCards = [
  { title: "Deploy Existing Solidity Contracts", desc: "Any smart contract written for Ethereum deploys on MST without modification." },
  { title: "Use Familiar Tooling", desc: "Hardhat, Truffle, Remix, MetaMask — your full existing Web3 toolkit works out of the box." },
  { title: "Lower Cost, Same Power", desc: "MST's Layer 1 gives you Ethereum-level capability at a fraction of the gas cost." },
];

const partners = [
  { name: "SafePal", desc: "MSTC live on hardware + Web3 wallet" },
  { name: "Kann Audits", desc: "Smart contract security and auditing" },
  { name: "D.Y. Patil College", desc: "MoU for student blockchain training" },
  { name: "Binance", desc: "MST Roadmap 2026 featured" },
  { name: "FSV Labs", desc: "Podcast collaboration at SmartTech Asia" },
  { name: "India Blockchain Forum", desc: "Ecosystem partner" },
  { name: "Krayptoon", desc: "AMA collaboration" },
];

const Ecosystem = () => {
  return (
    <PageTransition>
      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-hero pt-24">
        <div className="container mx-auto px-6 text-center">
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            An Ecosystem Built for the{" "}
            <span className="text-gradient-primary">Future</span>
          </motion.h1>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Validators, developers, enterprises, and token holders — all working together to build a secure, decentralized future.
          </motion.p>
        </div>
      </section>

      {/* Ecosystem Layers */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-3xl md:text-5xl font-display font-bold text-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            The MST <span className="text-gradient-primary">Ecosystem</span>
          </motion.h2>
          <motion.p className="text-muted-foreground text-center max-w-lg mx-auto mb-16" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            Five interconnected layers powering decentralized innovation.
          </motion.p>
          <motion.div
            className="space-y-6 max-w-3xl mx-auto"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {ecosystemLayers.map((layer, i) => (
              <motion.div
                key={layer.label}
                variants={fadeUp}
                className="glass rounded-2xl p-8 flex items-start gap-6 group hover:border-primary/40 transition-all"
                whileHover={{ x: 10, scale: 1.01 }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <layer.icon className={layer.color} size={28} />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-mono text-muted-foreground">LAYER {String(i + 1).padStart(2, "0")}</span>
                    <h3 className="font-display font-semibold text-lg">{layer.label}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{layer.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Consensus */}
      <section className="py-24 bg-gradient-section">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-3xl md:text-5xl font-display font-bold text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Consensus That <span className="text-gradient-primary">Can't Be Faked</span>
          </motion.h2>
          <motion.div
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {consensusSteps.map((step, i) => (
              <motion.div key={step.num} variants={fadeUp} className="relative">
                <div className="glass rounded-2xl p-8 h-full border-glow-teal">
                  <div className="text-4xl font-display font-bold text-gradient-primary mb-4">{step.num}</div>
                  <h3 className="font-display font-semibold text-lg mb-3">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform translate-x-1/2">
                    <ArrowRight className="text-primary/40" size={20} />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Developer Grants */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:sticky lg:top-32"
            >
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
                Great ideas deserve the{" "}
                <span className="text-gradient-primary">right support.</span>
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                MST Blockchain's Developer Grant Program turns bold Web3 ideas into real-world solutions.
              </p>
              <Link
                to="/build-with-mst"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition"
              >
                Apply for Grant <ArrowRight size={18} />
              </Link>
            </motion.div>
            <motion.div
              className="space-y-6"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {grantBenefits.map((b) => (
                <motion.div
                  key={b.title}
                  variants={fadeUp}
                  className="glass rounded-2xl p-6 border-l-4 border-l-primary/60 hover:border-l-primary transition-colors"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{b.icon}</span>
                    <h3 className="font-display font-semibold text-lg">{b.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* EVM */}
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-3xl md:text-5xl font-display font-bold text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-gradient-primary">EVM Compatible</span> Infrastructure
          </motion.h2>
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <motion.div
              className="glass rounded-2xl p-6 font-mono text-sm border-glow-teal overflow-x-auto"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-accent/60" />
                <div className="w-3 h-3 rounded-full bg-secondary/60" />
              </div>
              <pre className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                <span className="text-primary">pragma</span> solidity ^0.8.19;{"\n\n"}
                <span className="text-primary">contract</span> <span className="text-secondary">MSTToken</span> {"{"}
                {"\n  "}string public name = <span className="text-secondary">"MST Coin"</span>;
                {"\n  "}uint256 public totalSupply;
                {"\n\n  "}<span className="text-primary">constructor</span>() {"{"}
                {"\n    "}totalSupply = 1000000 * 10**18;
                {"\n  "}{"}"}
                {"\n"}{"}"}
              </pre>
            </motion.div>
            <motion.div
              className="space-y-6"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {evmCards.map((c) => (
                <motion.div key={c.title} variants={fadeUp} className="glass rounded-xl p-6 hover:border-primary/40 transition-all">
                  <h3 className="font-display font-semibold mb-2">{c.title}</h3>
                  <p className="text-sm text-muted-foreground">{c.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* MST Explorer */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            className="glass rounded-2xl overflow-hidden border-glow"
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
              <span className="text-sm text-muted-foreground font-mono">mstscan.com</span>
            </div>
            <div className="p-6 space-y-3 font-mono text-xs">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-border/30">
                  <span className="text-primary">Block #{(1847293 + i).toLocaleString()}</span>
                  <span className="text-muted-foreground">0x{Math.random().toString(16).slice(2, 12)}...</span>
                  <span className="text-secondary text-xs">✓ Confirmed</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            className="flex flex-wrap justify-center gap-4 mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {["🔍 Search any transaction", "📦 Live block feed", "🗳️ Validator activity"].map((f) => (
              <span key={f} className="glass rounded-full px-5 py-2 text-sm text-muted-foreground">{f}</span>
            ))}
          </motion.div>
          <div className="text-center mt-6">
            <a
              href="https://mstscan.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition"
            >
              Visit mstscan.com <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* SafePal */}
      <section className="py-24 bg-gradient-section">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
            <motion.div
              className="glass rounded-2xl p-12 flex items-center justify-center h-[350px] border-glow-teal"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-center">
                <motion.div
                  className="text-7xl mb-4"
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  📱
                </motion.div>
                <div className="font-mono text-sm text-secondary">MSTC Balance: 12,450.00</div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 text-secondary text-sm font-medium mb-4">
                <span className="w-2 h-2 rounded-full bg-secondary" />
                Live Now
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Your MSTC.{" "}
                <span className="text-gradient-primary">Your Control.</span>
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                MST Blockchain is now live on SafePal — one of Web3's most trusted wallet infrastructures.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  "Store MSTC securely on SafePal Hardware Wallet",
                  "Access via SafePal Web3 Wallet",
                  "Experience stronger security and seamless usability",
                ].map((f) => (
                  <div key={f} className="flex items-center gap-3">
                    <Zap className="text-secondary shrink-0" size={16} />
                    <span className="text-sm text-muted-foreground">{f}</span>
                  </div>
                ))}
              </div>
              <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition">
                Get SafePal Wallet <ArrowRight size={18} />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Decent Den */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 scanline-overlay opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-primary/5" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-destructive/20 text-destructive text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
              LIVE
            </div>
            <h2 className="text-3xl md:text-6xl font-display font-bold mb-4">
              The World's First{" "}
              <span className="text-gradient-violet">Blockchain Reality Show</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-4">
              Where blockchain creators battle for the throne.
            </p>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Every vote is on-chain. The power belongs to YOU.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a href="https://decentden.com" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition">
                Watch Live on decentden.com ↗
              </a>
              <a href="#" className="px-8 py-4 border border-primary/40 text-foreground font-semibold rounded-xl hover:bg-primary/10 transition">
                YouTube Stream ↗
              </a>
            </div>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto italic">
              "This is more than a show — it's a movement to empower creators and accelerate Web3 adoption."
            </p>
          </motion.div>
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
            Built stronger <span className="text-gradient-primary">together.</span>
          </motion.h2>
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-5xl mx-auto"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {partners.map((p) => (
              <motion.div
                key={p.name}
                variants={fadeUp}
                className="glass rounded-xl p-6 hover:border-primary/40 transition-all"
                whileHover={{ y: -5, rotateX: 3, rotateY: 3 }}
              >
                <h3 className="font-display font-semibold mb-2">{p.name}</h3>
                <p className="text-xs text-muted-foreground">{p.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            className="text-3xl md:text-5xl font-display font-bold mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Become Part of the{" "}
            <span className="text-gradient-primary">MST Ecosystem</span>
          </motion.h2>
          <motion.div
            className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { icon: Code2, title: "Developer", desc: "Build dApps, earn grants, deploy smart contracts", cta: "Start Building ↗", link: "/build-with-mst", color: "border-t-primary" },
              { icon: Building2, title: "Enterprise", desc: "Integrate MST infrastructure into your business", cta: "Talk to Us ↗", link: "/about", color: "border-t-secondary" },
              { icon: Wallet, title: "Token Holder", desc: "Hold MSTC, participate in governance, grow with the ecosystem", cta: "Get SafePal ↗", link: "#", color: "border-t-accent" },
            ].map((card) => (
              <motion.div
                key={card.title}
                variants={fadeUp}
                className={`glass rounded-2xl p-8 border-t-4 ${card.color} text-left`}
                whileHover={{ y: -8 }}
              >
                <card.icon className="text-primary mb-4" size={28} />
                <h3 className="font-display font-semibold text-lg mb-2">{card.title}</h3>
                <p className="text-sm text-muted-foreground mb-6">{card.desc}</p>
                <Link to={card.link} className="text-sm font-medium text-primary hover:underline">{card.cta}</Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Ecosystem;
