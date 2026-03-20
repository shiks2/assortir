// ============================================================
// RANG — Design System Tokens
// ============================================================

export const theme = {
  colors: {
    // Brand
    primary: '#1a1a1a',
    primaryHover: '#333333',
    accent: '#1a1a1a',

    // Backgrounds
    bg: '#ffffff',
    bgSecondary: '#f5f4f2',
    bgTertiary: '#f0ede8',

    // Text
    text: '#1a1a1a',
    textSecondary: '#6b6b6b',
    textTertiary: '#9b9b9b',
    textInverse: '#ffffff',

    // Borders
    border: '#f0ede8',
    borderHover: '#f5f4f2',

    // Semantic
    success: '#27500A',
    successBg: '#EAF3DE',
    error: '#A32D2D',
    errorBg: '#FCEBEB',
    warning: '#633806',
    warningBg: '#FAEEDA',
    info: '#0C447C',
    infoBg: '#E6F1FB',

    // Plan badges
    freeBg: '#EAF3DE',
    freeText: '#27500A',
    proBg: '#1a1a1a',
    proText: '#ffffff',
  },

  typography: {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif",
    fontMono: "'JetBrains Mono', 'Fira Code', monospace",

    // Sizes
    xs: '11px',
    sm: '13px',
    base: '15px',
    md: '16px',
    lg: '18px',
    xl: '22px',
    xxl: '28px',
    xxxl: '36px',

    // Weights
    regular: 400,
    medium: 500,
  },

  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    xxl: '32px',
    xxxl: '48px',
  },

  radius: {
    sm: '6px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },

  shadows: {
    none: 'none',
    sm: '0 1px 3px rgba(0,0,0,0.06)',
    md: '0 2px 8px rgba(0,0,0,0.08)',
  },

  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },

  transitions: {
    fast: '150ms ease',
    base: '200ms ease',
  },
} as const

export type Theme = typeof theme