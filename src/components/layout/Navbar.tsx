/**
 * Navbar.tsx
 *
 * Navbar dinámica que cambia links según la sección actual.
 * Detecta si el usuario está en /tienda, /servicios o en la home.
 * Responsive: hamburger menu en mobile con links contextuales.
 *
 * Principio SoC: este componente SOLO gestiona la navegación.
 */

import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  User,
  LogOut,
  ChevronDown,
  Package,
  ShoppingCart,
  Home,
  Shield,
  Phone,
  UserPlus,
  Zap,
  Wrench,
  ArrowLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';

/** Tipos de sección detectada */
type SiteSection = 'home' | 'tienda' | 'servicios';

/** Determina la sección actual basándose en el pathname */
function detectSection(pathname: string): SiteSection {
  if (pathname.startsWith('/tienda')) return 'tienda';
  if (pathname.startsWith('/servicios')) return 'servicios';
  return 'home';
}

interface NavbarProps {
  /** Categorías de productos (solo necesarias en sección tienda) */
  categories?: Array<{ id: string; name: string }>;
  /** Contador de productos por categoría */
  getCategoryProductCount?: (categoryId: string) => number;
  /** Nombre de la marca */
  brandName?: string;
  /** Tagline */
  tagline?: string;
}

export function Navbar({
  categories = [],
  getCategoryProductCount,
  brandName = 'ALEJ_TECH',
  tagline = 'TECH_SHOP',
}: NavbarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const section = detectSection(location.pathname);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsCategoriesOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Scroll detection for header shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsCategoriesOpen(false);
  };

  const isActiveRoute = (path: string) => {
    if (path === '/tienda' && location.pathname === '/tienda') return true;
    if (path === '/servicios' && location.pathname === '/servicios') return true;
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && path !== '/tienda' && path !== '/servicios') {
      return location.pathname.startsWith(path);
    }
    return false;
  };

  /** Accent color class based on current section */
  const accentColor = section === 'servicios' ? 'purple' : 'blue';
  const accentClasses = {
    active: section === 'servicios' ? 'text-purple-400 bg-purple-500/10' : 'text-blue-400 bg-blue-500/10',
    activeBorder: section === 'servicios' ? 'border-purple-500/20' : 'border-blue-500/20',
    headerShadow: section === 'servicios' ? 'shadow-purple-500/5 border-purple-500/10' : 'shadow-blue-500/5 border-blue-500/10',
    hoverBg: section === 'servicios' ? 'hover:bg-purple-500/10' : 'hover:bg-blue-500/10',
    hoverText: section === 'servicios' ? 'hover:text-purple-400' : 'hover:text-blue-400',
    logoIconBg: section === 'servicios'
      ? 'from-purple-500/20 to-violet-600/10 border-purple-500/20 group-hover:border-purple-400/40'
      : 'from-blue-500/20 to-blue-600/10 border-blue-500/20 group-hover:border-blue-400/40',
    logoIcon: section === 'servicios' ? 'text-purple-400 group-hover:text-purple-300' : 'text-blue-400 group-hover:text-blue-300',
    divider: section === 'servicios' ? 'via-purple-500/30' : 'via-blue-500/30',
    registerBtn: section === 'servicios'
      ? 'from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 shadow-purple-500/20 hover:shadow-purple-500/30'
      : 'from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-blue-500/20 hover:shadow-blue-500/30',
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? `bg-gray-900/98 backdrop-blur-xl shadow-lg ${accentClasses.headerShadow} border-b`
            : 'bg-gray-900/95 backdrop-blur-md border-b border-gray-800/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group" aria-label="Ir al inicio">
              <div className={`relative w-10 h-10 rounded-full bg-gradient-to-br ${accentClasses.logoIconBg} flex items-center justify-center border transition-all duration-300 overflow-hidden`}>
                <img 
                  src="/perfil-tecnico.jpg" 
                  alt="Perfil Técnico" 
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 rounded-full ${section === 'servicios' ? 'bg-purple-400/5 group-hover:bg-purple-400/10' : 'bg-blue-400/5 group-hover:bg-blue-400/10'} transition-colors`} />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-white text-sm tracking-wide group-hover:text-blue-100 transition-colors">
                  {brandName}
                </h1>
                <p className={`text-[10px] ${section === 'servicios' ? 'text-purple-400/70' : 'text-blue-400/70'} font-medium tracking-wider uppercase`}>
                  {section === 'servicios' ? 'Servicio Técnico' : tagline}
                </p>
              </div>
            </Link>

            {/* ── DESKTOP NAVIGATION ── */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Navegación principal">
              {/* Back to Home (when inside a section) */}
              {section !== 'home' && (
                <Link
                  to="/"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800/60 transition-all duration-200 mr-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Inicio
                </Link>
              )}

              {/* ── HOME NAV ── */}
              {section === 'home' && (
                <>
                  <Link
                    to="/tienda"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all duration-200"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Tienda
                  </Link>
                  <Link
                    to="/servicios"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-purple-400 hover:bg-purple-500/10 transition-all duration-200"
                  >
                    <Wrench className="w-4 h-4" />
                    Servicios
                  </Link>
                </>
              )}

              {/* ── TIENDA NAV ── */}
              {section === 'tienda' && (
                <>
                  <Link
                    to="/tienda"
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActiveRoute('/tienda') && location.pathname === '/tienda'
                        ? accentClasses.active
                        : 'text-gray-300 hover:text-white hover:bg-gray-800/60'
                    }`}
                  >
                    Tienda
                  </Link>

                  {/* Products Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          isActiveRoute('/tienda/productos') || isActiveRoute('/tienda/categoria')
                            ? accentClasses.active
                            : 'text-gray-300 hover:text-white hover:bg-gray-800/60'
                        }`}
                      >
                        <Package className="w-4 h-4" />
                        Productos
                        <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-64 bg-gray-900 border-gray-700/60 shadow-xl shadow-black/40">
                      <div className="p-1.5">
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold px-2.5 py-1.5">
                          Categorías
                        </p>
                        {categories.map((category) => (
                          <DropdownMenuItem
                            key={category.id}
                            onClick={() => navigate(`/tienda/categoria/${category.id}`)}
                            className="flex items-center justify-between cursor-pointer text-gray-300 hover:text-white hover:bg-gray-800/70 rounded-md"
                          >
                            <span>{category.name}</span>
                            {getCategoryProductCount && (
                              <span className="text-[10px] font-mono text-gray-600 bg-gray-800/60 px-1.5 py-0.5 rounded">
                                {getCategoryProductCount(category.id)}
                              </span>
                            )}
                          </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator className="bg-gray-800/60" />
                        <DropdownMenuItem
                          onClick={() => navigate('/tienda/productos')}
                          className="cursor-pointer text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-md font-medium"
                        >
                          <Zap className="w-3.5 h-3.5 mr-2" />
                          Ver todos los productos
                        </DropdownMenuItem>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <Link
                    to="/tienda/garantia"
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActiveRoute('/tienda/garantia')
                        ? accentClasses.active
                        : 'text-gray-300 hover:text-white hover:bg-gray-800/60'
                    }`}
                  >
                    Garantía
                  </Link>
                </>
              )}

              {/* ── SERVICIOS NAV ── */}
              {section === 'servicios' && (
                <>
                  <Link
                    to="/servicios/contacto"
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActiveRoute('/servicios/contacto')
                        ? accentClasses.active
                        : 'text-gray-300 hover:text-white hover:bg-gray-800/60'
                    }`}
                  >
                    Contacto
                  </Link>
                </>
              )}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2">
              {/* Cart button — only in tienda */}
              {section === 'tienda' && (
                <Button
                  variant="ghost"
                  size="icon"
                  className={`relative text-gray-400 ${accentClasses.hoverText} ${accentClasses.hoverBg} transition-all duration-200`}
                  onClick={() => navigate('/tienda/productos')}
                  aria-label="Ver productos"
                >
                  <ShoppingCart className="w-5 h-5" />
                </Button>
              )}

              {/* ── DESKTOP AUTH ── */}
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-800/60 border border-gray-700/40 text-gray-300 hover:text-white hover:border-blue-500/30 transition-all duration-200">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500/20 to-emerald-500/20 flex items-center justify-center border border-blue-500/20">
                        <span className="text-blue-300 text-xs font-bold">
                          {user?.firstName?.[0]}{user?.lastName?.[0]}
                        </span>
                      </div>
                      <span className="hidden lg:block text-sm font-medium">{user?.firstName}</span>
                      <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-gray-900 border-gray-700/60 shadow-xl shadow-black/40">
                    <div className="px-3 py-2.5">
                      <p className="text-sm font-semibold text-white">{user?.firstName} {user?.lastName}</p>
                      <p className="text-xs text-gray-500 font-mono">{user?.email}</p>
                    </div>
                    <DropdownMenuSeparator className="bg-gray-800/60" />
                    <DropdownMenuItem
                      onClick={() => navigate('/admin')}
                      className="cursor-pointer text-gray-300 hover:text-white hover:bg-gray-800/70 rounded-md"
                    >
                      Panel de Admin
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-md"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Cerrar Sesión
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <Button
                    variant="ghost"
                    onClick={() => navigate('/login')}
                    className="text-gray-300 hover:text-white hover:bg-gray-800/60 text-sm font-medium"
                  >
                    <User className="w-4 h-4 mr-1.5" />
                    Iniciar Sesión
                  </Button>
                  <Button
                    onClick={() => navigate('/register')}
                    className={`bg-gradient-to-r ${accentClasses.registerBtn} text-white font-semibold text-sm px-5 py-2 rounded-lg shadow-lg transition-all duration-300 hover:-translate-y-0.5`}
                  >
                    <UserPlus className="w-4 h-4 mr-1.5" />
                    Registrarse
                  </Button>
                </div>
              )}

              {/* ── HAMBURGER ── */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`md:hidden relative w-10 h-10 rounded-lg flex items-center justify-center text-gray-400 ${accentClasses.hoverText} ${accentClasses.hoverBg} transition-all duration-200`}
                aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                aria-expanded={isMobileMenuOpen}
              >
                <div className="w-5 h-4 relative flex flex-col justify-between">
                  <span
                    className={`block h-0.5 w-full bg-current rounded-full transform transition-all duration-300 origin-center ${
                      isMobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
                    }`}
                  />
                  <span
                    className={`block h-0.5 w-full bg-current rounded-full transition-all duration-200 ${
                      isMobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100'
                    }`}
                  />
                  <span
                    className={`block h-0.5 w-full bg-current rounded-full transform transition-all duration-300 origin-center ${
                      isMobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* ── MOBILE MENU ── */}
        <div
          ref={mobileMenuRef}
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-[calc(100vh-4rem)] opacity-100' : 'max-h-0 opacity-0'
          }`}
          aria-hidden={!isMobileMenuOpen}
        >
          <div className={`bg-gray-900/98 backdrop-blur-xl border-t ${section === 'servicios' ? 'border-purple-500/10' : 'border-blue-500/10'}`}>
            <nav className="px-4 py-3 space-y-1" aria-label="Menú móvil">
              {/* Back to home */}
              {section !== 'home' && (
                <Link
                  to="/"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800/60 transition-all duration-200"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Volver al Inicio
                </Link>
              )}

              {/* ── HOME MOBILE NAV ── */}
              {section === 'home' && (
                <>
                  <Link
                    to="/tienda"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all duration-200"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Ir a la Tienda
                  </Link>
                  <Link
                    to="/servicios"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-300 hover:text-purple-400 hover:bg-purple-500/10 transition-all duration-200"
                  >
                    <Wrench className="w-4 h-4" />
                    Servicios Técnicos
                  </Link>
                </>
              )}

              {/* ── TIENDA MOBILE NAV ── */}
              {section === 'tienda' && (
                <>
                  <Link
                    to="/tienda"
                    onClick={closeMobileMenu}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      location.pathname === '/tienda'
                        ? `${accentClasses.active} border ${accentClasses.activeBorder}`
                        : 'text-gray-300 hover:text-white hover:bg-gray-800/60'
                    }`}
                  >
                    <Home className="w-4 h-4" />
                    Inicio Tienda
                  </Link>

                  {/* Products with expandable categories */}
                  <div>
                    <button
                      onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActiveRoute('/tienda/productos') || isActiveRoute('/tienda/categoria')
                          ? `${accentClasses.active} border ${accentClasses.activeBorder}`
                          : 'text-gray-300 hover:text-white hover:bg-gray-800/60'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <Package className="w-4 h-4" />
                        Productos
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isCategoriesOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isCategoriesOpen ? 'max-h-96 opacity-100 mt-1' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className={`ml-4 pl-4 border-l-2 ${accentClasses.activeBorder} space-y-0.5 py-1`}>
                        {categories.map((category) => (
                          <Link
                            key={category.id}
                            to={`/tienda/categoria/${category.id}`}
                            onClick={closeMobileMenu}
                            className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
                          >
                            <span>{category.name}</span>
                            {getCategoryProductCount && (
                              <span className="text-[10px] font-mono text-gray-600 bg-gray-800/60 px-1.5 py-0.5 rounded">
                                {getCategoryProductCount(category.id)}
                              </span>
                            )}
                          </Link>
                        ))}
                        <Link
                          to="/tienda/productos"
                          onClick={closeMobileMenu}
                          className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 font-medium transition-all duration-200"
                        >
                          <Zap className="w-3.5 h-3.5" />
                          Ver todos
                        </Link>
                      </div>
                    </div>
                  </div>

                  <Link
                    to="/tienda/garantia"
                    onClick={closeMobileMenu}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActiveRoute('/tienda/garantia')
                        ? `${accentClasses.active} border ${accentClasses.activeBorder}`
                        : 'text-gray-300 hover:text-white hover:bg-gray-800/60'
                    }`}
                  >
                    <Shield className="w-4 h-4" />
                    Garantía
                  </Link>
                </>
              )}

              {/* ── SERVICIOS MOBILE NAV ── */}
              {section === 'servicios' && (
                <>
                  <Link
                    to="/servicios/contacto"
                    onClick={closeMobileMenu}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActiveRoute('/servicios/contacto')
                        ? `${accentClasses.active} border ${accentClasses.activeBorder}`
                        : 'text-gray-300 hover:text-white hover:bg-gray-800/60'
                    }`}
                  >
                    <Phone className="w-4 h-4" />
                    Contacto
                  </Link>
                </>
              )}
            </nav>

            {/* Divider */}
            <div className={`mx-4 h-px bg-gradient-to-r from-transparent ${accentClasses.divider} to-transparent`} />

            {/* Mobile Auth Section */}
            <div className="px-4 py-4">
              {isAuthenticated ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-800/40 border border-gray-700/30">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-emerald-500/20 flex items-center justify-center border border-blue-500/20">
                      <span className="text-blue-300 text-sm font-bold">
                        {user?.firstName?.[0]}{user?.lastName?.[0]}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-white text-sm truncate">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className="text-xs text-gray-500 font-mono truncate">{user?.email}</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      closeMobileMenu();
                      navigate('/admin');
                    }}
                    className={`w-full bg-gradient-to-r ${accentClasses.registerBtn} text-white font-semibold text-sm py-2.5 rounded-xl shadow-lg`}
                  >
                    Panel de Admin
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      closeMobileMenu();
                      handleLogout();
                    }}
                    className="w-full border-gray-700/50 text-gray-400 hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/5 rounded-xl"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Cerrar Sesión
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Button
                    onClick={() => {
                      closeMobileMenu();
                      navigate('/login');
                    }}
                    variant="outline"
                    className={`w-full border-gray-700/50 text-gray-300 hover:text-white hover:border-${accentColor}-500/30 hover:bg-${accentColor}-500/5 rounded-xl py-2.5 text-sm font-medium`}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Iniciar Sesión
                  </Button>
                  <Button
                    onClick={() => {
                      closeMobileMenu();
                      navigate('/register');
                    }}
                    className={`w-full bg-gradient-to-r ${accentClasses.registerBtn} text-white font-semibold text-sm py-2.5 rounded-xl shadow-lg transition-all duration-300`}
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Registrarse
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
}
