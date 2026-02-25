'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Question {
  id: string
  question: string
  options: { value: string; label: string; points: number }[]
}

const questions: Question[] = [
  // BLOQUE 1 - CONTEXTO (6 preguntas)
  {
    id: 'tipo_vivienda',
    question: '¿Qué tipo de vivienda es?',
    options: [
      { value: 'piso_baja', label: 'Piso (planta baja)', points: 3 },
      { value: 'piso_1_3', label: 'Piso (planta 1-3)', points: 1 },
      { value: 'piso_4plus', label: 'Piso (planta 4+)', points: 0 },
      { value: 'casa', label: 'Casa unifamiliar', points: 2 },
      { value: 'adosado', label: 'Adosado/Pareado', points: 2 },
      { value: 'atico', label: 'Ático', points: 0 },
    ]
  },
  {
    id: 'antiguedad',
    question: '¿Cuál es la antigüedad del edificio/vivienda?',
    options: [
      { value: '<10', label: 'Menos de 10 años', points: 0 },
      { value: '10-30', label: '10-30 años', points: 1 },
      { value: '30-50', label: '30-50 años', points: 2 },
      { value: '>50', label: 'Más de 50 años', points: 3 },
    ]
  },
  {
    id: 'habitada',
    question: '¿La vivienda está actualmente habitada?',
    options: [
      { value: 'permanente', label: 'Sí, vivo aquí permanentemente', points: 0 },
      { value: 'temporal', label: 'Sí, pero paso temporadas fuera', points: 2 },
      { value: 'segunda', label: 'No, segunda residencia', points: 3 },
      { value: 'venta', label: 'No, en proceso venta/alquiler', points: 4 },
      { value: 'vacia', label: 'No, vacía por otros motivos', points: 4 },
    ]
  },
  {
    id: 'tiempo_vacia',
    question: 'Si está vacía, ¿cuánto tiempo lleva deshabitada?',
    options: [
      { value: 'no_vacia', label: 'No está vacía', points: 0 },
      { value: '<1mes', label: 'Menos de 1 mes', points: 1 },
      { value: '1-3meses', label: '1-3 meses', points: 2 },
      { value: '3-6meses', label: '3-6 meses', points: 3 },
      { value: '6-12meses', label: '6-12 meses', points: 4 },
      { value: '>1año', label: 'Más de 1 año', points: 5 },
    ]
  },
  {
    id: 'frecuencia_supervision',
    question: '¿Con qué frecuencia supervisa la vivienda?',
    options: [
      { value: 'diaria', label: 'Diariamente', points: 0 },
      { value: '2-3semana', label: '2-3 veces por semana', points: 1 },
      { value: '1semana', label: '1 vez por semana', points: 2 },
      { value: '1-2mes', label: '1-2 veces al mes', points: 3 },
      { value: '<1mes', label: 'Menos de 1 vez al mes', points: 4 },
    ]
  },
  {
    id: 'visibilidad',
    question: '¿La fachada/entrada es visible desde la calle?',
    options: [
      { value: 'muy_visible', label: 'Muy visible, calle principal', points: 0 },
      { value: 'visible', label: 'Visible, calle secundaria', points: 1 },
      { value: 'poco_visible', label: 'Poco visible, callejón', points: 2 },
      { value: 'nada_visible', label: 'Nada visible, interior', points: 3 },
    ]
  },

  // BLOQUE 2 - PERÍMETRO Y ACCESO (8 preguntas)
  {
    id: 'tipo_puerta',
    question: '¿Qué tipo de puerta de entrada tiene?',
    options: [
      { value: 'estandar', label: 'Puerta estándar/madera', points: 3 },
      { value: 'blindada', label: 'Puerta blindada', points: 1 },
      { value: 'acorazada', label: 'Puerta acorazada', points: 0 },
    ]
  },
  {
    id: 'tipo_cerradura',
    question: '¿Qué tipo de cerradura tiene?',
    options: [
      { value: 'basica', label: 'Cerradura básica (1 punto)', points: 3 },
      { value: 'multipunto', label: 'Cerradura multipunto (3-5 puntos)', points: 1 },
      { value: 'antibumping', label: 'Cerradura antibumping', points: 0 },
      { value: 'electronica', label: 'Cerradura electrónica', points: 0 },
    ]
  },
  {
    id: 'refuerzos_puerta',
    question: '¿Tiene refuerzos adicionales en la puerta?',
    options: [
      { value: 'completo', label: 'Sí, escudo + barra', points: 0 },
      { value: 'escudo', label: 'Sí, solo escudo', points: 1 },
      { value: 'barra', label: 'Sí, solo barra', points: 1 },
      { value: 'ninguno', label: 'No, ningún refuerzo', points: 3 },
    ]
  },
  {
    id: 'marco_reforzado',
    question: '¿El marco de la puerta está reforzado?',
    options: [
      { value: 'si_metalico', label: 'Sí, marco metálico reforzado', points: 0 },
      { value: 'parcial', label: 'Sí, refuerzo parcial', points: 1 },
      { value: 'no', label: 'No, marco estándar', points: 3 },
    ]
  },
  {
    id: 'proteccion_ventanas',
    question: '¿Las ventanas accesibles tienen protección?',
    options: [
      { value: 'rejas_todas', label: 'Sí, rejas en todas', points: 0 },
      { value: 'persianas_todas', label: 'Sí, persianas metálicas todas', points: 0 },
      { value: 'algunas', label: 'Sí, en algunas ventanas', points: 2 },
      { value: 'ninguna', label: 'No, ninguna protección', points: 4 },
      { value: 'no_aplica', label: 'No hay ventanas accesibles', points: 0 },
    ]
  },
  {
    id: 'balcon_terraza',
    question: 'Si hay balcón/terraza accesible, ¿tiene protección?',
    options: [
      { value: 'reja', label: 'Sí, reja o puerta seguridad', points: 0 },
      { value: 'parcial', label: 'Parcialmente protegido', points: 2 },
      { value: 'libre', label: 'No, acceso libre', points: 4 },
      { value: 'no_aplica', label: 'No aplica', points: 0 },
    ]
  },
  {
    id: 'portal_controlado',
    question: '¿El edificio tiene acceso controlado en portal?',
    options: [
      { value: 'portero', label: 'Sí, portero físico permanente', points: 0 },
      { value: 'videoportero', label: 'Sí, videoportero automático', points: 1 },
      { value: 'cerradura', label: 'Sí, cerradura simple', points: 2 },
      { value: 'abierto', label: 'No, portal abierto', points: 4 },
      { value: 'unifamiliar', label: 'No aplica (unifamiliar)', points: 0 },
    ]
  },
  {
    id: 'valla_perimetral',
    question: 'Si es unifamiliar, ¿tiene valla perimetral?',
    options: [
      { value: 'alta_segura', label: 'Sí, valla >2m con puerta seguridad', points: 0 },
      { value: 'media', label: 'Sí, valla media altura', points: 2 },
      { value: 'simbolica', label: 'Sí, seto o vallado simbólico', points: 3 },
      { value: 'no', label: 'No, sin valla', points: 4 },
      { value: 'no_aplica', label: 'No aplica', points: 0 },
    ]
  },

  // BLOQUE 3 - DETECCIÓN Y VIGILANCIA (6 preguntas)
  {
    id: 'alarma',
    question: '¿Tiene sistema de alarma?',
    options: [
      { value: 'central', label: 'Sí, conectada a central', points: 0 },
      { value: 'local', label: 'Sí, alarma local sin conexión', points: 2 },
      { value: 'cartel', label: 'No, pero tengo cartel disuasorio', points: 3 },
      { value: 'ninguna', label: 'No, ningún sistema', points: 4 },
    ]
  },
  {
    id: 'cobertura_alarma',
    question: '¿El sistema de alarma cubre todos los accesos?',
    options: [
      { value: 'todos', label: 'Sí, todos los puntos', points: 0 },
      { value: 'parcial', label: 'Parcialmente (solo puerta)', points: 2 },
      { value: 'no_alarma', label: 'No tengo alarma', points: 0 },
    ]
  },
  {
    id: 'camaras',
    question: '¿Hay cámaras de seguridad visibles?',
    options: [
      { value: 'reales_grabacion', label: 'Sí, cámaras reales con grabación', points: 0 },
      { value: 'reales', label: 'Sí, cámaras reales sin grabación', points: 1 },
      { value: 'falsas', label: 'Sí, cámaras falsas/disuasorias', points: 2 },
      { value: 'ninguna', label: 'No, ninguna cámara', points: 3 },
    ]
  },
  {
    id: 'cobertura_camaras',
    question: '¿Las cámaras cubren puntos críticos?',
    options: [
      { value: 'completo', label: 'Sí, puerta + ventanas', points: 0 },
      { value: 'puerta', label: 'Sí, solo puerta principal', points: 1 },
      { value: 'no_camaras', label: 'No tengo cámaras', points: 0 },
    ]
  },
  {
    id: 'iluminacion',
    question: '¿Tiene iluminación exterior con sensor?',
    options: [
      { value: 'todos', label: 'Sí, en todos los accesos', points: 0 },
      { value: 'algunos', label: 'Sí, en algunos accesos', points: 1 },
      { value: 'estandar', label: 'No, iluminación estándar', points: 2 },
      { value: 'ninguna', label: 'No, sin iluminación exterior', points: 3 },
    ]
  },
  {
    id: 'vecinos',
    question: '¿Tiene relación con vecinos para vigilancia?',
    options: [
      { value: 'acuerdo', label: 'Sí, acuerdo explícito', points: 0 },
      { value: 'informal', label: 'Sí, relación informal coordinada', points: 1 },
      { value: 'cordial', label: 'Cordial sin coordinación', points: 2 },
      { value: 'no_conoce', label: 'No conozco a los vecinos', points: 3 },
      { value: 'aislada', label: 'No aplica (vivienda aislada)', points: 2 },
    ]
  },

  // BLOQUE 4 - VULNERABILIDAD (5 preguntas)
  {
    id: 'senales_habitada',
    question: '¿La vivienda da señales de estar habitada cuando vacía?',
    options: [
      { value: 'completo', label: 'Sí, temporizadores + persianas', points: 0 },
      { value: 'luces', label: 'Sí, solo temporizadores luz', points: 1 },
      { value: 'parcial', label: 'Parcialmente, algunas medidas', points: 2 },
      { value: 'evidente', label: 'No, cuando vacía es evidente', points: 4 },
    ]
  },
  {
    id: 'buzon',
    question: '¿Hay buzón que delate acumulación de correo?',
    options: [
      { value: 'vaciado', label: 'No, buzón vaciado regularmente', points: 0 },
      { value: 'poco_visible', label: 'Sí, pero poco visible', points: 1 },
      { value: 'visible', label: 'Sí, visible y se acumula', points: 3 },
      { value: 'no_buzon', label: 'No tengo buzón', points: 0 },
    ]
  },
  {
    id: 'carteles',
    question: '¿Hay carteles de seguridad visibles?',
    options: [
      { value: 'completo', label: 'Sí, alarma + cámara', points: 0 },
      { value: 'alarma', label: 'Sí, solo alarma', points: 1 },
      { value: 'ninguno', label: 'No, ningún cartel', points: 2 },
    ]
  },
  {
    id: 'distancia_policia',
    question: '¿A qué distancia está la comisaría más cercana?',
    options: [
      { value: '<500m', label: 'Menos de 500m', points: 0 },
      { value: '500m-1km', label: '500m - 1km', points: 1 },
      { value: '1-2km', label: '1-2km', points: 2 },
      { value: '>2km', label: 'Más de 2km', points: 3 },
    ]
  },
  {
    id: 'historial',
    question: '¿Ha habido intentos previos de okupación en la zona?',
    options: [
      { value: 'edificio', label: 'Sí, en mi edificio', points: 4 },
      { value: 'cercanos', label: 'Sí, en edificios cercanos', points: 3 },
      { value: 'zona', label: 'Sí, en la zona general', points: 2 },
      { value: 'no', label: 'No que yo sepa', points: 0 },
    ]
  },
]

