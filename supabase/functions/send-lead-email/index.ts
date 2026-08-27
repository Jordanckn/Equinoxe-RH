import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!;
const CAROLINE_EMAIL = 'contact.actrh@gmail.com';
const FROM_EMAIL = 'ACT&RH <noreply@act-rh.com>';

const GOLD = '#C9B27C';
const DARK = '#111111';
const IVORY = '#F5F0E8';
const SAND = '#DDD6CA';

function emailBase(content: string): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>ACT&RH</title>
</head>
<body style="margin:0;padding:0;background:${IVORY};font-family:Georgia,'Times New Roman',serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:${IVORY};padding:40px 16px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
      <!-- Header -->
      <tr>
        <td style="background:${DARK};border-radius:16px 16px 0 0;padding:32px 40px;text-align:center;">
          <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:${GOLD};">CABINET CONSEIL RH & COACHING</p>
          <h1 style="margin:8px 0 0;font-size:32px;font-weight:600;color:${GOLD};letter-spacing:0.04em;">ACT&RH</h1>
          <p style="margin:6px 0 0;font-size:11px;color:rgba(201,178,124,0.65);letter-spacing:0.06em;font-style:italic;">Accompagnement · Conseil en Transition &amp; Ressources Humaines</p>
          <p style="margin:6px 0 0;font-size:10px;color:rgba(255,255,255,0.4);letter-spacing:0.12em;">TOULOUSE · OCCITANIE · À DISTANCE</p>
        </td>
      </tr>
      <!-- Body -->
      <tr>
        <td style="background:#ffffff;padding:40px 40px 32px;border-left:1px solid ${SAND};border-right:1px solid ${SAND};">
          ${content}
        </td>
      </tr>
      <!-- Footer -->
      <tr>
        <td style="background:${IVORY};border:1px solid ${SAND};border-top:none;border-radius:0 0 16px 16px;padding:24px 40px;text-align:center;">
          <p style="margin:0;font-size:12px;color:#888;line-height:1.7;">
            ACT&RH — Caroline Tillou Maratuech<br/>
            10bis rue de Garin, 31500 Toulouse<br/>
            <a href="mailto:contact.actrh@gmail.com" style="color:${GOLD};text-decoration:none;">contact.actrh@gmail.com</a> · 06 87 02 25 08
          </p>
          <p style="margin:16px 0 0;font-size:11px;color:#aaa;">Ce message a été généré automatiquement depuis le site act-rh.com</p>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

function confirmationEmail(lead: Record<string, string>): string {
  const content = `
    <p style="margin:0 0 8px;font-size:13px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${GOLD};">Confirmation de demande</p>
    <h2 style="margin:0 0 24px;font-size:24px;font-weight:600;color:${DARK};line-height:1.3;">
      Merci ${lead.first_name}, votre demande a bien été reçue.
    </h2>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.8;color:#444;">
      Je reviendrai vers vous dans les <strong>48h ouvrées</strong> pour convenir d'un premier échange, sans engagement de votre part.
    </p>
    <p style="margin:0 0 24px;font-size:15px;line-height:1.8;color:#444;">
      Cet échange gratuit et confidentiel permettra de poser les premiers repères et d'identifier si un accompagnement peut répondre à votre situation.
    </p>

    <!-- Récapitulatif -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background:${IVORY};border-radius:12px;border:1px solid ${SAND};margin:0 0 28px;">
      <tr><td style="padding:20px 24px;">
        <p style="margin:0 0 14px;font-size:11px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#999;">Récapitulatif de votre demande</p>
        ${row('Besoin', lead.need_type)}
        ${row('Profil', lead.profile_type)}
        ${row('Contact préféré', lead.preferred_contact)}
        ${lead.message ? rowBlock('Votre message', lead.message) : ''}
      </td></tr>
    </table>

    <p style="margin:0 0 24px;font-size:14px;line-height:1.7;color:#666;font-style:italic;">
      En attendant, n'hésitez pas à explorer les ressources disponibles sur <a href="https://act-rh.com" style="color:${GOLD};text-decoration:none;">act-rh.com</a>.
    </p>

    <table cellpadding="0" cellspacing="0">
      <tr><td style="background:${DARK};border-radius:50px;padding:14px 32px;">
        <a href="https://act-rh.com/contact" style="color:#fff;text-decoration:none;font-size:14px;font-weight:700;letter-spacing:0.04em;">
          Caroline Tillou Maratuech — ACT&RH
        </a>
      </td></tr>
    </table>
  `;
  return emailBase(content);
}

