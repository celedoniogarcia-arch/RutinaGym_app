import { useState } from 'react'

// ─── DATOS ───────────────────────────────────────────────────────────────────

const DIAS = [
  {
    id: 'lunes', nombre: 'Lunes', enfoque: 'Pecho + Tríceps', color: '#6366f1', bg: '#eef2ff', emoji: '💪',
    cardio: 'Caminata inclinada en cinta – 10 min (ritmo rápido)',
    ejercicios: [
      { id: 'pb', nombre: 'Press banca plano', musculo: 'Pecho (fibras medias)', series: 4, reps: '6–8', gif: 'https://www.muscles.wiki/gifs/barbell-bench-press.gif', tip: 'Espalda recta, escápulas juntas. Baja controlado hasta rozar el pecho.', alternativas: [{ nombre: 'Press con mancuernas banco plano', musculo: 'Pecho' }, { nombre: 'Press en máquina Smith', musculo: 'Pecho' }] },
      { id: 'pi', nombre: 'Press inclinado mancuernas', musculo: 'Pecho (parte superior)', series: 3, reps: '8–10', gif: 'https://www.muscles.wiki/gifs/incline-dumbbell-press.gif', tip: 'Banco a 30–45°. Codos a 45° del cuerpo.', alternativas: [{ nombre: 'Press inclinado con barra', musculo: 'Pecho superior' }, { nombre: 'Aperturas inclinadas', musculo: 'Pecho superior' }] },
      { id: 'fo', nombre: 'Fondos asistidos', musculo: 'Pecho inferior y tríceps', series: 3, reps: '8–10', gif: 'https://www.muscles.wiki/gifs/assisted-dip.gif', tip: 'Inclínate hacia adelante para activar más el pecho.', alternativas: [{ nombre: 'Crossover en polea baja', musculo: 'Pecho inferior' }, { nombre: 'Flexiones declinadas', musculo: 'Pecho inferior' }] },
      { id: 'ap', nombre: 'Aperturas en polea', musculo: 'Aislamiento de pecho', series: 3, reps: '12', gif: 'https://www.muscles.wiki/gifs/cable-fly.gif', tip: 'Ligera flexión en los codos. Controla la vuelta.', alternativas: [{ nombre: 'Aperturas con mancuernas', musculo: 'Pecho' }, { nombre: 'Pec-deck (mariposa)', musculo: 'Pecho' }] },
      { id: 'et', nombre: 'Extensión tríceps en polea', musculo: 'Tríceps (cabeza lateral)', series: 3, reps: '12', gif: 'https://www.muscles.wiki/gifs/tricep-pushdown.gif', tip: 'Codos pegados al cuerpo, extiende completamente.', alternativas: [{ nombre: 'Extensión con cuerda en polea', musculo: 'Tríceps' }, { nombre: 'Fondos en banco', musculo: 'Tríceps' }] },
      { id: 'pf', nombre: 'Press francés', musculo: 'Tríceps (cabeza larga)', series: 2, reps: '12', gif: 'https://www.muscles.wiki/gifs/skull-crusher.gif', tip: 'Codos apuntando al techo. Usa barra EZ.', alternativas: [{ nombre: 'Extensión sobre la cabeza con mancuerna', musculo: 'Tríceps' }] },
    ]
  },
  {
    id: 'martes', nombre: 'Martes', enfoque: 'Espalda + Bíceps', color: '#10b981', bg: '#ecfdf5', emoji: '🔙',
    cardio: 'Bicicleta – HIIT 10–12 min (30 seg fuerte / 60 seg suave)',
    ejercicios: [
      { id: 'jp', nombre: 'Jalón al pecho', musculo: 'Dorsal ancho', series: 4, reps: '8', gif: 'https://www.muscles.wiki/gifs/lat-pulldown.gif', tip: 'Tira hacia la clavícula. Pecho erguido, ligera inclinación atrás.', alternativas: [{ nombre: 'Dominadas asistidas', musculo: 'Dorsal' }, { nombre: 'Jalón en máquina', musculo: 'Dorsal' }] },
      { id: 'rb', nombre: 'Remo con barra', musculo: 'Espesor de espalda', series: 4, reps: '8', gif: 'https://www.muscles.wiki/gifs/barbell-row.gif', tip: 'Espalda paralela al suelo, tira hacia el ombligo.', alternativas: [{ nombre: 'Remo con mancuerna unilateral', musculo: 'Espalda media' }, { nombre: 'Remo en máquina', musculo: 'Espalda media' }] },
      { id: 'rs', nombre: 'Remo sentado en polea', musculo: 'Espalda media', series: 3, reps: '10', gif: 'https://www.muscles.wiki/gifs/seated-cable-row.gif', tip: 'No te balancees. Codos pegados al cuerpo.', alternativas: [{ nombre: 'Remo con mancuerna en banco inclinado', musculo: 'Espalda media' }] },
      { id: 'je', nombre: 'Jalón agarre estrecho', musculo: 'Dorsal y bíceps', series: 3, reps: '10', gif: 'https://www.muscles.wiki/gifs/close-grip-lat-pulldown.gif', tip: 'Agarre neutro o supino. Lleva codos hacia las caderas.', alternativas: [{ nombre: 'Dominadas agarre estrecho', musculo: 'Dorsal/Bíceps' }] },
      { id: 'cb', nombre: 'Curl con barra', musculo: 'Bíceps (cabeza larga)', series: 3, reps: '10', gif: 'https://www.muscles.wiki/gifs/barbell-curl.gif', tip: 'No balancees el cuerpo. Aprieta al máximo.', alternativas: [{ nombre: 'Curl barra EZ', musculo: 'Bíceps' }, { nombre: 'Curl alterno mancuernas', musculo: 'Bíceps' }] },
      { id: 'cm', nombre: 'Curl martillo', musculo: 'Bíceps (braquial)', series: 2, reps: '12', gif: 'https://www.muscles.wiki/gifs/hammer-curl.gif', tip: 'Agarre neutro (pulgar arriba). Trabaja braquial.', alternativas: [{ nombre: 'Curl martillo en polea', musculo: 'Braquial' }] },
    ]
  },
  {
    id: 'miercoles', nombre: 'Miércoles', enfoque: 'Pierna Completa', color: '#f97316', bg: '#fff7ed', emoji: '🦵',
    cardio: 'Caminata inclinada – 10 min (moderado)',
    ejercicios: [
      { id: 'sq', nombre: 'Sentadilla', musculo: 'Cuádriceps, glúteos', series: 4, reps: '6–8', gif: 'https://www.muscles.wiki/gifs/barbell-squat.gif', tip: 'Espalda recta, rodillas siguen pies. Muslo paralelo al suelo.', alternativas: [{ nombre: 'Sentadilla goblet', musculo: 'Cuádriceps/Glúteos' }, { nombre: 'Sentadilla en Smith', musculo: 'Cuádriceps/Glúteos' }] },
      { id: 'pr', nombre: 'Prensa', musculo: 'Cuádriceps, glúteos', series: 4, reps: '10', gif: 'https://www.muscles.wiki/gifs/leg-press.gif', tip: 'No bloquees rodillas al extender.', alternativas: [{ nombre: 'Sentadilla hack', musculo: 'Cuádriceps' }, { nombre: 'Zancadas con mancuernas', musculo: 'Cuádriceps/Glúteos' }] },
      { id: 'pmr', nombre: 'Peso muerto rumano', musculo: 'Isquiotibiales, glúteos', series: 3, reps: '10', gif: 'https://www.muscles.wiki/gifs/romanian-deadlift.gif', tip: 'Bisagra de cadera. Barra roza las piernas todo el recorrido.', alternativas: [{ nombre: 'Peso muerto rumano con mancuernas', musculo: 'Isquiotibiales' }] },
      { id: 'cf', nombre: 'Curl femoral', musculo: 'Isquiotibiales', series: 3, reps: '12', gif: 'https://www.muscles.wiki/gifs/leg-curl.gif', tip: 'No levantes las caderas. Aprieta al final.', alternativas: [{ nombre: 'Curl femoral de pie', musculo: 'Isquiotibiales' }, { nombre: 'Nordic hamstring', musculo: 'Isquiotibiales' }] },
      { id: 'ec', nombre: 'Extensión cuádriceps', musculo: 'Cuádriceps (aislado)', series: 3, reps: '12', gif: 'https://www.muscles.wiki/gifs/leg-extension.gif', tip: 'Control en la bajada. No uses impulso.', alternativas: [{ nombre: 'Sentadilla con salto', musculo: 'Cuádriceps' }] },
      { id: 'gp', nombre: 'Gemelos de pie', musculo: 'Gemelos', series: 4, reps: '15', gif: 'https://www.muscles.wiki/gifs/standing-calf-raise.gif', tip: 'Rango completo. Aguanta 1 seg arriba.', alternativas: [{ nombre: 'Elevación de talones sentado', musculo: 'Sóleo' }, { nombre: 'Gemelos en prensa', musculo: 'Gemelos' }] },
    ]
  },
  {
    id: 'jueves', nombre: 'Jueves', enfoque: 'Hombro + Core', color: '#8b5cf6', bg: '#f5f3ff', emoji: '🏔️',
    cardio: 'Remo o elíptica – 10 min (suave)',
    ejercicios: [
      { id: 'pm', nombre: 'Press militar', musculo: 'Deltoides anterior', series: 4, reps: '8', gif: 'https://www.muscles.wiki/gifs/overhead-press.gif', tip: 'Core tenso. No arquees la espalda.', alternativas: [{ nombre: 'Press militar con mancuernas', musculo: 'Hombros' }, { nombre: 'Press Arnold', musculo: 'Hombros (completo)' }] },
      { id: 'el', nombre: 'Elevaciones laterales', musculo: 'Deltoides lateral', series: 4, reps: '12', gif: 'https://www.muscles.wiki/gifs/lateral-raise.gif', tip: 'Pulgares ligeramente abajo. No subas más de 90°.', alternativas: [{ nombre: 'Elevaciones laterales en polea', musculo: 'Deltoides lateral' }] },
      { id: 'pp', nombre: 'Pájaros posteriores', musculo: 'Deltoides posterior', series: 3, reps: '12', gif: 'https://www.muscles.wiki/gifs/reverse-fly.gif', tip: 'Espalda plana, ligera flexión de codos.', alternativas: [{ nombre: 'Face pull con cuerda', musculo: 'Deltoides posterior' }] },
      { id: 'fp', nombre: 'Face pull', musculo: 'Rotadores, trapecio', series: 3, reps: '12', gif: 'https://www.muscles.wiki/gifs/face-pull.gif', tip: 'Polea a la altura de los ojos. Codos arriba.', alternativas: [{ nombre: 'Rotaciones externas con banda', musculo: 'Manguito rotador' }] },
      { id: 'entr', nombre: 'Encogimientos trapecio', musculo: 'Trapecio', series: 3, reps: '12', gif: 'https://www.muscles.wiki/gifs/dumbbell-shrug.gif', tip: 'Sube hombros hacia las orejas. No gires el cuello.', alternativas: [{ nombre: 'Encogimientos con barra', musculo: 'Trapecio' }] },
      { id: 'pl', nombre: 'Plancha', musculo: 'Core completo', series: 3, reps: '45 seg', gif: 'https://www.muscles.wiki/gifs/plank.gif', tip: 'Cuerpo en línea recta, glúteos apretados.', alternativas: [{ nombre: 'Plancha lateral', musculo: 'Oblicuos' }, { nombre: 'Plancha con toque de hombro', musculo: 'Core' }] },
      { id: 'crp', nombre: 'Crunch en polea', musculo: 'Abdominales', series: 3, reps: '15', gif: 'https://www.muscles.wiki/gifs/cable-crunch.gif', tip: 'Contrae hacia las rodillas, no tires con el cuello.', alternativas: [{ nombre: 'Crunch en suelo', musculo: 'Abdominales' }] },
      { id: 'evp', nombre: 'Elevación de piernas', musculo: 'Abdomen inferior', series: 3, reps: '12', gif: 'https://www.muscles.wiki/gifs/hanging-leg-raise.gif', tip: 'Sube las piernas sin balanceo.', alternativas: [{ nombre: 'Elevación de rodillas en barra', musculo: 'Abdomen inferior' }] },
    ]
  },
  {
    id: 'viernes', nombre: 'Viernes', enfoque: 'Full Body Metabólico', color: '#f59e0b', bg: '#fffbeb', emoji: '🔥',
    cardio: 'Caminata rápida – 10 min', circuito: true, vueltas: 4,
    ejercicios: [
      { id: 'sg', nombre: 'Sentadilla goblet', musculo: 'Cuádriceps, glúteos', series: 4, reps: '12', gif: 'https://www.muscles.wiki/gifs/goblet-squat.gif', tip: 'Kettlebell al pecho. Pecho erguido todo el recorrido.', alternativas: [{ nombre: 'Sentadilla con peso corporal', musculo: 'Cuádriceps/Glúteos' }] },
      { id: 'pman', nombre: 'Press mancuernas', musculo: 'Pecho, hombros', series: 4, reps: '12', gif: 'https://www.muscles.wiki/gifs/dumbbell-bench-press.gif', tip: 'Baja en 2 seg. Empuja explosivo.', alternativas: [{ nombre: 'Flexiones', musculo: 'Pecho/Hombros/Tríceps' }] },
      { id: 'rman', nombre: 'Remo mancuerna', musculo: 'Espalda', series: 4, reps: '12', gif: 'https://www.muscles.wiki/gifs/dumbbell-row.gif', tip: 'Apóyate en el banco. Codo pegado al cuerpo.', alternativas: [{ nombre: 'Remo con banda elástica', musculo: 'Espalda' }] },
      { id: 'pmk', nombre: 'Peso muerto kettlebell', musculo: 'Cadena posterior', series: 4, reps: '12', gif: 'https://www.muscles.wiki/gifs/kettlebell-deadlift.gif', tip: 'Bisagra de cadera. Empuja el suelo al subir.', alternativas: [{ nombre: 'Peso muerto con mancuernas', musculo: 'Cadena posterior' }] },
      { id: 'bur', nombre: 'Burpees', musculo: 'Full body', series: 4, reps: '10', gif: 'https://www.muscles.wiki/gifs/burpee.gif', tip: 'Explosivo en el salto, controlado en la bajada.', alternativas: [{ nombre: 'Burpee sin salto', musculo: 'Full body (menor impacto)' }, { nombre: 'Mountain climbers', musculo: 'Core/Cardio' }] },
      { id: 'planv', nombre: 'Plancha', musculo: 'Core', series: 4, reps: '45 seg', gif: 'https://www.muscles.wiki/gifs/plank.gif', tip: 'Respira controlado. No dejes caer las caderas.', alternativas: [{ nombre: 'Plancha sobre rodillas', musculo: 'Core (principiante)' }] },
    ]
  },
]

