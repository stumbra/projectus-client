import React from 'react';
import { motion } from 'framer-motion';

const Profile = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      Profile
    </motion.div>
  );
};

export default Profile;
