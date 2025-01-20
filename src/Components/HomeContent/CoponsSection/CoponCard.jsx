import { useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const CouponCard = ({ code, discount, description }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (offer) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success(`${offer} off coupon Copy`)
    setTimeout(() => {setCopied(false) }, 2000);
  };

  return (
    <motion.div
      className="w-full p-6 rounded-lg shadow-lg flex flex-col items-center justify-center gap-3 relative hover:scale-105 transition-transform cursor-pointer
      bg-[rgba(241,145,61,1)] text-white dark:bg-[rgb(23,23,23)] dark:text-gray-200"
      whileHover={{ y: -5 }}
    >
      <span className="text-lg font-bold">{discount}% OFF</span>
      <p className="text-sm">{description}</p>
      <div className="bg-white text-orange-600 font-bold px-4 py-2 rounded-md flex items-center gap-2 dark:bg-gray-700 dark:text-orange-300">
        <span>{code}</span>
        <button
          onClick={()=> copyToClipboard(discount)}
          className="ml-2 text-sm bg-primaryP/10 px-2 rounded-md text-orange-700 hover:underline dark:text-primaryP"
        >
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