const PLATOS = {
  postEntreno: [
    { nombre: 'Pollo + arroz + brócoli', kcal: 580, p: 52, c: 60, g: 10, receta: '200g pechuga a la plancha, 80g arroz basmati, brócoli al vapor con AOVE' },
    { nombre: 'Salmón + boniato + ensalada', kcal: 560, p: 45, c: 50, g: 14, receta: '180g salmón al horno con limón, 200g boniato, lechuga y tomate' },
    { nombre: 'Ternera + pasta integral', kcal: 600, p: 50, c: 58, g: 12, receta: '180g ternera, 80g pasta integral, salsa de tomate natural' },
  ],
  comida: [
    { nombre: 'Merluza + quinoa + verduras', kcal: 520, p: 48, c: 50, g: 9, receta: '200g merluza al vapor, 70g quinoa, pimientos y cebolla salteados' },
    { nombre: 'Pechuga al horno + garbanzos', kcal: 540, p: 50, c: 45, g: 10, receta: '200g pechuga, 150g garbanzos, pimientos rojos asados' },
    { nombre: 'Atún + arroz + aguacate', kcal: 510, p: 46, c: 48, g: 13, receta: '2 latas atún al natural, 70g arroz, 1/2 aguacate, limón' },
  ],
  merienda: [
    { nombre: 'Yogur griego + frutos rojos', kcal: 320, p: 22, c: 28, g: 12, receta: '200g yogur griego 0%, 80g arándanos, 15g nueces' },
    { nombre: 'Batido proteico + plátano', kcal: 340, p: 32, c: 38, g: 5, receta: '30g proteína de suero, 250ml leche semidesnatada, 1 plátano' },
    { nombre: 'Tostadas + huevo + aguacate', kcal: 360, p: 20, c: 32, g: 16, receta: '2 tostadas integrales, 2 huevos revueltos, 1/2 aguacate' },
  ],
  cena: [
    { nombre: 'Tortilla + ensalada mixta', kcal: 380, p: 32, c: 10, g: 18, receta: '3 huevos, cebolla, pimiento, ensalada con AOVE' },
    { nombre: 'Salmón a la plancha + espárragos', kcal: 400, p: 40, c: 6, g: 16, receta: '180g salmón, espárragos a la plancha, limón' },
    { nombre: 'Pollo al horno + calabacín', kcal: 360, p: 42, c: 12, g: 10, receta: '200g pechuga con hierbas, calabacín y cebolla salteados' },
  ],
}

