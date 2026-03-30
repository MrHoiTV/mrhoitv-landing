"use client";

import { motion } from "framer-motion";

export default function Portfolio() {
  return (
    <section className="py-32 bg-surface-container-lowest overflow-hidden" id="projects">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4"
        >
          <div>
            <span className="text-primary font-bold tracking-widest uppercase text-xs">Portfolio</span>
            <h2 className="text-5xl font-black font-headline mt-2">Dự án tiêu biểu</h2>
          </div>
          <a className="text-primary font-bold hover:underline mb-2" href="#">Tất cả dự án &rarr;</a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Project 1 */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group cursor-pointer"
          >
            <div className="relative overflow-hidden rounded-[2rem] mb-6 aspect-video">
              <img 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                alt="AI Dashboard" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAELKy-wUuJ-7FFv7UYy47v5MwiB8EmjYWB-DHUqb9G8lcuBeQU0zarjn8SJ3qjmplP2oClY9gGvEEWFFNhDTZajYLVWXbtkTfN-mwxWI_1RzpEuMIHMkDNdE6Lf8ec4FDhOL1_LFaoxKJn6un3HOi3vHYA9j8qEZvnBoAblzlNvpLfH5wmHmHmxTuHQu41puIW7KKPqdkBjY8svfbSKwQPcCEWnJxDhqjig5rEqbttAj96QiaZhaIYTd1YRB4YQB-Ia7b3vh_yaWnN"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-10">
                <span className="text-white font-bold text-lg">Xem chi tiết dự án</span>
              </div>
            </div>
            <h4 className="text-xs font-bold text-tertiary uppercase tracking-widest mb-2">AI Integration</h4>
            <h3 className="text-2xl font-bold font-headline group-hover:text-primary transition-colors">Hệ thống AI Chatbot đa nền tảng cho F&B</h3>
          </motion.div>

          {/* Project 2 */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group cursor-pointer md:mt-24"
          >
            <div className="relative overflow-hidden rounded-[2rem] mb-6 aspect-video">
              <img 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                alt="Workflow automation nodes" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGI4DQXBGygkLsvhLI3t0BJG4AbbOE3oGAT5OkyyTvy87_ztzbWziRHuPUAtF1_YjKqoMblux73WAl3tvxH4tvrLTjYfZGY6goPE4tsVK2RAFuW8OcRVkL1IA4iw-tXdwAfikswHbqP8HdrUMAjYtYvFDly3gg-H-JJJiqG2FktC70ZrD7lsyoP1afv0yjaERfizzD8V6G8IY617NwVoX9iDPjOlKk69GUPZ88qZY250nZav1Sf2_tuj5qvHpgolUVevN21IX4us2g"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-10">
                <span className="text-white font-bold text-lg">Xem chi tiết dự án</span>
              </div>
            </div>
            <h4 className="text-xs font-bold text-tertiary uppercase tracking-widest mb-2">Workflow Automation</h4>
            <h3 className="text-2xl font-bold font-headline group-hover:text-primary transition-colors">Tự động hóa quy trình Content Marketing 100% bằng AI</h3>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
