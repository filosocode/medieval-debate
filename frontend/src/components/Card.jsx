import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Card = ({ to, icon, title, desc, color, bgColor = "", index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      <Link
        to={to}
        className={`philosopher-card block border rounded-sm p-6 no-underline group transition-all backdrop-blur-sm ${color} ${bgColor || 'bg-black/30'}`}
      >
        <div className="flex items-start gap-4">
          <motion.span
            className="text-secondary text-4xl mt-1 inline-block drop-shadow-lg"
            whileHover={{ scale: 1.3, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {icon}
          </motion.span>
          <div>
            <h3 className="font-display text-parchment-100 text-xl mb-1 group-hover:text-secondary transition-colors duration-300">
              {title}
            </h3>
            <p className="font-body text-parchment-300 text-sm leading-relaxed group-hover:text-parchment-100 transition-colors duration-300">
              {desc}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default Card;
