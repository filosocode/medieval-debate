import { motion } from 'framer-motion';

const PhilosopherIllustration = ({ number = 1, philosopher = null }) => {
  let image;

  if (philosopher) {
    image = `/${philosopher}.png`;
  } else {
    image = `/philosopher-illustration${number}.png`;
  }

  return (
    <motion.div
      className="fixed bottom-0 right-0 h-screen pointer-events-none flex items-end justify-end z-5 pr-4 pb-4 sm:pr-6 sm:pb-6 md:pr-8 md:pb-8"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      key={image}
    >
      <img
        src={image}
        alt="Filósofo Medieval"
        className="h-48 sm:h-64 md:h-80 lg:h-96 w-auto object-contain drop-shadow-2xl"
        style={{
          filter: 'saturate(1.2) hue-rotate(95deg) brightness(1.2) contrast(1.4) drop-shadow(0 0 80px rgba(0, 255, 159, 0.7)) drop-shadow(0 0 30px rgba(0, 255, 159, 0.5))',
        }}
      />
    </motion.div>
  );
};

export default PhilosopherIllustration;
