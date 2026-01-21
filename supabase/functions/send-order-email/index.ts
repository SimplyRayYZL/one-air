import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = "re_G92xXJcy_AnNsuiqDX7P6sLSQdq5MFHgc";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface OrderEmailRequest {
    order: {
        id: string;
        customerName: string;
        customerEmail: string;
        total: number;
        items: any[];
    };
    settings: any;
}

serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const { order, settings } = await req.json() as OrderEmailRequest;

        console.log("Sending email for order:", order.id);

        // 1. Send Admin Email
        if (settings.email_notifications_enabled && settings.notification_email) {
            console.log("Sending admin email to:", settings.notification_email);

            const adminRes = await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${RESEND_API_KEY}`,
                },
                body: JSON.stringify({
                    from: "OneAir Notifications <onboarding@resend.dev>", // Using standard dev domain
                    to: [settings.notification_email],
                    subject: `New Order #${order.id.slice(0, 8)} - ${order.customerName}`,
                    html: `
            <div dir="rtl" style="font-family: sans-serif;">
                <h1>طلبي جديد!</h1>
                <p><strong>العميل:</strong> ${order.customerName}</p>
                <p><strong>الإجمالي:</strong> ${order.total} ج.م</p>
                <hr />
                <h3>المنتجات:</h3>
                <ul>
                ${order.items.map((item: any) => `<li>${item.product.name} (الكمية: ${item.quantity})</li>`).join("")}
                </ul>
                <a href="${settings.store_url || 'http://localhost:8080'}/admin/orders" style="display:inline-block;padding:10px 20px;background:#000;color:#fff;text-decoration:none;border-radius:5px;">عرض الطلب</a>
            </div>
          `,
                }),
            });

            if (!adminRes.ok) {
                console.error("Failed to send admin email:", await adminRes.text());
            }
        }

        // 2. Send Customer Email (Confirmation)
        if (order.customerEmail) {
            console.log("Sending customer email to:", order.customerEmail);
            const customerRes = await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${RESEND_API_KEY}`,
                },
                body: JSON.stringify({
                    from: "OneAir <onboarding@resend.dev>",
                    to: [order.customerEmail],
                    subject: `تأكيد استلام الطلب #${order.id.slice(0, 8)}`,
                    html: `
            <div dir="rtl" style="font-family: sans-serif;">
                <h1>شكراً لطلبك!</h1>
                <p>مرحباً ${order.customerName}،</p>
                <p>تم استلام طلبك بنجاح وجاري مراجعته.</p>
                <p><strong>رقم الطلب:</strong> #${order.id.slice(0, 8)}</p>
                <p><strong>الإجمالي:</strong> ${order.total} ج.م</p>
            </div>
            `,
                }),
            });

            if (!customerRes.ok) {
                console.error("Failed to send customer email:", await customerRes.text());
            }
        }

        return new Response(JSON.stringify({ success: true }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
        });
    } catch (error) {
        console.error("Error in send-order-email:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 400,
        });
    }
});
