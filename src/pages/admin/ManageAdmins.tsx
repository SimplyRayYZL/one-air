import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2, Shield, Lock, User, Loader2, Link as LinkIcon, Key } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

// Permissions mapping
export const PERMISSIONS_LIST = [
    { key: "products", label: "إدارة المنتجات" },
    { key: "orders", label: "إدارة الطلبات" },
    { key: "brands", label: "إدارة الماركات" },
    { key: "banners", label: "إدارة البانرات (الرئيسية/الترويجية)" },
    { key: "delivery", label: "إعدادات التوصيل" },
    { key: "settings", label: "إعدادات الموقع (Store/SEO/Social)" },
    { key: "sections", label: "تنسيق الصفحة الرئيسية" },
    { key: "manage_admins", label: "إدارة المشرفين (هذه الصفحة)" },
];

interface AdminUser {
    id: string;
    username: string;
    role: string;
    permissions: string[];
    created_at: string;
}

const ManageAdmins = () => {
    const { isSuperAdmin } = useAdminAuth();
    const navigate = useNavigate();
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        role: "admin",
        permissions: [] as string[],
    });

    useEffect(() => {
        if (!isSuperAdmin()) {
            toast.error("غير مصرح لك بدخول هذه الصفحة");
            navigate("/admin");
            return;
        }
        fetchUsers();
    }, [isSuperAdmin, navigate]);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            console.log("Fetching users...");
            const { data, error } = await supabase
                .from("admin_users" as any)
                .select("*")
                .order("created_at", { ascending: false });

            if (error) {
                console.error("Supabase Error:", error);
                throw error;
            }

            console.log("Users fetched:", data);
            setUsers((data as any) || []);
        } catch (error: any) {
            console.error("Error fetching users:", error);
            const message = error.message || "خطأ غير معروف";

            if (error.code === '42P01') {
                toast.error("جدول المشرفين غير موجود. يرجى تشغيل كود SQL");
            } else if (error.code === 'PGRST301') { // Row level security
                toast.error("ليس لديك صلاحية لعرض البيانات (RLS)");
            } else {
                toast.error(`فشل تحميل قائمة المشرفين: ${message}`);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            // Basic validation
            if (!formData.username || !formData.password) {
                toast.error("يرجى ملء جميع الحقول المطلوبة");
                return;
            }

            // Check if username exists
            const { data: existing } = await supabase
                .from("admin_users" as any)
                .select("id")
                .eq("username", formData.username)
                .single();

            if (existing) {
                toast.error("اسم المستخدم موجود بالفعل");
                return;
            }

            // Insert new user
            const { error } = await supabase
                .from("admin_users" as any)
                .insert([{
                    username: formData.username,
                    password: formData.password, // Ideally hash this!
                    role: formData.role,
                    permissions: formData.permissions,
                }]);

            if (error) throw error;

            toast.success("تم إضافة المشرف بنجاح");
            setIsOpen(false);
            setFormData({ username: "", password: "", role: "admin", permissions: [] });
            fetchUsers();
        } catch (error) {
            console.error("Error creating user:", error);
            toast.error("حدث خطأ أثناء إضافة المشرف");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteUser = async (id: string, username: string) => {
        if (!confirm(`هل أنت متأكد من حذف المشرف "${username}"؟`)) return;

        try {
            const { error } = await supabase
                .from("admin_users" as any)
                .delete()
                .eq("id", id);

            if (error) throw error;
            toast.success("تم حذف المشرف بنجاح");
            fetchUsers();
        } catch (error) {
            console.error("Error deleting user:", error);
            toast.error("حدث خطأ أثناء حذف المشرف");
        }
    };

    const togglePermission = (key: string) => {
        setFormData(prev => {
            const newPermissions = prev.permissions.includes(key)
                ? prev.permissions.filter(p => p !== key)
                : [...prev.permissions, key];
            return { ...prev, permissions: newPermissions };
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-muted/30 pb-10">
            <Helmet>
                <title>إدارة المشرفين | لوحة التحكم</title>
            </Helmet>

            {/* Header */}
            <div className="bg-card border-b sticky top-0 z-40 mb-8">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link to="/admin" className="p-2 rounded-lg hover:bg-muted transition-colors">
                                <LinkIcon className="h-5 w-5 rotate-180" /> {/* Arrow back ish */}
                            </Link>
                            <div>
                                <h1 className="text-xl font-bold flex items-center gap-2">
                                    <Shield className="h-6 w-6 text-purple-600" />
                                    إدارة المشرفين
                                </h1>
                                <p className="text-sm text-muted-foreground">إضافة وحذف وتعديل صلاحيات المديرين</p>
                            </div>
                        </div>

                        <Dialog open={isOpen} onOpenChange={setIsOpen}>
                            <DialogTrigger asChild>
                                <Button className="gap-2 bg-purple-600 hover:bg-purple-700">
                                    <Plus className="h-4 w-4" />
                                    إضافة مشرف جديد
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                    <DialogTitle>إضافة مشرف جديد</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleCreateUser} className="space-y-4 mt-4">
                                    <div className="space-y-2">
                                        <Label>اسم المستخدم</Label>
                                        <div className="relative">
                                            <User className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                className="pr-9"
                                                placeholder="username"
                                                value={formData.username}
                                                onChange={e => setFormData({ ...formData, username: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>كلمة المرور</Label>
                                        <div className="relative">
                                            <Key className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                className="pr-9"
                                                type="text" // Show clear text for admin creation usually easier, or password
                                                placeholder="password"
                                                value={formData.password}
                                                onChange={e => setFormData({ ...formData, password: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>الدور (Role)</Label>
                                        <Select
                                            value={formData.role}
                                            onValueChange={(val) => setFormData({ ...formData, role: val })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="admin">مشرف (بصلاحيات محددة)</SelectItem>
                                                <SelectItem value="super_admin">مدير عام (كامل الصلاحيات)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {formData.role === 'admin' && (
                                        <div className="space-y-3 pt-2 border-t">
                                            <Label className="text-base text-primary">تحديد الصلاحيات</Label>
                                            <div className="grid grid-cols-1 gap-2">
                                                {PERMISSIONS_LIST.map((perm) => (
                                                    <div key={perm.key} className="flex items-center space-x-2 space-x-reverse space-y-0 rounded-md border p-3 hover:bg-muted/50 cursor-pointer" onClick={() => togglePermission(perm.key)}>
                                                        <Checkbox
                                                            checked={formData.permissions.includes(perm.key)}
                                                            onCheckedChange={() => togglePermission(perm.key)}
                                                            id={`perm-${perm.key}`}
                                                        />
                                                        <label
                                                            htmlFor={`perm-${perm.key}`}
                                                            className="text-sm font-medium leading-none cursor-pointer flex-1 mr-2"
                                                        >
                                                            {perm.label}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <Button type="submit" className="w-full mt-4" disabled={submitting}>
                                        {submitting ? <Loader2 className="h-4 w-4 animate-spin ml-2" /> : <Plus className="h-4 w-4 ml-2" />}
                                        حفظ المشرف
                                    </Button>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4">
                <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-right">المستخدم</TableHead>
                                <TableHead className="text-right">الدور</TableHead>
                                <TableHead className="text-right">الصلاحيات</TableHead>
                                <TableHead className="text-right">تاريخ الإضافة</TableHead>
                                <TableHead className="text-right">إجراءات</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                                {user.username.charAt(0).toUpperCase()}
                                            </div>
                                            {user.username}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.role === 'super_admin'
                                            ? 'bg-purple-100 text-purple-700'
                                            : 'bg-blue-100 text-blue-700'
                                            }`}>
                                            {user.role === 'super_admin' ? 'مدير عام' : 'مشرف'}
                                        </span>
                                    </TableCell>
                                    <TableCell className="max-w-[200px]">
                                        {user.role === 'super_admin' ? (
                                            <span className="text-muted-foreground text-xs">كامل الصلاحيات</span>
                                        ) : (
                                            <div className="flex flex-wrap gap-1">
                                                {user.permissions && user.permissions.length > 0 ? (
                                                    user.permissions.slice(0, 3).map(p => (
                                                        <span key={p} className="text-[10px] bg-secondary/10 px-1.5 py-0.5 rounded text-secondary-foreground border border-secondary/20">
                                                            {PERMISSIONS_LIST.find(pl => pl.key === p)?.label.split(' ')[1] || p}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="text-muted-foreground text-xs">بلا صلاحيات</span>
                                                )}
                                                {user.permissions && user.permissions.length > 3 && (
                                                    <span className="text-[10px] text-muted-foreground">+{user.permissions.length - 3}</span>
                                                )}
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground text-sm">
                                        {new Date(user.created_at).toLocaleDateString('ar-EG')}
                                    </TableCell>
                                    <TableCell>
                                        {user.username !== 'oneair' && ( // Prevent deleting the main admin
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                                onClick={() => handleDeleteUser(user.id, user.username)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                            {users.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                                        لا يوجد مشرفين
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default ManageAdmins;
