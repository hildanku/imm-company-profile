import {Helmet} from 'react-helmet'

interface SEOProps {
    title?: string
    description?: string
    keywords?: string
    ogImage?: string
    ogUrl?: string
    ogType?: 'website' | 'article'
    twitterCard?: 'summary' | 'summary_large_image'
}

export const SEO = ({
    title = 'Indonesia Mitra Media (IMM) | Digital Marketing & Creative Industry Leader in Indonesia',
    description = 'Indonesia Mitra Media (IMM) adalah perusahaan digital marketing dan creative industry di Indonesia. Berdiri sejak 2016, kini IMM melayani 1.000+ pelanggan per bulan dengan tim 140+ karyawan, menghadirkan strategi inovatif untuk membawa bisnis Anda ke #1.',
    keywords = 'Indonesia Mitra Media, IMM, Digital Marketing Indonesia, Creative Industry, Branding, Social Media Strategy, Kebumen, Asia Market',
    ogImage = '/logo-black.png',
    ogUrl,
    ogType = 'website',
    twitterCard = 'summary_large_image',
}: SEOProps) => {
    const siteUrl = import.meta.env.VITE_APP_URL || 'https://imm-profile.vercel.app'
    const fullUrl = ogUrl ? `${siteUrl}${ogUrl}` : siteUrl
    const fullImageUrl = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`

    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />

            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={fullImageUrl} />

            <meta name="twitter:card" content={twitterCard} />
            <meta name="twitter:url" content={fullUrl} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={fullImageUrl} />

            <link rel="canonical" href={fullUrl} />
        </Helmet>
    )
}
