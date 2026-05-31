"use client";

import { useState } from "react";
import { CLOSE } from "@/lib/content";
import { ClassificationStamp } from "@/components/ui/ClassificationStamp";
import { CornerBracket } from "@/components/ui/CornerBracket";
import { EMPPulse } from "@/components/ui/EMPPulse";
import { useSectionReveal } from "@/hooks/useSectionReveal";
import { cn } from "@/lib/utils";

// TODO: wire third-party accreditation verification before public deployment
// TODO: connect intake form to backend endpoint (currently stub)
function IntakeForm() {
  const [form, setForm] = useState({
    name: "",
    organization: "",
    authContext: "",
    email: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: POST to accreditation endpoint
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="font-mono text-signal text-xs tracking-wider py-8">
        [ REQUEST RECEIVED // AUTHORIZATION UNDER REVIEW ]
      </div>
    );
  }

  const fieldClass =
    "w-full bg-transparent border border-steel/30 px-3 py-2 font-mono text-xs text-classified tracking-wider focus:outline-none focus:border-signal/60 transition-colors";
  const labelClass = "font-mono text-[10px] text-steel tracking-widest block mb-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-md">
      <div>
        <label className={labelClass}>NAME</label>
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className={fieldClass}
        />
      </div>
      <div>
        <label className={labelClass}>ORGANIZATION</label>
        <input
          type="text"
          required
          value={form.organization}
          onChange={(e) => setForm({ ...form, organization: e.target.value })}
          className={fieldClass}
        />
      </div>
      <div>
        <label className={labelClass}>
          AUTHORIZATION CONTEXT <span className="text-threat">*</span>
        </label>
        <textarea
          required
          rows={3}
          value={form.authContext}
          onChange={(e) => setForm({ ...form, authContext: e.target.value })}
          className={fieldClass}
          placeholder=""
        />
      </div>
      <div>
        <label className={labelClass}>EMAIL</label>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className={fieldClass}
        />
      </div>

      <button
        type="submit"
        className="font-mono text-xs tracking-widest text-classified border border-classified/40 px-6 py-3 hover:border-classified transition-colors"
      >
        SUBMIT REQUEST
      </button>
    </form>
  );
}

export function SectionClose() {
  const { ref, inView } = useSectionReveal(0.1);
  const [empTrigger] = useState(true);

  return (
    <section
      id="close"
      ref={ref as React.Ref<HTMLElement>}
      className="relative min-h-screen flex flex-col justify-center px-8 lg:px-24 xl:px-32 py-20 overflow-hidden"
    >
      {/* EMP atmosphere */}
      <EMPPulse
        trigger={empTrigger && inView}
        cx={200} cy={200} size={400}
        className="absolute right-10 top-1/2 -translate-y-1/2 opacity-20"
      />

      <ClassificationStamp text={CLOSE.classificationFooter} position="bottom-left" />

      <div
        className={cn(
          "max-w-4xl transition-opacity duration-400",
          inView ? "opacity-100" : "opacity-0"
        )}
      >
        {/* Wordmark */}
        <div className="font-grotesk text-classified text-2xl tracking-[0.3em] uppercase mb-6">
          {CLOSE.wordmark}
        </div>

        <h2 className="font-grotesk text-classified text-3xl sm:text-4xl mb-6 leading-tight">
          {CLOSE.headline}
        </h2>

        <p className="font-plex text-classified/70 text-base leading-relaxed max-w-2xl mb-12">
          {CLOSE.body}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact block */}
          <div>
            <div className="font-mono text-[10px] text-steel tracking-widest mb-4">
              CONTACT
            </div>
            <CornerBracket active={false} armLength={12} className="p-5 inline-block">
              <div className="font-mono text-[11px] text-classified/80 leading-relaxed">
                {CLOSE.contact}
              </div>
            </CornerBracket>

            <div className="mt-8 font-grotesk text-signal text-xl tracking-wide">
              {CLOSE.tagline}
            </div>
          </div>

          {/* Intake form */}
          <div>
            <div className="font-mono text-[10px] text-steel tracking-widest mb-4">
              REQUEST ACCESS TO DATA ROOM
            </div>
            <IntakeForm />
          </div>
        </div>
      </div>
    </section>
  );
}
