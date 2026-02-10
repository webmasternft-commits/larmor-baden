import { NextRequest, NextResponse } from "next/server";
import { sendNotificationEmail, newsletterEmailHtml } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || "";
    let email: string | null = null;

    if (contentType.includes("application/json")) {
      const body = await request.json();
      email = body.email;
    } else {
      const formData = await request.formData();
      email = formData.get("email") as string;
    }

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Adresse email invalide" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Format d'email invalide" },
        { status: 400 }
      );
    }

    // Envoyer la notification par email à contact@larmor-baden.com
    const emailResult = await sendNotificationEmail({
      subject: `📬 Nouvelle inscription newsletter — ${email}`,
      html: newsletterEmailHtml(email),
      replyTo: email,
    });

    if (!emailResult.success) {
      console.error("[Newsletter] Erreur email :", emailResult.error);
      // On ne bloque pas l'inscription si l'email échoue
    }

    console.log(`[Newsletter] Inscription : ${email}`);

    // Pour les soumissions de formulaire HTML, rediriger
    if (!contentType.includes("application/json")) {
      return NextResponse.redirect(new URL("/?subscribed=true", request.url));
    }

    return NextResponse.json({
      success: true,
      message: "Inscription réussie ! Bienvenue dans notre newsletter.",
    });
  } catch (error) {
    console.error("[Newsletter] Erreur :", error);
    return NextResponse.json(
      { error: "Erreur lors de l'inscription" },
      { status: 500 }
    );
  }
}
