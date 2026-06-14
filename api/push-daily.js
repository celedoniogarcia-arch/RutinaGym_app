/**
 * Vercel Serverless Function — envía recordatorio diario a todos los suscriptores.
 * Se ejecuta via cron (ver vercel.json). También puede llamarse manualmente.
 *
 * Variables de entorno necesarias en Vercel:
 *   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY
 */

import webPush from 'web-push'
import { createClient } from '@supabase/supabase-js'

const VAPID_PUBLIC  = process.env.VAPID_PUBLIC_KEY  || process.env.VITE_VAPID_PUBLIC_KEY
const VAPID_PRIVATE = process.env.VAPID_PRIVATE_KEY
const SUPABASE_URL  = process.env.SUPABASE_URL      || process.env.VITE_SUPABASE_URL
const SERVICE_KEY   = process.env.SUPABASE_SERVICE_ROLE_KEY

webPush.setVapidDetails('mailto:cgarciar@mediapro.tv', VAPID_PUBLIC, VAPID_PRIVATE)

const MENSAJES = [
  { title: '💪 ¡Hoy toca entrenar!', body: 'Tu rutina de hoy te espera. ¡Vamos a por ello!' },
  { title: '🏋️ TrainClub te llama', body: 'Cada sesión cuenta. Abre la app y a entrenar.' },
  { title: '🔥 ¡No pierdas el ritmo!', body: 'Tu racha sigue viva. Abre TrainClub y regístrala.' },
  { title: '🎯 Objetivo del día', body: 'Recuerda tu entrenamiento de hoy. ¡Tú puedes!' },
  { title: '⚡ ¡A mover el cuerpo!', body: 'Tu rutina personalizada te está esperando en TrainClub.' },
]

export default async function handler(req, res) {
  // Seguridad: solo desde cron de Vercel o con header correcto
  const authHeader = req.headers['authorization']
  if (req.method !== 'GET' && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (!VAPID_PUBLIC || !VAPID_PRIVATE || !SUPABASE_URL || !SERVICE_KEY) {
    return res.status(500).json({ error: 'Missing env vars' })
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_KEY)

  // Obtener todas las suscripciones activas
  const { data: subs, error } = await supabase.from('push_subscriptions').select('*')
  if (error) return res.status(500).json({ error: error.message })

  const msg = MENSAJES[new Date().getDay() % MENSAJES.length]
  const payload = JSON.stringify({ title: msg.title, body: msg.body, url: '/' })

  let ok = 0, fail = 0
  const expired = []

  await Promise.all((subs || []).map(async sub => {
    try {
      await webPush.sendNotification({
        endpoint: sub.endpoint,
        keys: { p256dh: sub.p256dh, auth: sub.auth },
      }, payload)
      ok++
    } catch (e) {
      fail++
      // Suscripción expirada o inválida → marcar para borrar
      if (e.statusCode === 410 || e.statusCode === 404) expired.push(sub.id)
    }
  }))

  // Limpiar suscripciones expiradas
  if (expired.length > 0) {
    await supabase.from('push_subscriptions').delete().in('id', expired)
  }

  return res.status(200).json({ sent: ok, failed: fail, cleaned: expired.length })
}
