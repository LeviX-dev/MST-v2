import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Linkedin, Award, Globe, Calendar } from "lucide-react";
import PageTransition from "@/components/PageTransition";

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const events = [
  { date: "2026", title: "IGNITE 2026", desc: "Internal innovation summit" },
  { date: "2026", title: "SmartTech Asia 2026", desc: "Stall SE52, Jio World Convention Centre, Mumbai" },
  { date: "2026", title: "Round Table Discussion", desc: "\"India's Net-Zero Pathway\" — energy & sustainability panel" },
  { date: "2026", title: "15th Business Meet", desc: "Awareness & Training — Heria, West Bengal" },
  { date: "2026", title: "MoU Signed", desc: "D.Y. Patil College of Engineering, Akurdi Pune" },
];

const news = [
  { title: "Roadmap 2026 on Binance", desc: "MST Blockchain's 2026 roadmap featured on Binance platform." },
  { title: "SafePal Partnership", desc: "MSTC now live on SafePal Hardware + Web3 Wallet." },
  { title: "Kann Audits Partnership", desc: "Enhanced smart contract security and auditing standards." },
];

const team = [
  { name: "Pramod Borate", role: "Chairman & Founder Director", desc: "24+ years leadership, Blockchain Innovator, Web3 Ecosystem Builder" },
];

const About = () => {
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
            About <span className="text-gradient-primary">MST Blockchain</span>
          </motion.h1>
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Founded in Pune, Maharashtra — building India's decentralized future.
          </motion.p>
        </div>
      </section>

      {/* Founder */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.h2
            className="text-3xl md:text-5xl font-display font-bold text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Leadership
          </motion.h2>
          <motion.div
            className="glass rounded-2xl p-8 md:p-12 border-glow max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary mx-auto mb-6 flex items-center justify-center">
              <span className="text-3xl font-display font-bold text-primary-foreground">PB</span>
            </div>
            <h3 className="font-display font-bold text-2xl mb-1">Pramod Borate</h3>
            <p className="text-primary text-sm font-medium mb-4">Chairman & Founder Director</p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              24+ years of leadership in technology and innovation. Blockchain Innovator and Web3 Ecosystem Builder — driving India's blockchain revolution from Pune to the world.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Award size={14} /> Blockchain Pioneer</span>
              <span className="flex items-center gap-1"><Globe size={14} /> Pune, India</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-24 bg-gradient-section">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <motion.blockquote
            className="text-2xl md:text-4xl font-display font-medium leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            "Beyond hype — building real infrastructure for{" "}
            <span className="text-gradient-primary">trust, identity, and value exchange.</span>"
          </motion.blockquote>
          <motion.p
            className="text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            — MST Blockchain Vision Statement
          </motion.p>
        </div>
      </section>

      {/* Events */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.h2
            className="text-3xl md:text-5xl font-display font-bold text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Recent <span className="text-gradient-primary">Events</span>
          </motion.h2>
          <motion.div
            className="space-y-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {events.map((event) => (
              <motion.div
                key={event.title}
                variants={fadeUp}
                className="glass rounded-xl p-6 flex items-start gap-4 hover:border-primary/40 transition-all"
                whileHover={{ x: 5 }}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Calendar className="text-primary" size={18} />
                </div>
                <div>
                  <span className="text-xs font-mono text-primary">{event.date}</span>
                  <h3 className="font-display font-semibold mt-1">{event.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{event.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* News */}
      <section className="py-24 bg-gradient-section">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-3xl md:text-5xl font-display font-bold text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Latest <span className="text-gradient-primary">News</span>
          </motion.h2>
          <motion.div
            className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {news.map((n) => (
              <motion.div
                key={n.title}
                variants={fadeUp}
                className="glass rounded-2xl p-6 hover:border-primary/40 transition-all group"
                whileHover={{ y: -8 }}
              >
                <div className="w-full h-32 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 mb-6 flex items-center justify-center">
                  <Globe className="text-primary/40" size={40} />
                </div>
                <h3 className="font-display font-semibold mb-2 group-hover:text-primary transition-colors">{n.title}</h3>
                <p className="text-sm text-muted-foreground">{n.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { value: "5,765+", label: "LinkedIn Followers" },
              { value: "Pune", label: "Maharashtra, India" },
              { value: "2026", label: "Year of Vision" },
              { value: "Layer 1", label: "Infrastructure" },
            ].map((s) => (
              <motion.div key={s.label} variants={fadeUp} className="glass rounded-xl p-6">
                <div className="text-2xl font-display font-bold text-gradient-primary mb-1">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-section">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            className="text-3xl md:text-5xl font-display font-bold mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Join the <span className="text-gradient-primary">MST journey</span>
          </motion.h2>
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

export default About;
