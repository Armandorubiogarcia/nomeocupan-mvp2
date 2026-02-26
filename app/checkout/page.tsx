'use client'

import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function CheckoutPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Crear sesión de checkout
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (data.error) {
        setError(data.error)
        setLoading(false)
        return
      }

      // Redirigir a Stripe Checkout
      const stripe = await stripePromise
      if (stripe && data.sessionId) {
        const { error } = await stripe.redirectToCheckout({
          sessionId: data.sessionId,
        })
        if (error) {
          setError(error.message || 'Error al procesar el pago')
          setLoading(false)
        }
      }
    } catch (err) {
      setError('Error al procesar la solicitud')
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="max-w-2xl mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            <span className="text-gray-100">NoMe</span>
            <span className="text-red-600">Ocupan</span>
          </h1>
          <div className="h-1 w-48 bg-red-600 mx-auto mb-6"></div>
        </div>

        {/* Checkout Card */}
        <div className="bg-white rounded-lg shadow-2xl p-8 text-gray-900">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Informe de Riesgo Anti-Okupación</h2>
            <p className="text-gray-600">Análisis completo de tu vivienda</p>
          </div>

          {/* Qué incluye */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-lg mb-4">Qué incluye tu informe:</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Análisis de riesgo territorial con mapa de calor
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Evaluación personalizada de vulnerabilidad
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Recomendaciones específicas accionables
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-red-600 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Informe profesional en PDF (4 páginas)
              </li>
            </ul>
          </div>

          {/* Precio */}
          <div className="text-center mb-8 p-6 bg-red-50 rounded-lg border-2 border-red-600">
            <div className="inline-block bg-yellow-400 text-black font-bold px-3 py-1 rounded text-sm mb-3">
              OFERTA DE LANZAMIENTO
            </div>
            <div className="text-5xl font-bold text-red-600 mb-2">9.90€</div>
            <p className="text-gray-600 text-sm">Solo durante el lanzamiento</p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email para recibir tu informe
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-lg"
            >
              {loading ? 'Procesando...' : 'Proceder al pago seguro'}
            </button>
          </form>

          {/* Seguridad */}
          <div className="mt-6 text-center text-sm text-gray-500">
            <p className="flex items-center justify-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              Pago seguro con Stripe
            </p>
            <p className="mt-2">Entrega inmediata por email</p>
          </div>

          {/* Garantía */}
          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm font-semibold text-gray-900 mb-1">
              Garantía de calidad técnica
            </p>
            <p className="text-xs text-gray-600">
              Si el informe no cumple con la calidad prometida por un error técnico,
              te devolvemos el importe íntegro en 48 horas.
            </p>
          </div>
        </div>

        {/* Volver */}
        <div className="text-center mt-8">
          <a href="/" className="text-gray-400 hover:text-white transition-colors">
            ← Volver a la página principal
          </a>
        </div>
      </div>
    </main>
  )
}