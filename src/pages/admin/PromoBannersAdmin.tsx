import { useState, useEffect } from "react";
import { useSiteSettings, useUpdateSettings, DEFAULT_SETTINGS } from "@/hooks/useSettings";
import { Helmet } from "react-helmet-async";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
    Plus, Trash2, Edit, Image as ImageIcon,
    ArrowRight, Loader2, Grid2X2, LayoutGrid, Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface PromoBanner {
    id: string;
    section_type: 'half' | 'quarter';
    position: number;
    title: string | null;
    image_url: string | null;
    link_url: string | null;
    is_active: boolean;
    banner_group: string;
}

const AVAILABLE_GROUPS = [
    { id: "group1", name: "المجموعة الأولى", position: "أسفل قسم المميزات - تعرض منتج واحد أو اثنين", color: "from-blue-500 to-cyan-500" },
    { id: "group2", name: "المجموعة الثانية", position: "أسفل قسم المنتجات - تعرض 4 بانرات صغيرة", color: "from-purple-500 to-pink-500" },
    { id: "group3", name: "المجموعة الثالثة", position: "قبل الـ Footer مباشرة", color: "from-green-500 to-emerald-500" },
];

const PromoBannersAdmin = () => {
    const queryClient = useQueryClient();
    const [selectedGroup, setSelectedGroup] = useState("group1");
    const [editingBanner, setEditingBanner] = useState<PromoBanner | null>(null);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        image_url: "",
        link_url: "/products",
        section_type: "half" as 'half' | 'quarter',
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    // Site Settings for Section Titles
    const { data: settings } = useSiteSettings();
    const updateSettings = useUpdateSettings();
    const [sectionData, setSectionData] = useState<{ title: string; description: string; title_color?: string; badge_text?: string; title_size?: 'normal' | 'large' | 'xl' }>({
        title: "",
        description: "",
        title_color: "#152C73",
        badge_text: "",
        title_size: "normal"
    });

    // Update local state when settings active group changes
    useEffect(() => {
        if (settings?.promo_sections?.[selectedGroup]) {
            setSectionData(settings.promo_sections[selectedGroup]);
        } else {
            setSectionData(DEFAULT_SETTINGS.promo_sections?.[selectedGroup] || { title: "", description: "", title_color: "#152C73", text_color: "#000000", badge_text: "عروض مميزة" });
        }
    }, [selectedGroup, settings]);

    const handleSaveSectionInfo = () => {
        if (!settings) return;

        const newSettings = {
            ...settings,
            promo_sections: {
                ...settings.promo_sections,
                [selectedGroup]: sectionData
            }
        };

        updateSettings.mutate(newSettings);
    };

    // Fetch promo banners for selected group
    const { data: banners, isLoading } = useQuery({
        queryKey: ["promo-banners", selectedGroup],
        queryFn: async () => {
            const { data } = await (supabase as any)
                .from("promo_banners")
                .select("*")
                .eq("banner_group", selectedGroup)
                .order("position");
            return (data || []) as PromoBanner[];
        },
    });

    // Upload file
    const uploadFile = async (file: File): Promise<string | null> => {
        try {
            setUploading(true);
            const fileExt = file.name.split('.').pop();
            const fileName = `promo/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

            const { error } = await supabase.storage
                .from('banner-images')
                .upload(fileName, file, { upsert: true });

            if (error) throw error;

            const { data: urlData } = supabase.storage
                .from('banner-images')
                .getPublicUrl(fileName);

            return urlData.publicUrl;
        } catch (error) {
            console.error('Error uploading file:', error);
            toast.error('فشل رفع الصورة');
            return null;
        } finally {
            setUploading(false);
        }
    };

    // Add banner mutation
    const addBannerMutation = useMutation({
        mutationFn: async (data: { title: string; image_url: string; link_url: string; section_type: string }) => {
            const maxPosition = banners?.reduce((max, b) => Math.max(max, b.position), 0) || 0;
            const { error } = await (supabase as any)
                .from("promo_banners")
                .insert({
                    title: data.title,
                    image_url: data.image_url,
                    link_url: data.link_url,
                    section_type: data.section_type,
                    banner_group: selectedGroup,
                    position: maxPosition + 1,
                    is_active: true,
                });
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["promo-banners"] });
            toast.success("تم إضافة البانر");
            resetForm();
            setIsAddDialogOpen(false);
        },
        onError: (error) => {
            toast.error("فشل إضافة البانر: " + error.message);
        },
    });

    // Update banner mutation
    const updateBannerMutation = useMutation({
        mutationFn: async (data: { id: string; title: string; image_url: string; link_url: string; section_type: string }) => {
            const { error } = await (supabase as any)
                .from("promo_banners")
                .update({
                    title: data.title,
                    image_url: data.image_url,
                    link_url: data.link_url,
                    section_type: data.section_type,
                })
                .eq("id", data.id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["promo-banners"] });
            toast.success("تم تحديث البانر");
            resetForm();
            setEditingBanner(null);
        },
        onError: (error) => {
            toast.error("فشل تحديث البانر: " + error.message);
        },
    });

    // Delete banner mutation
    const deleteBannerMutation = useMutation({
        mutationFn: async (id: string) => {
            const { error } = await (supabase as any).from("promo_banners").delete().eq("id", id);
            if (error) throw error;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["promo-banners"] });
            toast.success("تم حذف البانر");
        },
    });

    const resetForm = () => {
        setFormData({ title: "", image_url: "", link_url: "/products", section_type: "half" });
        setSelectedFile(null);
    };

    const handleSubmit = async (isEdit: boolean) => {
        let imageUrl = formData.image_url;

        if (selectedFile) {
            const uploadedUrl = await uploadFile(selectedFile);
            if (uploadedUrl) {
                imageUrl = uploadedUrl;
            } else {
                return;
            }
        }

        if (isEdit && editingBanner) {
            updateBannerMutation.mutate({
                id: editingBanner.id,
                title: formData.title || "بانر ترويجي",
                image_url: imageUrl,
                link_url: formData.link_url || "/products",
                section_type: formData.section_type,
            });
        } else {
            addBannerMutation.mutate({
                title: formData.title || "بانر ترويجي",
                image_url: imageUrl,
                link_url: formData.link_url || "/products",
                section_type: formData.section_type,
            });
        }
    };

    const startEditing = (banner: PromoBanner) => {
        setEditingBanner(banner);
        setFormData({
            title: banner.title || "",
            image_url: banner.image_url || "",
            link_url: banner.link_url || "/products",
            section_type: banner.section_type || "half",
        });
    };

    const getLayoutInfo = () => {
        const count = banners?.length || 0;
        if (count === 0) return "لا توجد بانرات";
        if (count === 1) return "بانر واحد (عرض كامل)";
        if (count === 2) return "2 بانرات (نصف - نصف)";
        if (count === 3) return "3 بانرات";
        if (count === 4) return "4 بانرات (ربع - ربع)";
        return `${count} بانرات`;
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-secondary" />
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>البنرات الترويجية - لوحة التحكم</title>
            </Helmet>

            <div className="min-h-screen bg-muted/30">
                {/* Header */}
                <div className="bg-card border-b sticky top-0 z-40">
                    <div className="container mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Link to="/admin" className="p-2 rounded-lg hover:bg-muted transition-colors">
                                    <ArrowRight className="h-5 w-5" />
                                </Link>
                                <div>
                                    <h1 className="text-xl font-bold">البنرات الترويجية</h1>
                                    <p className="text-sm text-muted-foreground">إضافة بانرات ترويجية للصفحة الرئيسية</p>
                                </div>
                            </div>

                            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button className="gap-2 bg-secondary hover:bg-secondary/90">
                                        <Plus className="h-4 w-4" />
                                        إضافة بانر
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-md">
                                    <DialogHeader>
                                        <DialogTitle>إضافة بانر جديد</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label>عنوان البانر</Label>
                                            <Input
                                                value={formData.title}
                                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                placeholder="مثال: عروض الصيف"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>صورة البانر</Label>
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                                            />
                                            {selectedFile && (
                                                <img
                                                    src={URL.createObjectURL(selectedFile)}
                                                    alt="Preview"
                                                    className="h-32 w-full object-cover rounded"
                                                />
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <Label>الرابط</Label>
                                            <Input
                                                value={formData.link_url}
                                                onChange={(e) => setFormData({ ...formData, link_url: e.target.value })}
                                                placeholder="/products"
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <DialogClose asChild>
                                            <Button variant="outline">إلغاء</Button>
                                        </DialogClose>
                                        <Button onClick={() => handleSubmit(false)} disabled={uploading || addBannerMutation.isPending} className="bg-secondary hover:bg-secondary/90">
                                            {(uploading || addBannerMutation.isPending) && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                                            إضافة
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-6 space-y-6">
                    {/* Group Selector */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <LayoutGrid className="h-5 w-5" />
                                اختر المجموعة
                            </CardTitle>
                            <CardDescription>
                                كل مجموعة تظهر في مكان مختلف على الصفحة الرئيسية
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <RadioGroup value={selectedGroup} onValueChange={setSelectedGroup} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {AVAILABLE_GROUPS.map((group) => (
                                    <div
                                        key={group.id}
                                        className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${selectedGroup === group.id
                                            ? 'border-secondary bg-secondary/5'
                                            : 'border-transparent bg-muted/50 hover:border-muted-foreground/20'
                                            }`}
                                        onClick={() => setSelectedGroup(group.id)}
                                    >
                                        <RadioGroupItem value={group.id} id={group.id} />
                                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${group.color} flex items-center justify-center text-white`}>
                                            <Grid2X2 className="h-5 w-5" />
                                        </div>
                                        <Label htmlFor={group.id} className="flex-1 cursor-pointer">
                                            <div className="font-medium">{group.name}</div>
                                            <div className="text-xs text-muted-foreground">{group.position}</div>
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </CardContent>
                    </Card>

                    {/* Section Info Editor */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">بيانات القسم</CardTitle>
                            <CardDescription>عنوان وصف القسم الذي يظهر فوق البنرات</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>عنوان القسم</Label>
                                    <Input
                                        value={sectionData.title}
                                        onChange={(e) => setSectionData({ ...sectionData, title: e.target.value })}
                                        placeholder="مثال: أحدث العروض"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>لون النص الأساسي</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            type="color"
                                            value={sectionData.text_color || "#000000"}
                                            onChange={(e) => setSectionData({ ...sectionData, text_color: e.target.value })}
                                            className="w-12 h-10 p-1 cursor-pointer"
                                        />
                                        <Input
                                            value={sectionData.text_color || "#000000"}
                                            onChange={(e) => setSectionData({ ...sectionData, text_color: e.target.value })}
                                            placeholder="#000000"
                                            dir="ltr"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>لون التميز (للجزء المحدد بـ *)</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            type="color"
                                            value={sectionData.title_color || "#152C73"}
                                            onChange={(e) => setSectionData({ ...sectionData, title_color: e.target.value })}
                                            className="w-12 h-10 p-1 cursor-pointer"
                                        />
                                        <Input
                                            value={sectionData.title_color || "#152C73"}
                                            onChange={(e) => setSectionData({ ...sectionData, title_color: e.target.value })}
                                            placeholder="#152C73"
                                            dir="ltr"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>حجم الخط</Label>
                                    <select
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        value={sectionData.title_size || "normal"}
                                        onChange={(e) => setSectionData({ ...sectionData, title_size: e.target.value as any })}
                                    >
                                        <option value="normal">عادي (افتراضي)</option>
                                        <option value="large">كبير</option>
                                        <option value="xl">ضخم جداً</option>
                                    </select>
                                </div>
                                <div className="col-span-1 md:col-span-2">
                                    <p className="text-xs text-muted-foreground mb-2">
                                        💡 <strong>تلميح:</strong> لتلوين جزء محدد من العنوان، ضعه بين علامتي نجمة.
                                        مثال: <code>أحدث *المنتجات*</code> سيجعل كلمة "المنتجات" فقط باللون المختار.
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <Label>نص الشارة (فوق العنوان)</Label>
                                    <Input
                                        value={sectionData.badge_text || ""}
                                        onChange={(e) => setSectionData({ ...sectionData, badge_text: e.target.value })}
                                        placeholder="مثال: أفضل العروض"
                                    />
                                </div>
                                <div className="col-span-1 md:col-span-2 space-y-2">
                                    <Label>وصف القسم</Label>
                                    <Input
                                        value={sectionData.description}
                                        onChange={(e) => setSectionData({ ...sectionData, description: e.target.value })}
                                        placeholder="مثال: اكتشف تشكيلة واسعة من..."
                                    />
                                </div>
                            </div>
                            <Button
                                onClick={handleSaveSectionInfo}
                                disabled={updateSettings.isPending}
                                className="w-full md:w-auto"
                            >
                                {updateSettings.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                                حفظ بيانات القسم
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Layout Info */}
                    <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-xl p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Info className="h-5 w-5 text-blue-500" />
                            <div>
                                <p className="font-medium text-blue-800 dark:text-blue-200">التخطيط الحالي: {getLayoutInfo()}</p>
                                <p className="text-sm text-blue-600 dark:text-blue-300">أضف 2 بانرات = نصف-نصف | 4 بانرات = ربع-ربع</p>
                            </div>
                        </div>
                        <Badge variant="outline" className="text-blue-600 border-blue-300">
                            {banners?.length || 0} بانر
                        </Badge>
                    </div>

                    {/* Banners Grid */}
                    {banners && banners.length > 0 ? (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {banners.map((banner) => (
                                <Card key={banner.id} className="overflow-hidden group hover:shadow-lg transition-all">
                                    <div className="aspect-video relative">
                                        {banner.image_url ? (
                                            <img
                                                src={banner.image_url}
                                                alt={banner.title || "بانر"}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-r from-secondary to-accent flex items-center justify-center">
                                                <ImageIcon className="h-12 w-12 text-white/50" />
                                            </div>
                                        )}
                                        <Badge className="absolute top-2 right-2 bg-black/60">
                                            موضع {banner.position}
                                        </Badge>
                                    </div>
                                    <CardContent className="p-4">
                                        <h3 className="font-semibold mb-3">{banner.title || "بدون عنوان"}</h3>
                                        <div className="flex gap-2">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button size="sm" variant="outline" onClick={() => startEditing(banner)} className="flex-1">
                                                        <Edit className="h-4 w-4 mr-1" />
                                                        تعديل
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="max-w-md">
                                                    <DialogHeader>
                                                        <DialogTitle>تعديل البانر</DialogTitle>
                                                    </DialogHeader>
                                                    <div className="space-y-4">
                                                        <div className="space-y-2">
                                                            <Label>عنوان البانر</Label>
                                                            <Input
                                                                value={formData.title}
                                                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label>صورة البانر</Label>
                                                            {formData.image_url && (
                                                                <img
                                                                    src={formData.image_url}
                                                                    alt="Current"
                                                                    className="h-24 w-full object-cover rounded mb-2"
                                                                />
                                                            )}
                                                            <Input
                                                                type="file"
                                                                accept="image/*"
                                                                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label>الرابط</Label>
                                                            <Input
                                                                value={formData.link_url}
                                                                onChange={(e) => setFormData({ ...formData, link_url: e.target.value })}
                                                            />
                                                        </div>
                                                    </div>
                                                    <DialogFooter>
                                                        <DialogClose asChild>
                                                            <Button variant="outline">إلغاء</Button>
                                                        </DialogClose>
                                                        <Button onClick={() => handleSubmit(true)} disabled={uploading || updateBannerMutation.isPending} className="bg-secondary hover:bg-secondary/90">
                                                            {(uploading || updateBannerMutation.isPending) && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                                                            حفظ
                                                        </Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>

                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button size="sm" variant="destructive">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>حذف البانر</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            هل أنت متأكد من حذف هذا البانر؟
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>إلغاء</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => deleteBannerMutation.mutate(banner.id)} className="bg-destructive">
                                                            حذف
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <Card className="text-center py-12">
                            <CardContent>
                                <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                                <p className="text-muted-foreground mb-4">لا توجد بنرات في هذه المجموعة</p>
                                <Button onClick={() => setIsAddDialogOpen(true)} className="bg-secondary hover:bg-secondary/90">
                                    <Plus className="h-4 w-4 mr-2" />
                                    إضافة بانر
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                    {/* Tips */}
                    <Card className="bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800">
                        <CardContent className="pt-4">
                            <p className="text-sm text-amber-800 dark:text-amber-200">
                                💡 <strong>نصائح:</strong>
                                <br />
                                • لعمل تقسيم <strong>نصف-نصف</strong>: أضف 2 بانرات في المجموعة
                                <br />
                                • لعمل تقسيم <strong>ربع-ربع</strong>: أضف 4 بانرات في المجموعة
                                <br />
                                • المقاس المثالي للصور: <strong>800×400 بكسل</strong>
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default PromoBannersAdmin;
