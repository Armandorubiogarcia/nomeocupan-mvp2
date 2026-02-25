const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY!
const RAPIDAPI_HOST = 'idealista7.p.rapidapi.com'

export interface Property {
  propertyCode: string
  price: number
  address: string
  district: string
  latitude: number
  longitude: number
  description: string
  externalReference: string
}

export async function fetchMalagaProperties(district?: string): Promise<Property[]> {
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': RAPIDAPI_KEY,
      'x-rapidapi-host': RAPIDAPI_HOST
    }
  }

  // Málaga Capital location ID
  const locationId = '0-EU-ES-29-01-001-007' // Málaga
  const url = `https://${RAPIDAPI_HOST}/listcommercialproperties?order=relevance&operation=sale&locationId=${locationId}&maxItems=400`

  try {
    const response = await fetch(url, options)
    const result = await response.json()
    
    if (result.elementList) {
      return result.elementList.map((item: any) => ({
        propertyCode: item.element.propertyCode,
        price: item.element.price,
        address: item.element.address || '',
        district: item.element.district || '',
        latitude: item.element.latitude,
        longitude: item.element.longitude,
        description: item.element.description || '',
        externalReference: item.element.externalReference || ''
      }))
    }
    
    return []
  } catch (error) {
    console.error('Error fetching properties:', error)
    throw error
  }
}

// Lexicón completo C/K
const LEXICON = [
  'okupado', 'ocupado',
  'okupa', 'ocupa',
  'okupación', 'ocupación',
  'okupas', 'ocupas',
  'no visitable', 'sin acceso',
  'sin posesión', 'inquilino precario',
  'venta urgente', 'solo inversores',
  'cesión de remate', 'activo bancario'
]

export function analyzeProperty(property: Property): {
  riskScore: number
  matches: string[]
} {
  const description = property.description.toLowerCase()
  const matches: string[] = []
  
  // Buscar coincidencias en el lexicón
  LEXICON.forEach(term => {
    if (description.includes(term)) {
      matches.push(term)
    }
  })
  
  // Calcular score (60% lexicón + 20% barrera visita + 20% precio)
  let score = 0
  
  // Lexicón (60%)
  if (matches.length >= 2) score += 6
  else if (matches.length === 1) score += 4
  
  // Barrera de visita (20%)
  if (description.includes('no visitable') || description.includes('sin posesión')) {
    score += 2
  }
  
  // Desviación de precio (20%) - simplificado para MVP
  if (property.price < 80000) {
    score += 2
  }
  
  return {
    riskScore: Math.min(score, 10),
    matches
  }
}
