# Configuração do Facebook Pixel - Seu Filho Sem Tela

## 📊 Visão Geral

Este projeto está configurado com tracking avançado do Facebook Pixel (ID: `2141620776359131`) para rastrear conversões e otimizar campanhas publicitárias.

## 🚀 Eventos Implementados

### Eventos Padrão do Facebook
- **PageView**: Visualização da página
- **ViewContent**: Visualização do produto (e-book)
- **InitiateCheckout**: Início do processo de compra
- **Purchase**: Compra realizada
- **Lead**: Geração de lead
- **Contact**: Contato via WhatsApp

### Eventos Personalizados
- **Video_View**: Visualização do vídeo promocional
- **CTA_Click**: Cliques em botões de call-to-action
- **WhatsApp_Click**: Cliques no botão do WhatsApp
- **Scroll_To_Pricing**: Scroll até a seção de preços
- **View_Testimonials**: Visualização dos depoimentos
- **View_Problems**: Visualização dos problemas das telas
- **View_Benefits**: Visualização dos benefícios

## 📁 Estrutura dos Arquivos

```
lib/
├── facebookPixel.ts          # Configuração principal do pixel
├── conversionTracking.ts     # Tracking de conversões
└── advancedPixelTracking.ts  # Configurações avançadas
```

## 🔧 Como Usar

### 1. Tracking Básico

```typescript
import { facebookPixelEvents } from '@/lib/facebookPixel';

// Rastrear clique em CTA
facebookPixelEvents.ctaClick('scroll_to_pricing');

// Rastrear visualização de vídeo
facebookPixelEvents.videoView();

// Rastrear início de checkout
facebookPixelEvents.initiateCheckout();
```

### 2. Tracking de Conversão

```typescript
import { trackPurchaseConversion } from '@/lib/conversionTracking';

// Rastrear compra realizada
trackPurchaseConversion('order_123', 24.99);
```

### 3. Tracking Avançado

```typescript
import { trackDynamicEvent } from '@/lib/advancedPixelTracking';

// Rastrear evento com valor dinâmico baseado no comportamento
trackDynamicEvent('productView', ['viewed_video', 'clicked_cta']);
```

## 📈 Eventos de Scroll Automático

O sistema rastreia automaticamente quando o usuário visualiza seções específicas:

- **Seção de Problemas**: `problems-section`
- **Seção de Benefícios**: `benefits-section`
- **Seção de Depoimentos**: `testimonials-section`
- **Seção de Preços**: `pricing` (ID)

## 🎯 Segmentação de Leads

O sistema classifica automaticamente os leads baseado no comportamento:

### Lead Quente (R$ 50,00)
- Visualizou seção de preços
- Clicou em CTA
- Visualizou vídeo

### Lead Morno (R$ 30,00)
- Visualizou benefícios
- Visualizou depoimentos

### Lead Frio (R$ 15,00)
- Visualizou apenas problemas

## 🔄 Retargeting

O sistema configura automaticamente eventos para retargeting:

- Usuários que visualizaram produto mas não compraram
- Usuários que clicaram em CTA mas não compraram
- Usuários que retornam à página

## 📱 Eventos Mobile

Todos os eventos são otimizados para dispositivos móveis e incluem:

- Tracking de tempo na página
- Tracking de engajamento
- Eventos de saída da página

## 🛠️ Configuração no Facebook Ads

### 1. Configurar Eventos Personalizados

No Facebook Events Manager, configure os seguintes eventos personalizados:

```
Video_View
CTA_Click
WhatsApp_Click
Scroll_To_Pricing
View_Testimonials
View_Problems
View_Benefits
```

### 2. Configurar Conversões

Configure as seguintes conversões:

- **Compra**: Evento `Purchase`
- **Lead**: Evento `Lead`
- **Início de Checkout**: Evento `InitiateCheckout`

### 3. Configurar Audiences

Crie audiences baseadas nos eventos personalizados:

- **Audience de Engajamento**: Usuários que visualizaram vídeo
- **Audience de Interesse**: Usuários que clicaram em CTA
- **Audience de Retargeting**: Usuários que não completaram compra

## 🔍 Debugging

### Verificar se o Pixel está Carregado

```javascript
// No console do navegador
console.log(window.fbq);
```

### Verificar Eventos

```javascript
// No console do navegador
fbq('track', 'PageView');
```

### Facebook Pixel Helper

Instale a extensão "Facebook Pixel Helper" no Chrome para debug em tempo real.

## 📊 Métricas Importantes

### Conversões Primárias
- Taxa de conversão de compra
- Custo por aquisição (CPA)
- Retorno sobre investimento (ROI)

### Métricas de Engajamento
- Tempo na página
- Taxa de visualização de vídeo
- Taxa de clique em CTA
- Scroll depth

### Métricas de Qualidade
- Taxa de rejeição
- Tempo até primeira conversão
- Frequência de visitas

## 🚨 Troubleshooting

### Pixel não carrega
1. Verificar se o script está no `<head>`
2. Verificar se não há bloqueadores de anúncios
3. Verificar console para erros JavaScript

### Eventos não aparecem
1. Verificar se o pixel está inicializado
2. Verificar se os eventos estão sendo disparados
3. Aguardar até 24h para aparecer no Facebook

### Conversões não rastreiam
1. Verificar se o evento `Purchase` está configurado
2. Verificar se o valor está sendo passado corretamente
3. Verificar se há duplicatas

## 📞 Suporte

Para dúvidas sobre a configuração do Facebook Pixel, consulte:

- [Documentação oficial do Facebook Pixel](https://developers.facebook.com/docs/facebook-pixel/)
- [Facebook Events Manager](https://business.facebook.com/events_manager2)
- [Facebook Pixel Helper](https://chrome.google.com/webstore/detail/facebook-pixel-helper/fdgfkebogiimcoedmjlcbhdnplpnnmne)

---

**Nota**: Este sistema está configurado para o pixel ID `2141620776359131`. Certifique-se de que este ID está correto no seu Facebook Ads Manager. 