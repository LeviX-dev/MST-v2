import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Palette, Building2, Gamepad2, Fingerprint, Link2 } from "lucide-react";
import PageTransition from "@/components/PageTransition";

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const solutions = [
  { icon: Palette, title: "NFTs & Art & Culture", desc: "Tokenize art, heritage, and digital collectibles. Empower creators with on-chain ownership and provenance." },
  { icon: Building2, title: "Enterprise & Consumer Apps", desc: "Build scalable applications for businesses and consumers with blockchain-backed trust and transparency." },
  { icon: Gamepad2, title: "Gaming & Web3", desc: "Next-gen gaming experiences with true asset ownership, in-game economies, and play-to-earn models." },
  { icon: Fingerprint, title: "Digital Identity & Credentials", desc: "Tokenized identity verification and credential management on an immutable, decentralized infrastructure." },
  { icon: Link2, title: "Supply Chain & Smart Contracts", desc: "End-to-end supply chain transparency with automated smart contract execution and real-time tracking." },
];

const Solutions = () => {
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
            Solutions for{" "}
            <span className="text-gradient-primary">Every Industry</span>
          </motion.h1>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            From NFTs to enterprise applications — MST Blockchain powers innovation across every vertical.
          </motion.p>
        </div>
      </section>

      {/* Solutions Cards */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            className="space-y-8 max-w-4xl mx-auto"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {solutions.map((s, i) => (
              <motion.div
                key={s.title}
                variants={fadeUp}
                className="glass rounded-2xl p-8 md:p-10 group hover:border-primary/40 transition-all cursor-pointer"
                whileHover={{ scale: 1.02, rotateX: 1, rotateY: i % 2 === 0 ? 1 : -1 }}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:glow-primary transition-shadow">
                    <s.icon className="text-primary" size={32} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-mono text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                      <h3 className="font-display font-semibold text-xl">{s.title}</h3>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                  <ArrowRight className="text-muted-foreground group-hover:text-primary transition-colors shrink-0 hidden md:block" size={24} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Digital Identity Spotlight */}
      <section className="py-24 bg-gradient-section">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            className="glass rounded-2xl p-10 md:p-16 text-center border-glow"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-medium mb-6">
              SmartTech Asia 2026
            </div>
            <h2 className="text-2xl md:text-4xl font-display font-bold mb-6">
              Tokenized Identity & Credentials{" "}
              <span className="text-gradient-primary">on Blockchain</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-4 leading-relaxed">
              Highlighted from Pramod Borate's talk at SmartTech Asia 2026 at Jio World Convention Centre Mumbai — exploring how blockchain transforms identity verification and credential management.
            </p>
            <p className="text-sm text-muted-foreground italic">
              "Digital identity is not just a feature — it's the foundation of trust in the decentralized world."
            </p>
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
            Ready to build your{" "}
            <span className="text-gradient-primary">solution</span>?
          </motion.h2>
          <motion.p
            className="text-muted-foreground mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Join the MST ecosystem and bring your vision to life.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link to="/build-with-mst" className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition">
              Start Building <ArrowRight className="inline ml-2" size={18} />
            </Link>
            <Link to="/ecosystem" className="px-8 py-4 border border-primary/40 text-foreground font-semibold rounded-xl hover:bg-primary/10 transition">
              Explore Ecosystem
            </Link>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Solutions;