const AVATARS = ['💪', '🏃', '🧘', '🏋️', '⚡', '🦁', '🔥', '🌟']

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function useLS(key, init) {
  const [val, setVal] = useState(() => {
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : init }
    catch { return init }
  })
  const save = v => { setVal(v); try { localStorage.setItem(key, JSON.stringify(v)) } catch {} }
  return [val, save]
}

function getWeekKey() {
  const now = new Date()
  const startOfYear = new Date(now.getFullYear(), 0, 1)
  const week = Math.ceil(((now - startOfYear) / 86400000 + startOfYear.getDay() + 1) / 7)
  return `${now.getFullYear()}-W${String(week).padStart(2, '0')}`
}

function getPrevWeekKey() {
  const d = new Date()
  d.setDate(d.getDate() - 7)
  const start = new Date(d.getFullYear(), 0, 1)
  const week = Math.ceil(((d - start) / 86400000 + start.getDay() + 1) / 7)
  return `${d.getFullYear()}-W${String(week).padStart(2, '0')}`
}

const S = {
  page: { maxWidth: 430, margin: '0 auto', minHeight: '100dvh', background: '#f5f5f7', paddingBottom: 80 },
  header: { background: '#fff', padding: '52px 20px 16px', borderBottom: '1px solid #e5e5ea' },
  card: { background: '#fff', borderRadius: 16, overflow: 'hidden', marginBottom: 10 },
  input: { width: '100%', padding: '12px 14px', borderRadius: 12, border: '1px solid #e5e5ea', background: '#f5f5f7', color: '#1c1c1e', fontSize: 16 },
  btnPrimary: (color) => ({ padding: '14px', borderRadius: 14, background: color, color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 15, width: '100%' }),
  btnPill: (active, color) => ({ padding: '8px 16px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, background: active ? color : '#f5f5f7', color: active ? '#fff' : '#8e8e93', flexShrink: 0 }),
  label: { fontSize: 12, color: '#8e8e93', marginBottom: 5, fontWeight: 500 },
  nav: { position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 430, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(20px)', borderTop: '1px solid #e5e5ea', display: 'flex', paddingBottom: 'env(safe-area-inset-bottom,0px)' },
}

// ─── PANTALLA DE USUARIOS ─────────────────────────────────────────────────────

function PantallaUsuarios({ users, onSelect, onCreate, onDelete }) {
  const [creando, setCreando] = useState(false)
  const [nombre, setNombre] = useState('')
  const [avatar, setAvatar] = useState('💪')

  function guardar() {
    if (!nombre.trim()) return
    onCreate({ id: Date.now().toString(), nombre: nombre.trim(), avatar })
    setNombre(''); setAvatar('💪'); setCreando(false)
  }

  return (
    <div style={{ maxWidth: 430, margin: '0 auto', minHeight: '100dvh', background: '#f5f5f7', padding: '60px 20px 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{ fontSize: 48 }}>🏋️</div>
        <div style={{ fontSize: 26, fontWeight: 800, color: '#1c1c1e', marginTop: 12 }}>RutinaGym</div>
        <div style={{ fontSize: 14, color: '#8e8e93', marginTop: 6 }}>¿Quién entrena hoy?</div>
      </div>

      {/* Usuarios existentes */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
        {users.map(u => (
          <div key={u.id} style={{ background: '#fff', borderRadius: 16, display: 'flex', alignItems: 'center', padding: '14px 16px', gap: 14 }}>
            <div style={{ fontSize: 36 }}>{u.avatar}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 17, fontWeight: 700, color: '#1c1c1e' }}>{u.nombre}</div>
              <div style={{ fontSize: 12, color: '#8e8e93', marginTop: 2 }}>Toca para entrar</div>
            </div>
            <button onClick={() => onSelect(u)}
              style={{ padding: '10px 18px', borderRadius: 12, background: '#6366f1', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14 }}>
              Entrar
            </button>
            <button onClick={() => { if (confirm(`¿Eliminar a ${u.nombre}? Se borrarán todos sus datos.`)) onDelete(u.id) }}
              style={{ padding: '10px', borderRadius: 12, background: '#fff0f0', color: '#ff3b30', border: 'none', cursor: 'pointer', fontSize: 16 }}>
              🗑️
            </button>
          </div>
        ))}
      </div>

      {/* Crear nuevo */}
      {!creando ? (
        <button onClick={() => setCreando(true)}
          style={{ width: '100%', padding: '16px', borderRadius: 16, border: '2px dashed #d1d5db', background: 'transparent', color: '#6366f1', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
          + Añadir usuario
        </button>
      ) : (
        <div style={{ background: '#fff', borderRadius: 16, padding: '20px' }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>Nuevo usuario</div>
          <div style={S.label}>Nombre</div>
          <input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="ej: Carlos"
            style={{ ...S.input, marginBottom: 16 }} />
          <div style={S.label}>Avatar</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
            {AVATARS.map(a => (
              <button key={a} onClick={() => setAvatar(a)}
                style={{ width: 48, height: 48, borderRadius: 12, border: avatar === a ? '2px solid #6366f1' : '2px solid #e5e5ea', background: avatar === a ? '#eef2ff' : '#fff', fontSize: 24, cursor: 'pointer' }}>
                {a}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => setCreando(false)} style={{ flex: 1, padding: '13px', borderRadius: 12, background: '#f5f5f7', color: '#8e8e93', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Cancelar</button>
            <button onClick={guardar} style={{ flex: 2, ...S.btnPrimary('#6366f1'), borderRadius: 12 }}>Crear</button>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [users, setUsers] = useLS('rg_users', [])
  const [userId, setUserId] = useState(null)
  const [tab, setTab] = useState('entreno')
  const [diaIdx, setDiaIdx] = useState(0)
  const [ejAbierto, setEjAbierto] = useState(null)
  const [altAbierta, setAltAbierta] = useState(null)
  const [allData, setAllData] = useLS('rg_data', {})
  const [pesoInput, setPesoInput] = useState('')
  const [dieta, setDieta] = useLS('rg_dieta', {})
  const [dietaCalc, setDietaCalc] = useState(null)
  const [platoAbierto, setPlatoAbierto] = useState(null)

  const user = users.find(u => u.id === userId)
  const ud = allData[userId] || {}

  function setUd(newUd) {
    setAllData({ ...allData, [userId]: newUd })
  }

  // registros[diaId][ejId][fecha][sN] = peso
  const registros = ud.registros || {}
  function setPesoEj(diaId, ejId, serie, val) {
    const hoy = new Date().toLocaleDateString('es-ES')
    const r = JSON.parse(JSON.stringify(registros))
    if (!r[diaId]) r[diaId] = {}
    if (!r[diaId][ejId]) r[diaId][ejId] = {}
    if (!r[diaId][ejId][hoy]) r[diaId][ejId][hoy] = {}
    r[diaId][ejId][hoy][`s${serie}`] = val
    setUd({ ...ud, registros: r })
  }
  function getPesoEj(diaId, ejId, serie) {
    const hoy = new Date().toLocaleDateString('es-ES')
    return registros[diaId]?.[ejId]?.[hoy]?.[`s${serie}`] || ''
  }
  function getMaxEj(diaId, ejId) {
    let max = 0
    Object.values(registros[diaId]?.[ejId] || {}).forEach(d => Object.values(d).forEach(p => { if (Number(p) > max) max = Number(p) }))
    return max || null
  }

  // Peso corporal
  const histPeso = ud.histPeso || []
  function addPeso() {
    if (!pesoInput) return
    const entry = { fecha: new Date().toLocaleDateString('es-ES'), peso: Number(pesoInput), semana: getWeekKey() }
    setUd({ ...ud, histPeso: [...histPeso, entry] })
    setPesoInput('')
  }

  // Progreso semanal — guardar snapshot al cerrar semana
  const progSemanal = ud.progSemanal || {}

  function guardarSemana() {
    const semana = getWeekKey()
    const snapshot = {}
    DIAS.forEach(d => {
      d.ejercicios.forEach(ej => {
        const max = getMaxEj(d.id, ej.id)
        if (max) {
          if (!snapshot[d.id]) snapshot[d.id] = {}
          snapshot[d.id][ej.id] = { nombre: ej.nombre, max }
        }
      })
    })
    const pesoActual = histPeso.at(-1)?.peso
    setUd({ ...ud, progSemanal: { ...progSemanal, [semana]: { snapshot, peso: pesoActual, fecha: new Date().toLocaleDateString('es-ES') } } })
    alert(`✅ Progreso de la semana ${semana} guardado`)
  }

  // Dieta
  const dUser = dieta[userId] || { altura: '', edad: '', pesoActual: '', pesoObj: '', meta: 'recomposicion', sexo: 'hombre' }
  function setDUser(d) { setDieta({ ...dieta, [userId]: d }) }

  function calcDieta() {
    const { altura, edad, pesoActual, meta, sexo } = dUser
    if (!altura || !edad || !pesoActual) return
    const h = +altura, e = +edad, pa = +pesoActual
    const tmb = sexo === 'hombre' ? 10 * pa + 6.25 * h - 5 * e + 5 : 10 * pa + 6.25 * h - 5 * e - 161
    const tdee = Math.round(tmb * 1.55)
    const kcal = meta === 'perder' ? tdee - 400 : meta === 'ganar' ? tdee + 300 : tdee
    const p = Math.round(pa * 2.0)
    const g = Math.round(kcal * 0.25 / 9)
    const c = Math.round((kcal - p * 4 - g * 9) / 4)
    setDietaCalc({ tdee, kcal, p, c, g })
  }

  // Pantalla de usuarios
  if (!userId) return (
    <PantallaUsuarios
      users={users}
      onSelect={u => setUserId(u.id)}
      onCreate={u => setUsers([...users, u])}
      onDelete={id => {
        setUsers(users.filter(u => u.id !== id))
        const newData = { ...allData }; delete newData[id]; setAllData(newData)
      }}
    />
  )

  const dia = DIAS[diaIdx]
  const weekKey = getWeekKey()
  const prevKey = getPrevWeekKey()
  const semanasGuardadas = Object.entries(progSemanal).sort((a, b) => b[0].localeCompare(a[0]))

  const TABS = [
    { id: 'entreno', icon: '🏋️', label: 'Entreno' },
    { id: 'peso', icon: '⚖️', label: 'Peso' },
    { id: 'dieta', icon: '🥗', label: 'Dieta' },
    { id: 'progreso', icon: '📈', label: 'Progreso' },
  ]

  return (
    <div style={S.page}>
      {/* HEADER */}
      <div style={S.header}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#1c1c1e', letterSpacing: -0.5 }}>
              {tab === 'entreno' ? '🏋️ Entreno' : tab === 'peso' ? '⚖️ Mi peso' : tab === 'dieta' ? '🥗 Nutrición' : '📈 Progreso'}
            </div>
            <div style={{ fontSize: 13, color: '#8e8e93', marginTop: 3 }}>
              {tab === 'entreno' ? 'Rutina 5 días · Bajar grasa y ganar músculo' :
               tab === 'peso' ? 'Control de peso corporal' :
               tab === 'dieta' ? 'Plan personalizado de alimentación' : 'Historial y evolución semanal'}
            </div>
          </div>
          {/* Avatar usuario */}
          <button onClick={() => setUserId(null)}
            style={{ width: 42, height: 42, borderRadius: 14, background: '#eef2ff', border: 'none', cursor: 'pointer', fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {user?.avatar}
          </button>
        </div>
      </div>

      <div style={{ padding: '16px 12px 0' }}>

        {/* ══ ENTRENO ══ */}
        {tab === 'entreno' && (
          <>
            <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, marginBottom: 12 }}>
              {DIAS.map((d, i) => (
                <button key={d.id} style={S.btnPill(diaIdx === i, d.color)}
                  onClick={() => { setDiaIdx(i); setEjAbierto(null); setAltAbierta(null) }}>
                  {d.emoji} {d.nombre}
                </button>
              ))}
            </div>
            <div style={{ ...S.card, background: dia.bg, marginBottom: 12 }}>
              <div style={{ padding: 16 }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: dia.color }}>{dia.enfoque}</div>
                {dia.circuito && <div style={{ marginTop: 4, fontSize: 12, fontWeight: 700, color: dia.color }}>⚡ CIRCUITO – {dia.vueltas} VUELTAS · descanso 2 min</div>}
                <div style={{ marginTop: 8, fontSize: 12, color: '#8e8e93' }}>🏃 {dia.cardio}</div>
              </div>
            </div>

            {dia.ejercicios.map((ej, idx) => {
              const open = ejAbierto === ej.id
              const altOpen = altAbierta === ej.id
              const max = getMaxEj(dia.id, ej.id)
              return (
                <div key={ej.id} style={{ ...S.card, border: open ? `2px solid ${dia.color}` : '2px solid transparent' }}>
                  <button onClick={() => { setEjAbierto(open ? null : ej.id); setAltAbierta(null) }}
                    style={{ width: '100%', padding: '14px 16px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 10, background: dia.bg, color: dia.color, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{idx + 1}</div>
                    <div style={{ flex: 1, textAlign: 'left' }}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: '#1c1c1e' }}>{ej.nombre}</div>
                      <div style={{ fontSize: 12, color: '#8e8e93', marginTop: 2 }}>{ej.musculo}</div>
                    </div>
                    <div style={{ textAlign: 'right', marginRight: 6 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: dia.color }}>{ej.series}×{ej.reps}</div>
                      {max && <div style={{ fontSize: 11, color: '#8e8e93' }}>🏆 {max}kg</div>}
                    </div>
                    <span style={{ color: '#c7c7cc', fontSize: 11 }}>{open ? '▲' : '▼'}</span>
                  </button>

                  {open && (
                    <div style={{ borderTop: '1px solid #f2f2f7', padding: '14px 16px' }}>
                      <div style={{ borderRadius: 12, overflow: 'hidden', marginBottom: 12, background: '#f5f5f7', aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={ej.gif} alt={ej.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }} />
                        <div style={{ display: 'none', flexDirection: 'column', alignItems: 'center', gap: 8, color: '#8e8e93' }}>
                          <span style={{ fontSize: 32 }}>🏋️</span><span style={{ fontSize: 13 }}>{ej.nombre}</span>
                        </div>
                      </div>
                      <div style={{ background: dia.bg, borderRadius: 10, padding: '10px 12px', marginBottom: 14 }}>
                        <span style={{ fontSize: 12, color: dia.color, fontWeight: 600 }}>💡 </span>
                        <span style={{ fontSize: 12, color: '#3c3c43' }}>{ej.tip}</span>
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#3c3c43', marginBottom: 10 }}>Registra el peso por serie:</div>
                      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(ej.series, 4)}, 1fr)`, gap: 8, marginBottom: 14 }}>
                        {Array.from({ length: ej.series }, (_, i) => i + 1).map(s => (
                          <div key={s}>
                            <div style={{ fontSize: 11, color: '#8e8e93', marginBottom: 4, textAlign: 'center' }}>Serie {s}</div>
                            <input type="number" inputMode="decimal" placeholder="kg"
                              value={getPesoEj(dia.id, ej.id, s)}
                              onChange={e => setPesoEj(dia.id, ej.id, s, e.target.value)}
                              style={{ ...S.input, textAlign: 'center', padding: '10px 8px', fontSize: 18, fontWeight: 700 }} />
                          </div>
                        ))}
                      </div>
                      <button onClick={() => setAltAbierta(altOpen ? null : ej.id)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '9px 14px', borderRadius: 10, border: `1px solid ${dia.color}`, background: 'transparent', color: dia.color, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                        🔄 {altOpen ? 'Ocultar alternativas' : `Ver alternativas (${ej.alternativas.length})`}
                      </button>
                      {altOpen && (
                        <div style={{ marginTop: 10, background: '#f5f5f7', borderRadius: 12, overflow: 'hidden' }}>
                          {ej.alternativas.map((alt, i) => (
                            <div key={i} style={{ padding: '11px 14px', borderBottom: i < ej.alternativas.length - 1 ? '1px solid #e5e5ea' : 'none', display: 'flex', justifyContent: 'space-between' }}>
                              <div>
                                <div style={{ fontSize: 13, fontWeight: 600, color: '#1c1c1e' }}>{alt.nombre}</div>
                                <div style={{ fontSize: 11, color: '#8e8e93', marginTop: 2 }}>{alt.musculo}</div>
                              </div>
                              <span style={{ fontSize: 18 }}>💪</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </>
        )}

        {/* ══ PESO ══ */}
        {tab === 'peso' && (
          <>
            <div style={{ ...S.card, padding: 16 }}>
              <div style={S.label}>Peso de hoy</div>
              <div style={{ display: 'flex', gap: 10 }}>
                <input type="number" inputMode="decimal" placeholder="ej: 78.5"
                  value={pesoInput} onChange={e => setPesoInput(e.target.value)}
                  style={{ ...S.input, flex: 1, fontSize: 20, fontWeight: 700 }} />
                <span style={{ padding: '12px 0', color: '#8e8e93', fontWeight: 600, alignSelf: 'center' }}>kg</span>
                <button onClick={addPeso} style={{ ...S.btnPrimary('#6366f1'), width: 'auto', padding: '12px 20px', borderRadius: 12 }}>Guardar</button>
              </div>
            </div>

            {histPeso.length > 0 && (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
                  <div style={{ ...S.card, padding: 16, textAlign: 'center' }}>
                    <div style={{ fontSize: 12, color: '#8e8e93' }}>Peso actual</div>
                    <div style={{ fontSize: 28, fontWeight: 800, color: '#6366f1', marginTop: 4 }}>{histPeso.at(-1).peso}</div>
                    <div style={{ fontSize: 13, color: '#8e8e93' }}>kg</div>
                  </div>
                  <div style={{ ...S.card, padding: 16, textAlign: 'center' }}>
                    <div style={{ fontSize: 12, color: '#8e8e93' }}>Cambio total</div>
                    {histPeso.length > 1 ? (
                      <>
                        <div style={{ fontSize: 28, fontWeight: 800, marginTop: 4, color: histPeso.at(-1).peso <= histPeso[0].peso ? '#10b981' : '#f97316' }}>
                          {(histPeso.at(-1).peso - histPeso[0].peso > 0 ? '+' : '')}{(histPeso.at(-1).peso - histPeso[0].peso).toFixed(1)}
                        </div>
                        <div style={{ fontSize: 13, color: '#8e8e93' }}>kg</div>
                      </>
                    ) : <div style={{ fontSize: 22, marginTop: 8 }}>—</div>}
                  </div>
                </div>
                <div style={{ ...S.card, padding: 16, marginBottom: 10 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#8e8e93', marginBottom: 14 }}>Evolución</div>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 80 }}>
                    {histPeso.slice(-14).map((e, i, arr) => {
                      const pesos = arr.map(x => x.peso)
                      const min = Math.min(...pesos), rng = Math.max(...pesos) - min || 1
                      const h = Math.round(((e.peso - min) / rng) * 56 + 16)
                      return (
                        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                          <div style={{ width: '100%', height: h, borderRadius: '4px 4px 0 0', background: i === arr.length - 1 ? '#6366f1' : '#e0e0f0' }} />
                          {i === arr.length - 1 && <div style={{ fontSize: 9, color: '#6366f1', fontWeight: 700 }}>{e.peso}</div>}
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div style={S.card}>
                  <div style={{ padding: '14px 16px 8px', fontSize: 13, fontWeight: 700, color: '#8e8e93' }}>HISTORIAL</div>
                  {[...histPeso].reverse().slice(0, 15).map((e, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderTop: '1px solid #f2f2f7' }}>
                      <span style={{ fontSize: 14, color: '#3c3c43' }}>{e.fecha}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        {e.semana && <span style={{ fontSize: 11, color: '#8e8e93', background: '#f5f5f7', padding: '2px 8px', borderRadius: 8 }}>{e.semana}</span>}
                        <span style={{ fontSize: 16, fontWeight: 700, color: '#1c1c1e' }}>{e.peso} kg</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            {histPeso.length === 0 && (
              <div style={{ textAlign: 'center', padding: '60px 0', color: '#8e8e93' }}>
                <div style={{ fontSize: 48 }}>⚖️</div>
                <div style={{ marginTop: 12, fontSize: 15 }}>Registra tu primer pesaje</div>
              </div>
            )}
          </>
        )}

        {/* ══ DIETA ══ */}
        {tab === 'dieta' && (
          <>
            <div style={{ ...S.card, padding: 16, marginBottom: 10 }}>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>Tus datos</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
                {[['Altura (cm)', 'altura', '175'], ['Edad (años)', 'edad', '30'], ['Peso actual (kg)', 'pesoActual', '80'], ['Peso objetivo (kg)', 'pesoObj', '75']].map(([l, k, ph]) => (
                  <div key={k}><div style={S.label}>{l}</div>
                    <input type="number" inputMode="decimal" placeholder={ph} value={dUser[k]}
                      onChange={e => setDUser({ ...dUser, [k]: e.target.value })} style={S.input} /></div>
                ))}
              </div>
              <div style={S.label}>Sexo</div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                {[['hombre', '♂ Hombre'], ['mujer', '♀ Mujer']].map(([v, l]) => (
                  <button key={v} style={{ ...S.btnPill(dUser.sexo === v, '#6366f1'), flex: 1 }} onClick={() => setDUser({ ...dUser, sexo: v })}>{l}</button>
                ))}
              </div>
              <div style={S.label}>Objetivo</div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                {[['perder', '🔥 Bajar'], ['recomposicion', '⚡ Recomp'], ['ganar', '💪 Ganar']].map(([v, l]) => (
                  <button key={v} style={{ ...S.btnPill(dUser.meta === v, '#6366f1'), flex: 1 }} onClick={() => setDUser({ ...dUser, meta: v })}>{l}</button>
                ))}
              </div>
              <button style={S.btnPrimary('#6366f1')} onClick={calcDieta}>Calcular mi plan</button>
            </div>

            {dietaCalc && (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: 10 }}>
                  {[['Calorías', dietaCalc.kcal, 'kcal', '#f97316'], ['Proteína', dietaCalc.p, 'g', '#6366f1'], ['Carbos', dietaCalc.c, 'g', '#f59e0b']].map(([l, v, u, c]) => (
                    <div key={l} style={{ ...S.card, padding: 14, textAlign: 'center' }}>
                      <div style={{ fontSize: 11, color: '#8e8e93' }}>{l}</div>
                      <div style={{ fontSize: 22, fontWeight: 800, color: c, marginTop: 4 }}>{v}</div>
                      <div style={{ fontSize: 11, color: '#8e8e93' }}>{u}</div>
                    </div>
                  ))}
                </div>
                <div style={{ ...S.card, padding: '12px 16px', marginBottom: 10, display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 13, color: '#8e8e93' }}>Grasas: <b style={{ color: '#a855f7' }}>{dietaCalc.g}g</b></span>
                  <span style={{ fontSize: 13, color: '#8e8e93' }}>Mantenimiento: <b>{dietaCalc.tdee} kcal</b></span>
                </div>
                {[
                  { hora: '08:00', label: 'Entreno (en ayunas)', icon: '💪', color: '#6366f1', tipo: null, nota: 'Café solo o agua antes del entrenamiento' },
                  { hora: '09:00', label: 'Post-entreno', icon: '🍗', color: '#10b981', tipo: 'postEntreno', nota: 'Proteína + carbohidratos para recuperar' },
                  { hora: '13:00', label: 'Comida principal', icon: '🍽️', color: '#f97316', tipo: 'comida', nota: 'Mayor aporte calórico del día' },
                  { hora: '17:00', label: 'Merienda', icon: '🥛', color: '#f59e0b', tipo: 'merienda', nota: 'Proteína + fruta o carbohidrato ligero' },
                  { hora: '22:00', label: 'Cena', icon: '🌙', color: '#8b5cf6', tipo: 'cena', nota: 'Proteína + verduras, pocos carbos' },
                ].map(({ hora, label, icon, color, tipo, nota }) => (
                  <div key={hora} style={{ ...S.card, marginBottom: 10 }}>
                    <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 12, background: color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{icon}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: 15, fontWeight: 700 }}>{label}</span>
                          <span style={{ fontSize: 13, fontWeight: 700, color }}>{hora}</span>
                        </div>
                        <div style={{ fontSize: 12, color: '#8e8e93', marginTop: 2 }}>{nota}</div>
                      </div>
                    </div>
                    {tipo && PLATOS[tipo] && (
                      <div style={{ borderTop: '1px solid #f2f2f7' }}>
                        {PLATOS[tipo].map((plato, i) => (
                          <div key={i}>
                            <button onClick={() => setPlatoAbierto(platoAbierto === `${tipo}-${i}` ? null : `${tipo}-${i}`)}
                              style={{ width: '100%', padding: '12px 16px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: i < PLATOS[tipo].length - 1 ? '1px solid #f2f2f7' : 'none' }}>
                              <span style={{ fontSize: 14, color: '#1c1c1e', textAlign: 'left' }}>🍽️ {plato.nombre}</span>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <span style={{ fontSize: 12, fontWeight: 700, color }}>{plato.kcal} kcal</span>
                                <span style={{ fontSize: 11, color: '#c7c7cc' }}>{platoAbierto === `${tipo}-${i}` ? '▲' : '▼'}</span>
                              </div>
                            </button>
                            {platoAbierto === `${tipo}-${i}` && (
                              <div style={{ background: '#f9f9fb', padding: '12px 16px' }}>
                                <div style={{ fontSize: 13, color: '#3c3c43', marginBottom: 10, lineHeight: 1.5 }}>📋 {plato.receta}</div>
                                <div style={{ display: 'flex', gap: 8 }}>
                                  {[['P', plato.p, '#6366f1'], ['C', plato.c, '#f59e0b'], ['G', plato.g, '#a855f7']].map(([l, v, c]) => (
                                    <div key={l} style={{ flex: 1, background: '#fff', borderRadius: 10, padding: 8, textAlign: 'center' }}>
                                      <div style={{ fontSize: 10, color: '#8e8e93' }}>{l === 'P' ? 'Proteína' : l === 'C' ? 'Carbos' : 'Grasas'}</div>
                                      <div style={{ fontSize: 17, fontWeight: 800, color: c }}>{v}g</div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}
          </>
        )}

        {/* ══ PROGRESO ══ */}
        {tab === 'progreso' && (
          <>
            {/* Guardar semana */}
            <div style={{ ...S.card, padding: 16, marginBottom: 10, background: '#eef2ff' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#6366f1', marginBottom: 4 }}>📅 Semana actual: {weekKey}</div>
              <div style={{ fontSize: 12, color: '#8e8e93', marginBottom: 12 }}>Guarda un snapshot de tus mejores marcas esta semana para comparar con semanas anteriores.</div>
              <button onClick={guardarSemana} style={S.btnPrimary('#6366f1')}>💾 Guardar progreso de esta semana</button>
            </div>

            {/* Resumen */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
              <div style={{ ...S.card, padding: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 12, color: '#8e8e93' }}>Peso actual</div>
                <div style={{ fontSize: 26, fontWeight: 800, color: '#6366f1', marginTop: 4 }}>{histPeso.at(-1)?.peso ?? '—'}{histPeso.length ? ' kg' : ''}</div>
              </div>
              <div style={{ ...S.card, padding: 16, textAlign: 'center' }}>
                <div style={{ fontSize: 12, color: '#8e8e93' }}>Semanas guardadas</div>
                <div style={{ fontSize: 26, fontWeight: 800, color: '#10b981', marginTop: 4 }}>{semanasGuardadas.length}</div>
              </div>
            </div>

            {/* Semanas guardadas */}
            {semanasGuardadas.map(([semana, data], si) => {
              const anterior = semanasGuardadas[si + 1]?.[1]
              return (
                <div key={semana} style={{ ...S.card, marginBottom: 10, overflow: 'hidden' }}>
                  <div style={{ padding: '12px 16px', background: '#f5f5f7', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontSize: 14, fontWeight: 800, color: '#1c1c1e' }}>{semana}</span>
                      {si === 0 && <span style={{ marginLeft: 8, fontSize: 11, background: '#6366f1', color: '#fff', padding: '2px 8px', borderRadius: 10 }}>Última</span>}
                    </div>
                    {data.peso && <span style={{ fontSize: 13, color: '#8e8e93' }}>⚖️ {data.peso} kg</span>}
                  </div>
                  {DIAS.map(d => {
                    const ejsSemana = Object.entries(data.snapshot?.[d.id] || {})
                    if (!ejsSemana.length) return null
                    return (
                      <div key={d.id} style={{ borderTop: '1px solid #f2f2f7' }}>
                        <div style={{ padding: '8px 16px', background: d.bg }}>
                          <span style={{ fontSize: 12, fontWeight: 700, color: d.color }}>{d.emoji} {d.enfoque}</span>
                        </div>
                        {ejsSemana.map(([ejId, m], i) => {
                          const prevMax = anterior?.snapshot?.[d.id]?.[ejId]?.max
                          const diff = prevMax ? m.max - prevMax : null
                          return (
                            <div key={ejId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', borderTop: '1px solid #f2f2f7' }}>
                              <span style={{ fontSize: 13, color: '#1c1c1e' }}>{m.nombre}</span>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                {diff !== null && (
                                  <span style={{ fontSize: 12, fontWeight: 700, color: diff > 0 ? '#10b981' : diff < 0 ? '#f97316' : '#8e8e93' }}>
                                    {diff > 0 ? `▲ +${diff}` : diff < 0 ? `▼ ${diff}` : '—'} kg
                                  </span>
                                )}
                                <span style={{ fontSize: 14, fontWeight: 800, color: '#f59e0b' }}>🏆 {m.max} kg</span>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    )
                  })}
                </div>
              )
            })}

            {semanasGuardadas.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: '#8e8e93' }}>
                <div style={{ fontSize: 48 }}>📅</div>
                <div style={{ marginTop: 16, fontSize: 16, fontWeight: 600, color: '#1c1c1e' }}>Sin semanas guardadas</div>
                <div style={{ marginTop: 8, fontSize: 14 }}>Entrena, registra pesos y guarda tu semana para ver la evolución</div>
              </div>
            )}
          </>
        )}
      </div>

      {/* NAV */}
      <div style={S.nav}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{ flex: 1, padding: '10px 0 12px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <span style={{ fontSize: 24 }}>{t.icon}</span>
            <span style={{ fontSize: 10, fontWeight: tab === t.id ? 700 : 400, color: tab === t.id ? '#6366f1' : '#8e8e93' }}>{t.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
