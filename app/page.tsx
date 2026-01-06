"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Code2, Smartphone, ShoppingCart, Send, Menu, X, Loader2 } from "lucide-react"
import { toast } from "sonner"

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const sphereRef = useRef<HTMLDivElement>(null)
  const [isSending, setIsSending] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSending(true)

    const formData = new FormData(e.currentTarget)

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        toast.success("Mensaje enviado con éxito. Nos pondremos en contacto contigo pronto.")
          ; (e.target as HTMLFormElement).reset()
      } else {
        toast.error("Hubo un problema al enviar el mensaje. Por favor intenta de nuevo.")
      }
    } catch (error) {
      console.error("Error:", error)
      toast.error("Error al enviar el mensaje. Por favor intenta de nuevo.")
    } finally {
      setIsSending(false)
    }
  }

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  useEffect(() => {
    if (sphereRef.current) {
      const rotateX = (cursorPosition.y - window.innerHeight / 2) / 50
      const rotateY = (cursorPosition.x - window.innerWidth / 2) / 50
      sphereRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    }
  }, [cursorPosition])

  return (
    <>
      {/* Custom Cursor */}
      <div
        className="fixed w-8 h-8 border-2 border-[#FF00D6] rounded-full pointer-events-none z-[9999] mix-blend-difference transition-transform duration-150"
        style={{
          left: `${cursorPosition.x - 16}px`,
          top: `${cursorPosition.y - 16}px`,
        }}
      />

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/584149231863"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-[9999] group transition-transform hover:scale-110 active:scale-95"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-[#25D366] rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity" />
          <img src="/icon_whatsapp.png" alt="WhatsApp" className="w-16 h-16 relative z-10" />
        </div>
      </a>

      <div className="min-h-screen bg-[#050514] text-white overflow-x-hidden">
        {/* Sticky Navigation Bar */}
        <nav
          className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${scrollY > 50 ? "backdrop-blur-xl bg-white/5" : "backdrop-blur-md bg-white/10"
            }`}
          style={{
            borderRadius: "9999px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 8px 32px 0 rgba(0, 194, 255, 0.2)",
          }}
        >
          <div className="px-8 py-4 flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 to-[#FF00D6] rounded-lg flex items-center justify-center">
                <img src="/logo_erikartech.png" alt="Logo ErikarTech" className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#00C2FF] to-[#FF00D6] bg-clip-text text-transparent">
                ErikarTech
              </span>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <a href="#servicios" className="text-sm hover:text-[#00C2FF] transition-colors cursor-pointer font-mono">
                Servicios
              </a>
              <a href="#proyectos" className="text-sm hover:text-[#00C2FF] transition-colors cursor-pointer font-mono">
                Proyectos
              </a>
              <a href="#nosotros" className="text-sm hover:text-[#00C2FF] transition-colors cursor-pointer font-mono">
                Nosotros
              </a>
              <Button
                size="sm"
                className="bg-[#FF00D6] hover:bg-[#FF00D6]/90 text-white font-mono shadow-lg shadow-[#FF00D6]/50"
                asChild
              >
                <a href="https://wa.me/584149231863" target="_blank" rel="noopener noreferrer">Iniciar Proyecto</a>
              </Button>
            </div>

            <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4 py-32 overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 opacity-30">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at 20% 50%, rgba(0, 194, 255, 0.3) 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, rgba(255, 0, 214, 0.3) 0%, transparent 50%)",
                animation: "aurora 20s ease-in-out infinite",
              }}
            />
          </div>

          <div className="container mx-auto max-w-7xl relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Text */}
              <div className="space-y-8">
                <div className="inline-block px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
                  <span className="text-sm font-mono text-[#00C2FF]">Innovación Digital</span>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight text-balance">
                  <span className="bg-gradient-to-r from-white via-[#00C2FF] to-white bg-clip-text text-transparent">
                    Arquitectos del
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-[#FF00D6] to-[#00C2FF] bg-clip-text text-transparent">
                    Futuro Digital
                  </span>
                </h1>

                <p className="text-xl text-gray-400 max-w-xl text-pretty">
                  Transformamos ideas complejas en experiencias web y móviles de alto impacto.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-[#FF00D6] hover:bg-[#FF00D6]/90 text-white px-8 py-6 text-lg font-mono shadow-2xl shadow-[#FF00D6]/50 hover:shadow-[#FF00D6]/70 transition-all"
                    asChild
                  >
                    <a href="#proyectos">Ver Nuestro Trabajo</a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-[#00C2FF] text-[#00C2FF] hover:bg-[#00C2FF]/10 px-8 py-6 text-lg font-mono backdrop-blur-sm bg-white/5 shadow-lg shadow-[#00C2FF]/30 hover:shadow-[#00C2FF]/50 transition-all"
                    asChild
                  >
                    <a href="#servicios">Nuestros Servicios</a>
                  </Button>
                </div>
              </div>

              {/* Right Side - 3D Element */}
              <div className="relative h-[500px] lg:h-[600px] flex items-center justify-center">
                <div
                  ref={sphereRef}
                  className="w-[400px] h-[400px] relative transition-transform duration-100 ease-out"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Outer Ring */}
                  <div
                    className="absolute inset-0 rounded-full border-2 border-[#00C2FF]/30"
                    style={{
                      boxShadow: "0 0 60px rgba(0, 194, 255, 0.4), inset 0 0 60px rgba(0, 194, 255, 0.2)",
                      animation: "rotate 20s linear infinite",
                    }}
                  />

                  {/* Middle Ring */}
                  <div
                    className="absolute inset-8 rounded-full border-2 border-[#FF00D6]/30"
                    style={{
                      boxShadow: "0 0 40px rgba(255, 0, 214, 0.4), inset 0 0 40px rgba(255, 0, 214, 0.2)",
                      animation: "rotate 15s linear infinite reverse",
                    }}
                  />

                  {/* Inner Core */}
                  <div
                    className="absolute inset-16 rounded-full bg-gradient-to-br from-[#00C2FF]/20 to-[#FF00D6]/20 backdrop-blur-xl"
                    style={{
                      boxShadow: "0 0 80px rgba(0, 194, 255, 0.6), 0 0 80px rgba(255, 0, 214, 0.6)",
                      animation: "pulse 3s ease-in-out infinite",
                    }}
                  />

                  {/* Data Points */}
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-3 h-3 rounded-full bg-white"
                      style={{
                        top: `${50 + 40 * Math.sin((i * Math.PI * 2) / 8)}%`,
                        left: `${50 + 40 * Math.cos((i * Math.PI * 2) / 8)}%`,
                        boxShadow: "0 0 20px rgba(255, 255, 255, 0.8)",
                        animation: `float ${2 + i * 0.2}s ease-in-out infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section - Bento Grid */}
        <section id="servicios" className="relative px-4 py-32">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Ecosistema de Soluciones
              </h2>
              <p className="text-xl text-gray-400 font-mono">Tecnología de vanguardia para líderes digitales</p>
            </div>

            <div className="grid md:grid-cols-4 gap-4 auto-rows-[200px]">
              {/* Large Card - Next.js */}
              <div
                className="md:col-span-2 md:row-span-2 group relative overflow-hidden rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 p-8 hover:border-[#FF00D6]/50 transition-all duration-500 cursor-pointer"
                style={{
                  boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF00D6]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00C2FF] to-[#FF00D6] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                      <Code2 className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-bold mb-4">Desarrollo Web</h3>
                    <p className="text-gray-400 text-lg">
                      Velocidad extrema y SEO optimizado para líderes de industria.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-[#FF00D6] font-mono text-sm group-hover:gap-4 transition-all">
                    <span>Ver más</span>
                    <span className="group-hover:translate-x-2 transition-transform">→</span>
                  </div>
                </div>
              </div>

              {/* Medium Card - E-commerce */}
              <div
                className="md:col-span-2 group relative overflow-hidden rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 p-8 hover:border-[#00C2FF]/50 transition-all duration-500 cursor-pointer"
                style={{
                  boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#00C2FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00C2FF] to-[#FF00D6] flex items-center justify-center group-hover:scale-110 transition-transform duration-500 flex-shrink-0">
                    <ShoppingCart className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">E-commerce</h3>
                    <p className="text-gray-400">Tiendas holográficas de alto rendimiento.</p>
                  </div>
                </div>
              </div>

              {/* Medium Card - Mobile Apps */}
              <div
                className="md:col-span-2 group relative overflow-hidden rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 p-8 hover:border-[#00C2FF]/50 transition-all duration-500 cursor-pointer"
                style={{
                  boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#00C2FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF00D6] to-[#00C2FF] flex items-center justify-center group-hover:scale-110 transition-transform duration-500 flex-shrink-0">
                    <Smartphone className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Aplicaciones Móviles</h3>
                    <p className="text-gray-400">Experiencias nativas multiplataforma.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="proyectos" className="relative px-4 py-32 mb-16">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-32">
              <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Innovación en Producción
              </h2>
              <p className="text-xl text-gray-400 font-mono">Proyectos que definen el futuro</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "FinTech Platform", category: "Next.js App", img: "/modern-fintech-mobile-app-interface.jpg" },
                { title: "Robust Pickleball", category: "Shopify Store", img: "/robustpickleball.png" },
                {
                  title: "SaaS Dashboard",
                  category: "Web Application",
                  img: "/corporate-business-website-dashboard.jpg",
                },
                { title: "Food Delivery", category: "Mobile App", img: "/restaurant-food-delivery-app-interface.jpg" },
                {
                  title: "Healthcare Portal",
                  category: "Custom Platform",
                  img: "/healthcare-medical-appointment-booking-website.jpg",
                },
                { title: "Cleaning Soluciones", category: "Web Site", img: "/real-estate-website.png" },
              ].map((project, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 hover:border-[#FF00D6]/50 transition-all duration-500 cursor-pointer h-[400px]"
                  style={{
                    boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
                    transform: `translateY(${scrollY * 0.05 * (i % 2 === 0 ? 1 : -1)}px)`,
                  }}
                >
                  <img
                    src={project.img || "/placeholder.svg"}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050514] via-[#050514]/50 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="text-[#00C2FF] font-mono text-sm mb-2">{project.category}</div>
                    <h3 className="text-2xl font-bold">{project.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Client Benefits Marquee */}
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#00C2FF]/10 to-[#FF00D6]/10" />
          <div className="relative">
            <div className="flex animate-marquee whitespace-nowrap">
              {[
                "Retorno de Inversión",
                "Ventas Optimizadas",
                "Carga Ultra-Rápida",
                "Soporte Premium 24/7",
                "Diseño de Alto Impacto",
                "Escalabilidad Total",
                "SEO de Vanguardia",
                "Interfaces Intuitivas",
                "Retorno de Inversión",
                "Ventas Optimizadas",
                "Carga Ultra-Rápida",
                "Soporte Premium 24/7",
              ].map((benefit, i) => (
                <span key={i} className="mx-8 text-4xl font-bold text-white/20 font-mono">
                  {benefit}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="nosotros" className="relative px-4 py-32">
          <div
            className="container mx-auto max-w-4xl relative overflow-hidden rounded-[3rem] backdrop-blur-xl bg-white/5 border border-white/10 p-12 md:p-20 text-center"
            style={{
              boxShadow: "0 8px 32px 0 rgba(255, 0, 214, 0.3)",
              background:
                "radial-gradient(ellipse at center, rgba(255, 0, 214, 0.15) 0%, rgba(0, 194, 255, 0.1) 50%, transparent 100%)",
            }}
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-[#00C2FF] to-[#FF00D6] bg-clip-text text-transparent">
              ¿Listo para el siguiente nivel?
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Transformemos tu visión en una experiencia digital inolvidable
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#FF00D6] to-[#00C2FF] hover:opacity-90 text-white px-12 py-8 text-xl font-mono shadow-2xl hover:shadow-[#FF00D6]/70 transition-all hover:scale-105"
              asChild
            >
              <a href="https://wa.me/584149231863" target="_blank" rel="noopener noreferrer">Agendar Consultoría Estratégica</a>
            </Button>
          </div>
        </section>

        {/* Contact Form */}
        <section id="contacto" className="relative px-4 py-32">
          <div className="container mx-auto max-w-2xl">
            <div
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12"
              style={{
                boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
              }}
            >
              <h3 className="text-3xl font-bold mb-8 text-center">Envianos tu consulta</h3>
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Web3Forms Configuration */}
                <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" />
                <input type="hidden" name="subject" value="Nuevo mensaje desde ErikarTech Landing" />
                <input type="hidden" name="redirect" value="false" />
                <input type="hidden" name="from_name" value="ErikarTech Contact Form" />

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-300 font-mono text-sm">
                      Nombre
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Tu nombre"
                      required
                      className="bg-white/5 border-white/10 focus:border-[#00C2FF] text-white placeholder:text-gray-500 backdrop-blur-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300 font-mono text-sm">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="tu@email.com"
                      required
                      className="bg-white/5 border-white/10 focus:border-[#00C2FF] text-white placeholder:text-gray-500 backdrop-blur-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-gray-300 font-mono text-sm">
                    Asunto
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="Sobre tu proyecto"
                    required
                    className="bg-white/5 border-white/10 focus:border-[#00C2FF] text-white placeholder:text-gray-500 backdrop-blur-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-gray-300 font-mono text-sm">
                    Mensaje
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Cuéntanos sobre tu visión..."
                    rows={6}
                    required
                    className="bg-white/5 border-white/10 focus:border-[#00C2FF] text-white placeholder:text-gray-500 backdrop-blur-sm"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSending}
                  className="w-full bg-[#FF00D6] hover:bg-[#FF00D6]/90 text-white py-6 text-lg font-mono shadow-lg shadow-[#FF00D6]/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSending ? (
                    <>
                      Enviando...
                      <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                    </>
                  ) : (
                    <>
                      Enviar Mensaje
                      <Send className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative px-4 py-12 border-t border-white/10">
          <div className="container mx-auto max-w-6xl text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center">
                <img src="/logo_erikartech.png" alt="Logo ErikarTech" className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-[#00C2FF] to-[#FF00D6] bg-clip-text text-transparent">
                ErikarTech
              </span>
            </div>
            <p className="text-gray-400 mb-2 font-mono">Arquitectos del Futuro Digital</p>
            <p className="text-gray-600 text-sm">© 2026 ErikarTech. Todos los derechos reservados.</p>
          </div>
        </footer>

        <style jsx>{`
          @keyframes rotate {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }

          @keyframes pulse {
            0%,
            100% {
              opacity: 0.6;
            }
            50% {
              opacity: 1;
            }
          }

          @keyframes float {
            0%,
            100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
          }

          @keyframes aurora {
            0%,
            100% {
              opacity: 0.3;
            }
            50% {
              opacity: 0.6;
            }
          }

          @keyframes marquee {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .animate-marquee {
            animation: marquee 30s linear infinite;
          }
        `}</style>
      </div>
    </>
  )
}
