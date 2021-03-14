import React from 'react';
import { motion } from 'framer-motion';

const Organizations = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      Organizations
    </motion.div>
  );
};

export default Organizations;
