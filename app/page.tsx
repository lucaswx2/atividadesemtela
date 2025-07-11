"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  X,
  Play,
  Star,
  Shield,
  Smartphone,
  Clock,
  CheckCircle,
  Brain,
  MessageSquare,
  Frown,
  Puzzle,
  Users,
  AlertTriangle,
  Heart,
  Zap,
  Award,
  SquareCheckBig,
} from "lucide-react"
import { BsWhatsapp } from "react-icons/bs"
import Image from "next/image"
import { trackEvent } from "@/lib/trackEvent"
import { facebookPixelEvents, useScrollTracking } from "@/lib/facebookPixel"
import { trackTimeOnPage, setupConversionTracking } from "@/lib/conversionTracking"

const testimonials = [
  {
    name: "Camila Santos",
    child: "Mãe do Enzo (4 anos)",
    location: "São Paulo, SP",
    content:
      "Em 3 dias sem tela, meu filho estava mais calmo e criativo. Hoje, o tablet nem é lembrado! Essas atividades salvaram nossa rotina.",
    rating: 5,
    verified: true,
  },
  {
    name: "Juliana Costa",
    child: "Mãe da Alice (6 anos)",
    location: "Rio de Janeiro, RJ",
    content:
      "Pensava que seria impossível tirar minha filha do celular. Com essas atividades, ela mesma pede para brincar! Recomendo muito.",
    rating: 5,
    verified: true,
  },
  {
    name: "Mariana Oliveira",
    child: "Mãe do Lucas (5 anos)",
    location: "Belo Horizonte, MG",
    content:
      "As atividades são tão divertidas que meu filho esqueceu que existia YouTube. Agora brincamos juntos todos os dias!",
    rating: 5,
    verified: true,
  },
]

const problems = [
  {
    icon: Brain,
    title: "Déficit de Atenção",
    description: "Dificuldade para focar em atividades",
  },
  {
    icon: MessageSquare,
    title: "Atrasos na Fala",
    description: "Menos conversas, mais isolamento",
  },
  {
    icon: Frown,
    title: "Ansiedade e Irritação",
    description: "Birras o tempo todo",
  },
  {
    icon: Puzzle,
    title: "Prejuízo na Memória",
    description: "Dificuldade para aprender e lembrar",
  },
  {
    icon: Users,
    title: "Isolamento Social",
    description: "Prefere a tela do que brincar com amigos",
  },
  {
    icon: AlertTriangle,
    title: "Desenvolvimento Comprometido",
    description: "Impactos na formação do cérebro",
  },
]

const benefits = [
  {
    icon: SquareCheckBig,
    title: "Seu filho mais inteligente",
    description: "Desenvolva raciocínio-lógico e memória",
  },
  {
    icon: SquareCheckBig,
    title: "Seu filho mais criativo",
    description: "Imaginação e inovação",
  },

  {
    icon: SquareCheckBig,
    title: "Seu filho mais comunicativo",
    description: "Você finalmente poderá conversar com ele",
  },
  {
    icon: SquareCheckBig,
    title: "Seu filho mais focado",
    description: "Desenvolva a concentração e disciplina",
  },
  {
    icon: SquareCheckBig,
    title: "Método Comprovado",
    description: "+ de 15mil crianças transformadas",
  },
]

// Declare o tipo da função enableAudio no objeto window
declare global {
  interface Window {
    enableAudio: () => void;
  }
}

