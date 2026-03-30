"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section className="py-32 bg-surface" id="contact">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-20">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-10"
        >
          <h2 className="text-5xl font-black font-headline leading-tight">
            Sẵn sàng để <br /> <span className="text-primary">Đột phá</span> cùng AI?
          </h2>
          <p className="text-xl text-on-surface-variant leading-relaxed">
            Hãy để lại thông tin, tôi sẽ trực tiếp liên hệ và tư vấn giải pháp tối ưu nhất cho bài toán của bạn.
          </p>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">mail</span>
              </div>
              <div>
                <div className="text-sm font-bold text-on-surface-variant">Email</div>
                <div className="text-lg font-semibold">contact@mrhoitv.com</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">call</span>
              </div>
              <div>
                <div className="text-sm font-bold text-on-surface-variant">Hotline</div>
                <div className="text-lg font-semibold">090x xxx xxx</div>
              </div>
            </div>
          </div>
          <div className="flex gap-4 pt-4">
            <motion.a whileHover={{ scale: 1.1, backgroundColor: "var(--color-primary)", color: "white" }} className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center transition-colors" href="#">FB</motion.a>
            <motion.a whileHover={{ scale: 1.1, backgroundColor: "var(--color-primary)", color: "white" }} className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center transition-colors" href="#">IN</motion.a>
            <motion.a whileHover={{ scale: 1.1, backgroundColor: "var(--color-primary)", color: "white" }} className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center transition-colors" href="#">YT</motion.a>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-surface-container-lowest p-10 rounded-[2.5rem] shadow-xl"
        >
          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-on-surface-variant ml-1">Họ và tên</label>
              <input className="w-full bg-surface-container-low border-none rounded-xl p-4 focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none" placeholder="Nhập tên của bạn" type="text" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-on-surface-variant ml-1">Số điện thoại / Zalo</label>
              <input className="w-full bg-surface-container-low border-none rounded-xl p-4 focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none" placeholder="Nhập số điện thoại" type="text" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-on-surface-variant ml-1">Nội dung cần tư vấn</label>
              <textarea className="w-full bg-surface-container-low border-none rounded-xl p-4 focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none min-h-[120px]" placeholder="Bạn đang quan tâm đến giải pháp nào?" rows={4}></textarea>
            </div>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              className="w-full bg-primary text-on-primary py-4 rounded-xl font-bold font-headline text-lg shadow-md hover:shadow-lg hover:shadow-primary/30 transition-shadow"
            >
              Gửi yêu cầu ngay
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
