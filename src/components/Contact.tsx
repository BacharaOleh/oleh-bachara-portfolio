"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Mail, MessageSquare, CheckCircle2, Phone } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { SOCIAL_LINKS, TRANSLATIONS, type Lang } from "@/data/portfolio-data";

interface ContactProps {
  lang: Lang;
}

export function Contact({ lang }: ContactProps) {
  const t = TRANSLATIONS[lang].contact;
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<{
    name: string;
    email: string;
    projectType: string;
    message: string;
    rodo: boolean;
  }>({
    name: "",
    email: "",
    projectType: t.projectTypes[0],
    message: "",
    rodo: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.rodo) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setStatus("success");
    setForm({ name: "", email: "", projectType: t.projectTypes[0], message: "", rodo: false });
  };

  const inputClass =
    "w-full bg-slate-950/80 border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/40 transition-all duration-200";

  return (
    <section id="contact" className="py-20 md:py-28 relative">
      <div className="container-custom">
        <SectionHeading
          eyebrow="Initiate Contact"
          title={t.title}
          highlight="Together"
          subtitle={t.subtitle}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-3xl relative overflow-hidden"
          >
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center flex flex-col items-center justify-center gap-4"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-xl font-bold text-white">Message Sent Successfully</h3>
                <p className="text-slate-400 text-sm max-w-md">
                  Thank you for reaching out. I will respond to your inquiry within 24 hours.
                </p>
                <Button variant="outline" size="sm" onClick={() => setStatus("idle")} className="mt-2">
                  Send Another Message
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono font-medium text-slate-300 mb-1.5 block">
                      {t.name}
                    </label>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Jan Kowalski"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono font-medium text-slate-300 mb-1.5 block">
                      {t.email}
                    </label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="jan@company.com"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono font-medium text-slate-300 mb-2 block">
                    {t.projectType}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {t.projectTypes.map((pt) => (
                      <button
                        type="button"
                        key={pt}
                        onClick={() => setForm({ ...form, projectType: pt })}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer ${
                          form.projectType === pt
                            ? "bg-indigo-600 text-white border border-indigo-400 shadow-sm"
                            : "bg-slate-950/60 border border-white/[0.08] text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        {pt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono font-medium text-slate-300 mb-1.5 block">
                    {t.message}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Describe your goals, requirements, or timeline..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {/* RODO Consent Checkbox */}
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/50 border border-white/[0.06]">
                  <input
                    id="rodo-checkbox"
                    type="checkbox"
                    required
                    checked={form.rodo}
                    onChange={(e) => setForm({ ...form, rodo: e.target.checked })}
                    className="mt-0.5 w-4 h-4 rounded accent-indigo-600 cursor-pointer shrink-0"
                  />
                  <label htmlFor="rodo-checkbox" className="text-[11px] text-slate-400 leading-relaxed cursor-pointer select-none">
                    {t.rodo}
                  </label>
                </div>

                <Button type="submit" size="lg" className="w-full cursor-pointer" disabled={loading}>
                  {loading ? (
                    "Processing..."
                  ) : (
                    <>
                      {t.send}
                      <Send size={16} />
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>

          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-5 flex flex-col justify-between gap-4"
          >
            <div className="space-y-4">
              <a
                href={SOCIAL_LINKS.email}
                className="glass-card p-5 rounded-2xl flex items-center gap-4 hover:border-indigo-500/40 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Direct Email</div>
                  <div className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">
                    olegbachara@gmail.com
                  </div>
                </div>
              </a>

              <a
                href={`tel:${SOCIAL_LINKS.phone.replace(/\s+/g, '')}`}
                className="glass-card p-5 rounded-2xl flex items-center gap-4 hover:border-emerald-500/40 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Phone / WhatsApp</div>
                  <div className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">
                    +48 453 315 500
                  </div>
                </div>
              </a>

              <a
                href={SOCIAL_LINKS.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-5 rounded-2xl flex items-center gap-4 hover:border-cyan-500/40 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                  <MessageSquare size={18} />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Telegram Direct</div>
                  <div className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                    @olegh_bachara
                  </div>
                </div>
              </a>

              <div className="glass-card p-5 rounded-2xl flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-800 border border-white/[0.08] flex items-center justify-center text-slate-400 shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Base Location</div>
                  <div className="text-sm font-semibold text-white">
                    Jarosław, Podkarpackie, Poland 🇵🇱
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card p-5 rounded-2xl bg-indigo-500/[0.03] border-indigo-500/20">
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                ⚡ <strong className="text-white">Quick Response Guaranteed:</strong> Available for remote roles, corporate web engineering, product catalog architecture, and technical marketing across the EU.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
