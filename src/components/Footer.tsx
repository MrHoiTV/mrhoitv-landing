export default function Footer() {
  return (
    <footer className="w-full py-12 border-t border-slate-200 bg-slate-50">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-lg font-bold text-slate-900 font-headline">Mr. Hói TV</div>
        <p className="text-slate-500 font-body text-sm text-center md:text-left">
          © 2024 Mr. Hói TV. Chuyên gia Giải pháp AI & Tự động hóa Doanh nghiệp.
        </p>
        <div className="flex gap-8">
          <a className="text-slate-500 hover:text-blue-700 transition-colors text-sm font-medium" href="#">Facebook</a>
          <a className="text-slate-500 hover:text-blue-700 transition-colors text-sm font-medium" href="#">LinkedIn</a>
          <a className="text-slate-500 hover:text-blue-700 transition-colors text-sm font-medium" href="#">YouTube</a>
          <a className="text-slate-500 hover:text-blue-700 transition-colors text-sm font-medium" href="#">Zalo</a>
        </div>
      </div>
    </footer>
  );
}
