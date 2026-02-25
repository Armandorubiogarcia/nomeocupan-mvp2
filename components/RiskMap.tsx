'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

// Tipos
interface District {
  id: number
  name: string
  risk_score: number
}

interface Property {
  id: number
  district_id: number
  risk_score: number
}

export default function RiskMap() {
  const [districts, setDistricts] = useState<District[]>([])
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    loadData()
  }, [])

  async function loadData() {
    try {
      // Cargar distritos
      const { data: districtsData } = await supabase
        .from('districts')
        .select('*')
        .order('risk_score', { ascending: false })

      // Cargar propiedades
      const { data: propertiesData } = await supabase
        .from('properties')
        .select('id, district_id, risk_score')

      if (districtsData) setDistricts(districtsData)
      if (propertiesData) setProperties(propertiesData)
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  // Función para obtener color según score
  function getColor(score: number): string {
    if (score >= 7) return '#E31E24' // Rojo crítico
    if (score >= 4) return '#FFA500' // Naranja alto
    if (score >= 2) return '#FFD700' // Amarillo medio
    return '#28A745' // Verde bajo
  }

  // Contar propiedades por distrito
  function getPropertiesCount(districtId: number): number {
    return properties.filter(p => p.district_id === districtId).length
  }

  if (!mounted) return null

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        {/* Título */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Mapa de riesgo real de Málaga
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-2">
            Explora el nivel de riesgo por barrios con nuestro mapa interactivo basado en datos reales. 
            Análisis actualizado periódicamente a partir de registros detectados y modelo predictivo propio. 
            Visualiza dónde existe mayor vulnerabilidad antes de tomar decisiones.
          </p>
          <p className="text-sm text-gray-500 italic">
            Modelo territorial basado en análisis multivariable.
          </p>
        </div>

        {/* Mapa Visual */}
        {loading ? (
          <div className="bg-white rounded-lg shadow-xl p-12 text-center">
            <div className="animate-pulse">
              <div className="h-96 bg-gray-200 rounded"></div>
            </div>
            <p className="mt-4 text-gray-600">Cargando datos del mapa...</p>
          </div>
        ) : (
          <>
            {/* Grid de Barrios */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {districts.map(district => {
                const propertiesCount = getPropertiesCount(district.id)
                const color = getColor(district.risk_score)
                
                return (
                  <div
                    key={district.id}
                    className="bg-white rounded-lg shadow-lg p-6 border-l-4 hover:shadow-2xl transition-all cursor-pointer"
                    style={{ borderLeftColor: color }}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-gray-900">
                        {district.name}
                      </h3>
                      <div 
                        className="text-3xl font-bold"
                        style={{ color }}
                      >
                        {district.risk_score}/10
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>
                        <span className="font-semibold">Nivel:</span>{' '}
                        {district.risk_score >= 7 ? 'CRÍTICO' : 
                         district.risk_score >= 4 ? 'ALTO' : 
                         district.risk_score >= 2 ? 'MEDIO' : 'BAJO'}
                      </p>
                      <p>
                        <span className="font-semibold">Propiedades detectadas:</span>{' '}
                        {propertiesCount}
                      </p>
                    </div>

                    {/* Barra de progreso visual */}
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full transition-all"
                          style={{ 
                            width: `${(district.risk_score / 10) * 100}%`,
                            backgroundColor: color
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Leyenda */}
            <div className="bg-gray-100 rounded-lg p-6 mb-8">
              <h4 className="font-bold text-gray-900 mb-3 text-center">Escala de Riesgo</h4>
              <div className="flex justify-center items-center gap-6 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: '#28A745' }}></div>
                  <span className="text-sm text-gray-700">BAJO (1-3)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: '#FFD700' }}></div>
                  <span className="text-sm text-gray-700">MEDIO (4-6)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: '#FFA500' }}></div>
                  <span className="text-sm text-gray-700">ALTO (7-8)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: '#E31E24' }}></div>
                  <span className="text-sm text-gray-700">CRÍTICO (9-10)</span>
                </div>
              </div>
            </div>

            {/* Microcopy técnico */}
            <p className="text-xs text-gray-500 text-center mb-8">
              Los niveles de riesgo se calculan mediante algoritmo propio combinando datos territoriales 
              y patrones históricos detectados.
            </p>
          </>
        )}

        {/* CTA */}
        <div className="text-center bg-red-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            ¿Tu zona tiene riesgo elevado?
          </h3>
          <p className="text-lg text-gray-700 mb-6">
            Anticípate antes de que el problema ocurra.
          </p>
          <a
            href="/cuestionario"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold text-xl px-12 py-5 rounded-lg transition-all transform hover:scale-105 shadow-xl"
          >
            Obtener mi informe ahora
          </a>
        </div>
      </div>
    </section>
  )
}
