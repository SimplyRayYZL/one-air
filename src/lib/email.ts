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
export const sendOrderEmails = async (order: OrderDetails, settings: SiteSettings) => {
    if (!settings.email_notifications_enabled) {
        console.log("[Email] Notifications are disabled in settings.");
        return;
    }

    // 1. Send Admin Notification
    if (settings.notification_email && isValidEmail(settings.notification_email)) {
        console.log(`[Email] 📧 SIMULATION: Sending NEW ORDER notification to ADMIN: ${settings.notification_email}`);
        console.log(`[Email] Subject: طلب جديد #${order.id.slice(0, 8)} - ${order.customerName}`);
        console.log(`[Email] Body: You have received a new order for ${order.total} EGP.`);

        // TODO: Replace with actual API call
        // await fetch('/api/send-email', { ... })
    } else {
        console.warn("[Email] No valid admin notification email configured.");
    }

    // 2. Send Customer Confirmation
    if (order.customerEmail && isValidEmail(order.customerEmail)) {
        console.log(`[Email] 📧 SIMULATION: Sending ORDER CONFIRMATION to CUSTOMER: ${order.customerEmail}`);
        console.log(`[Email] Subject: تأكيد استلام طلبك #${order.id.slice(0, 8)}`);
        console.log(`[Email] Body: شكراً لتسوقك معنا، ${order.customerName}! تم استلام طلبك بنجاح.`);

        // TODO: Replace with actual API call
    }
};
