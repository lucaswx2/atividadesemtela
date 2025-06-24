import type { Metadata } from 'next'
import './globals.css'

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
      <head />
      <body>{children}</body>
    </html>
  )
}
