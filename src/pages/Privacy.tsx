import { useSiteSettings } from "@/hooks/useSettings";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SEO from "@/components/common/SEO";
import { Loader2 } from "lucide-react";

const Privacy = () => {
    const { data: settings, isLoading } = useSiteSettings();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <>
            <SEO
                title={`سياسة الخصوصية | ${settings?.store_name || 'One Air'}`}
                description="سياسة الخصوصية وحماية البيانات"
            />
            <div className="min-h-screen flex flex-col bg-slate-50">
                <Navbar />
                <main className="flex-grow container mx-auto px-4 py-12">
                    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border p-8 md:p-12">
                        <h1 className="text-3xl font-bold mb-8 text-primary border-b pb-4">سياسة الخصوصية</h1>
                        <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
                            {settings?.privacy_policy || "لا يوجد محتوى حالياً."}
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
};

export default Privacy;
