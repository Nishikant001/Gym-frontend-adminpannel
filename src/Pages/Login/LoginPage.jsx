
// LoginPage.jsx

import { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";

import { motion } from "framer-motion";

import { loginAdmin } from "../../Api/authApi.js";
import { logoutAdmin } from "../../Api/authApi.js";

import logoFull from "../../assets/landing/logo-full-light.png";
import { HOME_IMAGES } from "../Website/siteImages";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";



const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // LOGIN HANDLER
 const handleLogin = async (e) => {
  e.preventDefault();

  try {

    setLoading(true);

    const data = await loginAdmin({
      email,
      password,
    });

    console.log(data);

    if (data.accessToken) {

      localStorage.setItem(
        "token",
        data.accessToken
      );

      localStorage.setItem(
        "refreshToken",
        data.refreshToken
      );

      // STORE USER
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      // OPTIONAL
      localStorage.setItem(
        "adminAuth",
        "true"
      );

      navigate("/dashboard");
    }

  } catch (error) {

    console.log(error);

    alert(
      error.response?.data?.message ||
      "Login Failed"
    );

  } finally {

    setLoading(false);

  }
};

const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-[#060606] font-body text-white lg:grid lg:grid-cols-[1.05fr_1fr]">
      {/* ================= LEFT : BRAND PANEL ================= */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="relative hidden min-h-screen flex-col justify-between overflow-hidden p-10 xl:p-14 lg:flex"
      >
        <div className="absolute inset-0 bg-cover bg-[position:70%_center]" style={{ backgroundImage: `url(${HOME_IMAGES.hero})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
        <div className="pointer-events-none absolute -right-24 bottom-0 top-0 w-40 -skew-x-[18deg] bg-gradient-to-l from-[#e11d27]/40 to-transparent" />

        <Link to="/" className="relative z-10 inline-block" aria-label="Back to website">
<img src={logoFull} alt="Bharat Fiitness Den" className="h-28 w-auto" />        </Link>

        <div className="relative z-10">
          <p className="mb-4 flex items-center gap-3 text-[13px] font-extrabold uppercase italic tracking-[1px] text-[#e11d27]">
            <span className="h-8 w-[3px] -skew-x-[20deg] bg-[#e11d27]" /> Admin Console
          </p>
          <h1 className="font-heading max-w-lg text-5xl leading-[1.05] xl:text-6xl">
            Train hard.
            <br />
            <span className="text-[#e11d27]">Lead strong.</span>
          </h1>
          <span className="mt-6 block h-[3px] w-24 bg-[#e11d27]" />
          <p className="mt-6 max-w-md text-base leading-relaxed text-white/80">
            Centralized gym management system for Bharat Fiitness Den administrators. Manage members, trainers, schedules and operations from one secure platform.
          </p>
        </div>

        <p className="relative z-10 text-xs tracking-wide text-white/40">&copy; {new Date().getFullYear()} Bharat Fiitness Den</p>
      </motion.div>

      {/* ================= RIGHT : FORM ================= */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0b0b0c] px-5 py-10 sm:px-10 lg:border-l lg:border-white/10"
      >
        <div className="pointer-events-none absolute -right-32 -top-32 h-[380px] w-[380px] rounded-full bg-[#e11d27]/15 blur-[120px]" />

        <div className="relative w-full max-w-md">
          {/* MOBILE BRAND */}
          <Link to="/" className="mb-8 inline-block lg:hidden" aria-label="Back to website">
<img src={logoFull} alt="Bharat Fiitness Den" className="h-28 w-auto" />          </Link>

          <Link to="/" className="mb-8 hidden w-fit items-center gap-2 text-sm text-white/50 transition hover:text-white lg:flex">
            <ArrowLeft size={16} /> Back to website
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full border border-[#e11d27]/30 bg-[#e11d27]/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[2px] text-[#e11d27]">
            <ShieldCheck size={14} /> Secure Access
          </div>

          <h2 className="font-heading mt-6 text-4xl leading-[1.05] sm:text-5xl">
            Welcome
            <br />
            <span className="text-[#e11d27]">Back</span>
          </h2>
          <p className="mt-4 text-base text-white/55">Sign in to continue to your admin dashboard.</p>

          <form onSubmit={handleLogin} className="mt-9 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">Email Address</label>
              <div className="flex h-14 items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-4 transition-all focus-within:border-[#e11d27] focus-within:shadow-[0_0_30px_rgba(225,29,39,0.18)]">
                <Mail className="h-5 w-5 text-white/40" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full bg-transparent text-base text-white outline-none placeholder:text-white/25"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white/70">Password</label>
              <div className="flex h-14 items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-4 transition-all focus-within:border-[#e11d27] focus-within:shadow-[0_0_30px_rgba(225,29,39,0.18)]">
                <Lock className="h-5 w-5 text-white/40" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-transparent text-base text-white outline-none placeholder:text-white/25"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password visibility">
                  {showPassword ? <EyeOff className="h-5 w-5 text-white/40" /> : <Eye className="h-5 w-5 text-white/40" />}
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="group flex h-14 w-full items-center justify-center gap-3 rounded-lg bg-[#e11d27] text-base font-semibold text-white shadow-[0_12px_36px_rgba(225,29,39,0.35)] transition hover:bg-[#b9151d] disabled:opacity-60"
            >
              <span>{loading ? "Signing In..." : "Access Dashboard"}</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </form>

          <div className="mt-10 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/10" />
            <ShieldCheck className="h-5 w-5 text-white/30" />
            <div className="h-px flex-1 bg-white/10" />
          </div>
          <p className="mt-4 text-center text-xs text-white/35">Restricted to authorised administrators.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;

