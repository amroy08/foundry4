"use client";

import React from "react";
import { Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function FloatingActions() {
  return (
    <div className="fixed bottom-6 right-6 z-[49] flex flex-col gap-4 pointer-events-auto">
      {/* WhatsApp Button */}
      <motion.a
        href="https://wa.me/918433568078?text=Hi%20Foundry4%2C%20I%20would%20like%20to%20enquire%20about%20your%20services."
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-[#25D366] text-white shadow-lg flex items-center justify-center relative hover:bg-[#20ba5a] transition-colors focus-visible:ring-2 focus-visible:ring-[#25D366]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Contact via WhatsApp"
      >
        {/* Pulsing ring */}
        <span className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-60 pointer-events-none" />
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M12.012 2c-5.506 0-9.988 4.479-9.988 9.985 0 1.764.46 3.48 1.333 4.993L2 22l5.233-1.371c1.448.789 3.078 1.206 4.779 1.206 5.507 0 9.989-4.479 9.989-9.985C22 6.479 17.519 2 12.012 2zm0 18.291c-1.587 0-3.142-.425-4.507-1.227l-.323-.19-3.353.879.896-3.268-.21-.334c-.878-1.397-1.341-3.023-1.341-4.706 0-4.673 3.805-8.477 8.518-8.477 4.707 0 8.523 3.804 8.523 8.478 0 4.673-3.812 8.477-8.526 8.477z" />
          <path d="M16.942 14.195c-.27-.135-1.597-.787-1.846-.877-.248-.09-.43-.135-.61.135-.18.27-.698.877-.856 1.057-.158.18-.315.202-.585.067-.27-.135-1.138-.419-2.167-1.338-.802-.715-1.343-1.6-1.5-1.87-.157-.27-.017-.417.118-.552.122-.121.27-.315.405-.472.135-.157.18-.27.27-.45.09-.18.045-.337-.023-.472-.068-.135-.61-1.467-.833-2.006-.217-.521-.456-.45-.626-.459-.162-.008-.348-.01-.535-.01-.188 0-.495.07-.754.354-.26.284-.99.967-.99 2.359s1.01 2.733 1.152 2.924c.143.191 1.987 3.033 4.814 4.25.672.29 1.197.463 1.606.593.676.215 1.291.185 1.777.113.543-.08 1.597-.652 1.822-1.282.225-.63.225-1.17.157-1.283-.068-.112-.248-.18-.518-.315z" />
        </svg>
      </motion.a>

      {/* Email Button */}
      <motion.a
        href="mailto:info@foundry4.in"
        className="w-12 h-12 rounded-full bg-brand-primary text-white shadow-lg flex items-center justify-center hover:bg-brand-secondary transition-colors focus-visible:ring-2 focus-visible:ring-brand-primary"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Contact via Email"
      >
        <Mail className="w-5 h-5" />
      </motion.a>
    </div>
  );
}
