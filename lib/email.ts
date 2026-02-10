import nodemailer from "nodemailer";

/* ────────────────────────────────────────────────────────────────
   SERVICE EMAIL — Envoi via SMTP Hostinger vers contact@larmor-baden.com
   ──────────────────────────────────────────────────────────────── */

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.hostinger.com",
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true, // SSL
  auth: {
    user: process.env.SMTP_USER,  // contact@larmor-baden.com
    pass: process.env.SMTP_PASS,  // mot de passe du compte email Hostinger
  },
});

const TO_EMAIL = "contact@larmor-baden.com";
const FROM_EMAIL = process.env.SMTP_USER || "contact@larmor-baden.com";

/**
 * Envoi d'un email de notification à contact@larmor-baden.com
 */
export async function sendNotificationEmail({
  subject,
  html,
  replyTo,
}: {
  subject: string;
  html: string;
  replyTo?: string;
}) {
  try {
    const info = await transporter.sendMail({
      from: `"Larmor-Baden.com" <${FROM_EMAIL}>`,
      to: TO_EMAIL,
      subject,
      html,
      ...(replyTo ? { replyTo } : {}),
    });

    console.log("[Email] Envoyé avec succès :", info.messageId);
    return { success: true, id: info.messageId };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    console.error("[Email] Erreur SMTP :", message);
    return { success: false, error: message };
  }
}

/* ────────────────────────────────────────────────────────────────
   TEMPLATES EMAIL — HTML formaté pour chaque type de formulaire
   ──────────────────────────────────────────────────────────────── */

/** Notification d'inscription newsletter */
export function newsletterEmailHtml(email: string): string {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
      <div style="background: linear-gradient(135deg, #0ea5e9, #0284c7); padding: 24px; border-radius: 12px 12px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 20px;">📬 Nouvelle inscription newsletter</h1>
      </div>
      <div style="background: #f8fafc; padding: 24px; border: 1px solid #e2e8f0; border-top: 0; border-radius: 0 0 12px 12px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #475569; width: 120px;">Email</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">
              <a href="mailto:${email}" style="color: #0ea5e9;">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 0; font-weight: 600; color: #475569;">Date</td>
            <td style="padding: 12px 0; color: #1e293b;">${new Date().toLocaleString("fr-FR", { dateStyle: "full", timeStyle: "short" })}</td>
          </tr>
        </table>
      </div>
      <p style="text-align: center; color: #94a3b8; font-size: 12px; margin-top: 16px;">
        Email automatique — larmor-baden.com
      </p>
    </div>
  `;
}

/** Notification d'inscription professionnel */
export function proRegistrationEmailHtml(data: {
  businessName: string;
  category: string;
  contactName: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  description: string;
}): string {
  const categoryLabels: Record<string, string> = {
    restaurant: "Restaurant",
    excursion: "Excursion",
    hebergement: "Hébergement",
    location: "Location",
    activite: "Activité",
    commerce: "Commerce",
  };

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
      <div style="background: linear-gradient(135deg, #f59e0b, #d97706); padding: 24px; border-radius: 12px 12px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 20px;">🏢 Nouvelle demande d'inscription Pro</h1>
      </div>
      <div style="background: #f8fafc; padding: 24px; border: 1px solid #e2e8f0; border-top: 0; border-radius: 0 0 12px 12px;">
        <h2 style="color: #1e293b; font-size: 16px; margin: 0 0 16px 0;">Informations de l'établissement</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #475569; width: 140px;">Établissement</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b; font-weight: 600;">${data.businessName}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #475569;">Catégorie</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${categoryLabels[data.category] || data.category}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #475569;">Contact</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${data.contactName}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #475569;">Email</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">
              <a href="mailto:${data.email}" style="color: #0ea5e9;">${data.email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #475569;">Téléphone</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">
              <a href="tel:${data.phone}" style="color: #0ea5e9;">${data.phone}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #475569;">Site web</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">
              ${data.website ? `<a href="${data.website}" style="color: #0ea5e9;">${data.website}</a>` : "Non renseigné"}
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #475569;">Adresse</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${data.address}</td>
          </tr>
        </table>

        <h2 style="color: #1e293b; font-size: 16px; margin: 20px 0 12px 0;">Description</h2>
        <div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; color: #374151; line-height: 1.6;">
          ${data.description}
        </div>

        <div style="margin-top: 20px; padding: 16px; background: #fef3c7; border-radius: 8px; border: 1px solid #fde68a;">
          <p style="margin: 0; color: #92400e; font-size: 14px;">
            <strong>⚡ Action requise :</strong> Répondre au professionnel sous 24h pour finaliser l'inscription et le paiement (490€/an).
          </p>
        </div>
      </div>
      <p style="text-align: center; color: #94a3b8; font-size: 12px; margin-top: 16px;">
        Email automatique — larmor-baden.com
      </p>
    </div>
  `;
}
