"use client";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Services() {
  return (
    <section className="py-32 bg-surface" id="services">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-20 text-center"
        >
          <h2 className="text-4xl font-black font-headline mb-4">Dịch vụ Chuyên nghiệp</h2>
          <div className="h-1.5 w-24 bg-primary rounded-full"></div>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Service 1 */}
          <motion.div variants={itemVariants} className="group bg-surface-container-lowest p-10 rounded-[2rem] border border-outline-variant/10 hover:shadow-2xl transition-all duration-300">
            <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-on-primary transition-colors">
              <span className="material-symbols-outlined text-4xl">strategy</span>
            </div>
            <h3 className="text-2xl font-bold font-headline mb-4">Tư vấn chiến lược AI</h3>
            <p className="text-on-surface-variant mb-8 leading-relaxed">
              Phân tích hiện trạng và xây dựng lộ trình ứng dụng AI phù hợp với mục tiêu kinh doanh của doanh nghiệp bạn.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-sm font-medium text-on-surface">
                <span className="material-symbols-outlined text-primary text-lg" data-weight="fill">check_circle</span>
                Đánh giá tính khả thi AI
              </li>
              <li className="flex items-center gap-2 text-sm font-medium text-on-surface">
                <span className="material-symbols-outlined text-primary text-lg" data-weight="fill">check_circle</span>
                Tối ưu chi phí đầu tư
              </li>
            </ul>
          </motion.div>

          {/* Service 2 */}
          <motion.div variants={itemVariants} className="group bg-primary text-on-primary p-10 rounded-[2rem] shadow-2xl shadow-primary/20 md:scale-105 z-10 transition-transform hover:scale-[1.07]">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-8">
              <span className="material-symbols-outlined text-4xl">auto_mode</span>
            </div>
            <h3 className="text-2xl font-bold font-headline mb-4">Hệ thống Tự động hóa</h3>
            <p className="text-on-primary-container mb-8 leading-relaxed">
              Thiết kế và triển khai các workflow tự động hóa (n8n, Make, Zapier) giúp giảm thiểu sai sót và tiết kiệm thời gian.
            </p>
            <ul className="space-y-3 mb-8 text-on-primary">
              <li className="flex items-center gap-2 text-sm font-medium">
                <span className="material-symbols-outlined text-lg" data-weight="fill">check_circle</span>
                Tự động hóa Sales & Marketing
              </li>
              <li className="flex items-center gap-2 text-sm font-medium">
                <span className="material-symbols-outlined text-lg" data-weight="fill">check_circle</span>
                AI Chatbot chăm sóc khách hàng
              </li>
            </ul>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-white text-primary py-3 rounded-xl font-bold font-headline hover:bg-surface-container-low transition-colors"
            >
              Tìm hiểu thêm
            </motion.button>
          </motion.div>

          {/* Service 3 */}
          <motion.div variants={itemVariants} className="group bg-surface-container-lowest p-10 rounded-[2rem] border border-outline-variant/10 hover:shadow-2xl transition-all duration-300">
            <div className="w-16 h-16 bg-tertiary/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-tertiary group-hover:text-on-tertiary transition-colors">
              <span className="material-symbols-outlined text-4xl">school</span>
            </div>
            <h3 className="text-2xl font-bold font-headline mb-4">Đào tạo Doanh nghiệp</h3>
            <p className="text-on-surface-variant mb-8 leading-relaxed">
              Chương trình đào tạo thực chiến về Prompt Engineering và công cụ AI cho đội ngũ nhân sự của bạn.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2 text-sm font-medium text-on-surface">
                <span className="material-symbols-outlined text-tertiary text-lg" data-weight="fill">check_circle</span>
                Kỹ năng sử dụng ChatGPT & LLMs
              </li>
              <li className="flex items-center gap-2 text-sm font-medium text-on-surface">
                <span className="material-symbols-outlined text-tertiary text-lg" data-weight="fill">check_circle</span>
                Ứng dụng AI Content Creation
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
