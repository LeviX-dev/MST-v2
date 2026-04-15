import { motion } from "framer-motion";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-background"
      exit={{ clipPath: "inset(0 0 0 100%)" }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.div className="flex flex-col items-center gap-6">
        <motion.svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke="hsl(270, 80%, 65%)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          <motion.path
            d="M35 60 L50 45 L60 75 L70 35 L85 60"
            fill="none"
            stroke="hsl(174, 72%, 52%)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeInOut" }}
          />
        </motion.svg>
        <motion.div
          className="text-2xl font-display font-bold text-gradient-primary"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          MST Blockchain
        </motion.div>
        <motion.div
          className="w-48 h-0.5 bg-muted rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-secondary"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
            onAnimationComplete={onComplete}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
