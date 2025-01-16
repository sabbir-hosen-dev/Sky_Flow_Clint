import { useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
const CouponCard = ({ code, discount,description }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
    className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center gap-3 relative w-72 hover:scale-105 transition-transform cursor-pointer"
    whileHover={{ y: -5 }}
  >
    <span className="text-lg font-bold">{discount} OFF</span>
    <p className="text-sm">{description}</p>
    <div className="bg-white text-indigo-600 font-bold px-4 py-2 rounded-md flex items-center gap-2">
      <span>{code}</span>
      <button onClick={copyToClipboard} className="ml-2 text-sm text-indigo-700 hover:underline">
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  </motion.div>
  );
};
CouponCard.propTypes = {
  code: PropTypes.string.isRequired,
  discount: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default CouponCard;
