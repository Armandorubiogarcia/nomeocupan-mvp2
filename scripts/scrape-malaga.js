/**
 * Script de Scraping - NoMeOcupan MVP
 * 
 * Este script:
 * 1. Llama a RapidAPI (Idealista)
 * 2. Analiza propiedades con el lexicón C/K
 * 3. Guarda en Supabase (tabla properties)
 * 
 * Uso: node scripts/scrape-malaga.js
 */

require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

// Configuración
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY
const RAPIDAPI_HOST = 'idealista7.p.rapidapi.com'
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// Lexicón completo C/K
const LEXICON = [
  'okupado', 'ocupado',
  'okupa', 'ocupa',
  'okupación', 'ocupación',
  'okupas', 'ocupas',
  'no visitable', 'sin acceso',
  'sin posesión', 'inquilino precario',
  'venta urgente', 'solo inversores',
  'cesión de remate', 'activo bancario',
  'venta sin posesión', 'inmueble ocupado'
]

// Mapeo de distritos
const DISTRICT_MAPPING = {
  'palma-palmilla': 1,
  'palmilla': 1,
  'la trinidad': 2,
  'trinidad': 2,
  'perchel': 2,
  'cruz de humilladero': 3,
  'humilladero': 3,
  'el palo': 4,
  'palo': 4,
  'churriana': 5,
  'teatinos': 6
}

function analyzeProperty(property) {
  const description = (property.description || '').toLowerCase()
  const matches = []
  
  // Buscar coincidencias en el lexicón
  LEXICON.forEach(term => {
    if (description.includes(term)) {
      matches.push(term)
    }
  })
  
  // Calcular score (60% lexicón + 20% barrera visita + 20% precio)
  let score = 0
  
  // Lexicón (60%)
  if (matches.length >= 3) score += 6
  else if (matches.length === 2) score += 5
  else if (matches.length === 1) score += 4
  
  // Barrera de visita (20%)
  if (description.includes('no visitable') || 
      description.includes('sin posesión') ||
      description.includes('sin acceso')) {
    score += 2
  }
  
  // Desviación de precio (20%)
  if (property.price < 80000) {
    score += 2
  } else if (property.price < 100000) {
    score += 1
  }
  
  return {
    riskScore: Math.min(score, 10),
    matches: matches
  }
}

function getDistrictIdByCoordinates(lat, lng) {
  if (!lat || !lng) return 1 // Default: Palma-Palmilla
  
  const BOUNDARIES = {
    1: { lat: { min: 36.705, max: 36.725 }, lng: { min: -4.445, max: -4.420 } }, // Palma-Palmilla
    2: { lat: { min: 36.715, max: 36.730 }, lng: { min: -4.435, max: -4.410 } }, // La Trinidad
    3: { lat: { min: 36.720, max: 36.738 }, lng: { min: -4.448, max: -4.425 } }, // Cruz Humilladero
    4: { lat: { min: 36.715, max: 36.730 }, lng: { min: -4.360, max: -4.340 } }, // El Palo
    5: { lat: { min: 36.655, max: 36.675 }, lng: { min: -4.500, max: -4.475 } }, // Churriana
    6: { lat: { min: 36.735, max: 36.750 }, lng: { min: -4.495, max: -4.470 } }  // Teatinos
  }
  
  for (const [districtId, bounds] of Object.entries(BOUNDARIES)) {
    if (lat >= bounds.lat.min && lat <= bounds.lat.max &&
        lng >= bounds.lng.min && lng <= bounds.lng.max) {
      return parseInt(districtId)
    }
  }
  
  // Si no cae en ningún barrio específico, asignar al centro (Trinidad)
  return 2
}

async function fetchMalagaProperties() {
  console.log('🔍 Iniciando scraping de Idealista...')
  
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': RAPIDAPI_KEY,
      'x-rapidapi-host': RAPIDAPI_HOST
    }
  }

  // Málaga Capital - Obtener TODAS las propiedades (sin filtro)
  const locationId = '0-EU-ES-29-01-001-079'
  const locationName = 'Málaga'
  const pages = 5 // 5 páginas x 40 items = 200 propiedades

  let allProperties = []

  console.log(`📡 Buscando propiedades en venta en ${locationName}...`)
  console.log(`📄 Descargando ${pages} páginas (hasta 200 propiedades)...\n`)

  for (let page = 1; page <= pages; page++) {
    try {
      const url = `https://${RAPIDAPI_HOST}/listhomes?order=relevance&operation=sale&locationId=${locationId}&locationName=${locationName}&numPage=${page}&maxItems=40&location=es&locale=es`
      
      console.log(`📄 Página ${page}/${pages}...`)
      
      const response = await fetch(url, options)
      const result = await response.json()
      
      if (result.elementList && result.elementList.length > 0) {
        console.log(`   ✅ ${result.elementList.length} propiedades obtenidas`)
        
        result.elementList.forEach(item => {
          if (item.propertyCode) {
            allProperties.push({
              propertyCode: item.propertyCode,
              price: item.price || 0,
              address: item.address || '',
              district: item.district || item.neighborhood || '',
              latitude: item.latitude || 0,
              longitude: item.longitude || 0,
              description: item.description || '',
              externalReference: item.externalReference || '',
              url: item.url || `https://www.idealista.com/inmueble/${item.propertyCode}/`
            })
          }
        })
      } else {
        console.log(`   ⚠️  Sin resultados en página ${page}`)
        break // Si no hay resultados, no tiene sentido seguir
      }
      
      // Delay entre requests (importante para no saturar API)
      await new Promise(resolve => setTimeout(resolve, 2000))
      
    } catch (error) {
      console.error(`   ❌ Error en página ${page}:`, error.message)
    }
  }

  console.log(`\n📊 Total propiedades obtenidas: ${allProperties.length}`)
  console.log(`🔍 Ahora analizando con lexicón C/K...\n`)
  
  return allProperties
}

