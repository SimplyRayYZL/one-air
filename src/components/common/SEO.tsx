import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    keywords?: string;
    image?: string;
    type?: 'website' | 'article' | 'product';
    url?: string;
    publishedTime?: string;
    author?: string;
    schema?: Record<string, any>;
}

import { useSiteSettings } from "@/hooks/useSettings";

const SEO = ({
    title,
    description,
    keywords,
    image = '/logo.png',
    type = 'website',
    url,
    publishedTime,
    author,
    schema
}: SEOProps) => {
    const { data: settings } = useSiteSettings();
    const siteName = settings?.store_name_en || 'OneAir';
    const siteTitle = settings?.seo_title || 'OneAir - وان اير للتكييف';
    const defaultDescription = settings?.seo_description || 'أفضل تكييفات في مصر';
    const siteUrl = 'https://oneaircool.com'; // Keep this base URL or make it configurable if needed, but usually domain is static

    const fullUrl = url ? (url.startsWith('http') ? url : `${siteUrl}${url}`) : siteUrl;
    const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`;
    const fullTitle = title === 'OneAir' ? siteTitle : `${title} | ${siteName}`;
    const fullDescription = description || defaultDescription;
    const fullAuthor = author || settings?.seo_author || 'OneAir';

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={fullDescription} />
            {keywords && <meta name="keywords" content={keywords} />}
            <link rel="canonical" href={fullUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={fullDescription} />
            <meta property="og:image" content={fullImage} />
            <meta property="og:site_name" content={siteName} />
            <meta property="og:locale" content="ar_EG" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={fullUrl} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={fullDescription} />
            <meta name="twitter:image" content={fullImage} />

            {/* Article Specific */}
            {type === 'article' && publishedTime && (
                <meta property="article:published_time" content={publishedTime} />
            )}
            {type === 'article' && fullAuthor && (
                <meta property="article:author" content={fullAuthor} />
            )}

            {/* Structured Data (JSON-LD) */}
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;
