"use client"

import { useState, useMemo } from "react"
import { Code2, Smartphone, ShoppingCart, Check, Calculator, Send, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

type CategoryId = 'web' | 'ecommerce' | 'app'

interface Option {
    id: string
    label: string
    price: number
    description: string
}

interface Extra {
    id: string
    label: string
    price: number
}

interface Category {
    id: CategoryId
    title: string
    icon: React.ElementType
    options: Option[]
    extras: Extra[]
}

const CATEGORIES: Category[] = [
    {
        id: 'web',
        title: 'Páginas Web',
        icon: Code2,
        options: [
            { id: 'landing', label: 'Landing Page', price: 300, description: 'Ideal para campañas y promociones.' },
            { id: 'institutional', label: 'Web Institucional', price: 1200, description: 'Para empresas que buscan presencia sólida.' },
            { id: 'corporate', label: 'Web Corporativa Pro', price: 3500, description: 'Solución completa con funcionalidades avanzadas.' },
        ],
        extras: [
            { id: 'seo', label: 'SEO Básico', price: 100 },
            { id: 'multilanguage', label: 'Multi-idioma', price: 400 },
        ]
    },
    {
        id: 'ecommerce',
        title: 'E-commerce',
        icon: ShoppingCart,
        options: [
            { id: 'shopify', label: 'Tienda en Shopify', price: 600, description: 'Configuración inicial rápida y efectiva.' },
            { id: 'woocommerce', label: 'Tienda en WooCommerce', price: 2200, description: 'Personalización total y control absoluto.' },
        ],
        extras: [
            { id: 'products', label: 'Carga de >50 productos', price: 300 },
            { id: 'payments', label: 'Integración Pasarela de Pagos', price: 400 },
        ]
    },
    {
        id: 'app',
        title: 'Aplicaciones Móviles',
        icon: Smartphone,
        options: [
            { id: 'mvp', label: 'MVP/App Simple', price: 6500, description: 'Producto mínimo viable para validar ideas.' },
            { id: 'moderate', label: 'App Moderada con Backend', price: 25000, description: 'Funcionalidades complejas y base de datos.' },
            { id: 'complex', label: 'App Compleja', price: 65000, description: 'Ecosistema completo y escalable.' },
        ],
        extras: [
            { id: 'login', label: 'Sistema de Login/Perfiles', price: 1500 },
            { id: 'notifications', label: 'Notificaciones Push/GPS', price: 800 },
        ]
    }
]

export default function ProjectQuoter() {
    const [selectedCategory, setSelectedCategory] = useState<CategoryId>('web')
    const [selectedOption, setSelectedOption] = useState<string>('')
    const [selectedExtras, setSelectedExtras] = useState<string[]>([])

    const currentCategory = CATEGORIES.find(c => c.id === selectedCategory)!

    const calculateTotal = useMemo(() => {
        let total = 0
        // Add option price
        const option = currentCategory.options.find(o => o.id === selectedOption)
        if (option) {
            total += option.price
        }
        // Add extras price
        selectedExtras.forEach(extraId => {
            const extra = currentCategory.extras.find(e => e.id === extraId)
            if (extra) {
                total += extra.price
            }
        })
        return total
    }, [selectedCategory, selectedOption, selectedExtras, currentCategory])

    const handleCategoryChange = (category: CategoryId) => {
        setSelectedCategory(category)
        setSelectedOption('')
        setSelectedExtras([])
    }

    const handleOptionChange = (optionId: string) => {
        setSelectedOption(optionId)
    }

    const handleExtraToggle = (extraId: string) => {
        setSelectedExtras(prev =>
            prev.includes(extraId)
                ? prev.filter(id => id !== extraId)
                : [...prev, extraId]
        )
    }

    const handleWhatsAppClick = () => {
        if (!selectedOption) {
            toast.error("Por favor selecciona una opción principal para continuar.")
            return
        }

        const optionLabel = currentCategory.options.find(o => o.id === selectedOption)?.label
        const extrasLabels = selectedExtras.map(id => currentCategory.extras.find(e => e.id === id)?.label).join(' y ')

        let message = `Hola ErikaRTech, me interesa una ${optionLabel}`
        if (extrasLabels) {
            message += ` con ${extrasLabels}`
        }
        message += `. El presupuesto estimado es de $${calculateTotal.toLocaleString()} USD. ¿Podemos hablar?`

        const encodedMessage = encodeURIComponent(message)
        window.open(`https://wa.me/573043185545?text=${encodedMessage}`, '_blank')
    }

    return (
        <section id="cotizador" className="relative px-4 py-16 md:py-32 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00C2FF]/10 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto max-w-6xl relative z-10">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-[#00C2FF] to-[#FF00D6] bg-clip-text text-transparent">
                        Cotizador Inteligente
                    </h2>
                    <p className="text-base md:text-xl text-gray-400 font-mono max-w-2xl mx-auto">
                        Configura tu proyecto ideal y obtén una estimación instantánea adaptada al mercado global.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 items-start">
                    {/* Main Selection Area */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Category Selection */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {CATEGORIES.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => handleCategoryChange(category.id)}
                                    className={cn(
                                        "flex flex-col items-center justify-center p-6 rounded-2xl border transition-all duration-300 group",
                                        selectedCategory === category.id
                                            ? "bg-[#00C2FF]/10 border-[#00C2FF] shadow-[0_0_30px_rgba(0,194,255,0.3)]"
                                            : "bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10"
                                    )}
                                >
                                    <div className={cn(
                                        "w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors",
                                        selectedCategory === category.id ? "bg-[#00C2FF] text-white" : "bg-white/10 text-gray-400 group-hover:text-white"
                                    )}>
                                        <category.icon className="w-6 h-6" />
                                    </div>
                                    <span className={cn(
                                        "font-bold text-lg",
                                        selectedCategory === category.id ? "text-white" : "text-gray-400 group-hover:text-white"
                                    )}>
                                        {category.title}
                                    </span>
                                </button>
                            ))}
                        </div>

                        {/* Options Selection */}
                        <Card className="backdrop-blur-xl bg-white/5 border-white/10 overflow-hidden">
                            <CardHeader>
                                <CardTitle className="text-2xl text-white">Selecciona tu Plan</CardTitle>
                                <CardDescription className="text-gray-400">Elige la base de tu proyecto para comenzar.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <RadioGroup value={selectedOption} onValueChange={handleOptionChange} className="space-y-4">
                                    {currentCategory.options.map((option) => (
                                        <div key={option.id} className="relative">
                                            <RadioGroupItem value={option.id} id={option.id} className="peer sr-only" />
                                            <Label
                                                htmlFor={option.id}
                                                className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 cursor-pointer transition-all peer-data-[state=checked]:border-[#FF00D6] peer-data-[state=checked]:bg-[#FF00D6]/10"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="w-6 h-6 rounded-full border-2 border-gray-400 peer-data-[state=checked]:border-[#FF00D6] flex items-center justify-center">
                                                        {selectedOption === option.id && <div className="w-3 h-3 rounded-full bg-[#FF00D6]" />}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-lg text-white">{option.label}</div>
                                                        <div className="text-sm text-gray-400">{option.description}</div>
                                                    </div>
                                                </div>
                                                <div className="text-xl font-mono text-[#00C2FF] font-bold">
                                                    ${option.price.toLocaleString()}
                                                </div>
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </CardContent>
                        </Card>

                        {/* Extras Selection */}
                        <Card className="backdrop-blur-xl bg-white/5 border-white/10">
                            <CardHeader>
                                <CardTitle className="text-2xl text-white">Potencia tu Proyecto</CardTitle>
                                <CardDescription className="text-gray-400">Agrega funcionalidades extra según tus necesidades.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {currentCategory.extras.map((extra) => (
                                    <div key={extra.id} className="flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all">
                                        <div className="flex items-center gap-3">
                                            <Checkbox
                                                id={extra.id}
                                                checked={selectedExtras.includes(extra.id)}
                                                onCheckedChange={() => handleExtraToggle(extra.id)}
                                                className="border-gray-500 data-[state=checked]:bg-[#FF00D6] data-[state=checked]:border-[#FF00D6]"
                                            />
                                            <Label htmlFor={extra.id} className="text-lg text-white cursor-pointer font-medium">
                                                {extra.label}
                                            </Label>
                                        </div>
                                        <span className="font-mono text-[#00C2FF] font-bold">+ ${extra.price.toLocaleString()}</span>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                    </div>

                    {/* Sticky Summary Card */}
                    <div className="lg:sticky lg:top-24 space-y-6">
                        <Card className="backdrop-blur-xl bg-[#050514]/80 border-[#FF00D6]/30 shadow-[0_8px_32px_0_rgba(255,0,214,0.2)]">
                            <CardHeader className="bg-gradient-to-r from-[#FF00D6]/20 to-transparent border-b border-white/10">
                                <CardTitle className="flex items-center gap-2 text-white">
                                    <Calculator className="w-6 h-6 text-[#FF00D6]" />
                                    Resumen de Inversión
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-6">
                                <div className="space-y-4">
                                    <div className="flex justify-between text-gray-400">
                                        <span>Categoría:</span>
                                        <span className="text-white font-medium">{currentCategory.title}</span>
                                    </div>

                                    {selectedOption && (
                                        <div className="flex justify-between text-gray-400 animate-in fade-in slide-in-from-left-4">
                                            <span>Plan Base:</span>
                                            <span className="text-white font-medium">{currentCategory.options.find(o => o.id === selectedOption)?.label}</span>
                                        </div>
                                    )}

                                    {selectedExtras.length > 0 && (
                                        <div className="space-y-2 pt-2 border-t border-white/10">
                                            <span className="text-gray-400 text-sm">Extras seleccionados:</span>
                                            {selectedExtras.map(id => {
                                                const extra = currentCategory.extras.find(e => e.id === id)
                                                return (
                                                    <div key={id} className="flex justify-between text-sm animate-in fade-in slide-in-from-left-4">
                                                        <span className="text-gray-300">• {extra?.label}</span>
                                                        <span className="text-[#00C2FF] font-mono">+ ${extra?.price}</span>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    )}
                                </div>

                                <div className="pt-6 border-t border-white/10">
                                    <div className="flex justify-between items-end mb-2">
                                        <span className="text-gray-400">Total Estimado</span>
                                        <span className="text-4xl font-bold font-mono text-white bg-clip-text">
                                            ${calculateTotal.toLocaleString()}
                                            <span className="text-sm text-gray-500 ml-1 font-sans font-normal">USD</span>
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 text-right">*Precios referenciales para mercado LatAm</p>
                                </div>
                            </CardContent>
                            <CardFooter className="pb-6">
                                <Button
                                    size="lg"
                                    className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-lg shadow-lg hover:shadow-[#25D366]/50 transition-all transform hover:-translate-y-1"
                                    onClick={handleWhatsAppClick}
                                    disabled={!selectedOption}
                                >
                                    <Send className="w-5 h-5 mr-2" />
                                    Enviar a un Asesor
                                </Button>
                            </CardFooter>
                        </Card>

                        <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-400">
                            <p className="flex gap-2">
                                <Check className="w-5 h-5 text-[#00C2FF] shrink-0" />
                                Recibirás una respuesta en menos de 24 horas.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
