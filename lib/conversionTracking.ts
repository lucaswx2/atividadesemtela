import { facebookPixelEvents } from './facebookPixel';

// Função para rastrear conversão de compra
export const trackPurchaseConversion = (transactionId?: string, value?: number) => {
    // Rastrear no Facebook Pixel
    facebookPixelEvents.purchase(transactionId);

    // Aqui você pode adicionar outros pixels de conversão se necessário
    // Por exemplo: Google Ads, TikTok, etc.

    console.log('Purchase conversion tracked:', { transactionId, value });
};

// Função para rastrear lead
export const trackLeadConversion = () => {
    // Rastrear no Facebook Pixel
    facebookPixelEvents.lead();

    console.log('Lead conversion tracked');
};

// Função para rastrear visualização de conteúdo
export const trackContentView = (contentName: string, contentCategory?: string) => {
    // Rastrear no Facebook Pixel
    facebookPixelEvents.viewContent(contentName, contentCategory);

    console.log('Content view tracked:', { contentName, contentCategory });
};

// Função para verificar se o usuário veio de uma campanha específica
export const getCampaignData = () => {
    if (typeof window === 'undefined') return null;

    const urlParams = new URLSearchParams(window.location.search);

    return {
        utm_source: urlParams.get('utm_source'),
        utm_medium: urlParams.get('utm_medium'),
        utm_campaign: urlParams.get('utm_campaign'),
        utm_term: urlParams.get('utm_term'),
        utm_content: urlParams.get('utm_content'),
        fbclid: urlParams.get('fbclid'),
        gclid: urlParams.get('gclid'),
    };
};

// Função para rastrear eventos com dados de campanha
export const trackEventWithCampaign = (eventName: string, parameters?: Record<string, any>) => {
    const campaignData = getCampaignData();

    const enhancedParameters = {
        ...parameters,
        ...campaignData,
    };

    // Rastrear no Facebook Pixel
    if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', eventName, enhancedParameters);
    }

    console.log('Event tracked with campaign data:', { eventName, enhancedParameters });
};

// Função para configurar eventos de conversão dinâmicos
export const setupConversionTracking = () => {
    // Rastrear quando o usuário chega na página de agradecimento
    if (typeof window !== 'undefined') {
        const currentPath = window.location.pathname;

        // Se estiver na página de agradecimento (após pagamento)
        if (currentPath.includes('obrigado') || currentPath.includes('thank-you')) {
            const urlParams = new URLSearchParams(window.location.search);
            const transactionId = urlParams.get('transaction_id');
            const value = urlParams.get('value');

            if (transactionId) {
                trackPurchaseConversion(transactionId, value ? parseFloat(value) : undefined);
            }
        }
    }
};

// Função para rastrear tempo de permanência na página
export const trackTimeOnPage = () => {
    if (typeof window === 'undefined') return;

    let startTime = Date.now();

    // Rastrear quando o usuário sai da página
    const handleBeforeUnload = () => {
        const timeSpent = Math.round((Date.now() - startTime) / 1000); // em segundos

        if (timeSpent > 30) { // Só rastrear se ficou mais de 30 segundos
            facebookPixelEvents.ctaClick('time_on_page');
        }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Rastrear a cada 5 minutos
    const interval = setInterval(() => {
        const timeSpent = Math.round((Date.now() - startTime) / 1000);
        if (timeSpent >= 300) { // 5 minutos
            facebookPixelEvents.ctaClick('extended_time_on_page');
        }
    }, 60000); // verificar a cada minuto

    return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
        clearInterval(interval);
    };
}; 