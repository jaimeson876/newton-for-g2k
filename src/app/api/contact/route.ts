// ── Contact form handler ─────────────────────────────────────────────────
// Submissions are captured by Netlify Forms (visible in your Netlify dashboard
// under Site → Forms → "reach-out"). No API key needed.
//
// To ALSO receive email notifications when a message arrives:
//   1. Add RESEND_API_KEY to Netlify environment variables
//   2. Add CONTACT_EMAIL (your Google Workspace address, e.g. newton@yourdomain.com)
//   3. Uncomment the Resend block below and redeploy

interface ContactPayload {
  name: string;
  email: string;
  organisation?: string;
  message: string;
}

export async function POST(req: Request) {
  try {
    const body = await req.json() as ContactPayload;
    const { name, email, organisation = "", message } = body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    // ── Email notification via Resend ────────────────────────────────────
    // Uncomment when you have RESEND_API_KEY + CONTACT_EMAIL set in Netlify:
    //
    // const resendKey = process.env.RESEND_API_KEY;
    // const toEmail   = process.env.CONTACT_EMAIL;
    //
    // if (resendKey && toEmail) {
    //   const { Resend } = await import("resend");
    //   const resend = new Resend(resendKey);
    //   await resend.emails.send({
    //     from: "Newton for G2K <noreply@newtonforg2k.info>",
    //     to: toEmail,
    //     replyTo: email,
    //     subject: `New message from ${name}`,
    //     text: [
    //       `Name: ${name}`,
    //       `Email: ${email}`,
    //       organisation ? `Organisation: ${organisation}` : "",
    //       "",
    //       `Message:`,
    //       message,
    //     ].filter(Boolean).join("\n"),
    //   });
    // }

    // Log for Netlify function logs (always available in Netlify dashboard)
    console.log("[contact-form]", { name, email, organisation, timestamp: new Date().toISOString() });

    return Response.json({ success: true });
  } catch (err) {
    console.error("[contact-form] error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
