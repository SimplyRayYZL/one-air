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

serve(async (req: Request) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        const { order, settings, type = "new_order" } = await req.json() as { order: any, settings: any, type?: string };
        console.log("Processing email type:", type, "for order:", order.id);

        if (type === "order_cancelled") {
            // ---------------------------------------------------------
            // 1. ORDER CANCELLATION EMAIL (To Customer)
            // ---------------------------------------------------------
            if (order.customerEmail) {
                const res = await fetch("https://api.resend.com/emails", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${RESEND_API_KEY}`,
                    },
                    body: JSON.stringify({
                        from: "OneAir <info@oneaircool.com>",
                        to: [order.customerEmail],
                        subject: `تحديث بخصوص طلبك #${order.id.slice(0, 8)}`,
                        html: `
                <div dir="rtl" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9fafb; padding: 20px; border-radius: 8px;">
                    <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                        <div style="text-align: center; margin-bottom: 30px;">
                            <h1 style="color: #ef4444; margin: 0; font-size: 24px;">OneAir</h1>
                        </div>

                        <h2 style="color: #111827; text-align: center; margin-bottom: 20px;">تم إلغاء الطلب</h2>
                        <p style="text-align: center; color: #4b5563; margin-bottom: 30px;">
                            مرحباً ${order.customerName}،<br/>
                            نأسف لإبلاغك بأنه تم إلغاء طلبك رقم <strong>#${order.id.slice(0, 8)}</strong>.
                        </p>

                        <div style="background-color: #fef2f2; border: 1px solid #fee2e2; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
                            <p style="margin: 0; color: #991b1b; text-align: center;">إذا كان لديك أي استفسار أو تم الإلغاء عن طريق الخطأ، يرجى التواصل معنا.</p>
                        </div>

                        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; font-size: 13px; color: #9ca3af;">
                             <p>هل لديك استفسار؟ تواصل معنا عبر <a href="mailto:info@oneaircool.com" style="color: #2563eb; text-decoration: none;">info@oneaircool.com</a></p>
                        </div>
                    </div>
                </div>
                        `,
                    }),
                });

                if (!res.ok) {
                    console.error("Failed to send cancellation email:", await res.text());
                }
            }
            return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }

        // ---------------------------------------------------------
        // 2. NEW ORDER EMAILS (Admin + Customer)
        // ---------------------------------------------------------

        console.log("Sending new order emails for:", order.id);

        // 1. Send Admin Email
        if (settings.email_notifications_enabled && settings.notification_email) {
            // ... existing admin email logic ...
            console.log("Sending admin email to:", settings.notification_email);

            const adminRes = await fetch("https://api.resend.com/emails", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${RESEND_API_KEY}`,
                },
                body: JSON.stringify({
                    from: "OneAir Notifications <info@oneaircool.com>",
                    to: [settings.notification_email],
                    subject: `طلب جديد #${order.id.slice(0, 8)} - ${order.customerName}`,
                    html: `
            <div dir="rtl" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9fafb; padding: 20px; border-radius: 8px;">
                <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                    <h2 style="color: #111827; margin-bottom: 20px; text-align: center; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">إشعار طلب جديد 🔔</h2>
                    
                    <div style="margin-bottom: 20px;">
                        <p style="margin: 5px 0; color: #374151;"><strong>👤 العميل:</strong> ${order.customerName}</p>
                        <p style="margin: 5px 0; color: #374151;"><strong>📧 البريد:</strong> <a href="mailto:${order.customerEmail}">${order.customerEmail}</a></p>
                        <p style="margin: 5px 0; color: #374151;"><strong>💰 الإجمالي:</strong> <span style="color: #059669; font-weight: bold;">${order.total.toLocaleString()} ج.م</span></p>
                    </div>

                    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                        <thead>
                            <tr style="background-color: #f3f4f6;">
                                <th style="padding: 10px; text-align: right; border-bottom: 1px solid #e5e7eb; color: #4b5563;">المنتج</th>
                                <th style="padding: 10px; text-align: center; border-bottom: 1px solid #e5e7eb; color: #4b5563;">الكمية</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${order.items.map((item: any) => `
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${item.product.name}</td>
                                <td style="padding: 10px; text-align: center; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${item.quantity}</td>
                            </tr>
                            `).join("")}
                        </tbody>
                    </table>

                    <div style="text-align: center; margin-top: 30px;">
                        <a href="${settings.store_url || 'http://localhost:8080'}/admin/orders" 
                           style="display: inline-block; padding: 12px 24px; background-color: #2563eb; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold; transition: background-color 0.2s;">
                            عرض التفاصيل في لوحة التحكم
                        </a>
                    </div>
                </div>
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
                    from: "OneAir <info@oneaircool.com>",
                    to: [order.customerEmail],
                    subject: `تأكيد استلام الطلب #${order.id.slice(0, 8)}`,
                    html: `
            <div dir="rtl" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9fafb; padding: 20px; border-radius: 8px;">
                <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #2563eb; margin: 0; font-size: 24px;">OneAir</h1>
                        <p style="color: #6b7280; font-size: 14px; margin-top: 5px;">تكييفك.. لعبتنا</p>
                    </div>

                    <h2 style="color: #111827; text-align: center; margin-bottom: 20px;">شكراً لطلبك، ${order.customerName}! 🎉</h2>
                    <p style="text-align: center; color: #4b5563; margin-bottom: 30px;">تم استلام طلبك بنجاح. سنقوم بمراجعة الطلب والتواصل معك قريباً لتأكيد موعد التسليم/التركيب.</p>

                    <div style="background-color: #f3f4f6; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
                        <p style="margin: 5px 0; color: #374151;"><strong>رقم الطلب:</strong> #${order.id.slice(0, 8)}</p>
                        <p style="margin: 5px 0; color: #374151;"><strong>تاريخ الطلب:</strong> ${new Date().toLocaleDateString('ar-EG')}</p>
                    </div>

                    <h3 style="color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; margin-bottom: 15px;">ملخص الطلب</h3>
                    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                        <thead>
                            <tr style="background-color: #f9fafb;">
                                <th style="padding: 10px; text-align: right; border-bottom: 1px solid #e5e7eb; color: #4b5563;">المنتج</th>
                                <th style="padding: 10px; text-align: center; border-bottom: 1px solid #e5e7eb; color: #4b5563;">الكمية</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${order.items.map((item: any) => `
                            <tr>
                                <td style="padding: 10px; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${item.product.name}</td>
                                <td style="padding: 10px; text-align: center; border-bottom: 1px solid #e5e7eb; color: #1f2937;">${item.quantity}</td>
                            </tr>
                            `).join("")}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td style="padding: 15px 10px; border-top: 2px solid #e5e7eb; font-weight: bold; color: #111827;">الإجمالي الكلي</td>
                                <td style="padding: 15px 10px; border-top: 2px solid #e5e7eb; font-weight: bold; color: #059669; text-align: center;">${order.total.toLocaleString()} ج.م</td>
                            </tr>
                        </tfoot>
                    </table>

                    <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; font-size: 13px; color: #9ca3af;">
                        <p>هل لديك استفسار؟ تواصل معنا عبر <a href="mailto:info@oneaircool.com" style="color: #2563eb; text-decoration: none;">info@oneaircool.com</a></p>
                        <p>&copy; ${new Date().getFullYear()} OneAir. جميع الحقوق محفوظة.</p>
                    </div>
                </div>
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
    } catch (error: any) {
        console.error("Error in send-order-email:", error);
        return new Response(JSON.stringify({ error: error.message || "Unknown error" }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 400,
        });
    }
});
