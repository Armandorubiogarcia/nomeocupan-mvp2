'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import RiskMap from '@/components/RiskMap'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          {/* Logo */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-2">
              <span className="text-gray-100">NoMe</span>
              <span className="text-red-600">Ocupan</span>
            </h1>
            <div className="h-1 w-64 bg-red-600 mx-auto mb-4"></div>
            <p className="text-xl text-red-500 font-semibold tracking-wide">INTELIGENCIA PREVENTIVA</p>
          </div>

          {/* Claim */}
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            La IA contra la okupación
          </h2>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            Algoritmo avanzado entrenado con miles de datos reales y experiencia operativa en seguridad. 
            Descubre el riesgo real de tu vivienda antes de que sea tarde.
          </p>

          {/* CTA Principal */}
          <Link 
            href="/checkout"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold text-lg px-12 py-4 rounded-lg transition-all transform hover:scale-105 shadow-2xl"
          >
            Analizar mi vivienda ahora
          </Link>

          {/* Bloque de Autoridad */}
          <div className="mt-12 pt-8 border-t border-gray-700">
            <p className="text-sm text-gray-400 max-w-3xl mx-auto">
              Modelo desarrollado combinando inteligencia artificial, análisis masivo de datos territoriales 
              y experiencia operativa real en seguridad.
            </p>
          </div>
        </div>
      </section>

      {/* Cómo Funciona */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Cómo funciona nuestro análisis estratégico
            </h2>
            <p className="text-gray-600">
              Modelo propio de inteligencia predictiva en tres fases.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Paso 1 */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-red-600 text-5xl font-bold mb-4">1</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Análisis territorial avanzado
              </h3>
              <p className="text-gray-700 mb-4">
                Recopilamos y procesamos miles de registros territoriales, patrones históricos y variables 
                de entorno para calcular el nivel de riesgo real por zona.
              </p>
              <p className="text-sm text-gray-500 italic">
                Modelo predictivo basado en análisis multivariable.
              </p>
            </div>

            {/* Paso 2 */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-red-600 text-5xl font-bold mb-4">2</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Evaluación de vulnerabilidad física
              </h3>
              <p className="text-gray-700 mb-4">
                Analizamos los puntos críticos de tu vivienda mediante un cuestionario estructurado 
                basado en protocolos reales de seguridad operativa.
              </p>
              <p className="text-sm text-gray-500 italic">
                Identificamos debilidades antes de que lo hagan otros.
              </p>
            </div>

            {/* Paso 3 */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-red-600 text-5xl font-bold mb-4">3</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Algoritmo de riesgo combinado
              </h3>
              <p className="text-gray-700 mb-4">
                Nuestro algoritmo integra datos territoriales, vulnerabilidad física y variables 
                adicionales para generar un índice de riesgo único y accionable.
              </p>
              <p className="text-sm text-gray-500 italic">
                No es una opinión. Es análisis basado en datos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mapa de Riesgo */}
      <RiskMap />

      {/* La Okupación No Avisa */}
      <section className="py-20 px-4 bg-red-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">
            La okupación no avisa
          </h2>

          <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
            <p className="text-lg text-gray-800 mb-6">
              En 2024 se registraron más de 15.000 okupaciones en España. El tiempo medio de recuperación 
              legal puede superar los 18 meses. El coste total —entre abogados, daños y suministros— puede 
              alcanzar los 20.000€ o más.
            </p>
            <p className="text-lg text-gray-800 font-semibold">
              La mayoría de propietarios nunca pensó que les ocurriría.
            </p>
          </div>

          {/* Consecuencias */}
          <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Consecuencias</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                Pérdida inmediata del control sobre tu propiedad
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                Procesos judiciales largos e inciertos
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                Costes económicos difíciles de recuperar
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                Estrés personal y familiar prolongado
              </li>
              <li className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                Sensación de impotencia ante un problema evitable
              </li>
            </ul>
          </div>

          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900 mb-4">
              La prevención no es paranoia. Es estrategia.
            </p>
            <p className="text-xl text-gray-700 mb-8">
              No esperes a convertirte en una estadística más.
            </p>
            <Link 
              href="/checkout"
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold text-lg px-12 py-4 rounded-lg transition-all transform hover:scale-105 shadow-xl"
            >
              Protege tu vivienda ahora
            </Link>
          </div>
        </div>
      </section>

      {/* Precio */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Informe de Riesgo Anti-Okupación
            </h2>
            <p className="text-xl text-gray-600">
              Análisis estratégico personalizado de tu vivienda.
            </p>
          </div>

          {/* Qué Incluye */}
          <div className="bg-gray-50 p-8 rounded-lg mb-8">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Qué incluye tu informe</h3>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <svg className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Análisis de riesgo de tu zona con mapa de calor territorial
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Evaluación personalizada de vulnerabilidad física
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Recomendaciones específicas basadas en protocolos operativos reales
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-red-600 mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Informe profesional en PDF (4 páginas estructuradas)
              </li>
            </ul>
            <p className="text-sm text-gray-500 italic mt-6 text-center">
              No es una opinión. Es un análisis basado en datos.
            </p>
          </div>

          {/* Bloque de Precio */}
          <div className="bg-white border-4 border-red-600 rounded-lg p-8 text-center shadow-2xl">
            <div className="inline-block bg-yellow-400 text-black font-bold px-4 py-1 rounded mb-4 text-sm">
              OFERTA DE LANZAMIENTO
            </div>
            
            <div className="mb-6">
              <div className="text-6xl font-bold text-red-600 mb-2">9.90€</div>
              <p className="text-gray-600">Solo durante el lanzamiento</p>
              <p className="text-sm text-gray-500 mt-2">Primeros 100 informes disponibles.</p>
            </div>

            <Link 
              href="/checkout"
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold text-xl px-16 py-5 rounded-lg transition-all transform hover:scale-105 shadow-xl mb-4"
            >
              Obtener mi informe ahora
            </Link>

            <p className="text-sm text-gray-500">
              Pago seguro. Entrega digital inmediata.
            </p>

            {/* Garantía */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="font-bold text-gray-900 mb-2">Garantía de calidad técnica</h4>
              <p className="text-sm text-gray-600">
                Si el informe no cumple con la calidad prometida por un error técnico, 
                te devolvemos el importe íntegro en 48 horas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Preguntas Frecuentes
          </h2>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-2">¿De dónde salen los datos?</h3>
              <p className="text-gray-700">
                Del análisis de miles de registros públicos combinados con nuestro algoritmo propietario.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-2">¿Es confidencial?</h3>
              <p className="text-gray-700">
                Sí. Tus datos se procesan de forma segura y no se comparten con terceros.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-2">¿Cuándo recibo el informe?</h3>
              <p className="text-gray-700">
                Inmediatamente tras completar el cuestionario (2-3 minutos).
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-2">¿Funciona solo en Málaga?</h3>
              <p className="text-gray-700">
                Actualmente estamos en fase piloto en Málaga. Próximamente ampliaremos a toda España.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">© 2026 NoMeOcupan. Todos los derechos reservados.</p>
        </div>
      </footer>
    </main>
  )
}
