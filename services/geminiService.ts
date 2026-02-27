import { createClient } from '@supabase/supabase-js';
import { StartupInput, AnalysisResult, SpyResult, RadarData } from "../types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

console.log("Supabase Config Check:", {
  hasUrl: !!supabaseUrl,
  urlStart: supabaseUrl.substring(0, 10),
  hasKey: !!supabaseAnonKey,
  keyLen: supabaseAnonKey.length
});

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const analyzeStartup = async (input: StartupInput): Promise<AnalysisResult> => {
  const { data, error } = await supabase.functions.invoke('analyze', {
    body: input,
  });

  if (error) {
    console.error("Supabase Error:", error);
    throw { status: 500, message: error.message };
  }
  return data;
};

export const spyOnCompetitor = async (name: string): Promise<SpyResult> => {
  const { data, error } = await supabase.functions.invoke('spy', {
    body: { name },
  });

  if (error) {
    console.error("Supabase Error:", error);
    throw { status: 500, message: error.message };
  }
  return data;
};

export const getTrendRadarData = async (): Promise<RadarData> => {
  const { data, error } = await supabase.functions.invoke('radar');

  if (error) {
    console.error("Supabase Error:", error);
    throw { status: 500, message: error.message };
  }
  return data;
};
