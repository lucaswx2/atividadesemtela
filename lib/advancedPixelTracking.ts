// Configurações avançadas do Facebook Pixel
export const ADVANCED_PIXEL_CONFIG = {
    // Configurações de eventos personalizados
    customEvents: {
        // Eventos de engajamento
        pageView: {
            eventName: 'PageView',
            parameters: {
                content_name: 'Seu Filho Sem Tela - Landing Page',
                content_category: 'Landing Page',
                content_type: 'website'
            }
        },

        // Eventos de produto
        productView: {
            eventName: 'ViewContent',
            parameters: {
                content_name: 'Seu Filho Sem Tela - E-book',
                content_category: 'E-book',
                content_type: 'product',
                value: 24.99,
                currency: 'BRL',
                content_ids: ['ebook-seu-filho-sem-tela']
            }
        },

        // Eventos de conversão
        addToCart: {
            eventName: 'AddToCart',
            parameters: {
                content_name: 'Seu Filho Sem Tela - E-book',
                content_category: 'E-book',
                value: 24.99,
                currency: 'BRL',
                content_ids: ['ebook-seu-filho-sem-tela'],
                num_items: 1
            }
        },

        initiateCheckout: {
            eventName: 'InitiateCheckout',
            parameters: {
                content_name: 'Seu Filho Sem Tela - E-book',
                content_category: 'E-book',
                value: 24.99,
                currency: 'BRL',
                content_ids: ['ebook-seu-filho-sem-tela'],
                num_items: 1
            }
        },

        purchase: {
            eventName: 'Purchase',
            parameters: {
                content_name: 'Seu Filho Sem Tela - E-book',
                content_category: 'E-book',
                value: 24.99,
                currency: 'BRL',
                content_ids: ['ebook-seu-filho-sem-tela'],
                num_items: 1
            }
        },

        // Eventos de lead
        lead: {
            eventName: 'Lead',
            parameters: {
                content_name: 'Seu Filho Sem Tela - E-book',
                content_category: 'E-book',
                value: 24.99,
                currency: 'BRL'
            }
        },

        // Eventos de contato
        contact: {
            eventName: 'Contact',
            parameters: {
                content_name: 'Seu Filho Sem Tela - Suporte',
                content_category: 'Suporte'
            }
        }
    },

    // Configurações de otimização
    optimization: {
        // Tempo mínimo para considerar engajamento (em segundos)
        minEngagementTime: 30,

        // Tempo para considerar visualização completa (em segundos)
        completeViewTime: 300,

        // Porcentagem mínima de scroll para considerar visualização
        minScrollPercentage: 50,

        // Tempo entre eventos para evitar spam
        eventCooldown: 5000
    },

    // Configurações de segmentação
    segmentation: {
        // Segmentos baseados no comportamento
        segments: {
            hotLead: {
                conditions: ['viewed_pricing', 'clicked_cta', 'viewed_video'],
                value: 50.00
            },
            warmLead: {
                conditions: ['viewed_benefits', 'viewed_testimonials'],
                value: 30.00
            },
            coldLead: {
                conditions: ['viewed_problems'],
                value: 15.00
            }
        }
    }
};

// Tipos para os eventos
type EventName = keyof typeof ADVANCED_PIXEL_CONFIG.customEvents;

// Função para determinar o valor dinâmico baseado no comportamento
export const getDynamicValue = (userBehavior: string[]): number => {
    const { segments } = ADVANCED_PIXEL_CONFIG.segmentation;

    // Verificar se é um lead quente
    if (segments.hotLead.conditions.every(condition => userBehavior.includes(condition))) {
        return segments.hotLead.value;
    }

    // Verificar se é um lead morno
    if (segments.warmLead.conditions.some(condition => userBehavior.includes(condition))) {
        return segments.warmLead.value;
    }

    // Lead frio
    return segments.coldLead.value;
};

// Função para rastrear eventos com valor dinâmico
export const trackDynamicEvent = (eventName: EventName, userBehavior: string[] = []) => {
    if (typeof window === 'undefined' || !window.fbq) return;

    const baseConfig = ADVANCED_PIXEL_CONFIG.customEvents[eventName];
    if (!baseConfig) return;

    const dynamicValue = getDynamicValue(userBehavior);

    const enhancedParameters = {
        ...baseConfig.parameters,
        value: dynamicValue,
        user_behavior: userBehavior.join(','),
        timestamp: Date.now()
    };

    window.fbq('track', eventName, enhancedParameters);

    console.log('Dynamic event tracked:', { eventName, enhancedParameters });
};

// Função para rastrear sequência de eventos
export const trackEventSequence = (events: EventName[]) => {
    if (typeof window === 'undefined' || !window.fbq) return;

    events.forEach((event, index) => {
        setTimeout(() => {
            const baseConfig = ADVANCED_PIXEL_CONFIG.customEvents[event];
            if (baseConfig) {
                const enhancedParameters = {
                    ...baseConfig.parameters,
                    sequence_position: index + 1,
                    total_events: events.length,
                    timestamp: Date.now()
                };

                window.fbq('track', event, enhancedParameters);
            }
        }, index * 1000); // 1 segundo entre eventos
    });
};

// Função para configurar eventos de retargeting
export const setupRetargetingEvents = () => {
    if (typeof window === 'undefined') return;

    // Evento para usuários que visualizaram o produto mas não compraram
    const trackProductViewWithoutPurchase = () => {
        const hasViewedProduct = sessionStorage.getItem('viewed_product');
        const hasPurchased = sessionStorage.getItem('purchased');

        if (hasViewedProduct && !hasPurchased) {
            trackDynamicEvent('productView', ['viewed_product_no_purchase']);
        }
    };

    // Evento para usuários que clicaram no CTA mas não compraram
    const trackCTAClickWithoutPurchase = () => {
        const hasClickedCTA = sessionStorage.getItem('clicked_cta');
        const hasPurchased = sessionStorage.getItem('purchased');

        if (hasClickedCTA && !hasPurchased) {
            trackDynamicEvent('initiateCheckout', ['clicked_cta_no_purchase']);
        }
    };

    // Executar verificações quando o usuário sair da página
    window.addEventListener('beforeunload', () => {
        trackProductViewWithoutPurchase();
        trackCTAClickWithoutPurchase();
    });
};

// Função para configurar eventos de re-engajamento
export const setupReEngagementEvents = () => {
    if (typeof window === 'undefined') return;

    // Rastrear quando o usuário retorna à página
    const trackReturnVisit = () => {
        const hasVisitedBefore = sessionStorage.getItem('has_visited');

        if (hasVisitedBefore) {
            trackDynamicEvent('pageView', ['return_visit']);
        } else {
            sessionStorage.setItem('has_visited', 'true');
        }
    };

    // Executar na carga da página
    trackReturnVisit();
}; 