import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
    Package,
    ShoppingCart,
    Tags,
    Settings,
    BarChart3,
    LogOut,
    Eye,
    CreditCard,
    TrendingUp,
    Megaphone,
    Truck,
    FileText,
    ImageIcon,
    ExternalLink,
    Clock,
    ArrowUpRight,
    Sparkles,
    Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAnalyticsWithPeriod, TimePeriod } from "@/hooks/useAnalytics";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const AdminDashboard = () => {
    const { logout, username, role, canAccessSettings } = useAdminAuth();
    const navigate = useNavigate();
    const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>('today');
    const { data: stats, isLoading: statsLoading } = useAnalyticsWithPeriod(selectedPeriod);

    // Period labels in Arabic
    const periodLabels: Record<TimePeriod, string> = {
        today: 'اليوم',
        week: 'آخر أسبوع',
        month: 'آخر شهر',
        year: 'آخر سنة',
    };

    // Get current time greeting
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "صباح الخير";
        if (hour < 18) return "مساء الخير";
        return "مساء الخير";
    };

    // Filter pages based on role
    const adminPages = [
        {
            title: "إدارة المنتجات",
            description: "إضافة، تعديل، وحذف المنتجات",
            icon: Package,
            href: "/admin/products",
            color: "from-blue-500 to-blue-600",
            allowed: true,
        },
        {
            title: "إدارة الطلبات",
            description: "عرض ومتابعة طلبات العملاء",
            icon: ShoppingCart,
            href: "/admin/orders",
            color: "from-green-500 to-emerald-600",
            allowed: true,
            badge: "جديد",
        },
        {
            title: "إدارة الماركات",
            description: "إضافة وتعديل ماركات التكييفات",
            icon: Tags,
            href: "/admin/brands",
            color: "from-purple-500 to-violet-600",
            allowed: true,
        },
        {
            title: "البانرات",
            description: "الرئيسية، الترويجية، الصفحات",
            icon: ImageIcon,
            href: "/admin/banners",
            color: "from-pink-500 to-rose-600",
            allowed: true,
        },
        {
            title: "إعدادات التوصيل",
            description: "خيارات التوصيل والتركيب",
            icon: Truck,
            href: "/admin/delivery",
            color: "from-amber-500 to-orange-600",
            allowed: canAccessSettings(),
        },
        {
            title: "إعدادات الموقع",
            description: "البيانات الأساسية، السوشيال، SEO",
            icon: Settings,
            href: "/admin/settings",
            color: "from-gray-500 to-gray-600",
            allowed: canAccessSettings(),
        },
        {
            title: "تنسيق الرئيسية",
            description: "ترتيب وإدارة أقسام الصفحة الرئيسية",
            icon: Sparkles,
            href: "/admin/sections",
            color: "from-indigo-500 to-purple-600",
            allowed: canAccessSettings(),
            badge: "جديد",
        },
    ].filter(page => page.allowed);

    const handleSignOut = () => {
        logout();
        toast.success("تم تسجيل الخروج");
        navigate("/admin/login");
    };

    const getRoleBadge = () => {
        if (role === 'admin') return { text: 'مدير كامل', variant: 'default' as const, color: 'bg-green-500' };
        if (role === 'editor') return { text: 'محرر', variant: 'secondary' as const, color: 'bg-blue-500' };
        return { text: 'عارض', variant: 'outline' as const, color: 'bg-gray-500' };
    };

    const roleBadge = getRoleBadge();

    // Quick stats cards data
    const statsCards = [
        { icon: Eye, label: "زائر", value: stats?.visitors || 0, color: "text-blue-500", bg: "bg-blue-500/10" },
        { icon: ShoppingCart, label: "أضاف للسلة", value: stats?.addToCart || 0, color: "text-blue-500", bg: "bg-blue-500/10" },
        { icon: CreditCard, label: "بدأ الدفع", value: stats?.checkout || 0, color: "text-purple-500", bg: "bg-purple-500/10" },
        { icon: TrendingUp, label: "أتم الشراء", value: stats?.purchases || 0, color: "text-green-500", bg: "bg-green-500/10" },
        { icon: BarChart3, label: "الإيرادات (ج.م)", value: (stats?.revenue || 0).toLocaleString(), color: "text-secondary", bg: "bg-secondary/10" },
    ];

    return (
        <>
            <Helmet>
                <title>لوحة التحكم | وان اير للتكييف</title>
            </Helmet>

            <div className="min-h-screen bg-muted/30">
                {/* Header - Enhanced */}
                <header className="bg-card border-b sticky top-0 z-40 shadow-sm">
                    <div className="container mx-auto px-4 py-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-11 h-11 bg-gradient-to-br from-secondary to-accent rounded-xl flex items-center justify-center shadow-lg">
                                    <BarChart3 className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-lg font-bold">لوحة التحكم</h1>
                                    <p className="text-xs text-muted-foreground">وان اير للتكييف</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 md:gap-3">
                                <div className="hidden md:flex items-center gap-2 bg-muted rounded-full px-3 py-1.5">
                                    <div className={`w-2 h-2 rounded-full ${roleBadge.color}`} />
                                    <span className="text-sm font-medium">{username}</span>
                                    <Badge variant="outline" className="text-xs">{roleBadge.text}</Badge>
                                </div>
                                <Link to="/" target="_blank">
                                    <Button variant="outline" size="sm" className="gap-1.5 rounded-lg">
                                        <ExternalLink className="h-4 w-4" />
                                        <span className="hidden sm:inline">الموقع</span>
                                    </Button>
                                </Link>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={handleSignOut}
                                    className="gap-1.5 rounded-lg"
                                >
                                    <LogOut className="h-4 w-4" />
                                    <span className="hidden sm:inline">خروج</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <main className="container mx-auto px-4 py-6 md:py-8">
                    {/* Welcome Banner - Enhanced */}
                    <div className="bg-gradient-to-br from-secondary via-secondary to-accent rounded-2xl lg:rounded-3xl p-6 md:p-8 text-white mb-6 md:mb-8 relative overflow-hidden">
                        {/* Decorative */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl -translate-x-1/2 translate-y-1/2" />

                        <div className="relative">
                            <div className="flex items-center gap-2 mb-2">
                                <Sparkles className="h-5 w-5" />
                                <span className="text-sm opacity-80">{getGreeting()}</span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold mb-2">مرحباً {username} 👋</h2>
                            <p className="text-white/80 text-sm md:text-base max-w-lg">
                                {role === 'admin'
                                    ? 'من هنا يمكنك إدارة جميع جوانب متجرك - المنتجات، الطلبات، البنرات، والإعدادات'
                                    : 'يمكنك إدارة المنتجات والطلبات والماركات من هنا'}
                            </p>
                        </div>
                    </div>

                    {/* Stats Section with Period Filter */}
                    <div className="mb-6 md:mb-8">
                        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                            <h3 className="text-lg font-bold flex items-center gap-2">
                                <Clock className="h-5 w-5 text-secondary" />
                                إحصائيات {periodLabels[selectedPeriod]}
                            </h3>
                            <div className="flex items-center gap-3">
                                <Select
                                    value={selectedPeriod}
                                    onValueChange={(value) => setSelectedPeriod(value as TimePeriod)}
                                >
                                    <SelectTrigger className="w-[140px] h-9">
                                        <Calendar className="h-4 w-4 ml-2" />
                                        <SelectValue placeholder="اختر الفترة" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="today">اليوم</SelectItem>
                                        <SelectItem value="week">آخر أسبوع</SelectItem>
                                        <SelectItem value="month">آخر شهر</SelectItem>
                                        <SelectItem value="year">آخر سنة</SelectItem>
                                    </SelectContent>
                                </Select>
                                <span className="text-xs text-muted-foreground hidden md:inline">
                                    {new Date().toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                </span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
                            {statsCards.map((stat, index) => (
                                <div
                                    key={index}
                                    className="bg-card rounded-xl p-4 border hover:shadow-md transition-shadow"
                                >
                                    <div className={`w-10 h-10 ${stat.bg} rounded-lg flex items-center justify-center mb-3`}>
                                        <stat.icon className={`h-5 w-5 ${stat.color}`} />
                                    </div>
                                    <p className="text-2xl font-bold">
                                        {statsLoading ? (
                                            <span className="animate-pulse bg-muted rounded h-7 w-12 block" />
                                        ) : stat.value}
                                    </p>
                                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Admin Pages Grid - Enhanced */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">الأقسام</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {adminPages.map((page) => (
                                <Link
                                    key={page.href}
                                    to={page.href}
                                    className="group bg-card rounded-2xl p-5 border hover:border-secondary/50 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                                >
                                    {/* Badge */}
                                    {page.badge && (
                                        <Badge className="absolute top-3 left-3 bg-green-500 text-white text-[10px]">
                                            {page.badge}
                                        </Badge>
                                    )}

                                    {/* Icon */}
                                    <div className={`w-12 h-12 bg-gradient-to-br ${page.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                                        <page.icon className="h-6 w-6 text-white" />
                                    </div>

                                    {/* Content */}
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h4 className="font-bold text-foreground mb-1 group-hover:text-secondary transition-colors">
                                                {page.title}
                                            </h4>
                                            <p className="text-sm text-muted-foreground line-clamp-2">
                                                {page.description}
                                            </p>
                                        </div>
                                        <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-secondary opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="mt-8 p-4 bg-card border rounded-xl">
                        <h4 className="font-bold mb-3">إجراءات سريعة</h4>
                        <div className="flex flex-wrap gap-2">
                            <Link to="/admin/products">
                                <Button size="sm" className="gap-2 rounded-lg">
                                    <Package className="h-4 w-4" />
                                    إضافة منتج جديد
                                </Button>
                            </Link>
                            <Link to="/admin/orders">
                                <Button size="sm" variant="outline" className="gap-2 rounded-lg">
                                    <ShoppingCart className="h-4 w-4" />
                                    عرض الطلبات
                                </Button>
                            </Link>
                            <Link to="/admin/hero-banners">
                                <Button size="sm" variant="outline" className="gap-2 rounded-lg">
                                    <ImageIcon className="h-4 w-4" />
                                    تعديل البنرات
                                </Button>
                            </Link>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="border-t bg-card mt-8">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>One Air Admin Panel v2.0</span>
                            <span>© 2024 وان اير للتكييف</span>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default AdminDashboard;
