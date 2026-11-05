"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/layout/Container";
import { Button } from "@/components/ui/button/Button";
import { NavLink } from "@/components/ui/link/NavLink";
import { Drawer } from "@/components/ui/modal/Drawer";
import { EmpriseLogo } from "@/components/brand/EmpriseLogo";
import { HOMEPAGE_DATA } from "@/data/homepage";
import { ETSE_CONFIG, isAnnouncementActiveInIST } from "@/config/etse";
import { createClientBrowser } from "@/lib/supabase/client";
import {
  Sparkles,
  Menu,
  ChevronDown,
  User,
  Users,
  Building2,
  LayoutDashboard,
  ArrowRight,
  Phone,
  BookOpen,
  Trophy,
  GraduationCap,
  FileText,
  MessageSquareQuote,
  Camera,
  Newspaper,
  PlayCircle,
  X,
} from "lucide-react";
import { GALLERY_CATEGORIES } from "@/data/gallery";
import { AboutDropdown } from "./AboutDropdown";
import { ABOUT_MENU_ITEMS } from "@/data/aboutNav";

const GALLERY_ICONS = {
  Camera,
  Newspaper,
  PlayCircle,
};

const ABOUT_ICONS = {
  Building2,
  Trophy,
  Users,
};

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isMobileGalleryOpen, setIsMobileGalleryOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const aboutDropdownRef = React.useRef<HTMLDivElement>(null);
  const isEtseBannerActive = isAnnouncementActiveInIST(ETSE_CONFIG.registrationEndDate);

  // Scroll detection for subtle elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Live Supabase Auth Session
  useEffect(() => {
    const supabase = createClientBrowser();

    // Check initial auth session
    supabase.auth.getUser().then(({ data }) => {
      setIsAuthenticated(Boolean(data?.user));
    });

    // Listen to live auth state changes (login, logout, token refresh)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(Boolean(session?.user));
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Close mobile drawer and dropdowns on route change
  useEffect(() => {
    setIsMobileOpen(false);
    setIsAboutOpen(false);
    setIsMobileAboutOpen(false);
    setIsCoursesOpen(false);
    setIsGalleryOpen(false);
  }, [pathname]);

  // Outside click listener for desktop About dropdown
  useEffect(() => {
    const handlePointerDownOutside = (event: MouseEvent) => {
      if (
        aboutDropdownRef.current &&
        !aboutDropdownRef.current.contains(event.target as Node)
      ) {
        setIsAboutOpen(false);
      }
    };
    if (isAboutOpen) {
      document.addEventListener("mousedown", handlePointerDownOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handlePointerDownOutside);
    };
  }, [isAboutOpen]);

  // Body scroll lock when mobile drawer is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-200",
        isScrolled
          ? "bg-white/98 backdrop-blur-md shadow-xs border-b border-[var(--brand-border)]"
          : "bg-white border-b border-[var(--brand-border)]"
      )}
    >
      {/* 1. TOP ANNOUNCEMENT BAR (Deep Institutional Blue #123E73) */}
      {isEtseBannerActive && (
        <div className="bg-[var(--brand-primary-dark)] text-white text-[11px] sm:text-xs py-2 px-4 text-center font-medium border-b border-blue-900/40 select-none">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
            {/* Announcement Message & Label */}
            <div className="flex items-center gap-2 sm:gap-2.5 overflow-hidden truncate">
              <span className="font-semibold text-white tracking-wide shrink-0">
                ETSE
              </span>
              <span className="hidden md:inline truncate text-slate-200">
                Free ETSE 2026 Registration — Last Date: 28 November • Exam on 29 November 2026 • Classes 7th to 10th
              </span>
              <span className="md:hidden truncate text-slate-200">
                • Last Date: 28 Nov • Exam: 29 Nov • FREE
              </span>
            </div>

            {/* Right Action Links */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              <Link
                href="/etse-2026#register"
                className="text-amber-300 hover:text-white font-semibold text-xs inline-flex items-center gap-1 transition-colors"
              >
                <span>Register Now</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
              <span className="hidden sm:inline text-white/30">|</span>
              <a
                href="tel:+917247889955"
                className="hidden sm:inline-flex items-center gap-1.5 text-slate-300 hover:text-white text-xs transition-colors"
              >
                <Phone className="w-3 h-3 text-[var(--brand-accent)]" />
                <span>+91 7247889955</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 2. MAIN NAVBAR (Pure White Background) */}
      <Container size="xl" className="flex items-center justify-between h-18 sm:h-20 lg:h-22 gap-2">
        {/* LEFT: Official Emprise Academy Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group select-none py-1.5 shrink-0"
          aria-label="Emprise Academy — Home"
        >
          <EmpriseLogo
            size="lg"
            priority
            imgClassName="h-11 sm:h-12 lg:h-14 w-auto"
            className="group-hover:opacity-95 transition-opacity"
          />
        </Link>

        {/* CENTER: EXACT NAVIGATION ORDER */}
        {/* Logo -> Home -> About -> Courses -> ETSE -> Results -> Gallery -> Blog -> Testimonials -> Contact */}
        <nav
          className="hidden xl:flex items-center gap-0.5 2xl:gap-1.5"
          aria-label="Main Navigation"
        >
          <NavLink href="/">Home</NavLink>

          {/* About Dropdown */}
          <div
            ref={aboutDropdownRef}
            className="relative"
            onMouseEnter={() => {
              setIsAboutOpen(true);
              setIsCoursesOpen(false);
              setIsGalleryOpen(false);
            }}
            onMouseLeave={() => setIsAboutOpen(false)}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setIsAboutOpen(false);
              }
            }}
          >
            <Link
              href="/about"
              aria-haspopup="menu"
              aria-expanded={isAboutOpen}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  if (!isAboutOpen) {
                    e.preventDefault();
                    setIsAboutOpen(true);
                  }
                }
              }}
              className={cn(
                "inline-flex items-center gap-1 text-sm font-medium py-1.5 px-3 rounded-md transition-colors select-none",
                pathname === "/about" ||
                  pathname?.startsWith("/about/") ||
                  isAboutOpen
                  ? "text-[var(--brand-primary)] bg-[var(--brand-primary-soft)] font-semibold"
                  : "text-[var(--brand-text)] hover:text-[var(--brand-primary)] hover:bg-[var(--brand-primary-soft)]/50"
              )}
            >
              <span>About</span>
              <ChevronDown
                className={cn(
                  "w-3.5 h-3.5 transition-transform duration-150",
                  isAboutOpen ? "rotate-180 text-[var(--brand-primary)]" : ""
                )}
              />
            </Link>

            <AboutDropdown
              isOpen={isAboutOpen}
              onItemClick={() => setIsAboutOpen(false)}
            />
          </div>

          {/* Courses Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => {
              setIsCoursesOpen(true);
              setIsAboutOpen(false);
              setIsGalleryOpen(false);
            }}
            onMouseLeave={() => setIsCoursesOpen(false)}
          >
            <Link
              href="/courses"
              className={cn(
                "inline-flex items-center gap-1 text-sm font-medium py-1.5 px-3 rounded-md transition-colors",
                pathname?.startsWith("/courses") ||
                  pathname?.startsWith("/iit-jee") ||
                  pathname?.startsWith("/neet") ||
                  pathname?.startsWith("/foundation")
                  ? "text-[var(--brand-primary)] bg-[var(--brand-primary-soft)] font-semibold"
                  : "text-[var(--brand-text)] hover:text-[var(--brand-primary)] hover:bg-[var(--brand-primary-soft)]/50"
              )}
            >
              <span>Courses</span>
              <ChevronDown
                className={cn(
                  "w-3.5 h-3.5 transition-transform duration-150",
                  isCoursesOpen ? "rotate-180" : ""
                )}
              />
            </Link>

            {isCoursesOpen && (
              <div className="absolute top-full left-0 w-72 bg-white rounded-2xl shadow-xl border border-[var(--brand-border)] p-2 z-50 animate-fade-in">
                <Link
                  href="/iit-jee-coaching-mathura"
                  className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-[var(--brand-primary-soft)]/60 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[var(--brand-primary)] flex items-center justify-center shrink-0 mt-0.5">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[var(--brand-text)] block">
                      IIT-JEE (Main + Advanced)
                    </span>
                    <span className="text-[11px] text-[var(--brand-text-secondary)] block">
                      Classes 11, 12 & Droppers
                    </span>
                  </div>
                </Link>

                <Link
                  href="/neet-coaching-mathura"
                  className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-[var(--brand-primary-soft)]/60 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[var(--brand-text)] block">
                      NEET-UG Medical
                    </span>
                    <span className="text-[11px] text-[var(--brand-text-secondary)] block">
                      NCERT Mastery & Physics
                    </span>
                  </div>
                </Link>

                <Link
                  href="/foundation-coaching-mathura"
                  className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-[var(--brand-primary-soft)]/60 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[var(--brand-text)] block">
                      Foundation Classes 8–10
                    </span>
                    <span className="text-[11px] text-[var(--brand-text-secondary)] block">
                      Olympiads & Early Base
                    </span>
                  </div>
                </Link>
              </div>
            )}
          </div>

          <NavLink href="/etse-2026">ETSE</NavLink>
          <NavLink href="/results">Results</NavLink>

          {/* Gallery Mega-Menu Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => {
              setIsGalleryOpen(true);
              setIsAboutOpen(false);
              setIsCoursesOpen(false);
            }}
            onMouseLeave={() => setIsGalleryOpen(false)}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setIsGalleryOpen(false);
              }
            }}
          >
            <Link
              href="/gallery"
              aria-haspopup="menu"
              aria-expanded={isGalleryOpen}
              onClick={() => setIsGalleryOpen(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  if (!isGalleryOpen) {
                    e.preventDefault();
                    setIsGalleryOpen(true);
                  }
                }
              }}
              className={cn(
                "inline-flex items-center gap-1 text-sm font-medium py-1.5 px-3 rounded-md transition-colors select-none",
                pathname?.startsWith("/gallery")
                  ? "text-[var(--brand-primary)] bg-[var(--brand-primary-soft)] font-semibold"
                  : "text-[var(--brand-text)] hover:text-[var(--brand-primary)] hover:bg-[var(--brand-primary-soft)]/50"
              )}
            >
              <span>Gallery</span>
              <ChevronDown
                className={cn(
                  "w-3.5 h-3.5 transition-transform duration-150",
                  isGalleryOpen ? "rotate-180 text-[var(--brand-primary)]" : ""
                )}
              />
            </Link>

            {isGalleryOpen && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 animate-fade-in"
                role="menu"
                aria-label="Gallery Mega Menu"
              >
                <div className="w-[660px] bg-white rounded-2xl shadow-xl border border-[#E3EAF3] p-4 relative overflow-hidden">
                  {/* Subtle top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--brand-primary)] via-blue-400 to-[var(--brand-accent)]" />

                  <div className="grid grid-cols-3 gap-3 pt-1">
                    {GALLERY_CATEGORIES.map((cat) => {
                      const Icon = GALLERY_ICONS[cat.iconName];
                      const isActive = pathname === cat.href;

                      return (
                        <Link
                          key={cat.id}
                          href={cat.href}
                          role="menuitem"
                          onClick={() => setIsGalleryOpen(false)}
                          className={cn(
                            "group flex flex-col p-3.5 rounded-xl border transition-all duration-200 text-left outline-hidden focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]",
                            isActive
                              ? "bg-[#EEF5FF] border-[#B8D5FA] shadow-2xs"
                              : "border-slate-100/80 hover:border-[#B8D5FA] hover:bg-[#EEF5FF] hover:-translate-y-0.5"
                          )}
                        >
                          <div className="flex items-center justify-between mb-2.5">
                            <div
                              className={cn(
                                "w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-200",
                                isActive
                                  ? "bg-[var(--brand-primary)] text-white"
                                  : "bg-blue-50 text-[var(--brand-primary)] group-hover:bg-[var(--brand-primary)] group-hover:text-white"
                              )}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                            <span className="text-[10px] font-bold tracking-wider text-slate-400 group-hover:text-[var(--brand-primary)] transition-colors">
                              {cat.step}
                            </span>
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center justify-between gap-1">
                              <span
                                className={cn(
                                  "text-xs font-bold transition-colors duration-200 block",
                                  isActive
                                    ? "text-[var(--brand-primary)]"
                                    : "text-[#14213D] group-hover:text-[var(--brand-primary)]"
                                )}
                              >
                                {cat.title}
                              </span>
                              {cat.badge && (
                                <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
                                  {cat.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] leading-relaxed text-[#667085] line-clamp-2">
                              {cat.description}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
          <NavLink href="/blog">Blog</NavLink>
          <NavLink href="/testimonials">Testimonials</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </nav>

        {/* RIGHT: DUAL ACTION BUTTON PAIR */}
        {/* [ Student Login / Dashboard ] [ Register for ETSE ] */}
        <div className="hidden lg:flex items-center gap-2 2xl:gap-2.5 shrink-0">
          {isAuthenticated ? (
            <Link href="/student/dashboard">
              <Button
                variant="secondary"
                size="md"
                className="font-semibold text-xs 2xl:text-sm px-3.5 2xl:px-4 h-10 border-blue-300 text-[var(--brand-primary)] bg-blue-50/60 hover:bg-[var(--brand-primary-soft)] transition-colors shadow-2xs"
                leftIcon={<LayoutDashboard className="w-4 h-4 text-[var(--brand-primary)]" />}
              >
                Dashboard
              </Button>
            </Link>
          ) : (
            <Link href="/student/login">
              <Button
                variant="secondary"
                size="md"
                className="font-semibold text-xs 2xl:text-sm px-3.5 2xl:px-4 h-10 border-[var(--brand-border)] text-[var(--brand-primary)] bg-white hover:bg-[var(--brand-primary-soft)] hover:border-blue-300 transition-colors shadow-2xs"
                leftIcon={<User className="w-4 h-4 text-[var(--brand-primary)]" />}
              >
                Student Login
              </Button>
            </Link>
          )}

          <Link href="/etse-2026#register">
            <Button
              variant="primary"
              size="md"
              className="font-bold text-xs 2xl:text-sm px-4 2xl:px-5 h-10 bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] text-white shadow-xs hover:shadow-md transition-all duration-150 active:scale-[0.98]"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Register for ETSE
            </Button>
          </Link>
        </div>

        {/* Mobile / Tablet Actions */}
        <div className="flex items-center gap-2 xl:hidden">
          <Link href="/etse-2026#register">
            <Button
              variant="primary"
              size="sm"
              className="text-xs font-bold px-3 h-9 sm:h-10 bg-[var(--brand-primary)] text-white shadow-xs"
            >
              Register ETSE
            </Button>
          </Link>

          <button
            onClick={() => setIsMobileOpen(true)}
            aria-label="Open mobile navigation menu"
            aria-expanded={isMobileOpen}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl border border-[var(--brand-border)] flex items-center justify-center text-[var(--brand-text)] hover:bg-slate-50 active:bg-slate-100 cursor-pointer min-w-[44px] min-h-[44px] transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </Container>

      {/* 3. MOBILE NAVIGATION DRAWER */}
      <Drawer
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        title="Emprise Academy"
        position="right"
      >
        <div className="flex flex-col gap-4 p-4 text-left">
          {/* Top Notice in Drawer */}
          {isEtseBannerActive && (
            <div className="p-3.5 rounded-2xl bg-[var(--brand-primary-soft)] border border-blue-200/80 space-y-2">
              <div className="text-xs font-bold text-[var(--brand-primary-dark)] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[var(--brand-accent)]" />
                <span>ETSE 2026 — {ETSE_CONFIG.shortDateDisplay}</span>
              </div>
              <p className="text-[11px] text-[var(--brand-text-secondary)]">
                100% Free scholarship registration open for Classes 7th to 10th (Last Date: 28 Nov).
              </p>
              <Link
                href="/etse-2026#register"
                onClick={() => setIsMobileOpen(false)}
                className="inline-flex items-center gap-1 text-xs font-bold text-[var(--brand-primary)] hover:underline"
              >
                <span>Register for ETSE</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}

          {/* EXACT NAVIGATION ORDER (Mobile Drawer) */}
          <nav className="flex flex-col gap-1 border-b border-[var(--brand-border)] pb-4 text-sm font-semibold" aria-label="Mobile Navigation">
            <Link
              href="/"
              onClick={() => setIsMobileOpen(false)}
              className={cn(
                "p-3 rounded-xl transition-colors flex items-center justify-between min-h-[44px]",
                pathname === "/"
                  ? "text-[var(--brand-primary)] bg-[var(--brand-primary-soft)] font-bold"
                  : "text-[var(--brand-text)] hover:bg-slate-50"
              )}
            >
              <span>Home</span>
            </Link>

            {/* Mobile About Accordion Submenu */}
            <div className="flex flex-col">
              <button
                type="button"
                onClick={() => setIsMobileAboutOpen((prev) => !prev)}
                aria-expanded={isMobileAboutOpen}
                aria-label="Toggle About submenu"
                className={cn(
                  "w-full flex items-center justify-between p-3 rounded-xl transition-colors min-h-[44px] text-left cursor-pointer",
                  pathname === "/about" || pathname?.startsWith("/about/")
                    ? "text-[var(--brand-primary)] bg-[var(--brand-primary-soft)] font-bold"
                    : "text-[var(--brand-text)] hover:bg-slate-50"
                )}
              >
                <span>About</span>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform duration-200 text-slate-500",
                    isMobileAboutOpen ? "rotate-180 text-[var(--brand-primary)]" : ""
                  )}
                />
              </button>

              {isMobileAboutOpen && (
                <div className="pl-3 pr-1 pt-1 pb-1 space-y-1 flex flex-col animate-fade-in border-l-2 border-blue-200 ml-4 my-1">
                  {ABOUT_MENU_ITEMS.map((item) => {
                    const Icon = ABOUT_ICONS[item.iconName];
                    const isActive =
                      item.href === "/about"
                        ? pathname === "/about"
                        : pathname === item.href || pathname?.startsWith(`${item.href}/`);

                    return (
                      <Link
                        key={item.id}
                        href={item.href}
                        onClick={() => {
                          setIsMobileOpen(false);
                          setIsMobileAboutOpen(false);
                        }}
                        className={cn(
                          "flex items-center gap-2.5 p-2.5 rounded-lg min-h-[44px] text-xs font-semibold transition-colors",
                          isActive
                            ? "text-[var(--brand-primary)] bg-[var(--brand-primary-soft)] font-bold"
                            : "text-slate-700 hover:text-[var(--brand-primary)] hover:bg-slate-50"
                        )}
                      >
                        <div
                          className={cn(
                            "w-7 h-7 rounded-md flex items-center justify-center shrink-0",
                            isActive
                              ? "bg-[var(--brand-primary)] text-white"
                              : "bg-blue-50 text-[var(--brand-primary)]"
                          )}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="leading-snug flex items-center gap-1.5">
                            <span className="text-[10px] font-mono text-slate-400 font-bold">
                              {item.number}
                            </span>
                            <span className="truncate">{item.title}</span>
                          </span>
                          <span className="text-[10px] text-slate-500 font-normal line-clamp-1">
                            {item.description}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <Link
              href="/courses"
              onClick={() => setIsMobileOpen(false)}
              className={cn(
                "p-3 rounded-xl transition-colors flex items-center justify-between min-h-[44px]",
                pathname?.startsWith("/courses")
                  ? "text-[var(--brand-primary)] bg-[var(--brand-primary-soft)] font-bold"
                  : "text-[var(--brand-text)] hover:bg-slate-50"
              )}
            >
              <span>Courses</span>
            </Link>

            <Link
              href="/etse-2026"
              onClick={() => setIsMobileOpen(false)}
              className={cn(
                "p-3 rounded-xl transition-colors flex items-center justify-between min-h-[44px]",
                pathname === "/etse-2026"
                  ? "text-[var(--brand-primary)] bg-[var(--brand-primary-soft)] font-bold"
                  : "text-[var(--brand-text)] hover:bg-slate-50"
              )}
            >
              <span>ETSE</span>
            </Link>

            <Link
              href="/results"
              onClick={() => setIsMobileOpen(false)}
              className={cn(
                "p-3 rounded-xl transition-colors flex items-center justify-between min-h-[44px]",
                pathname === "/results"
                  ? "text-[var(--brand-primary)] bg-[var(--brand-primary-soft)] font-bold"
                  : "text-[var(--brand-text)] hover:bg-slate-50"
              )}
            >
              <span>Results</span>
            </Link>

            {/* Mobile Gallery Accordion Submenu */}
            <div className="flex flex-col">
              <div
                className={cn(
                  "flex items-center justify-between rounded-xl transition-colors min-h-[44px]",
                  pathname?.startsWith("/gallery")
                    ? "text-[var(--brand-primary)] bg-[var(--brand-primary-soft)] font-bold"
                    : "text-[var(--brand-text)] hover:bg-slate-50"
                )}
              >
                <Link
                  href="/gallery"
                  onClick={() => setIsMobileOpen(false)}
                  className="flex-1 p-3 min-h-[44px] flex items-center"
                >
                  <span>Gallery</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setIsMobileGalleryOpen((prev) => !prev)}
                  aria-expanded={isMobileGalleryOpen}
                  aria-label="Toggle Gallery submenu"
                  className="p-3 min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-500 hover:text-[var(--brand-primary)] cursor-pointer"
                >
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform duration-200",
                      isMobileGalleryOpen ? "rotate-180 text-[var(--brand-primary)]" : ""
                    )}
                  />
                </button>
              </div>

              {isMobileGalleryOpen && (
                <div className="pl-3 pr-1 pt-1 pb-1 space-y-1 flex flex-col animate-fade-in border-l-2 border-blue-200 ml-4 my-1">
                  {GALLERY_CATEGORIES.map((cat) => {
                    const Icon = GALLERY_ICONS[cat.iconName];
                    const isActive = pathname === cat.href;

                    return (
                      <Link
                        key={cat.id}
                        href={cat.href}
                        onClick={() => setIsMobileOpen(false)}
                        className={cn(
                          "flex items-center gap-2.5 p-2.5 rounded-lg min-h-[44px] text-xs font-semibold transition-colors",
                          isActive
                            ? "text-[var(--brand-primary)] bg-[var(--brand-primary-soft)] font-bold"
                            : "text-slate-700 hover:text-[var(--brand-primary)] hover:bg-slate-50"
                        )}
                      >
                        <div
                          className={cn(
                            "w-7 h-7 rounded-md flex items-center justify-center shrink-0",
                            isActive
                              ? "bg-[var(--brand-primary)] text-white"
                              : "bg-blue-50 text-[var(--brand-primary)]"
                          )}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex flex-col">
                          <span className="leading-snug">{cat.title}</span>
                          <span className="text-[10px] text-slate-500 font-normal">
                            {cat.description}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <Link
              href="/blog"
              onClick={() => setIsMobileOpen(false)}
              className={cn(
                "p-3 rounded-xl transition-colors flex items-center justify-between min-h-[44px]",
                pathname === "/blog"
                  ? "text-[var(--brand-primary)] bg-[var(--brand-primary-soft)] font-bold"
                  : "text-[var(--brand-text)] hover:bg-slate-50"
              )}
            >
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-400" />
                <span>Blog</span>
              </span>
            </Link>

            <Link
              href="/testimonials"
              onClick={() => setIsMobileOpen(false)}
              className={cn(
                "p-3 rounded-xl transition-colors flex items-center justify-between min-h-[44px]",
                pathname === "/testimonials"
                  ? "text-[var(--brand-primary)] bg-[var(--brand-primary-soft)] font-bold"
                  : "text-[var(--brand-text)] hover:bg-slate-50"
              )}
            >
              <span className="flex items-center gap-2">
                <MessageSquareQuote className="w-4 h-4 text-slate-400" />
                <span>Testimonials</span>
              </span>
            </Link>

            <Link
              href="/contact"
              onClick={() => setIsMobileOpen(false)}
              className={cn(
                "p-3 rounded-xl transition-colors flex items-center justify-between min-h-[44px]",
                pathname === "/contact"
                  ? "text-[var(--brand-primary)] bg-[var(--brand-primary-soft)] font-bold"
                  : "text-[var(--brand-text)] hover:bg-slate-50"
              )}
            >
              <span>Contact</span>
            </Link>
          </nav>

          {/* DUAL CTA PAIR IN MOBILE DRAWER */}
          <div className="pt-2 space-y-3">
            {isAuthenticated ? (
              <Link
                href="/student/dashboard"
                onClick={() => setIsMobileOpen(false)}
                className="block w-full"
              >
                <Button
                  variant="secondary"
                  fullWidth
                  size="lg"
                  className="font-bold border-blue-300 text-[var(--brand-primary)] bg-blue-50/80 shadow-xs min-h-[44px]"
                  leftIcon={<LayoutDashboard className="w-4 h-4" />}
                >
                  Student Dashboard
                </Button>
              </Link>
            ) : (
              <Link
                href="/student/login"
                onClick={() => setIsMobileOpen(false)}
                className="block w-full"
              >
                <Button
                  variant="secondary"
                  fullWidth
                  size="lg"
                  className="font-bold border-[var(--brand-border)] text-[var(--brand-primary)] bg-white shadow-xs min-h-[44px]"
                  leftIcon={<User className="w-4 h-4" />}
                >
                  Student Login
                </Button>
              </Link>
            )}

            <Link
              href="/etse-2026#register"
              onClick={() => setIsMobileOpen(false)}
              className="block w-full"
            >
              <Button
                variant="primary"
                fullWidth
                size="lg"
                className="font-bold bg-[var(--brand-primary)] text-white shadow-md min-h-[44px]"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Register for ETSE
              </Button>
            </Link>

            <a
              href="tel:+917247889955"
              className="w-full flex items-center justify-center gap-2 py-3 text-xs font-semibold text-slate-600 bg-slate-100 rounded-xl min-h-[44px] transition-colors hover:bg-slate-200"
            >
              <Phone className="w-4 h-4 text-[var(--brand-accent)]" />
              <span>Call Campus: +91 7247889955</span>
            </a>
          </div>
        </div>
      </Drawer>
    </header>
  );
};
