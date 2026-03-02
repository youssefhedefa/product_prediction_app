/**
 * Dark theme colour palette & spacing constants.
 */
export const Colors = {
  primary: '#818CF8',        // Indigo‑400
  primaryDark: '#6366F1',    // Indigo‑500
  primaryLight: '#312E81',   // Indigo‑900 (muted bg accent)
  accent: '#34D399',         // Emerald‑400
  accentDark: '#064E3B',     // Emerald‑900
  danger: '#F87171',         // Red‑400
  dangerLight: '#450A0A',    // Red‑950
  background: '#0F172A',     // Slate‑900
  surface: '#1E293B',        // Slate‑800
  surfaceLight: '#334155',   // Slate‑700
  textPrimary: '#F1F5F9',    // Slate‑100
  textSecondary: '#94A3B8',  // Slate‑400
  border: '#334155',         // Slate‑700
  disabled: '#475569',       // Slate‑600
  white: '#FFFFFF',
  black: '#000000',
  glow: 'rgba(129,140,248,0.15)', // subtle primary glow
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const Radius = {
  sm: 8,
  md: 14,
  lg: 20,
  full: 9999,
} as const;

export const FontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 22,
  xxl: 28,
} as const;