export default function Cuestionario() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [email, setEmail] = useState('')
  const [showEmailForm, setShowEmailForm] = useState(true)

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setShowEmailForm(false)
    }
  }

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      handleSubmit()
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const calculateScore = () => {
    let totalPoints = 0
    questions.forEach(q => {
      const answer = answers[q.id]
      if (answer) {
        const option = q.options.find(opt => opt.value === answer)
        if (option) {
          totalPoints += option.points
        }
      }
    })
    // Normalizar a escala 1-10 (máximo posible ~80 puntos)
    const score = Math.min(Math.round((totalPoints / 80) * 10), 10)
    return Math.max(score, 1)
  }

  const handleSubmit = async () => {
    const score = calculateScore()
    
    // Aquí iría la lógica de:
    // 1. Pago con Stripe
    // 2. Generar PDF
    // 3. Guardar en Supabase
    
    alert(`Cuestionario completado.
Email: ${email}
Score de riesgo: ${score}/10
    
En producción aquí se procesaría el pago y se generaría el PDF.`)
    
    // Por ahora redirigimos a inicio
    router.push('/')
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100
  const currentQ = questions[currentQuestion]
  const canProceed = answers[currentQ.id]

  if (showEmailForm) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Antes de empezar</h1>
          <p className="text-gray-700 mb-6">
            Introduce tu email para recibir el informe cuando completes el cuestionario.
          </p>
          <form onSubmit={handleEmailSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 text-gray-900"
              required
            />
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg"
            >
              Comenzar cuestionario
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Cuestionario de Seguridad</h1>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-red-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Pregunta {currentQuestion + 1} de {questions.length}
          </p>
        </div>

        {/* Question */}
        <div className="bg-white p-8 rounded-lg shadow">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            {currentQ.question}
          </h2>

          <div className="space-y-3">
            {currentQ.options.map(option => (
              <label
                key={option.value}
                className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  answers[currentQ.id] === option.value
                    ? 'border-red-600 bg-red-50'
                    : 'border-gray-200 hover:border-red-300'
                }`}
              >
                <input
                  type="radio"
                  name={currentQ.id}
                  value={option.value}
                  checked={answers[currentQ.id] === option.value}
                  onChange={() => handleAnswer(currentQ.id, option.value)}
                  className="mr-3"
                />
                <span className="text-gray-900">{option.label}</span>
              </label>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className={`px-6 py-3 rounded-lg font-semibold ${
                currentQuestion === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-300 text-gray-900 hover:bg-gray-400'
              }`}
            >
              Anterior
            </button>

            <button
              onClick={handleNext}
              disabled={!canProceed}
              className={`px-6 py-3 rounded-lg font-semibold ${
                !canProceed
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              {currentQuestion === questions.length - 1 ? 'Finalizar' : 'Siguiente'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
