import { useState, useEffect } from 'react'

const DIAS = [
  {
    id: 'lunes',
    nombre: 'Lunes',
    enfoque: 'Pecho + Tríceps',
    color: '#3b82f6',
    emoji: '💪',
    cardio: 'Caminata inclinada en cinta – 10 min (ritmo rápido)',
    ejercicios: [
      { id: 'pb', nombre: 'Press banca plano', musculo: 'Pecho (fibras medias)', series: 4, reps: '6–8', gif: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGF2bWZ5dHNiZHZmNGd4NnZ6dHllY2ttYXZhOW5jenRtZnV0NXZmMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKMt1VVNkHV2PaE/giphy.gif' },
      { id: 'pi', nombre: 'Press inclinado mancuernas', musculo: 'Pecho (parte superior)', series: 3, reps: '8–10', gif: '' },
      { id: 'fo', nombre: 'Fondos asistidos', musculo: 'Pecho inferior y tríceps', series: 3, reps: '8–10', gif: '' },
      { id: 'ap', nombre: 'Aperturas en polea', musculo: 'Aislamiento de pecho', series: 3, reps: '12', gif: '' },
      { id: 'et', nombre: 'Extensión tríceps en polea', musculo: 'Tríceps (cabeza lateral)', series: 3, reps: '12', gif: '' },
      { id: 'pf', nombre: 'Press francés', musculo: 'Tríceps (cabeza larga)', series: 2, reps: '12', gif: '' },
    ]
  },
  {
    id: 'martes',
    nombre: 'Martes',
    enfoque: 'Espalda + Bíceps',
    color: '#22c55e',
    emoji: '🔙',
    cardio: 'Bicicleta – HIIT 10–12 min (30 seg fuerte / 60 seg suave)',
    ejercicios: [
      { id: 'jp', nombre: 'Jalón al pecho', musculo: 'Dorsal ancho (espalda)', series: 4, reps: '8', gif: '' },
      { id: 'rb', nombre: 'Remo con barra', musculo: 'Espesor de espalda', series: 4, reps: '8', gif: '' },
      { id: 'rs', nombre: 'Remo sentado en polea', musculo: 'Espalda media', series: 3, reps: '10', gif: '' },
      { id: 'je', nombre: 'Jalón agarre estrecho', musculo: 'Dorsal y bíceps', series: 3, reps: '10', gif: '' },
      { id: 'cb', nombre: 'Curl con barra', musculo: 'Bíceps (cabeza larga)', series: 3, reps: '10', gif: '' },
      { id: 'cm', nombre: 'Curl martillo', musculo: 'Bíceps (braquial)', series: 2, reps: '12', gif: '' },
    ]
  },
  {
    id: 'miercoles',
    nombre: 'Miércoles',
    enfoque: 'Pierna Completa',
    color: '#f97316',
    emoji: '🦵',
    cardio: 'Caminata inclinada – 10 min (moderado)',
    ejercicios: [
      { id: 'sq', nombre: 'Sentadilla', musculo: 'Cuádriceps, glúteos', series: 4, reps: '6–8', gif: '' },
      { id: 'pr', nombre: 'Prensa', musculo: 'Cuádriceps, glúteos', series: 4, reps: '10', gif: '' },
      { id: 'pmr', nombre: 'Peso muerto rumano', musculo: 'Isquiotibiales, glúteos', series: 3, reps: '10', gif: '' },
      { id: 'cf', nombre: 'Curl femoral', musculo: 'Isquiotibiales', series: 3, reps: '12', gif: '' },
      { id: 'ec', nombre: 'Extensión cuádriceps', musculo: 'Cuádriceps (aislado)', series: 3, reps: '12', gif: '' },
      { id: 'gp', nombre: 'Gemelos de pie', musculo: 'Gemelos (pantorrillas)', series: 4, reps: '15', gif: '' },
    ]
  },
  {
    id: 'jueves',
    nombre: 'Jueves',
    enfoque: 'Hombro + Core',
    color: '#a855f7',
    emoji: '🏔️',
    cardio: 'Remo o elíptica – 10 min (suave)',
    ejercicios: [
      { id: 'pm', nombre: 'Press militar', musculo: 'Deltoides anterior', series: 4, reps: '8', gif: '' },
      { id: 'el', nombre: 'Elevaciones laterales', musculo: 'Deltoides lateral', series: 4, reps: '12', gif: '' },
      { id: 'pp', nombre: 'Pájaros posteriores', musculo: 'Deltoides posterior', series: 3, reps: '12', gif: '' },
      { id: 'fp', nombre: 'Face pull', musculo: 'Rotadores, trapecio', series: 3, reps: '12', gif: '' },
      { id: 'entr', nombre: 'Encogimientos trapecio', musculo: 'Trapecio', series: 3, reps: '12', gif: '' },
      { id: 'pl', nombre: 'Plancha', musculo: 'Core completo', series: 3, reps: '45 seg', gif: '' },
      { id: 'crp', nombre: 'Crunch en polea', musculo: 'Abdominales', series: 3, reps: '15', gif: '' },
      { id: 'evp', nombre: 'Elevación de piernas', musculo: 'Abdomen inferior', series: 3, reps: '12', gif: '' },
    ]
  },
  {
    id: 'viernes',
    nombre: 'Viernes',
    enfoque: 'Full Body Metabólico',
    color: '#eab308',
    emoji: '🔥',
    cardio: 'Caminata rápida – 10 min',
    circuito: true,
    vueltas: 4,
    ejercicios: [
      { id: 'sg', nombre: 'Sentadilla goblet', musculo: 'Cuádriceps, glúteos', series: 4, reps: '12', gif: '' },
      { id: 'pman', nombre: 'Press mancuernas', musculo: 'Pecho, hombros', series: 4, reps: '12', gif: '' },
      { id: 'rman', nombre: 'Remo mancuerna', musculo: 'Espalda', series: 4, reps: '12', gif: '' },
      { id: 'pmk', nombre: 'Peso muerto kettlebell', musculo: 'Cadena posterior', series: 4, reps: '12', gif: '' },
      { id: 'bur', nombre: 'Burpees', musculo: 'Full body', series: 4, reps: '10', gif: '' },
      { id: 'planv', nombre: 'Plancha', musculo: 'Core', series: 4, reps: '45 seg', gif: '' },
    ]
  }
]

const TABS = ['entreno', 'peso', 'dieta', 'progreso']
const TAB_ICONS = { entreno: '🏋️', peso: '⚖️', dieta: '🥗', progreso: '📈' }
const TAB_LABELS = { entreno: 'Entreno', peso: 'Peso', dieta: 'Dieta', progreso: 'Progreso' }

const PLATOS = {
  desayuno: [
    { nombre: 'Tortilla de claras + avena', calorias: 420, p: 38, c: 45, g: 8, receta: '4 claras + 1 huevo entero, 60g avena con canela y arándanos' },
    { nombre: 'Greek yogurt + fruta + nueces', calorias: 380, p: 30, c: 42, g: 12, receta: '200g yogur griego 0%, 1 plátano, 15g nueces' },
    { nombre: 'Batido proteico + tostadas', calorias: 400, p: 40, c: 40, g: 8, receta: '30g whey, 250ml leche desnatada, 2 tostadas integrales con AOVE' },
  ],
  postEntreno: [
    { nombre: 'Pollo + arroz + verduras', calorias: 580, p: 52, c: 60, g: 10, receta: '200g pechuga a la plancha, 80g arroz basmati, brócoli al vapor' },
    { nombre: 'Salmón + patata dulce', calorias: 560, p: 45, c: 50, g: 14, receta: '180g salmón al horno, 200g boniato cocido, ensalada verde' },
    { nombre: 'Ternera + pasta integral', calorias: 600, p: 50, c: 58, g: 12, receta: '180g ternera magra, 80g pasta integral, tomate natural' },
  ],
  comida: [
    { nombre: 'Merluza + quinoa + ensalada', calorias: 520, p: 48, c: 50, g: 9, receta: '200g merluza al vapor, 70g quinoa, lechuga, tomate, pepino, AOVE' },
    { nombre: 'Pechuga al horno + legumbres', calorias: 540, p: 50, c: 45, g: 10, receta: '200g pechuga, 150g garbanzos cocidos, pimientos salteados' },
    { nombre: 'Atún + arroz + aguacate', calorias: 510, p: 46, c: 48, g: 13, receta: '2 latas atún, 70g arroz, 1/2 aguacate, limón' },
  ],
  cena: [
    { nombre: 'Tortilla francesa + ensalada', calorias: 380, p: 32, c: 10, g: 18, receta: '3 huevos enteros, ensalada mixta con AOVE y vinagre' },
    { nombre: 'Salmón a la plancha + verduras', calorias: 400, p: 40, c: 15, g: 16, receta: '180g salmón, espárragos a la plancha, brócoli al vapor' },
    { nombre: 'Pollo + calabacín salteado', calorias: 360, p: 42, c: 12, g: 10, receta: '200g pechuga, calabacín, cebolla, ajo, hierbas provenzales' },
  ],
}

function useLocalStorage(key, init) {
  const [val, setVal] = useState(() => {
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : init }
    catch { return init }
  })
  const save = (v) => { setVal(v); try { localStorage.setItem(key, JSON.stringify(v)) } catch {} }
  return [val, save]
}

