import { DefaultSeoProps } from 'next-seo';

const SEO: DefaultSeoProps = {
  title: 'Ceramics Studio | Ručno rađena luksuzna keramika',
  description:
    'Kupite unikatne, ručno izrađene keramičke proizvode iz Hrvatske. Elegantno. Prirodno. Trajno.',
canonical: 'https://www.ceramics-studio.com',
  openGraph: {
    type: 'website',
    locale: 'hr_HR',
url: 'https://www.ceramics-studio.com',
    site_name: 'Ceramics Studio',
    images: [
      {
url: 'https://www.ceramics-studio.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Luksuzna keramička vaza',
      },
    ],
  },
  twitter: {
    handle: '@ceramics_hr',
    site: '@ceramics_hr',
    cardType: 'summary_large_image',
  },
};

export default SEO;