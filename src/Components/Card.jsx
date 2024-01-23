import React, { useRef } from "react";
import { motion } from "framer-motion";
const Card = ({ refernce }) => {
  // const ref = useRef(refernce);
  return (
    <motion.div
      drag
      dragConstraints={refernce}
      whileDrag={{ scale: 1.02 }}
      whileHover={{ scale: 1.01 }}
      dragElastic={0.1}
      className="text-dark p-3 w-25 h-25   rounded-3 bg-white"
    >
      <p className="fs-6 ">Lorem ipsum dolor sit amet,</p>
      <p className="overflow-auto">
        Lorem ipsum dolor sit ametLorem ipsum dolor sit amet Lorem ipsum dolor
        Lorem ipsum dolor sit ametLorem ipsum dolor sit amet Lorem ipsum dolor
        Lorem ipsum dolor sit ametLorem ipsuLorem ipsum dolor sit ametLorem
        ipsum dolor sit amet
      </p>
      <div></div>
    </motion.div>
  );
};

export default Card;
