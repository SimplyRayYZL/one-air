import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight, Share2, Facebook, Twitter, Phone, MessageCircle, ChevronRight, User, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getArticleById, blogArticles } from "@/data/blogArticles";
import SEO from "@/components/common/SEO";
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "@/components/products/ProductCard";

const BlogArticle = () => {
    const { slug } = useParams();
    const article = slug ? getArticleById(slug) : undefined;
    const { data: products = [] } = useProducts();
    const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);

    // Extract headings for Table of Contents
    useEffect(() => {
        if (article?.content) {
            const matches = article.content.matchAll(/^(##|###) (.*$)/gm);
            const extracted = Array.from(matches).map((match) => ({
                level: match[1].length,
                text: match[2],
                id: match[2].replace(/\s+/g, '-').toLowerCase()
            }));
            setHeadings(extracted);
        }
    }, [article]);

    // Filter related products based on article logic
    const relatedProducts = article?.filterLink
        ? products.filter(p => {
            if (article.filterLink?.includes('capacity=')) {
                return p.name.includes(decodeURIComponent(article.filterLink.split('capacity=')[1]));
            }
            if (article.filterLink?.includes('brand=')) {
                return p.brand === decodeURIComponent(article.filterLink.split('brand=')[1]);
            }
            return false;
        }).slice(0, 3)
        : [];

    // Get random related articles
    const relatedArticles = blogArticles
        .filter(a => a.id !== article?.id && a.category === article?.category)
        .slice(0, 3);

    if (!article) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow flex flex-col items-center justify-center p-4">
                    <h1 className="text-2xl font-bold mb-4">المقال غير موجود</h1>
                    <Link to="/blog">
                        <Button variant="outline">العودة للمدونة</Button>
                    </Link>
                </main>
                <Footer />
            </div>
        );
    }

    const shareUrl = `https://oneair-eg.com/blog/${slug}`;

    // Schema for Blog Post
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": article.title,
        "description": article.excerpt,
        "image": `https://oneair-eg.com${article.image}`,
        "datePublished": article.date,
        "author": {
            "@type": "Organization",
            "name": "وان اير للتكييف"
        },
        "publisher": {
            "@type": "Organization",
            "name": "وان اير للتكييف",
            "logo": {
                "@type": "ImageObject",
                "url": "https://oneair-eg.com/logo.png"
            }
        }
    };

    return (
        <>
            <SEO
                title={article.title}
                description={article.excerpt}
                keywords={article.tags.join(", ")}
                image={article.image}
                type="article"
                publishedTime={article.date}
                schema={articleSchema}
            />

            <div className="min-h-screen flex flex-col bg-slate-50">
                <Navbar />

                <main className="flex-grow pt-24 pb-16">
                    {/* Hero Section */}
                    <div className="container mx-auto px-4 mb-8">
                        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 overflow-x-auto whitespace-nowrap pb-2">
                            <Link to="/" className="hover:text-primary transition-colors">الرئيسية</Link>
                            <ChevronRight className="h-4 w-4 rtl:rotate-180" />
                            <Link to="/blog" className="hover:text-primary transition-colors">المدونة</Link>
                            <ChevronRight className="h-4 w-4 rtl:rotate-180" />
                            <span className="text-foreground font-medium">{article.title}</span>
                        </nav>

                        <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-sm border border-slate-100 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-secondary to-primary" />

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                                <div className="order-2 lg:order-1">
                                    <div className="flex flex-wrap items-center gap-3 mb-4">
                                        <Badge className="bg-secondary/10 text-secondary hover:bg-secondary/20 px-3 py-1 text-sm">
                                            {article.category}
                                        </Badge>
                                        <div className="flex items-center gap-1 text-sm text-muted-foreground bg-slate-100 px-3 py-1 rounded-full">
                                            <Calendar className="h-3.5 w-3.5" />
                                            <span>{new Date(article.date).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-sm text-muted-foreground bg-slate-100 px-3 py-1 rounded-full">
                                            <Clock className="h-3.5 w-3.5" />
                                            <span>{article.readTime}</span>
                                        </div>
                                    </div>

                                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-6">
                                        {article.title}
                                    </h1>

                                    <p className="text-xl text-slate-600 leading-relaxed mb-8 border-r-4 border-secondary/30 pr-4">
                                        {article.excerpt}
                                    </p>

                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-full pr-3 border border-slate-100">
                                            <div className="w-10 h-10 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-lg">
                                                OA
                                            </div>
                                            <div className="text-sm">
                                                <div className="font-bold text-slate-900">فريق وان اير</div>
                                                <div className="text-slate-500">خبراء التكييف</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="order-1 lg:order-2">
                                    <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg group">
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                            {/* Main Content */}
                            <div className="lg:col-span-8">
                                <article className="bg-white rounded-[2rem] p-6 md:p-10 shadow-sm border border-slate-100">
                                    {/* Table of Contents Mobile */}
                                    <div className="lg:hidden mb-8 bg-slate-50 rounded-xl p-5 border border-slate-100">
                                        <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                                            <MessageCircle className="h-5 w-5 text-secondary" />
                                            جدول المحتويات
                                        </h3>
                                        <ul className="space-y-2 text-sm">
                                            {headings.map((heading, idx) => (
                                                <li key={idx}>
                                                    <a
                                                        href={`#${heading.id}`}
                                                        className={`block text-slate-600 hover:text-secondary transition-colors ${heading.level === 3 ? 'mr-4 text-xs' : ''}`}
                                                    >
                                                        {heading.text}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Article Body */}
                                    <div
                                        className="prose prose-lg max-w-none prose-headings:text-slate-900 prose-headings:font-bold prose-headings:scroll-mt-28 prose-p:text-slate-600 prose-p:leading-8 prose-a:text-secondary prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-strong:text-slate-900 prose-li:text-slate-600 prose-table:border prose-th:bg-slate-50 prose-th:p-4 prose-td:p-4"
                                        dangerouslySetInnerHTML={{
                                            __html: article.content
                                                .replace(/^(##) (.*$)/gm, '<h2 id="$2" class="text-2xl font-bold mt-10 mb-6 flex items-center gap-2"><span class="w-1 h-8 bg-secondary rounded-full inline-block"></span>$2</h2>')
                                                .replace(/^(###) (.*$)/gm, '<h3 id="$2" class="text-xl font-semibold mt-8 mb-4 mr-4">$2</h3>')
                                                .replace(/^(\d+\.) (.*$)/gm, '<div class="flex gap-3 mb-4 items-start"><span class="flex-shrink-0 w-6 h-6 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-bold text-sm mt-1">$1</span><p class="m-0">$2</p></div>')
                                                .replace(/^- (.*$)/gm, '<li class="flex items-start gap-2 mb-2"><span class="h-1.5 w-1.5 rounded-full bg-secondary mt-2.5 flex-shrink-0"></span><span>$1</span></li>')
                                                .replace(/id="(.*?)"/g, (match, p1) => `id="${p1.replace(/\s+/g, '-').toLowerCase()}"`)
                                        }}
                                    />

                                    {/* Author Bio Box */}
                                    <div className="mt-12 bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-right">
                                        <div className="w-20 h-20 rounded-full bg-white p-1 shadow-md flex-shrink-0">
                                            <div className="w-full h-full rounded-full bg-gradient-to-br from-secondary to-primary/80 flex items-center justify-center text-white font-bold text-2xl">
                                                OA
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900 mb-2">وان اير للتكييف</h3>
                                            <p className="text-slate-600 text-sm leading-relaxed mb-4">
                                                نحن شركة رائدة في مجال التكييف والتبريد في مصر. هدفنا تقديم أفضل المعلومات والنصائح لمساعدتك في اتخاذ القرار الصحيح والحفاظ على تكييفك.
                                            </p>
                                            <div className="flex justify-center md:justify-start gap-3">
                                                <Button size="sm" variant="outline" className="rounded-full h-8 w-8 p-0 border-slate-300 text-slate-600">
                                                    <Facebook className="h-4 w-4" />
                                                </Button>
                                                <Button size="sm" variant="outline" className="rounded-full h-8 w-8 p-0 border-slate-300 text-slate-600">
                                                    <Twitter className="h-4 w-4" />
                                                </Button>
                                                <Button size="sm" variant="outline" className="rounded-full h-8 w-8 p-0 border-slate-300 text-slate-600">
                                                    <Share2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </div>

                            {/* Sidebar */}
                            <div className="lg:col-span-4 space-y-8">
                                {/* Table of Contents Desktop */}
                                <div className="hidden lg:block bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 sticky top-24">
                                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2 border-b pb-3">
                                        <MessageCircle className="h-5 w-5 text-secondary" />
                                        <span>في هذا المقال</span>
                                    </h3>
                                    <ul className="space-y-3 relative text-sm">
                                        <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-slate-100" />
                                        {headings.map((heading, idx) => (
                                            <li key={idx} className="relative pr-4">
                                                <div className="absolute right-[-1px] top-2 w-1.5 h-1.5 rounded-full bg-secondary" />
                                                <a
                                                    href={`#${heading.id}`}
                                                    className={`block text-slate-600 hover:text-secondary transition-colors ${heading.level === 3 ? 'mr-3 text-xs opacity-80' : 'font-medium'}`}
                                                >
                                                    {heading.text}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Commercial CTA */}
                                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2rem] p-6 text-white text-center relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 rounded-full blur-3xl" />
                                    <div className="relative z-10">
                                        <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                                            <Phone className="h-6 w-6" />
                                        </div>
                                        <h3 className="text-xl font-bold mb-2">محتاج مساعدة؟</h3>
                                        <p className="text-sm text-slate-300 mb-6">فريق المبيعات جاهز للرد على استفساراتك ومساعدتك في اختيار التكييف المناسب</p>
                                        <Button className="w-full bg-secondary hover:bg-secondary/90 text-white rounded-xl h-12 font-bold shadow-lg shadow-secondary/20">
                                            اتصل الآن: 01289006310
                                        </Button>
                                    </div>
                                </div>

                                {/* Related Products */}
                                {relatedProducts.length > 0 && (
                                    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100">
                                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2 border-b pb-3">
                                            <Tag className="h-5 w-5 text-secondary" />
                                            <span>منتجات مقترحة</span>
                                        </h3>
                                        <div className="space-y-4">
                                            {relatedProducts.map((product, idx) => (
                                                <div key={idx} className="scale-90 origin-top -mb-4">
                                                    <ProductCard product={product} index={idx} />
                                                </div>
                                            ))}
                                            <Link to="/products" className="block text-center mt-4">
                                                <Button variant="ghost" className="text-secondary w-full">عرض كل المنتجات</Button>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Related Articles Section */}
                        {relatedArticles.length > 0 && (
                            <div className="mt-16 pt-16 border-t border-slate-200">
                                <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                                    <User className="h-6 w-6 text-secondary" />
                                    مقالات قد تهمك
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {relatedArticles.map((item, idx) => (
                                        <Link
                                            key={item.id}
                                            to={`/blog/${item.id}`}
                                            className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
                                        >
                                            <div className="aspect-video overflow-hidden">
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                            </div>
                                            <div className="p-5">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <Badge variant="secondary" className="text-xs font-normal bg-secondary/10 text-secondary hover:bg-secondary/20">
                                                        {item.category}
                                                    </Badge>
                                                    <span className="text-xs text-muted-foreground">{item.readTime}</span>
                                                </div>
                                                <h3 className="font-bold text-gray-900 line-clamp-2 group-hover:text-secondary transition-colors mb-2">
                                                    {item.title}
                                                </h3>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
};

export default BlogArticle;
