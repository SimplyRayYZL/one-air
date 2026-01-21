import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type AdminRole = 'super_admin' | 'admin' | null;

export interface AdminUser {
    username: string;
    role: AdminRole;
    permissions: string[];
}

interface AdminAuthContextType {
    isAuthenticated: boolean;
    role: AdminRole;
    username: string | null;
    permissions: string[];
    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
    canAccess: (permission: string) => boolean;
    isSuperAdmin: () => boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        return localStorage.getItem('adminAuth') === 'true';
    });

    const [role, setRole] = useState<AdminRole>(() => {
        return (localStorage.getItem('adminRole') as AdminRole) || null;
    });

    const [username, setUsername] = useState<string | null>(() => {
        return localStorage.getItem('adminUsername') || null;
    });

    const [permissions, setPermissions] = useState<string[]>(() => {
        try {
            return JSON.parse(localStorage.getItem('adminPermissions') || '[]');
        } catch {
            return [];
        }
    });

    const login = async (inputUsername: string, inputPassword: string): Promise<boolean> => {
        try {
            const { data, error } = await (supabase
                .from('admin_users' as any)
                .select('*')
                .eq('username', inputUsername)
                .single()) as any;

            if (error || !data) {
                console.error('Login error:', error);
                return false;
            }

            // Simple password check (In production, use hashing!)
            if (data.password === inputPassword) {
                setIsAuthenticated(true);
                setRole(data.role as AdminRole);
                setUsername(data.username);

                // Parse permissions if they are coming as string or safely cast
                const userPermissions = Array.isArray(data.permissions) ? data.permissions : [];
                setPermissions(userPermissions);

                localStorage.setItem('adminAuth', 'true');
                localStorage.setItem('adminRole', data.role || '');
                localStorage.setItem('adminUsername', data.username);
                localStorage.setItem('adminPermissions', JSON.stringify(userPermissions));

                return true;
            }
            return false;
        } catch (err) {
            console.error('Unexpected login error:', err);
            return false;
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setRole(null);
        setUsername(null);
        setPermissions([]);
        localStorage.removeItem('adminAuth');
        localStorage.removeItem('adminRole');
        localStorage.removeItem('adminUsername');
        localStorage.removeItem('adminPermissions');
    };

    // Permission helpers
    const isSuperAdmin = () => role === 'super_admin';

    const canAccess = (permission: string) => {
        if (isSuperAdmin()) return true;
        return permissions.includes(permission);
    };

    return (
        <AdminAuthContext.Provider value={{
            isAuthenticated,
            role,
            username,
            permissions,
            login,
            logout,
            canAccess,
            isSuperAdmin
        }}>
            {children}
        </AdminAuthContext.Provider>
    );
};

export const useAdminAuth = () => {
    const context = useContext(AdminAuthContext);
    if (context === undefined) {
        throw new Error('useAdminAuth must be used within an AdminAuthProvider');
    }
    return context;
};
