import { NextRequest, NextResponse } from "next/server";
import { sendNotificationEmail, proRegistrationEmailHtml } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      businessName,
      category,
      contactName,
      email,
      phone,
      website,
      address,
      description,
    } = body;

    // Validation des champs obligatoires
    if (!businessName || !category || !contactName || !email || !phone || !address || !description) {
      return NextResponse.json(
        { error: "Veuillez remplir tous les champs obligatoires." },
        { status: 400 }
      );
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Format d'email invalide." },
        { status: 400 }
      );
    }

    // Envoyer la notification par email à contact@larmor-baden.com
    const emailResult = await sendNotificationEmail({
      subject: `🏢 Demande inscription Pro — ${businessName}`,
      html: proRegistrationEmailHtml({
        businessName,
        category,
        contactName,
        email,
        phone,
        website: website || "",
        address,
        description,
      }),
      replyTo: email,
    });

    if (!emailResult.success) {
      console.error("[Contact Pro] Erreur email :", emailResult.error);
      return NextResponse.json(
        { error: "Erreur lors de l'envoi. Veuillez réessayer ou nous contacter directement." },
        { status: 500 }
      );
    }

    console.log(`[Contact Pro] Demande envoyée : ${businessName} (${email})`);

    return NextResponse.json({
      success: true,
      message: "Votre demande a bien été envoyée. Nous vous contacterons sous 24h.",
    });
  } catch (error) {
    console.error("[Contact Pro] Erreur :", error);
    return NextResponse.json(
      { error: "Erreur serveur. Veuillez réessayer." },
      { status: 500 }
    );
  }
}
