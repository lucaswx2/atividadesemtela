import type { Metadata } from 'next'
import './globals.css'
import Head from 'next/head'
import { PostHogProvider } from '../components/PostHogProvider'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Seu Filho Sem Tela – 65 Atividades para Crianças Longe das Telas',
  description: 'Descubra como transformar o desenvolvimento do seu filho com 65 atividades criativas, longe das telas. Mais inteligência, criatividade e conexão familiar!',
  generator: 'v0.dev',
  keywords: [
    'atividades para crianças',
    'sem tela',
    'desenvolvimento infantil',
    'ebook',
    'pais',
    'criatividade',
    'educação',
    'rotina saudável',
    'família',
    'Seu Filho Sem Tela'
  ],
  openGraph: {
    title: 'Seu Filho Sem Tela – 65 Atividades para Crianças Longe das Telas',
    description: 'Descubra como transformar o desenvolvimento do seu filho com 65 atividades criativas, longe das telas.',
    url: 'https://seufilhosemtela.com',
    siteName: 'Seu Filho Sem Tela',
    images: [
      {
        url: '/capa.jpg',
        width: 800,
        height: 600,
        alt: 'Capa do E-book Seu Filho Sem Tela',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'manifest', url: '/site.webmanifest' },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="facebook-domain-verification" content="8zjg59dmkivud4pwjmyp062fy38p7r" />
        {/* Facebook Pixel Code */}
        <Script id="fb-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '2141620776359131');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=2141620776359131&ev=PageView&noscript=1"
          />
        </noscript>
        {/* End Facebook Pixel Code */}
      </head>
      <body>
        <PostHogProvider>
          {children}
        </PostHogProvider>
      </body>
    </html>
  )
}