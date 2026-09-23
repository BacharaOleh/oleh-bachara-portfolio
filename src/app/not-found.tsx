import Link from "next/link";
import { FileText, Home } from "lucide-react";
import { BrandMark } from "@/components/BrandMark";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#11100e] text-[#eeece5] flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute inset-0 bg-[radial-gradient(#c4a160_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="w-full max-w-md relative z-10 text-center space-y-6">
        <div className="flex justify-center">
          <BrandMark className="w-12 h-12 border-[#c4a160]/40 text-[#c4a160]" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c4a160]/10 border border-[#c4a160]/30 font-mono text-xs uppercase tracking-wider text-[#c4a160]">
            <span>Error 404 / Target Not Found</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display">
            Сторінку не знайдено
          </h1>
          <p className="text-xs sm:text-sm text-[#a39c91] font-mono max-w-xs sm:max-w-sm mx-auto leading-relaxed">
            Запитаний маршрут або технічний кейс не існує або був переміщений у межах оновлення v0.2.0.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <Link
            href="/"
            className="w-full min-h-[46px] px-4 py-2.5 rounded-xl bg-[#c4a160] hover:bg-[#dfc282] text-[#11100e] font-semibold text-xs font-mono transition-colors shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <Home size={15} />
            <span>На головну</span>
          </Link>

          <Link
            href="/cv"
            className="w-full min-h-[46px] px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 text-[#eeece5] font-semibold text-xs font-mono transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <FileText size={15} className="text-[#c4a160]" />
            <span>Резюме CV (PDF)</span>
          </Link>
        </div>

        <div className="pt-4 border-t border-white/[0.08] text-[11px] font-mono text-[#777168]">
          Roman Deyneko Engineering &bull; Full-Stack &amp; Hardware Platform
        </div>
      </div>
    </div>
  );
}