async function saveToDatabase(properties) {
  console.log('\n💾 Guardando en base de datos...')
  
  let saved = 0
  let skipped = 0
  let suspicious = 0

  for (const property of properties) {
    try {
      // Analizar con lexicón
      const analysis = analyzeProperty(property)
      
      // Solo guardar si tiene riesgo >= 5
      if (analysis.riskScore < 5) {
        skipped++
        continue
      }
      
      suspicious++
      
      // Obtener district_id basado en coordenadas GPS
      const districtId = getDistrictIdByCoordinates(property.latitude, property.longitude)
      
      // Guardar en Supabase
      const { data, error } = await supabase
        .from('properties')
        .upsert({
          external_id: property.propertyCode,
          district_id: districtId,
          address: property.address,
          location: districtId ? `POINT(${property.longitude} ${property.latitude})` : null,
          price: property.price,
          description: property.description,
          source_url: property.url,
          lexicon_matches: analysis.matches,
          risk_score: analysis.riskScore
        }, { 
          onConflict: 'external_id',
          ignoreDuplicates: false 
        })
      
      if (error) {
        console.error(`⚠️  Error guardando ${property.propertyCode}:`, error.message)
      } else {
        saved++
        if (saved % 10 === 0) {
          console.log(`✅ Guardadas ${saved} propiedades...`)
        }
      }
      
    } catch (error) {
      console.error(`❌ Error procesando propiedad:`, error)
    }
  }
  
  console.log(`\n📈 RESUMEN:`)
  console.log(`   Total analizadas: ${properties.length}`)
  console.log(`   Sospechosas (score >=5): ${suspicious}`)
  console.log(`   Guardadas en BD: ${saved}`)
  console.log(`   Descartadas (score <5): ${skipped}`)
}

async function updateDistrictScores() {
  console.log('\n🔄 Actualizando scores de distritos...')
  
  // Obtener todos los distritos
  const { data: districts } = await supabase
    .from('districts')
    .select('id, name')
  
  for (const district of districts) {
    // Contar propiedades sospechosas en este distrito
    const { count } = await supabase
      .from('properties')
      .select('*', { count: 'exact', head: true })
      .eq('district_id', district.id)
      .gte('risk_score', 7)
    
    // Calcular score del distrito (simplificado)
    let districtScore = 1
    if (count > 50) districtScore = 10
    else if (count > 40) districtScore = 9
    else if (count > 30) districtScore = 8
    else if (count > 20) districtScore = 7
    else if (count > 15) districtScore = 6
    else if (count > 10) districtScore = 5
    else if (count > 5) districtScore = 4
    else if (count > 2) districtScore = 3
    else if (count > 0) districtScore = 2
    
    // Actualizar
    await supabase
      .from('districts')
      .update({ risk_score: districtScore })
      .eq('id', district.id)
    
    console.log(`   ${district.name}: ${count} propiedades → Score ${districtScore}/10`)
  }
}

async function main() {
  console.log('🚀 NoMeOcupan - Script de Scraping\n')
  
  // Verificar credenciales
  if (!RAPIDAPI_KEY || !SUPABASE_URL || !SUPABASE_KEY) {
    console.error('❌ Faltan variables de entorno. Verifica .env.local')
    process.exit(1)
  }
  
  try {
    // 1. Scrapear propiedades
    const properties = await fetchMalagaProperties()
    
    if (properties.length === 0) {
      console.log('⚠️  No se obtuvieron propiedades. Verifica la API.')
      return
    }
    
    // 2. Guardar en BD
    await saveToDatabase(properties)
    
    // 3. Actualizar scores de distritos
    await updateDistrictScores()
    
    console.log('\n✅ Scraping completado exitosamente!')
    
  } catch (error) {
    console.error('❌ Error en el script:', error)
    process.exit(1)
  }
}

// Ejecutar
main()