export default function LandingPage() {
  const [showAudioPrompt, setShowAudioPrompt] = useState(true)
  const videoRef = useRef(null)

  useEffect(() => {
    // Inicializar tracking de scroll do Facebook Pixel
    const cleanup = useScrollTracking();

    // Inicializar tracking de tempo na página
    const timeTrackingCleanup = trackTimeOnPage();

    // Configurar tracking de conversão
    setupConversionTracking();

    const script = document.createElement("script")
    script.src = "https://player.vimeo.com/api/player.js"
    script.async = true
    document.body.appendChild(script)

    script.onload = () => {
      // @ts-ignore
      const player = new window.Vimeo.Player(videoRef.current)

      // Pausa o vídeo assim que ele carregar
      player.ready().then(() => {
        player.pause()
      })

      // Quando o usuário clicar no botão
      window.enableAudio = () => {
        player.setVolume(1)
        player.play()
        setShowAudioPrompt(false)
        // Rastrear visualização do vídeo no Facebook Pixel
        facebookPixelEvents.videoView()
      }
    }

    return () => {
      document.body.removeChild(script)
      if (cleanup) cleanup()
      if (timeTrackingCleanup) timeTrackingCleanup()
    }
  }, [])

  const scrollToPricing = () => {
    trackEvent('cta_scroll_to_pricing_clicked')
    facebookPixelEvents.ctaClick('scroll_to_pricing')
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-slate-50 py-4">
      {/* Logo */}
      <div className="flex justify-center">
        <Image
          src="/logo.png"
          alt="Seu Filho Sem Tela"
          width={100}
          height={100}
          className="w-auto h-auto"
          style={{ width: "100px", height: "auto" }}
        />
      </div>

      {/* Urgency Banner */}

      {/* Hero Section */}
      <section className="py-6 sm:py-8 md:py-12 lg:py-20 px-3 sm:px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col gap-6 sm:gap-8 lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center lg:justify-center">

            {/* TEXTO - Coluna 2 no desktop, primeiro no mobile */}
            <div className="w-full text-center lg:text-left lg:order-2 flex flex-col lg:justify-center lg:items-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-2 sm:px-0 font-bold">
                <span className="text-highlight">65 Atividades </span>  que vão tirar seu filho da frente das telas
              </h1>
              <p className="text-base font-boldsm:text-lg md:text-xl text-gray-600 mb-4 sm:mb-6 px-2 sm:px-0 mt-2">
                Desenvolva <b className="text-highlight">inteligência, coordenação e criatividade</b> longe das telas
              </p>
            </div>

            {/* VÍDEO - Coluna 1 no desktop, segundo no mobile */}
            <div className="w-full lg:flex lg:flex-col lg:justify-center lg:items-center lg:order-1 order-none">
              <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-xl w-full max-w-xl mx-auto">
                <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
                  <iframe
                    ref={videoRef}
                    src="https://player.vimeo.com/video/1096048165?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;muted=1&amp;loop=1&amp;autopause=1&amp;controls=0"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                    title="Atividades sem telas"
                  />
                </div>

                {/* Audio Prompt Overlay */}
                {showAudioPrompt && (
                  <div className="absolute inset-0 bg-black/0 flex items-center justify-center z-20">
                    <div className="text-center px-4">

                      <Button
                        onClick={() => {
                          trackEvent('video_play_clicked')
                          facebookPixelEvents.videoView()
                          window.enableAudio()
                        }}
                        className="bg-white hover:bg-gray-100 text-gray-900 font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
                      >
                        ▶️ Clique para Assistir o Vídeo
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* BOTÃO - sempre depois do vídeo no mobile, ao lado do texto no desktop */}
            <div className="w-full flex justify-center lg:justify-center lg:items-center lg:order-2">
              <Button
                onClick={scrollToPricing}
                className="bg-highlight mt-6 hover:bg-highlight/80 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-full lg:w-auto min-h-[48px] sm:min-h-[56px]"
              >
                QUERO TIRAR MEU FILHO DAS TELAS
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Amplification */}
      <section className="py-8 sm:py-12 md:py-16 bg-gray-50 problems-section">
        <div className="max-w-6xl mx-auto px-3 sm:px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
              Descubra o que as telas estão fazendo com seu filho
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 px-2">Os impactos são <b className="text-red-500">mais sérios</b> do que você imagina</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {problems.map((problem, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 border-none bg-white/50 backdrop-blur-sm"
              >
                <CardContent className="p-4 text-center flex flex-col items-center gap-3">
                  <div className="bg-highlight/90 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <problem.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base">
                    {problem.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    {problem.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Presentation */}
      <section className="py-6 sm:py-12 md:py-16 benefits-section">
        <div className="max-w-6xl mx-auto px-3 sm:px-4">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Product Showcase */}
            <div className="text-center w-full">
              <div className="relative inline-block">
                <Image
                  src="/capa.jpg"
                  alt="E-book Seu Filho Sem Tela"
                  width={400}
                  height={500}
                  className="mx-auto shadow-2xl rounded-lg transform rotate-1 hover:rotate-0 transition-transform duration-300 w-full max-w-xs sm:max-w-sm"
                />
              </div>
            </div>

            {/* Benefits */}
            <div className="w-full">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-8 sm:mb-10 text-center lg:text-left px-2 lg:px-0">
                O que seu filho vai conquistar <br /> com o método
              </h2>

              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 px-6 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-300"
                  >
                    <benefit.icon className="h-6 w-6 text-green-700 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-gray-900">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-6 sm:py-12 md:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-3 sm:px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
              Transforme seu filho hoje mesmo
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 px-2">Um pequeno investimento para um <br /><b className="text-highlight">futuro brilhante</b></p>
          </div>

          <Card className="max-w-sm sm:max-w-md lg:max-w-lg mx-auto shadow-2xl border-2 border-highlight">
            <CardContent className="p-4 sm:p-6 lg:p-8 text-center">
              <div className="mb-4 sm:mb-6">
                <p className="text-gray-500 line-through text-lg sm:text-xl mb-1 sm:mb-2">R$97,00</p>
                <p className="text-3xl sm:text-4xl md:text-5xl font-black text-emerald-600 mb-1 sm:mb-2">R$24,99</p>
                <p className="text-gray-600 text-sm sm:text-base">no PIX </p>
              </div>

              <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                <div className="flex items-center justify-center gap-2 text-gray-700">
                  <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600 flex-shrink-0" />
                  <span className="text-sm sm:text-base">7 dias de garantia total</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-700">
                  <Smartphone className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600 flex-shrink-0" />
                  <span className="text-sm sm:text-base">Entrega imediata</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-700">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600 flex-shrink-0" />
                  <span className="text-sm sm:text-base">Acesso vitalício</span>
                </div>
              </div>

              <Button
                onClick={() => {
                  trackEvent('purchase_button_clicked')
                  facebookPixelEvents.initiateCheckout()
                  window.open('https://pay.kiwify.com.br/qynM2UU', '_blank')
                }}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 sm:py-4 text-base sm:text-lg font-bold rounded-lg  hover:animate-none transition-all duration-300 min-h-[48px] sm:min-h-[56px]"
              >
                COMPRAR AGORA
              </Button>

              <p className="text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4">
                Pagamento 100% seguro • Processado pela Woovi
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-8 sm:py-12 md:py-16 testimonials-section">
        <div className="max-w-6xl mx-auto px-3 sm:px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
              Mães que já  transformaram seus filhos
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 px-2">
              Veja os resultados de quem já aplicou o método
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-4 sm:p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="flex items-center gap-1 mb-3 flex-wrap">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 sm:h-4 sm:w-4 fill-amber-400 text-amber-400" />
                    ))}
                    {testimonial.verified && (
                      <Badge variant="secondary" className="ml-2 text-xs">
                        Verificado
                      </Badge>
                    )}
                  </div>

                  <p className="text-gray-700 mb-4 italic text-sm sm:text-base leading-relaxed">
                    "{testimonial.content}"
                  </p>

                  <div>
                    <p className="font-bold text-gray-900 text-sm sm:text-base">{testimonial.name}</p>
                    <p className="text-xs sm:text-sm text-gray-600">{testimonial.child}</p>
                    <p className="text-xs sm:text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-8 sm:py-12 md:py-16  pb-16 bg-highlight text-white">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 px-2">Não Deixe Mais Um Dia Passar</h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 px-2">
            Cada dia que passa, seu filho perde momentos preciosos de desenvolvimento real
          </p>

          <Button
            onClick={() => {
              trackEvent('final_cta_clicked')
              facebookPixelEvents.ctaClick('final_cta')
              window.open('https://pay.kiwify.com.br/qynM2UU', '_blank')
            }}
            className="bg-white text-highlight hover:bg-gray-100 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto min-h-[48px] sm:min-h-[56px]"
          >
            GARANTIR MINHA CÓPIA AGORA
          </Button>
        </div>
      </section>

      {/* WhatsApp Float Button */}
      <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50">
        <Button
          className="bg-[#25D366] hover:bg-[#20BA56] text-white p-3 sm:p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce min-w-[48px] min-h-[48px] sm:min-w-[56px] sm:min-h-[56px]"
          onClick={() => {
            trackEvent('whatsapp_floating_clicked')
            facebookPixelEvents.whatsappClick()
            window.open('https://wa.me/556191588938?text=Ol%C3%A1%2C%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20o%20Atividades%20Sem%20tela', '_blank')
          }}
        >
          <BsWhatsapp className="h-5 w-5 sm:h-6 sm:w-6" />
        </Button>
      </div>


    </div>
  )
}
