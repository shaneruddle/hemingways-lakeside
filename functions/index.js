// HTTP function: emails enquiry details to info@hemingwayslakeside.com via Gmail SMTP.
// Called by the website's EnquiryForm after the enquiry is saved to Firestore.
// (Firestore triggers are unavailable: the 'default' DB is in asia-southeast3.)
// GMAIL_APP_PASSWORD comes from functions/.env (not committed).

import { onRequest } from 'firebase-functions/v2/https'
import nodemailer from 'nodemailer'

const TO = 'info@hemingwayslakeside.com'
const ALLOWED_ORIGINS = ['https://hemingwayslakeside.com', 'https://www.hemingwayslakeside.com', 'http://localhost:5173']

export const emailEnquiry = onRequest(
  { region: 'asia-southeast1', maxInstances: 3, cors: ALLOWED_ORIGINS },
  async (req, res) => {
    if (req.method !== 'POST') { res.status(405).send('Method not allowed'); return }

    const d = req.body || {}
    if (!d.name || !d.phone) { res.status(400).json({ ok: false, error: 'name and phone required' }); return }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: TO, pass: process.env.GMAIL_APP_PASSWORD },
    })

    const lines = [
      `Name: ${d.name}`,
      `Phone: ${d.phone}`,
      `Email: ${d.email || '-'}`,
      `Type: ${d.type || 'general'}`,
      `Preferred date: ${d.date || '-'}`,
      `Guests: ${d.guestCount ?? '-'}`,
      '',
      'Message:',
      d.message || '-',
      '',
      `Submitted: ${new Date().toISOString()}`,
      'Manage: https://hemingwayslakeside.com/admin',
    ]

    try {
      await transporter.sendMail({
        from: `"Hemingways Website" <${TO}>`,
        to: TO,
        replyTo: d.email || undefined,
        subject: `New ${d.type || 'general'} enquiry — ${d.name}`,
        text: lines.join('\n'),
      })
      res.json({ ok: true })
    } catch (err) {
      console.error('sendMail failed', err)
      res.status(500).json({ ok: false })
    }
  }
)
