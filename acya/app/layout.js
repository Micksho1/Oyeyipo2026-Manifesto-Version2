import { Playfair_Display, Lora, DM_Sans } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
  style: ['normal', 'italic'],
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata = {
  title: 'Oyeyipo Oluwaseun — ACYA National President 2026',
  description:
    'Empowered for Independence. A bold, detailed manifesto for the future of ACYA — Unity, Spiritual Depth, Youth Empowerment, and Transparent Leadership.',
  openGraph: {
    title: 'Oyeyipo Oluwaseun for ACYA National President',
    description: 'Empowered for Independence — ACYA Abuja 2026',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${lora.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
