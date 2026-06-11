export default {
    darkMode: 'class',
    content: ['./index.html', './src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            colors: {
                bg: 'rgb(var(--color-bg) / <alpha-value>)',
                surface: 'rgb(var(--color-surface) / <alpha-value>)',
                'surface-2': 'rgb(var(--color-surface-2) / <alpha-value>)',
                fg: 'rgb(var(--color-fg) / <alpha-value>)',
                muted: 'rgb(var(--color-muted) / <alpha-value>)',
                accent: 'rgb(var(--color-accent) / <alpha-value>)',
                border: 'rgb(var(--color-border) / <alpha-value>)',
            },
            fontFamily: {
                sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                serif: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
            },
            fontSize: {
                display: ['clamp(2.75rem, 8vw, 5.5rem)', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
            },
            borderRadius: {
                '2xl': '1rem',
                '3xl': '1.5rem',
            },
            boxShadow: {
                soft: '0 1px 2px rgb(0 0 0 / 0.06), 0 8px 24px -12px rgb(0 0 0 / 0.25)',
                lift: '0 24px 60px -24px rgb(0 0 0 / 0.55)',
                glow: '0 0 0 1px rgb(var(--color-accent) / 0.25), 0 24px 80px -28px rgb(var(--color-accent) / 0.45)',
            },
            maxWidth: {
                content: '72rem',
            },
            keyframes: {
                'fade-in': {
                    from: { opacity: '0' },
                    to: { opacity: '1' },
                },
            },
            animation: {
                'fade-in': 'fade-in 0.6s ease-out both',
            },
        },
    },
    plugins: [],
};
