// Emails every new enquiry to info@hemingwayslakeside.com via Gmail SMTP.
// GMAIL_APP_PASSWORD comes from functions/.env (not committed).

import { onDocumentCreated } from 'firebase-functions/v2/firestore'
import nodemailer from 'nodemailer'

const TO = 'info@hemingwayslakeside.com'

export const emailEnquiry = onDocumentCreated(
  { document: 'enquiries/{id}', database: 'default', region: 'asia-southeast1', secrets: [], maxInstances: 3 },
  async event => {
    const d = event.data?.data()
    if (!d) return

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: TO, pass: process.env.GMAIL_APP_PASSWORD },
    })

    const lines = [
      `Name: ${d.name || '-'}`,
      `Phone: ${d.phone || '-'}`,
      `Email: ${d.email || '-'}`,
      `Type: ${d.type || '-'}`,
      `Preferred date: ${d.date || '-'}`,
      `Guests: ${d.guestCount ?? '-'}`,
      '',
      `Message:`,
      d.message || '-',
      '',
      `Submitted: ${d.createdAt || new Date().toISOString()}`,
      `Manage: https://hemingwayslakeside.com/admin`,
    ]

    await transporter.sendMail({
      from: `"Hemingways Website" <${TO}>`,
      to: TO,
      replyTo: d.email || undefined,
      subject: `New ${d.type || 'general'} enquiry — ${d.name || 'No name'}`,
      text: lines.join('\n'),
    })
  }
)
