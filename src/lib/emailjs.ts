import emailjs from '@emailjs/browser';
import type { LeadInput } from '../types';

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
const contactTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_CONTACT_ID as string | undefined;
const confirmationTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_CONFIRMATION_ID as string | undefined;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;

export const hasEmailConfig = Boolean(serviceId && contactTemplateId && confirmationTemplateId && publicKey);

export async function sendLeadEmails(lead: LeadInput) {
  if (!hasEmailConfig) return;

  const templateParams = {
    first_name: lead.first_name,
    last_name: lead.last_name,
    email: lead.email,
    phone: lead.phone,
    profile_type: lead.profile_type,
    need_type: lead.need_type,
    preferred_contact: lead.preferred_contact,
    message: lead.message,
    date: new Date().toLocaleString('fr-FR')
  };

  await Promise.all([
    emailjs.send(serviceId!, contactTemplateId!, templateParams, { publicKey }),
    emailjs.send(serviceId!, confirmationTemplateId!, templateParams, { publicKey })
  ]);
}