export default function App() {
  const [tab, setTab] = useState('entreno')
  const [diaActivo, setDiaActivo] = useState(0)
  const [ejercicioAbierto, setEjercicioAbierto] = useState(null)
  const [registros, setRegistros] = useLocalStorage('registros', {})
  const [histPeso, setHistPeso] = useLocalStorage('histPeso', [])
  const [pesoInput, setPesoInput] = useState('')
  const [dieta, setDieta] = useLocalStorage('dieta', { altura: '', edad: '', pesoActual: '', pesoObj: '', meta: 'recomposicion', sexo: 'hombre' })
  const [dietaCalc, setDietaCalc] = useState(null)
  const [platoSeleccionado, setPlatoSeleccionado] = useState(null)

  const dia = DIAS[diaActivo]

  function registrarSerie(ejercicioId, serie, peso) {
    const key = `${dia.id}-${ejercicioId}`
    const prev = registros[key] || {}
    const hoy = new Date().toLocaleDateString('es-ES')
    const entrada = prev[hoy] || {}
    setRegistros({ ...registros, [key]: { ...prev, [hoy]: { ...entrada, [`s${serie}`]: peso } } })
  }

  function getPeso(ejercicioId, serie) {
    const key = `${dia.id}-${ejercicioId}`
    const hoy = new Date().toLocaleDateString('es-ES')
    return registros[key]?.[hoy]?.[`s${serie}`] || ''
  }

  function getMaxPeso(ejercicioId) {
    const key = `${dia.id}-${ejercicioId}`
    const datos = registros[key] || {}
    let max = 0
    Object.values(datos).forEach(dia => Object.values(dia).forEach(p => { if (Number(p) > max) max = Number(p) }))
    return max || null
  }

  function calcularDieta() {
    const { altura, edad, pesoActual, pesoObj, meta, sexo } = dieta
    if (!altura || !edad || !pesoActual) return
    const h = Number(altura), e = Number(edad), pa = Number(pesoActual), po = Number(pesoObj) || pa
    const tmb = sexo === 'hombre' ? 10 * pa + 6.25 * h - 5 * e + 5 : 10 * pa + 6.25 * h - 5 * e - 161
    const tdee = Math.round(tmb * 1.55)
    const calorias = meta === 'perder' ? tdee - 400 : meta === 'ganar' ? tdee + 300 : tdee
    const proteina = Math.round(pa * 2.0)
    const grasas = Math.round(calorias * 0.25 / 9)
    const carbos = Math.round((calorias - proteina * 4 - grasas * 9) / 4)
    setDietaCalc({ tdee, calorias, proteina, carbos, grasas, diferencia: calorias - tdee })
  }

  const ultimoPeso = histPeso.length ? histPeso[histPeso.length - 1].peso : null

  return (
    <div style={{ maxWidth: 480, margin: '0 auto', minHeight: '100vh', paddingBottom: 80 }}>

      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', padding: '20px 16px 16px', borderBottom: '1px solid #333' }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: -0.5 }}>RutinaGym 💪</h1>
        <p style={{ fontSize: 12, color: '#888', marginTop: 2 }}>Bajar grasa · Ganar músculo · 5 días</p>
      </div>

      {/* Content */}
      <div style={{ padding: '0 0 16px' }}>

        {/* ENTRENO */}
        {tab === 'entreno' && (
          <div>
            {/* Selector de días */}
            <div style={{ display: 'flex', gap: 6, padding: '12px 12px 0', overflowX: 'auto' }}>
              {DIAS.map((d, i) => (
                <button key={d.id} onClick={() => { setDiaActivo(i); setEjercicioAbierto(null) }}
                  style={{ flex: '0 0 auto', padding: '8px 14px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 700,
                    background: diaActivo === i ? d.color : '#1e1e1e', color: diaActivo === i ? '#fff' : '#888', transition: 'all .2s' }}>
                  {d.nombre}
                </button>
              ))}
            </div>

            {/* Info día */}
            <div style={{ margin: '12px 12px 0', padding: '14px 16px', borderRadius: 14, background: '#1a1a1a', borderLeft: `4px solid ${dia.color}` }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: dia.color }}>{dia.emoji} {dia.enfoque}</div>
              {dia.circuito && <div style={{ fontSize: 11, color: '#f97316', marginTop: 4, fontWeight: 600 }}>⚡ CIRCUITO – {dia.vueltas} VUELTAS (descanso 2 min)</div>}
              <div style={{ fontSize: 11, color: '#666', marginTop: 6 }}>🏃 {dia.cardio}</div>
            </div>

            {/* Lista ejercicios */}
            <div style={{ padding: '10px 12px 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {dia.ejercicios.map((ej, idx) => {
                const abierto = ejercicioAbierto === ej.id
                const max = getMaxPeso(ej.id)
                return (
                  <div key={ej.id} style={{ borderRadius: 12, background: '#1a1a1a', border: `1px solid ${abierto ? dia.color : '#2a2a2a'}`, overflow: 'hidden', transition: 'border .2s' }}>
                    <button onClick={() => setEjercicioAbierto(abierto ? null : ej.id)}
                      style={{ width: '100%', padding: '12px 14px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ width: 28, height: 28, borderRadius: 8, background: dia.color + '22', color: dia.color, fontSize: 13, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{idx + 1}</span>
                      <div style={{ flex: 1, textAlign: 'left' }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: '#f0f0f0' }}>{ej.nombre}</div>
                        <div style={{ fontSize: 11, color: '#666', marginTop: 2 }}>{ej.musculo}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: dia.color }}>{ej.series}×{ej.reps}</div>
                        {max && <div style={{ fontSize: 10, color: '#888' }}>🏆 {max}kg</div>}
                      </div>
                      <span style={{ color: '#555', fontSize: 12 }}>{abierto ? '▲' : '▼'}</span>
                    </button>

                    {abierto && (
                      <div style={{ padding: '0 14px 14px' }}>
                        <div style={{ fontSize: 11, color: '#666', marginBottom: 10, paddingTop: 4, borderTop: '1px solid #2a2a2a' }}>Registra el peso (kg) por serie:</div>
                        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                          {Array.from({ length: ej.series }, (_, i) => i + 1).map(s => (
                            <div key={s} style={{ flex: '1 1 60px' }}>
                              <div style={{ fontSize: 10, color: '#888', marginBottom: 4 }}>Serie {s}</div>
                              <input
                                type="number" inputMode="decimal" placeholder="kg"
                                value={getPeso(ej.id, s)}
                                onChange={e => registrarSerie(ej.id, s, e.target.value)}
                                style={{ width: '100%', padding: '8px', borderRadius: 8, border: '1px solid #333', background: '#111', color: '#f0f0f0', fontSize: 14, textAlign: 'center' }}
                              />
                            </div>
                          ))}
                        </div>
                        {max && <div style={{ marginTop: 10, fontSize: 12, color: '#888' }}>Tu mejor marca: <span style={{ color: dia.color, fontWeight: 700 }}>{max} kg</span></div>}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* PESO */}
        {tab === 'peso' && (
          <div style={{ padding: '16px 12px 0' }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 16 }}>⚖️ Control de peso</h2>

            <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
              <input type="number" inputMode="decimal" placeholder="Peso hoy (kg)"
                value={pesoInput} onChange={e => setPesoInput(e.target.value)}
                style={{ flex: 1, padding: '12px', borderRadius: 10, border: '1px solid #333', background: '#1a1a1a', color: '#f0f0f0', fontSize: 16 }} />
              <button onClick={() => {
                if (!pesoInput) return
                const entry = { fecha: new Date().toLocaleDateString('es-ES'), peso: Number(pesoInput) }
                setHistPeso([...histPeso, entry])
                setPesoInput('')
              }} style={{ padding: '12px 20px', borderRadius: 10, background: '#3b82f6', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14 }}>
                Guardar
              </button>
            </div>

            {histPeso.length > 0 && (
              <>
                <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                  <div style={{ flex: 1, padding: 14, borderRadius: 12, background: '#1a1a1a', textAlign: 'center' }}>
                    <div style={{ fontSize: 11, color: '#666' }}>Actual</div>
                    <div style={{ fontSize: 24, fontWeight: 800, color: '#3b82f6' }}>{histPeso[histPeso.length - 1].peso} kg</div>
                  </div>
                  {histPeso.length > 1 && (
                    <div style={{ flex: 1, padding: 14, borderRadius: 12, background: '#1a1a1a', textAlign: 'center' }}>
                      <div style={{ fontSize: 11, color: '#666' }}>Cambio total</div>
                      <div style={{ fontSize: 24, fontWeight: 800, color: histPeso[histPeso.length-1].peso < histPeso[0].peso ? '#22c55e' : '#f97316' }}>
                        {(histPeso[histPeso.length-1].peso - histPeso[0].peso).toFixed(1)} kg
                      </div>
                    </div>
                  )}
                </div>

                {/* Gráfica */}
                <div style={{ background: '#1a1a1a', borderRadius: 12, padding: 16, marginBottom: 16 }}>
                  <div style={{ fontSize: 12, color: '#888', marginBottom: 12 }}>Evolución de peso</div>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 80 }}>
                    {histPeso.slice(-12).map((e, i) => {
                      const pesos = histPeso.slice(-12).map(x => x.peso)
                      const min = Math.min(...pesos), max = Math.max(...pesos)
                      const rango = max - min || 1
                      const h = Math.round(((e.peso - min) / rango) * 60 + 16)
                      return (
                        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                          <div style={{ width: '100%', height: h, borderRadius: '4px 4px 0 0', background: i === histPeso.slice(-12).length - 1 ? '#3b82f6' : '#2a4a7f' }} />
                          <div style={{ fontSize: 8, color: '#555', transform: 'rotate(-45deg)' }}>{e.fecha.slice(0,5)}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Historial */}
                <div style={{ background: '#1a1a1a', borderRadius: 12, overflow: 'hidden' }}>
                  {[...histPeso].reverse().slice(0, 10).map((e, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', borderBottom: i < 9 ? '1px solid #222' : 'none' }}>
                      <span style={{ color: '#888', fontSize: 13 }}>{e.fecha}</span>
                      <span style={{ fontWeight: 700, color: '#f0f0f0' }}>{e.peso} kg</span>
                    </div>
                  ))}
                </div>
              </>
            )}
            {histPeso.length === 0 && <div style={{ textAlign: 'center', color: '#555', padding: '40px 0' }}>Registra tu primer pesaje 👆</div>}
          </div>
        )}

        {/* DIETA */}
        {tab === 'dieta' && (
          <div style={{ padding: '16px 12px 0' }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 16 }}>🥗 Plan de nutrición</h2>

            <div style={{ background: '#1a1a1a', borderRadius: 12, padding: 16, marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: '#888', marginBottom: 12, fontWeight: 600 }}>TUS DATOS</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {[
                  { label: 'Altura (cm)', key: 'altura', ph: '175' },
                  { label: 'Edad (años)', key: 'edad', ph: '30' },
                  { label: 'Peso actual (kg)', key: 'pesoActual', ph: '80' },
                  { label: 'Peso objetivo (kg)', key: 'pesoObj', ph: '75' },
                ].map(f => (
                  <div key={f.key}>
                    <div style={{ fontSize: 10, color: '#666', marginBottom: 4 }}>{f.label}</div>
                    <input type="number" inputMode="decimal" placeholder={f.ph}
                      value={dieta[f.key]}
                      onChange={e => setDieta({ ...dieta, [f.key]: e.target.value })}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: '1px solid #333', background: '#111', color: '#f0f0f0', fontSize: 14 }} />
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 10 }}>
                <div style={{ fontSize: 10, color: '#666', marginBottom: 6 }}>Objetivo</div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {[['perder', '🔥 Bajar grasa'], ['ganar', '💪 Ganar músculo'], ['recomposicion', '⚡ Recomposición']].map(([v, l]) => (
                    <button key={v} onClick={() => setDieta({ ...dieta, meta: v })}
                      style={{ flex: 1, padding: '7px 4px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 10, fontWeight: 700,
                        background: dieta.meta === v ? '#3b82f6' : '#2a2a2a', color: dieta.meta === v ? '#fff' : '#666' }}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={calcularDieta}
                style={{ width: '100%', marginTop: 12, padding: '12px', borderRadius: 10, background: '#22c55e', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 800, fontSize: 14 }}>
                Calcular plan
              </button>
            </div>

            {dietaCalc && (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
                  {[
                    { label: 'Calorías objetivo', val: dietaCalc.calorias, unit: 'kcal', color: '#f97316' },
                    { label: 'TDEE (mantenimiento)', val: dietaCalc.tdee, unit: 'kcal', color: '#888' },
                    { label: 'Proteína', val: dietaCalc.proteina, unit: 'g/día', color: '#3b82f6' },
                    { label: 'Carbohidratos', val: dietaCalc.carbos, unit: 'g/día', color: '#eab308' },
                    { label: 'Grasas', val: dietaCalc.grasas, unit: 'g/día', color: '#a855f7' },
                    { label: 'Déficit/Superávit', val: (dietaCalc.diferencia > 0 ? '+' : '') + dietaCalc.diferencia, unit: 'kcal', color: dietaCalc.diferencia < 0 ? '#22c55e' : '#f97316' },
                  ].map(m => (
                    <div key={m.label} style={{ padding: 12, borderRadius: 10, background: '#1a1a1a', textAlign: 'center' }}>
                      <div style={{ fontSize: 10, color: '#666', marginBottom: 4 }}>{m.label}</div>
                      <div style={{ fontSize: 20, fontWeight: 800, color: m.color }}>{m.val}</div>
                      <div style={{ fontSize: 10, color: '#555' }}>{m.unit}</div>
                    </div>
                  ))}
                </div>

                {/* Horario comidas */}
                <div style={{ fontSize: 13, fontWeight: 800, color: '#888', marginBottom: 10, paddingLeft: 2 }}>EJEMPLO DE DÍA (día de entreno)</div>
                {[
                  { hora: '08:00', label: 'Pre-entreno (en ayunas)', tipo: null, nota: 'Café solo o agua. El entreno es en ayunas.' },
                  { hora: '09:00', label: 'Post-entreno', tipo: 'postEntreno', nota: 'Proteína + carbohidratos' },
                  { hora: '13:00', label: 'Comida', tipo: 'comida', nota: 'Comida principal del día' },
                  { hora: '17:00', label: 'Merienda', tipo: 'desayuno', nota: 'Proteína + fruta' },
                  { hora: '22:00', label: 'Cena', tipo: 'cena', nota: 'Proteína + poca grasa, pocos carbos' },
                ].map(({ hora, label, tipo, nota }) => (
                  <div key={hora} style={{ background: '#1a1a1a', borderRadius: 12, marginBottom: 8, overflow: 'hidden' }}>
                    <div style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ fontSize: 13, fontWeight: 800, color: '#3b82f6', width: 44, flexShrink: 0 }}>{hora}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#f0f0f0' }}>{label}</div>
                        <div style={{ fontSize: 11, color: '#555', marginTop: 2 }}>{nota}</div>
                      </div>
                    </div>
                    {tipo && PLATOS[tipo] && (
                      <div style={{ borderTop: '1px solid #222', padding: '8px 14px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {PLATOS[tipo].map((plato, i) => (
                          <div key={i}>
                            <button onClick={() => setPlatoSeleccionado(platoSeleccionado?.nombre === plato.nombre ? null : plato)}
                              style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0' }}>
                              <span style={{ fontSize: 12, color: '#ccc', textAlign: 'left' }}>🍽️ {plato.nombre}</span>
                              <span style={{ fontSize: 11, color: '#f97316', fontWeight: 700, flexShrink: 0, marginLeft: 8 }}>{plato.calorias} kcal</span>
                            </button>
                            {platoSeleccionado?.nombre === plato.nombre && (
                              <div style={{ background: '#111', borderRadius: 8, padding: 10, marginTop: 4 }}>
                                <div style={{ fontSize: 11, color: '#aaa', marginBottom: 6 }}>📋 {plato.receta}</div>
                                <div style={{ display: 'flex', gap: 10 }}>
                                  {[['P', plato.p, '#3b82f6'], ['C', plato.c, '#eab308'], ['G', plato.g, '#a855f7']].map(([l, v, c]) => (
                                    <div key={l} style={{ flex: 1, textAlign: 'center' }}>
                                      <div style={{ fontSize: 10, color: '#555' }}>{l === 'P' ? 'Proteína' : l === 'C' ? 'Carbos' : 'Grasas'}</div>
                                      <div style={{ fontSize: 14, fontWeight: 700, color: c }}>{v}g</div>
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
          </div>
        )}

        {/* PROGRESO */}
        {tab === 'progreso' && (
          <div style={{ padding: '16px 12px 0' }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 16 }}>📈 Tu progreso</h2>

            {/* Resumen */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
              <div style={{ padding: 14, borderRadius: 12, background: '#1a1a1a', textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: '#666' }}>Peso actual</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#3b82f6' }}>{ultimoPeso ? `${ultimoPeso} kg` : '—'}</div>
              </div>
              <div style={{ padding: 14, borderRadius: 12, background: '#1a1a1a', textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: '#666' }}>Pesajes</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#22c55e' }}>{histPeso.length}</div>
              </div>
            </div>

            {/* Mejores marcas */}
            <div style={{ fontSize: 13, fontWeight: 800, color: '#888', marginBottom: 10, paddingLeft: 2 }}>MEJORES MARCAS</div>
            {DIAS.map(d => {
              const marcas = d.ejercicios.map(ej => {
                const key = `${d.id}-${ej.id}`
                const datos = registros[key] || {}
                let max = 0
                Object.values(datos).forEach(dia => Object.values(dia).forEach(p => { if (Number(p) > max) max = Number(p) }))
                return max ? { nombre: ej.nombre, max } : null
              }).filter(Boolean)

              if (!marcas.length) return null
              return (
                <div key={d.id} style={{ background: '#1a1a1a', borderRadius: 12, marginBottom: 10, overflow: 'hidden' }}>
                  <div style={{ padding: '10px 14px', borderLeft: `4px solid ${d.color}`, fontSize: 13, fontWeight: 700, color: d.color }}>{d.emoji} {d.enfoque}</div>
                  {marcas.map((m, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 14px', borderTop: '1px solid #222' }}>
                      <span style={{ fontSize: 12, color: '#ccc' }}>{m.nombre}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: '#eab308' }}>🏆 {m.max} kg</span>
                    </div>
                  ))}
                </div>
              )
            })}

            {Object.keys(registros).length === 0 && histPeso.length === 0 && (
              <div style={{ textAlign: 'center', color: '#555', padding: '40px 0' }}>
                <div style={{ fontSize: 40 }}>🏋️</div>
                <div style={{ marginTop: 12, fontSize: 14 }}>¡Empieza a entrenar para ver tu progreso!</div>
              </div>
            )}

            {/* Sugerencias de mejora */}
            {Object.keys(registros).length > 0 && (
              <>
                <div style={{ fontSize: 13, fontWeight: 800, color: '#888', margin: '16px 0 10px', paddingLeft: 2 }}>SUGERENCIAS</div>
                <div style={{ background: '#1a2a1a', borderRadius: 12, padding: 14, borderLeft: '4px solid #22c55e' }}>
                  <div style={{ fontSize: 13, color: '#22c55e', fontWeight: 700 }}>Progresión semanal</div>
                  <div style={{ fontSize: 12, color: '#aaa', marginTop: 6, lineHeight: 1.6 }}>
                    Intenta aumentar 1 repetición, o 2,5–5 kg por semana en los ejercicios compuestos (sentadilla, press banca, remo).
                    Si llevas 2 semanas con el mismo peso, es hora de subir.
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Bottom nav */}
      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 480,
        background: '#111', borderTop: '1px solid #222', display: 'flex' }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)}
            style={{ flex: 1, padding: '10px 0 12px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
            <span style={{ fontSize: 22 }}>{TAB_ICONS[t]}</span>
            <span style={{ fontSize: 10, fontWeight: tab === t ? 700 : 400, color: tab === t ? '#3b82f6' : '#555' }}>{TAB_LABELS[t]}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
