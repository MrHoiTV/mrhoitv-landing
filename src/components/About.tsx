"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="bg-surface-container-low py-32">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-12 gap-12">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="col-span-12 md:col-span-4"
        >
          <h2 className="text-4xl font-black font-headline text-primary sticky top-32">
            Tâm thế của một <br /> Chuyên gia
          </h2>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="col-span-12 md:col-span-7 md:col-start-6 space-y-12"
        >
          <p className="text-2xl text-on-surface leading-snug font-body italic border-l-4 border-primary pl-8">
            "AI không thay thế con người, nhưng những người sử dụng AI sẽ thay thế những người không sử dụng nó."
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold font-headline text-on-surface">Hành trình 20 năm</h3>
              <p className="text-on-surface-variant leading-relaxed">
                Bắt đầu từ những dòng code đầu tiên khi internet còn sơ khai, tôi đã chứng kiến sự chuyển mình của công nghệ. Hiện tại, sứ mệnh của tôi là bình dân hóa AI cho mọi doanh nghiệp Việt.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold font-headline text-on-surface">Đam mê công nghệ</h3>
              <p className="text-on-surface-variant leading-relaxed">
                Luôn tìm tòi những giải pháp tự động hóa thông minh nhất để giải phóng sức lao động, giúp con người tập trung vào những giá trị sáng tạo và nhân bản hơn.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
