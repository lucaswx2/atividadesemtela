"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Clock, MessageSquare, Heart } from "lucide-react";
import { BsWhatsapp } from "react-icons/bs";
import Image from "next/image";
import { trackEvent } from "@/lib/trackEvent";
import { facebookPixelEvents } from "@/lib/facebookPixel";

export default function ObrigadoPage() {
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

      {/* Conteúdo Principal */}
      <section className="py-6 sm:py-8 md:py-12 lg:py-20 px-3 sm:px-4">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="shadow-2xl border-2 border-highlight">
            <CardContent className="p-8">
              {/* Ícone de Sucesso */}
              <div className="flex justify-center mb-6">
                <div className="bg-green-100 p-4 rounded-full">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
              </div>

              {/* Título */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Obrigado pelo seu interesse!
              </h1>

              {/* Mensagem */}
              <p className="text-lg sm:text-xl text-gray-600 mb-6">
                Recebemos seus dados com sucesso. Nossa equipe especializada
                entrará em contato em breve para te ajudar a transformar a vida
                do seu filho.
              </p>

              {/* Informações Adicionais */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-center gap-3 text-gray-700">
                  <Clock className="h-5 w-5 text-emerald-600" />
                  <span className="text-sm sm:text-base">
                    Contato em até 24 horas
                  </span>
                </div>
                <div className="flex items-center justify-center gap-3 text-gray-700">
                  <MessageSquare className="h-5 w-5 text-emerald-600" />
                  <span className="text-sm sm:text-base">
                    Via WhatsApp ou telefone
                  </span>
                </div>
                <div className="flex items-center justify-center gap-3 text-gray-700">
                  <Heart className="h-5 w-5 text-emerald-600" />
                  <span className="text-sm sm:text-base">
                    Atendimento personalizado
                  </span>
                </div>
              </div>

              {/* Botão de Voltar */}
              <Button
                onClick={() => {
                  trackEvent("voltar_home_clicked");
                  window.location.href = "/";
                }}
                className="bg-highlight hover:bg-highlight/80 text-white px-6 py-3 text-base font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Voltar para a Página Principal
              </Button>
            </CardContent>
          </Card>

          {/* Informações Extras */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 mb-4">
              Enquanto isso, que tal conhecer mais sobre nosso método?
            </p>
            <Button
              variant="outline"
              onClick={() => {
                trackEvent("conhecer_metodo_clicked");
                window.location.href = "/";
              }}
              className="border-highlight text-highlight hover:bg-highlight hover:text-white"
            >
              Conhecer o Método Completo
            </Button>
          </div>
        </div>
      </section>

      {/* WhatsApp Float Button */}
      <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50">
        <Button
          className="bg-[#25D366] hover:bg-[#20BA56] text-white p-3 sm:p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce min-w-[48px] min-h-[48px] sm:min-w-[56px] sm:min-h-[56px]"
          onClick={() => {
            trackEvent("whatsapp_floating_clicked");
            facebookPixelEvents.whatsappClick();
            window.open(
              "https://wa.me/556191588938?text=Ol%C3%A1%2C%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20o%20Atividades%20Sem%20tela",
              "_blank"
            );
          }}
        >
          <BsWhatsapp className="h-5 w-5 sm:h-6 sm:w-6" />
        </Button>
      </div>
    </div>
  );
}
