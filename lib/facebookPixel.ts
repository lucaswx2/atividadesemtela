// Declaração global para o Facebook Pixel
declare global {
  interface Window {
    fbq: any;
  }
}

// Tipos para os eventos do Facebook Pixel
export interface FacebookPixelEvent {
  eventName: string;
  parameters?: Record<string, any>;
}

// Função para rastrear eventos do Facebook Pixel
export const trackFacebookPixel = (
  eventName: string,
  parameters?: Record<string, any>
) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", eventName, parameters);
  }
};

// Eventos específicos para a landing page
export const facebookPixelEvents = {
  // Evento de visualização da página
  pageView: () => {
    trackFacebookPixel("PageView");
  },

  // Evento de visualização do conteúdo
  viewContent: (contentName: string, contentCategory?: string) => {
    trackFacebookPixel("ViewContent", {
      content_name: contentName,
      content_category: contentCategory || "E-book",
      content_type: "product",
      value: 24.99,
      currency: "BRL",
    });
  },

  // Evento de início do checkout
  initiateCheckout: () => {
    trackFacebookPixel("InitiateCheckout", {
      content_name: "Seu Filho Sem Tela - E-book",
      content_category: "E-book",
      value: 24.99,
      currency: "BRL",
    });
  },

  // Evento de adição ao carrinho
  addToCart: () => {
    trackFacebookPixel("AddToCart", {
      content_name: "Seu Filho Sem Tela - E-book",
      content_category: "E-book",
      value: 24.99,
      currency: "BRL",
    });
  },

  // Evento de compra
  purchase: (transactionId?: string) => {
    trackFacebookPixel("Purchase", {
      content_name: "Seu Filho Sem Tela - E-book",
      content_category: "E-book",
      value: 24.99,
      currency: "BRL",
      transaction_id: transactionId || `order_${Date.now()}`,
      num_items: 1,
    });
  },

  // Evento de lead
  lead: () => {
    trackFacebookPixel("Lead", {
      content_name: "Seu Filho Sem Tela - E-book",
      content_category: "E-book",
      value: 24.99,
      currency: "BRL",
    });
  },

  // Evento de clique no CTA
  ctaClick: (ctaName: string) => {
    trackFacebookPixel("CustomEvent", {
      event_name: "CTA_Click",
      cta_name: ctaName,
      content_name: "Seu Filho Sem Tela - E-book",
      content_category: "E-book",
    });
  },

  // Evento de visualização do vídeo
  videoView: () => {
    trackFacebookPixel("CustomEvent", {
      event_name: "Video_View",
      content_name: "Seu Filho Sem Tela - Vídeo Promocional",
      content_category: "Vídeo",
    });
  },

  // Evento de clique no WhatsApp
  whatsappClick: () => {
    trackFacebookPixel("CustomEvent", {
      event_name: "WhatsApp_Click",
      content_name: "Seu Filho Sem Tela - Suporte",
      content_category: "Suporte",
    });
  },

  // Evento de scroll para formulário
  scrollToForm: () => {
    trackFacebookPixel("CustomEvent", {
      event_name: "Scroll_To_Form",
      content_name: "Seu Filho Sem Tela - Formulário de Lead",
      content_category: "Lead Generation",
    });
  },

  // Evento de scroll para pricing
  scrollToPricing: () => {
    trackFacebookPixel("CustomEvent", {
      event_name: "Scroll_To_Pricing",
      content_name: "Seu Filho Sem Tela - Seção de Preços",
      content_category: "Pricing",
    });
  },

  // Evento de visualização dos depoimentos
  viewTestimonials: () => {
    trackFacebookPixel("CustomEvent", {
      event_name: "View_Testimonials",
      content_name: "Seu Filho Sem Tela - Depoimentos",
      content_category: "Social Proof",
    });
  },

  // Evento de visualização dos problemas
  viewProblems: () => {
    trackFacebookPixel("CustomEvent", {
      event_name: "View_Problems",
      content_name: "Seu Filho Sem Tela - Problemas das Telas",
      content_category: "Educacional",
    });
  },

  // Evento de visualização dos benefícios
  viewBenefits: () => {
    trackFacebookPixel("CustomEvent", {
      event_name: "View_Benefits",
      content_name: "Seu Filho Sem Tela - Benefícios",
      content_category: "Educacional",
    });
  },
};

// Hook para rastrear eventos de scroll
export const useScrollTracking = () => {
  if (typeof window !== "undefined") {
    // Rastrear quando o usuário chega na seção de pricing
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.id === "pricing") {
              facebookPixelEvents.scrollToPricing();
            } else if (entry.target.id === "lead-form") {
              facebookPixelEvents.scrollToForm();
            } else if (
              entry.target.classList.contains("testimonials-section")
            ) {
              facebookPixelEvents.viewTestimonials();
            } else if (entry.target.classList.contains("problems-section")) {
              facebookPixelEvents.viewProblems();
            } else if (entry.target.classList.contains("benefits-section")) {
              facebookPixelEvents.viewBenefits();
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    // Observar elementos específicos
    const pricingSection = document.getElementById("pricing");
    const formSection = document.getElementById("lead-form");
    const testimonialsSection = document.querySelector(".testimonials-section");
    const problemsSection = document.querySelector(".problems-section");
    const benefitsSection = document.querySelector(".benefits-section");

    if (pricingSection) observer.observe(pricingSection);
    if (formSection) observer.observe(formSection);
    if (testimonialsSection) observer.observe(testimonialsSection);
    if (problemsSection) observer.observe(problemsSection);
    if (benefitsSection) observer.observe(benefitsSection);

    return () => observer.disconnect();
  }
};
