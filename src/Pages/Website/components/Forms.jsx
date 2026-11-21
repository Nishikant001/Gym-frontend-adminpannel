import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";
import { submitLead } from "../../../Api/leadApi";
import { FORM_OPTIONS } from "../siteConfig";

const MOBILE_RE = /^(?:\+?91[\s-]?)?[6-9]\d{9}$/;

const inputCls =
  "w-full border border-white/15 bg-[#0a0a0a] px-4 py-3 text-sm font-light tracking-wide text-white outline-none transition placeholder:text-neutral-600 focus:border-[#e11d27]";

const Field = ({ label, required, error, children }) => (
  <label className="block">
    <span className="mb-1.5 block font-label text-sm uppercase tracking-[1px] text-neutral-300">
      {label} {required && <span className="text-[#e11d27]">*</span>}
    </span>
    {children}
    {error && <span className="mt-1 block text-xs text-[#ff5a5a]">{error}</span>}
  </label>
);

const Select = ({ value, onChange, options, placeholder = "Select" }) => (
  <select value={value} onChange={(e) => onChange(e.target.value)} className={inputCls}>
    <option value="">{placeholder}</option>
    {options.map((o) => (
      <option key={o} value={o}>{o}</option>
    ))}
  </select>
);

const Success = ({ title, text, onDone }) => (
  <div className="py-10 text-center">
    <CheckCircle2 className="mx-auto mb-4 text-[#e11d27]" size={56} />
    <h3 className="font-heading text-3xl uppercase tracking-[1px]">{title}</h3>
    <p className="mx-auto mt-3 max-w-sm text-sm font-light leading-relaxed text-neutral-300">{text}</p>
    {onDone && (
      <button onClick={onDone} className="mt-6 border border-[#e11d27] px-7 py-2.5 font-label tracking-[1px] hover:bg-[#e11d27] hover:text-white">
        Close
      </button>
    )}
  </div>
);

const Submit = ({ loading, children }) => (
  <button
    type="submit"
    disabled={loading}
    className="w-full bg-[#e11d27] px-7 py-3.5 font-label text-lg tracking-[2px] text-white transition hover:bg-[#b9151d] disabled:opacity-60"
    style={{ clipPath: "polygon(10px 0, 100% 0, 100% 100%, 0 100%, 0 10px)" }}
  >
    {loading ? "Sending..." : children}
  </button>
);