function notificationEmail(lead: Record<string, string>): string {
  const date = new Date().toLocaleString('fr-FR', { dateStyle: 'long', timeStyle: 'short' });
  const content = `
    <p style="margin:0 0 8px;font-size:13px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${GOLD};">Nouveau lead — ${date}</p>
    <h2 style="margin:0 0 24px;font-size:22px;font-weight:600;color:${DARK};">
      ${lead.first_name} ${lead.last_name} a rempli le formulaire de contact.
    </h2>

    <!-- Identité -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background:${IVORY};border-radius:12px;border:1px solid ${SAND};margin:0 0 20px;">
      <tr><td style="padding:20px 24px;">
        <p style="margin:0 0 14px;font-size:11px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#999;">Coordonnées</p>
        ${row('Prénom', lead.first_name)}
        ${row('Nom', lead.last_name)}
        ${row('Email', `<a href="mailto:${lead.email}" style="color:${GOLD};text-decoration:none;">${lead.email}</a>`)}
        ${lead.phone ? row('Téléphone', `<a href="tel:${lead.phone}" style="color:${GOLD};text-decoration:none;">${lead.phone}</a>`) : ''}
        ${row('Contact préféré', lead.preferred_contact)}
      </td></tr>
    </table>

    <!-- Besoin -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background:${IVORY};border-radius:12px;border:1px solid ${SAND};margin:0 0 20px;">
      <tr><td style="padding:20px 24px;">
        <p style="margin:0 0 14px;font-size:11px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#999;">Demande</p>
        ${row('Profil', lead.profile_type)}
        ${row('Besoin', lead.need_type)}
        ${lead.message ? rowBlock('Message', lead.message) : ''}
        ${row('Source', lead.source ?? 'site web')}
      </td></tr>
    </table>

    <!-- CTA actions -->
    <table cellpadding="0" cellspacing="0" style="margin-bottom:8px;">
      <tr>
        <td style="padding-right:12px;">
          <table cellpadding="0" cellspacing="0">
            <tr>
              <td style="background:${GOLD};border-radius:50px;padding:13px 28px;">
                <a href="mailto:${lead.email}?subject=Suite%20%C3%A0%20votre%20demande%20ACT%26RH&body=Bonjour%20${encodeURIComponent(lead.first_name)}%2C%0A%0A" style="color:${DARK};text-decoration:none;font-size:14px;font-weight:700;">
                  Répondre à ${lead.first_name}
                </a>
              </td>
            </tr>
          </table>
        </td>
        <td>
          <table cellpadding="0" cellspacing="0">
            <tr>
              <td style="background:${DARK};border-radius:50px;padding:13px 28px;border:1px solid #333;">
                <a href="https://act-rh.com/admin" style="color:#fff;text-decoration:none;font-size:14px;font-weight:700;">
                  Voir dans l'admin
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
  return emailBase(content);
}

function row(label: string, value: string): string {
  return `<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:10px;">
    <tr>
      <td width="140" style="font-size:12px;font-weight:700;color:#999;text-transform:uppercase;letter-spacing:0.1em;padding-top:2px;">${label}</td>
      <td style="font-size:14px;color:${DARK};font-weight:600;">${value}</td>
    </tr>
  </table>`;
}

function rowBlock(label: string, value: string): string {
  return `<div style="margin-bottom:10px;">
    <p style="margin:0 0 6px;font-size:12px;font-weight:700;color:#999;text-transform:uppercase;letter-spacing:0.1em;">${label}</p>
    <p style="margin:0;font-size:14px;color:#444;line-height:1.7;background:#fff;border-radius:8px;padding:12px 14px;border:1px solid ${SAND};">${value.replace(/\n/g, '<br/>')}</p>
  </div>`;
}

async function sendEmail(to: string, subject: string, html: string) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: FROM_EMAIL, to, subject, html }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Resend error: ${err}`);
  }
  return res.json();
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type' } });
  }

  try {
    const lead = await req.json() as Record<string, string>;

    await Promise.all([
      // Email de confirmation au client
      sendEmail(
        lead.email,
        `ACT&RH — Votre demande a bien été reçue`,
        confirmationEmail(lead)
      ),
      // Notification à Caroline
      sendEmail(
        CAROLINE_EMAIL,
        `[ACT&RH] Nouveau lead — ${lead.first_name} ${lead.last_name} (${lead.need_type})`,
        notificationEmail(lead)
      ),
    ]);

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }
});
