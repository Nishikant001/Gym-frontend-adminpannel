import { useState, useEffect, useMemo, useCallback } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { Menu, X, Phone, LogIn, MapPin, Mail, ChevronDown } from "lucide-react";
import logoFull from "../../../assets/landing/logo-full-light.png";
import logoIcon from "../../../assets/landing/logo-icon.png";
import { SiteContext } from "./SiteContext";
import { EnquiryForm, TourForm } from "./Forms";
import { InstagramIcon, FacebookIcon, WhatsAppIcon } from "./Icons";
import {
  BRANCHES,
  BRAND,
  CONTACT,
  NAV_LINKS,
  SERVICES,
  telHref,
  waHref,
} from "../siteConfig";

const Modal = ({ title, onClose, children }) => {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);
  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <div
        className="relative my-6 w-full max-w-2xl rounded-2xl border border-[#e11d27]/40 bg-[#0d0d0d] p-6 sm:p-9"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-neutral-400 hover:text-[#e11d27]"
        >
          <X size={24} />
        </button>
        <h2 className="mb-6 pr-8 font-heading text-2xl tracking-[0px] sm:text-3xl">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
};

const SiteLayout = () => {
  const [menuAt, setMenuAt] = useState(null); // pathname jis par menu khula hai
  const [modal, setModal] = useState(null); // {type, branch}
  const [scrolled, setScrolled] = useState(false);
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const menu = menuAt === pathname;
  const setMenu = (v) =>
    setMenuAt(
      typeof v === "function"
        ? v(menu)
          ? pathname
          : null
        : v
          ? pathname
          : null,
    );

  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0 });
    else
      setTimeout(
        () =>
          document
            .getElementById(hash.slice(1))
            ?.scrollIntoView({ behavior: "smooth" }),
        50,
      );
  }, [pathname, hash]);

  const closeModal = useCallback(() => setModal(null), []);
  const ctx = useMemo(
    () => ({
      openEnquiry: (branch = "", membership = "") =>
        setModal({ type: "enquiry", branch, membership }),
      openTour: (branch = "") => setModal({ type: "tour", branch }),
    }),
    [],
  );

  const wa = waHref();
  const callNumber = BRANCHES.map((b) => b.phone).find(Boolean);

  return (
    <SiteContext.Provider value={ctx}>
      <div className="min-h-screen bg-[#060606] font-body text-[#f5f5f5]">
        {/* ================= HEADER ================= */}
        <header
          className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled || menu ? "border-b border-white/10 bg-black/85 backdrop-blur-md" : "bg-gradient-to-b from-black/85 via-black/40 to-transparent"}`}
        >
          <div className="hidden border-b border-white/5 lg:block">
            <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-8 text-xs tracking-[0.5px] text-neutral-400">
              <span className="flex items-center gap-2">
                <MapPin size={13} className="text-[#e11d27]" />{" "}
                {BRANCHES.map((b) => b.short).join("  •  ")}, {BRAND.city}
              </span>
              <div className="flex items-center gap-6">
                {callNumber && (
                  <a
                    href={telHref(callNumber)}
                    className="flex items-center gap-1.5 hover:text-[#e11d27]"
                  >
                    <Phone size={13} /> Call Us
                  </a>
                )}
                {wa && (
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-[#e11d27]"
                  >
                    <WhatsAppIcon className="h-3.5 w-3.5" /> WhatsApp
                  </a>
                )}
                <button
                  onClick={() => ctx.openTour()}
                  className="hover:text-[#e11d27]"
                >
                  Book a Gym Tour
                </button>
              </div>
            </div>
          </div>

          <nav className="mx-auto flex h-24 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
            {" "}
            <Link
              to="/"
              className="flex shrink-0 items-center"
              aria-label="Bharat Fiitness Den home"
            >
              <img
                src={logoFull}
                alt="Bharat Fiitness Den"
                className="hidden h-20 w-26 sm:block"
              />
              <img
                src={logoIcon}
                alt="Bharat Fiitness Den"
                className="h-14 w-auto sm:hidden"
              />
            </Link>
            <ul className="hidden items-center gap-7 xl:flex">
              {NAV_LINKS.map((l) => {
                const isServices = l.to === "/services";
                return (
                  <li key={l.to} className={isServices ? "group relative" : ""}>
                    <NavLink
                      to={l.to}
                      end={l.to === "/"}
                      className={({ isActive }) =>
                        `relative inline-flex items-center gap-1 whitespace-nowrap py-2 text-[14px] font-medium transition hover:text-[#e11d27] ${isActive ? "text-white after:absolute after:inset-x-0 after:-bottom-1 after:h-[3px] after:rounded-full after:bg-[#e11d27]" : "text-white/90"}`
                      }
                    >
                      {l.label}
                      {isServices && <ChevronDown size={14} />}
                    </NavLink>
                    {isServices && (
                      <div className="invisible absolute left-0 top-full w-72 rounded-lg border border-white/10 bg-[#0d0d0d] py-2 opacity-0 shadow-2xl transition group-hover:visible group-hover:opacity-100">
                        {SERVICES.map((sv) => (
                          <Link
                            key={sv.slug}
                            to={`/services/${sv.slug}`}
                            className="block px-5 py-2 text-sm text-white/80 hover:bg-[#e11d27]/10 hover:text-white"
                          >
                            {sv.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>
                );
              })}
              <li className="group relative">
                <span className="flex cursor-pointer items-center gap-1 whitespace-nowrap py-2 text-[14px] font-medium text-white/90 hover:text-[#e11d27]">
                  Branches <ChevronDown size={14} />
                </span>
                <div className="invisible absolute right-0 top-full w-64 rounded-lg border border-white/10 bg-[#0d0d0d] opacity-0 shadow-2xl transition group-hover:visible group-hover:opacity-100">
                  {BRANCHES.map((b) => (
                    <Link
                      key={b.slug}
                      to={`/branches/${b.slug}`}
                      className="block border-b border-white/5 px-5 py-3 first:rounded-t-lg last:rounded-b-lg last:border-0 hover:bg-[#e11d27]/10"
                    >
                      <span className="block text-sm font-semibold">
                        {b.short}
                      </span>
                      <span className="text-xs font-light text-neutral-400">
                        {b.badge}
                      </span>
                    </Link>
                  ))}
                </div>
              </li>
            </ul>
            <div className="flex items-center gap-3">
              <a
                href="tel:+918339905571"
                className="flex items-center gap-2 rounded-md bg-[#e11d27] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(225,29,39,0.35)] transition hover:bg-[#b9151d] sm:px-5"
              >
                <Phone size={16} /> +91 8339905571
              </a>
              <Link
                to="/login"
                className="hidden items-center gap-2 rounded-md border border-white/25 px-4 py-2.5 text-sm font-semibold transition hover:border-[#e11d27] hover:text-[#e11d27] sm:flex"
              >
                <LogIn size={16} /> Login
              </Link>
              <button
                onClick={() => setMenu((m) => !m)}
                className="xl:hidden"
                aria-label="Menu"
              >
                {menu ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </nav>

          {menu && (
            <div className="max-h-[80vh] overflow-y-auto border-t border-white/10 bg-[#0a0a0a] px-5 py-4 xl:hidden">
              {NAV_LINKS.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === "/"}
                  className={({ isActive }) =>
                    `block border-b border-white/5 py-3 text-base font-semibold ${isActive ? "text-[#e11d27]" : ""}`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              <p className="pt-4 text-xs font-semibold uppercase tracking-[2px] text-neutral-500">
                Select Branch
              </p>
              {BRANCHES.map((b) => (
                <Link
                  key={b.slug}
                  to={`/branches/${b.slug}`}
                  className="block border-b border-white/5 py-3 text-base font-semibold"
                >
                  {b.short}
                </Link>
              ))}
              <div className="flex gap-3 py-4">
                <button
                  onClick={() => {
                    setMenu(false);
                    ctx.openTour();
                  }}
                  className="flex-1 rounded-md border border-[#e11d27] py-3 text-sm font-semibold"
                >
                  Book a Gym Tour
                </button>
                <Link
                  to="/login"
                  className="flex flex-1 items-center justify-center gap-2 rounded-md border border-white/20 py-3 text-sm font-semibold"
                >
                  <LogIn size={16} /> Login
                </Link>
              </div>
            </div>
          )}
        </header>

        <main>
          <Outlet />
        </main>

        {/* ================= FOOTER ================= */}
        <footer className="border-t border-[#e11d27]/20 bg-[#050505] px-5 pt-16 pb-24 sm:px-8 lg:pb-8">
          <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <img src={logoFull} alt="Bharat Fiitness Den" className="mb-5 h-32 w-auto" />
              <p className="text-sm font-light leading-relaxed text-neutral-400">
                Bharat Fiitness Den (BFD) — a premium fitness brand with two
                destinations in {BRAND.city}. {BRAND.tagline}
              </p>
              <div className="mt-5 flex gap-3">
                {CONTACT.instagram && (
                  <a
                    href={CONTACT.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Instagram"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e11d27] text-[#e11d27] transition hover:bg-[#e11d27] hover:text-white"
                  >
                    <InstagramIcon />
                  </a>
                )}
                {CONTACT.facebook && (
                  <a
                    href={CONTACT.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Facebook"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e11d27] text-[#e11d27] transition hover:bg-[#e11d27] hover:text-white"
                  >
                    <FacebookIcon />
                  </a>
                )}
                {wa && (
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="WhatsApp"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e11d27] text-[#e11d27] transition hover:bg-[#e11d27] hover:text-white"
                  >
                    <WhatsAppIcon />
                  </a>
                )}
              </div>
            </div>

            <div>
              <h4 className="mb-4 font-label text-base tracking-[2px] text-[#e11d27]">
                Quick Links
              </h4>
              <ul className="space-y-2 text-sm font-light text-neutral-300">
                {NAV_LINKS.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="hover:text-[#e11d27]">
                      {l.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to="/book-gym-tour" className="hover:text-[#e11d27]">
                    Book a Gym Tour
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-label text-base tracking-[2px] text-[#e11d27]">
                Services
              </h4>
              <ul className="space-y-2 text-sm font-light text-neutral-300">
                {SERVICES.slice(0, 8).map((s) => (
                  <li key={s.slug}>
                    <Link
                      to={`/services/${s.slug}`}
                      className="hover:text-[#e11d27]"
                    >
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-label text-base tracking-[2px] text-[#e11d27]">
                Our Branches
              </h4>
              <ul className="space-y-5 text-sm font-light text-neutral-300">
                {BRANCHES.map((b) => (
                  <li key={b.slug}>
                    <Link
                      to={`/branches/${b.slug}`}
                      className="font-label text-sm tracking-[1px] text-white hover:text-[#e11d27]"
                    >
                      {b.short}
                    </Link>
                    <p className="mt-1 flex gap-2 leading-snug text-neutral-400">
                      <MapPin
                        size={15}
                        className="mt-0.5 shrink-0 text-[#e11d27]"
                      />
                      {b.address}
                    </p>
                    {b.phone && (
                      <a
                        href={telHref(b.phone)}
                        className="mt-1 flex items-center gap-2 hover:text-[#e11d27]"
                      >
                        <Phone size={14} className="text-[#e11d27]" />
                        {b.phone}
                      </a>
                    )}
                  </li>
                ))}
                {CONTACT.email && (
                  <li>
                    <a
                      href={`mailto:${CONTACT.email}`}
                      className="flex items-center gap-2 hover:text-[#e11d27]"
                    >
                      <Mail size={14} className="text-[#e11d27]" />
                      {CONTACT.email}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>

          <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-[11px] tracking-wide text-neutral-500 sm:flex-row">
            <span>
              © {BRAND.year} Bharat Fiitness Den. All rights reserved.
            </span>
            <span className="flex gap-5">
              <Link to="/privacy-policy" className="hover:text-[#e11d27]">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-[#e11d27]">
                Terms & Conditions
              </Link>
            </span>
          </div>
        </footer>

        {/* mobile sticky CTA bar */}
        <div className="fixed inset-x-0 bottom-0 z-40 flex border-t border-[#e11d27]/40 bg-black/95 lg:hidden">
          <a
            href="tel:+918339905571"
            className="flex flex-1 items-center justify-center gap-2 bg-[#e11d27] py-3.5 text-base font-semibold text-white"
          >
            <Phone size={18} /> +91 8339905571
          </a>
          {callNumber && (
            <a
              href={telHref(callNumber)}
              className="flex w-16 items-center justify-center text-white"
              aria-label="Call"
            >
              <Phone size={20} />
            </a>
          )}
          {wa && (
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-16 items-center justify-center text-[#25d366]"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon className="h-6 w-6" />
            </a>
          )}
        </div>

        {modal?.type === "enquiry" && (
          <Modal title="Membership Enquiry" onClose={closeModal}>
            <EnquiryForm
              defaultBranch={modal.branch}
              defaultMembership={modal.membership}
              onDone={closeModal}
            />
          </Modal>
        )}
        {modal?.type === "tour" && (
          <Modal title="Book a Gym Tour" onClose={closeModal}>
            <TourForm defaultBranch={modal.branch} onDone={closeModal} />
          </Modal>
        )}
      </div>
    </SiteContext.Provider>
  );
};

export default SiteLayout;
