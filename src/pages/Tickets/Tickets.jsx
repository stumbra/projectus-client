import React from 'react';
import { motion } from 'framer-motion';

const Tickets = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      Tickets
    </motion.div>
  );
};

export default Tickets;
