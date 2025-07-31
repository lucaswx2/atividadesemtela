# Documentação do Projeto - Seu Filho Sem Tela

## 📋 Visão Geral do Projeto

### Propósito

Landing page de conversão para venda de e-book "Seu Filho Sem Tela" - 65 atividades para crianças longe das telas. O projeto é uma página única (SPA) focada em alta conversão através de storytelling, social proof e urgência.

### Escopo

- **Página única** com múltiplas seções de conversão
- **Tracking avançado** com PostHog e Facebook Pixel
- **Design responsivo** otimizado para mobile-first
- **Performance otimizada** para carregamento rápido
- **SEO básico** com metadados estruturados

### Tecnologias Principais

- **Next.js 15** com App Router
- **React 19** com TypeScript
- **Tailwind CSS** com shadcn/ui
- **PostHog** para analytics
- **Facebook Pixel** para tracking de conversões
- **Vimeo** para vídeo promocional

---

## 🎯 Regras de Negócio

### 1. Funnel de Conversão

```
Visitante → Visualização do Vídeo → Scroll para Preços → Clique em CTA → Compra
```

### 2. Segmentação de Leads

- **Lead Quente (R$ 50,00)**: Visualizou preços + clicou CTA + viu vídeo
- **Lead Morno (R$ 30,00)**: Visualizou benefícios + depoimentos
- **Lead Frio (R$ 15,00)**: Visualizou apenas problemas

### 3. Eventos de Tracking Obrigatórios

- `PageView` - Visualização da página
- `Video_View` - Visualização do vídeo promocional
- `CTA_Click` - Cliques em botões de ação
- `InitiateCheckout` - Início do processo de compra
- `Purchase` - Compra realizada (R$ 24,99)
- `WhatsApp_Click` - Contato via WhatsApp

### 4. Regras de Negócio Específicas

- **Preço**: R$ 24,99 (desconto de R$ 97,00)
- **Forma de Pagamento**: PIX
- **Garantia**: 7 dias
- **Entrega**: Imediata (digital)
- **Acesso**: Vitalício

### 5. Comportamento do Vídeo

- **Inicial**: Mudo e pausado
- **Interação**: Usuário deve clicar para ativar áudio
- **Tracking**: Evento disparado apenas após clique

---

## 🎯 Critérios de Qualidade

### 1. Performance (Prioridade Alta)

- **Lighthouse Score**: Mínimo 90 em todas as métricas
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

### 2. Conversão (Prioridade Alta)

- **Taxa de Conversão**: Meta de 2-5%
- **Tempo até Conversão**: < 3 minutos
- **Bounce Rate**: < 40%
- **Engajamento**: > 60% visualizam vídeo

### 3. Manutenibilidade (Prioridade Média)

- **Código Limpo**: Sem duplicações ou complexidade desnecessária
- **Componentes Reutilizáveis**: Máximo 3 níveis de aninhamento
- **TypeScript**: 100% tipado (sem `any` desnecessário)
- **Documentação**: Comentários apenas onde necessário

### 4. Segurança (Prioridade Média)

- **HTTPS**: Obrigatório em produção
- **CSP**: Headers de segurança configurados
- **Dados Sensíveis**: Nunca expostos no cliente
- **Tracking**: Respeitar LGPD/GDPR

### 5. Acessibilidade (Prioridade Baixa)

- **Alt Text**: Em todas as imagens
- **Contraste**: Mínimo 4.5:1
- **Navegação por Teclado**: Funcional
- **Screen Readers**: Compatível

---

## 🚫 Limites Técnicos e Princípios

### 1. Evitar Overengineering

- **NÃO** adicionar funcionalidades não solicitadas
- **NÃO** criar abstrações desnecessárias
- **NÃO** usar bibliotecas pesadas para problemas simples
- **NÃO** implementar features "nice to have" sem demanda

### 2. Simplicidade Arquitetural

- **Estrutura Plana**: Máximo 3 níveis de diretórios
- **Componentes Únicos**: Um arquivo = uma responsabilidade
- **Estado Local**: Preferir useState sobre context desnecessário
- **Props Drilling**: Aceitável até 2 níveis

### 3. Performance First

- **Bundle Size**: < 500KB (gzipped)
- **Dependencies**: Máximo 50 pacotes
- **Images**: Otimizadas e lazy-loaded
- **Fonts**: System fonts preferidas

### 4. Tracking Minimalista

- **Eventos Essenciais**: Apenas os necessários para conversão
- **Sem Over-tracking**: Não rastrear comportamento desnecessário
- **Privacy First**: Respeitar preferências do usuário
- **Performance**: Tracking não deve impactar UX

### 5. Código Pragmático

- **DRY**: Aplicar apenas quando há duplicação real
- **KISS**: Manter soluções simples
- **YAGNI**: Não implementar features futuras
- **Fail Fast**: Detectar problemas rapidamente

---

## 📊 Métricas de Sucesso

### Conversão

- Taxa de conversão > 2%
- Tempo médio até conversão < 3min
- Abandono no checkout < 30%

### Performance

- Lighthouse Score > 90
- Core Web Vitals verdes
- Carregamento < 2s

### Qualidade Técnica

- Zero erros de TypeScript
- Zero warnings de ESLint
- Coverage de testes > 80% (se implementado)

---

## 🔧 Configuração de Ambiente

### Variáveis de Ambiente Obrigatórias

```env
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

### Scripts Disponíveis

```bash
npm run dev      # Desenvolvimento
npm run build    # Build de produção
npm run start    # Servidor de produção
npm run lint     # Verificação de código
```

---

## 📝 Notas de Desenvolvimento

### Padrões de Código

- **Imports**: Ordenados (React, externos, internos, tipos)
- **Naming**: camelCase para variáveis, PascalCase para componentes
- **Spacing**: 2 espaços, sem trailing spaces
- **Quotes**: Aspas duplas para strings

### Estrutura de Commits

```
feat: adicionar nova funcionalidade
fix: corrigir bug
refactor: refatorar código
docs: atualizar documentação
style: ajustar formatação
```

### Prioridades de Desenvolvimento

1. **Funcionalidade**: Garantir que tudo funciona
2. **Performance**: Otimizar carregamento
3. **Conversão**: Maximizar taxa de conversão
4. **Manutenibilidade**: Código limpo e documentado
5. **Acessibilidade**: Inclusão e usabilidade

---

**Última atualização**: Janeiro 2025
**Versão**: 1.0.0
**Responsável**: Equipe de Desenvolvimento
