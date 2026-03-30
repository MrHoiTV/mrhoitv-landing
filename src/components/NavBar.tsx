"use client";

import { motion } from "framer-motion";

export default function NavBar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 w-full z-50 glass-nav shadow-sm"
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 md:px-8 py-4">
        <div className="text-2xl md:text-3xl font-black text-blue-900 tracking-tighter font-headline leading-relaxed break-words">
          Mr. Hói TV
        </div>
        <div className="hidden md:flex items-center space-x-8 font-headline tracking-tight font-semibold text-sm">
          <a className="text-blue-700 border-b-2 border-blue-700 pb-1" href="#">Giới thiệu</a>
          <a className="text-slate-600 hover:text-blue-800 transition-colors" href="#services">Dịch vụ</a>
          <a className="text-slate-600 hover:text-blue-800 transition-colors" href="#projects">Dự án</a>
          <a className="text-slate-600 hover:text-blue-800 transition-colors" href="#contact">Liên hệ</a>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-primary text-on-primary px-6 py-2.5 rounded-xl font-headline font-semibold text-sm hover:opacity-90 transition-all duration-200"
        >
          Đăng ký tư vấn
        </motion.button>
      </div>
      <div className="bg-slate-100/50 h-[1px] w-full"></div>
    </motion.nav>
  );
}