/* =====================  MEMBERSHIP / GENERAL ENQUIRY  ===================== */
export const EnquiryForm = ({ defaultBranch = "", defaultMembership = "", general = false, onDone }) => {
  const [f, setF] = useState({
    fullName: "", mobile: "", whatsapp: "", email: "", age: "",
    branch: defaultBranch, enquiryType: "", goal: "", service: "",
    membership: defaultMembership, timeline: "", contactPref: "", message: "",
    consent: false,
  });
  const [err, setErr] = useState({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const set = (k) => (v) => setF((p) => ({ ...p, [k]: v }));
  const inp = (k) => (e) => set(k)(e.target.value);

  const validate = () => {
    const e = {};
    if (!f.fullName.trim()) e.fullName = "Please enter your name";
    if (!MOBILE_RE.test(f.mobile.trim())) e.mobile = "Enter a valid 10-digit Indian mobile number";
    if (f.whatsapp && !MOBILE_RE.test(f.whatsapp.trim())) e.whatsapp = "Enter a valid WhatsApp number";
    if (f.email && !/^\S+@\S+\.\S+$/.test(f.email)) e.email = "Enter a valid email";
    if (!f.consent) e.consent = "Please allow us to contact you";
    setErr(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await submitLead({ type: general ? "contact-enquiry" : "membership-enquiry", ...f });
      setDone(true);
    } catch {
      toast.error("Could not send right now. Please call or WhatsApp us.");
    } finally {
      setLoading(false);
    }
  };

  if (done)
    return (
      <Success
        title="Thank You!"
        text="Your enquiry has been received. Our team will contact you shortly on your preferred mode."
        onDone={onDone}
      />
    );

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" required error={err.fullName}>
          <input className={inputCls} value={f.fullName} onChange={inp("fullName")} placeholder="Your name" />
        </Field>
        <Field label="Mobile number" required error={err.mobile}>
          <input className={inputCls} inputMode="tel" value={f.mobile} onChange={inp("mobile")} placeholder="10-digit mobile" />
        </Field>
        {!general && (
          <Field label="WhatsApp number" error={err.whatsapp}>
            <input className={inputCls} inputMode="tel" value={f.whatsapp} onChange={inp("whatsapp")} placeholder="Optional if same as mobile" />
          </Field>
        )}
        <Field label="Email (optional)" error={err.email}>
          <input className={inputCls} type="email" value={f.email} onChange={inp("email")} placeholder="you@example.com" />
        </Field>
        {!general && (
          <Field label="Age (optional)">
            <input className={inputCls} type="number" min="10" max="90" value={f.age} onChange={inp("age")} placeholder="Age" />
          </Field>
        )}
        <Field label={general ? "Branch of interest" : "Preferred branch"}>
          <Select value={f.branch} onChange={set("branch")} options={FORM_OPTIONS.branches} />
        </Field>
        {general ? (
          <Field label="Enquiry type">
            <Select value={f.enquiryType} onChange={set("enquiryType")} options={FORM_OPTIONS.enquiryTypes} />
          </Field>
        ) : (
          <>
            <Field label="Fitness goal">
              <Select value={f.goal} onChange={set("goal")} options={FORM_OPTIONS.goals} />
            </Field>
            <Field label="Interested service">
              <Select value={f.service} onChange={set("service")} options={FORM_OPTIONS.services} />
            </Field>
            <Field label="Preferred membership">
              <Select value={f.membership} onChange={set("membership")} options={FORM_OPTIONS.memberships} />
            </Field>
            <Field label="Joining timeline">
              <Select value={f.timeline} onChange={set("timeline")} options={FORM_OPTIONS.timelines} />
            </Field>
            <Field label="Preferred contact">
              <Select value={f.contactPref} onChange={set("contactPref")} options={FORM_OPTIONS.contactPrefs} />
            </Field>
          </>
        )}
      </div>

      {general && (
        <Field label="Message">
          <textarea rows={4} className={inputCls} value={f.message} onChange={inp("message")} placeholder="How can we help you?" />
        </Field>
      )}

      <label className="flex items-start gap-3 text-sm font-light leading-snug text-neutral-300">
        <input
          type="checkbox"
          checked={f.consent}
          onChange={(e) => set("consent")(e.target.checked)}
          className="mt-1 h-4 w-4 accent-[#e11d27]"
        />
        I allow Bharat Fiitness Den to contact me about this enquiry and relevant membership information.
      </label>
      {err.consent && <p className="-mt-3 text-xs text-[#ff5a5a]">{err.consent}</p>}

      <Submit loading={loading}>{general ? "Send Message" : "Submit Enquiry"}</Submit>
      <p className="text-center text-xs font-light text-neutral-500">
        Final membership terms are confirmed by the branch team.
      </p>
    </form>
  );
};

/* =====================  BOOK A GYM TOUR  ===================== */
export const TourForm = ({ defaultBranch = "", onDone }) => {
  const [f, setF] = useState({
    fullName: "", mobile: "", branch: defaultBranch, date: "", time: "",
    visitors: "1", interests: "", consent: false,
  });
  const [err, setErr] = useState({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const set = (k) => (v) => setF((p) => ({ ...p, [k]: v }));
  const inp = (k) => (e) => set(k)(e.target.value);
  const today = new Date().toISOString().split("T")[0];

  const onSubmit = async (ev) => {
    ev.preventDefault();
    const e = {};
    if (!f.fullName.trim()) e.fullName = "Please enter your name";
    if (!MOBILE_RE.test(f.mobile.trim())) e.mobile = "Enter a valid 10-digit Indian mobile number";
    if (!f.branch) e.branch = "Please choose a branch";
    if (!f.consent) e.consent = "Please allow us to contact you to confirm the visit";
    setErr(e);
    if (Object.keys(e).length) return;
    setLoading(true);
    try {
      await submitLead({ type: "gym-tour", ...f });
      setDone(true);
    } catch {
      toast.error("Could not send right now. Please call or WhatsApp us.");
    } finally {
      setLoading(false);
    }
  };

  if (done)
    return (
      <Success
        title="Tour Requested!"
        text="Thank you. Our team will contact you to confirm your visit date and time."
        onDone={onDone}
      />
    );

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" required error={err.fullName}>
          <input className={inputCls} value={f.fullName} onChange={inp("fullName")} placeholder="Your name" />
        </Field>
        <Field label="Mobile number" required error={err.mobile}>
          <input className={inputCls} inputMode="tel" value={f.mobile} onChange={inp("mobile")} placeholder="10-digit mobile" />
        </Field>
        <Field label="Preferred branch" required error={err.branch}>
          <Select value={f.branch} onChange={set("branch")} options={FORM_OPTIONS.branches} />
        </Field>
        <Field label="Number of visitors">
          <input className={inputCls} type="number" min="1" max="10" value={f.visitors} onChange={inp("visitors")} />
        </Field>
        <Field label="Preferred date">
          <input className={inputCls} type="date" min={today} value={f.date} onChange={inp("date")} />
        </Field>
        <Field label="Preferred time">
          <input className={inputCls} type="time" value={f.time} onChange={inp("time")} />
        </Field>
      </div>
      <Field label="Fitness interests or questions">
        <textarea rows={3} className={inputCls} value={f.interests} onChange={inp("interests")} placeholder="Anything you'd like to see or ask?" />
      </Field>
      <label className="flex items-start gap-3 text-sm font-light leading-snug text-neutral-300">
        <input type="checkbox" checked={f.consent} onChange={(e) => set("consent")(e.target.checked)} className="mt-1 h-4 w-4 accent-[#e11d27]" />
        I agree to be contacted to confirm my visit.
      </label>
      {err.consent && <p className="-mt-3 text-xs text-[#ff5a5a]">{err.consent}</p>}
      <Submit loading={loading}>Book My Tour</Submit>
      <p className="text-center text-xs font-light text-neutral-500">Date and time are subject to confirmation.</p>
    </form>
  );
};
