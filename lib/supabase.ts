import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Función para obtener distritos con su scoring
export async function getDistricts() {
  const { data, error } = await supabase
    .from('districts')
    .select('*')
    .order('risk_score', { ascending: false })
  
  if (error) throw error
  return data
}

// Función para obtener propiedades de un distrito
export async function getPropertiesByDistrict(districtId: number) {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('district_id', districtId)
    .gte('risk_score', 5)
    .order('risk_score', { ascending: false })
  
  if (error) throw error
  return data
}

// Función para crear un informe
export async function createReport(reportData: {
  email: string
  district_id: number
  questionnaire_data: any
  risk_score: number
  stripe_payment_id: string
}) {
  // Crear o encontrar usuario
  const { data: user, error: userError } = await supabase
    .from('users')
    .upsert({ email: reportData.email }, { onConflict: 'email' })
    .select()
    .single()
  
  if (userError) throw userError
  
  // Crear informe
  const { data: report, error: reportError } = await supabase
    .from('reports')
    .insert({
      user_id: user.id,
      district_id: reportData.district_id,
      questionnaire_data: reportData.questionnaire_data,
      risk_score: reportData.risk_score,
      stripe_payment_id: reportData.stripe_payment_id
    })
    .select()
    .single()
  
  if (reportError) throw reportError
  return report
}
