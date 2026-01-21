import { SiteSettings } from "@/hooks/useSettings";

interface OrderDetails {
    id: string;
    customerName: string;
    customerEmail: string;
    total: number;
    items: any[];
}

/**
 * Validates if an email string is in a correct format
 */
const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Simulates sending an email
 * In a real application, this would call a Supabase Edge Function or an API endpoint
 * like Resend, SendGrid, or EmailJS.
 */
import { supabase } from "@/integrations/supabase/client";

/**
 * Sends order emails via Supabase Edge Function (connected to Resend)
 */
export const sendOrderEmails = async (order: OrderDetails, settings: SiteSettings) => {
    if (!settings.email_notifications_enabled) {
        console.log("[Email] Notifications are disabled in settings.");
        return;
    }

    try {
        console.log("[Email] Invoking 'send-order-email' Edge Function...");
        const { data, error } = await supabase.functions.invoke('send-order-email', {
            body: { order, settings }
        });

        if (error) {
            console.error("[Email] Edge Function Error:", error);
            throw error;
        }

        console.log("[Email] Success:", data);
    } catch (err) {
        console.error("[Email] Failed to send emails:", err);
        // We don't throw here to avoid blocking checkout flow, but we log the error
    }
};
