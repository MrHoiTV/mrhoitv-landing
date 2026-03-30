"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-8 py-20 flex flex-col md:flex-row items-center gap-16">
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex-1 space-y-8"
      >
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold tracking-widest uppercase">
          AI Specialist & Automation Expert
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-headline text-primary tracking-tight leading-relaxed md:leading-tight break-words">
          Mr. Hói TV — <br className="hidden sm:block" />
          <span className="text-on-surface">Kiến tạo tương lai số.</span>
        </h1>
        <p className="text-lg md:text-xl text-on-surface-variant max-w-xl leading-relaxed font-body">
          Hơn 20 năm kinh nghiệm trong ngành công nghệ, tôi tận dụng sức mạnh của AI và Automation để giúp doanh nghiệp bứt phá hiệu suất và tối ưu hóa quy trình vận hành.
        </p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 pt-4 w-full">
          <motion.button 
            whileHover={{ y: -2, boxShadow: "0px 10px 20px rgba(0, 61, 155, 0.2)" }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto bg-primary text-on-primary px-8 py-4 rounded-xl font-headline font-bold text-lg shadow-xl shadow-primary/20 transition-all text-center"
          >
            Bắt đầu ngay
          </motion.button>
          <motion.button 
            whileHover={{ x: 5 }}
            className="w-full sm:w-auto flex items-center gap-2 font-headline font-semibold text-primary transition-all group py-2"
          >
            Xem hồ sơ năng lực
            <span className="material-symbols-outlined group-hover:block transition-all">arrow_forward</span>
          </motion.button>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="flex-1 relative"
      >
        <div className="w-full aspect-square rounded-[2rem] overflow-hidden bg-surface-container-high relative z-10">
          <img 
            className="w-full h-full object-cover" 
            alt="Professional headshot of Mr. Hói TV" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsKfj-MdR5vhJt1tWVa0O6RVp6kOPnMhGreyNqzL_7Zii2FJ3nS5q4NcaCIOHsjlAxCHWOqv5e1YIagZXtD2b2xkayQvsPu9H3E4HJASNexUy2Z3ZuDYem4-0JMM36X1UcpQsIVwzG_CyukcHYB0FwkYb5aNBtcOKbwBsBBnx2xFElNNiTrKZHSE7FIjcY0DIGsMFUlnScixqg1YwbR6A69JflaEvOJ8uBpy0quqQQOccC8fXeoCaDTQK-N_TD4CZb5IOgBf0BLyCk"
          />
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="absolute -bottom-8 -left-8 bg-surface-container-lowest p-8 rounded-2xl shadow-2xl z-20 flex items-center gap-4"
        >
          <div className="p-3 bg-primary/10 rounded-full">
            <span className="material-symbols-outlined text-primary text-3xl" data-weight="fill">verified</span>
          </div>
          <div>
            <div className="text-2xl font-black font-headline">20+</div>
            <div className="text-xs text-on-surface-variant font-medium">Năm kinh nghiệm</div>
          </div>
        </motion.div>
        <div className="absolute -top-6 -right-6 w-32 h-32 bg-tertiary/10 rounded-full blur-3xl"></div>
      </motion.div>
    </section>
  );
}
