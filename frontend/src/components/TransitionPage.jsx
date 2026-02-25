import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const TransitionPage = () => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setIsTransitioning(true);
    }
  }, [location, displayLocation]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isTransitioning ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      onAnimationComplete={() => {
        if (isTransitioning) {
          setDisplayLocation(location);
          setIsTransitioning(false);
        }
      }}
      className="pointer-events-none"
    >
      {isTransitioning && (
        <div className="fixed inset-0 bg-gradient-to-br from-darkBg via-secondary/10 to-darkBg z-40 border-t-2 border-secondary/40" />
      )}
    </motion.div>
  );
};

export default TransitionPage;
