/**
 * Guarda o elimina una suscripción push en Supabase.
 * POST { endpoint, p256dh, auth, userId }  → suscribir
 * DELETE { endpoint }                       → desuscribir
 */

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY

export default async function handler(req, res) {
  if (!SUPABASE_URL || !SERVICE_KEY) return res.status(500).json({ error: 'Missing env' })
  const supabase = createClient(SUPABASE_URL, SERVICE_KEY)

  if (req.method === 'POST') {
    const { endpoint, p256dh, auth, userId } = req.body
    if (!endpoint || !p256dh || !auth) return res.status(400).json({ error: 'Missing fields' })
    const { error } = await supabase.from('push_subscriptions').upsert(
      { endpoint, p256dh, auth, user_id: userId || null, updated_at: new Date().toISOString() },
      { onConflict: 'endpoint' }
    )
    if (error) return res.status(500).json({ error: error.message })
    return res.status(200).json({ ok: true })
  }

  if (req.method === 'DELETE') {
    const { endpoint } = req.body
    if (!endpoint) return res.status(400).json({ error: 'Missing endpoint' })
    await supabase.from('push_subscriptions').delete().eq('endpoint', endpoint)
    return res.status(200).json({ ok: true })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
