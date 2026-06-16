import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Hemang Bhat — Full-Stack Developer & AI/ML Builder';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#08080b',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Accent glow */}
        <div
          style={{
            position: 'absolute',
            top: -100,
            left: -100,
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(129,140,248,0.25) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -80,
            right: 100,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(167,139,250,0.15) 0%, transparent 70%)',
          }}
        />

        {/* Available badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 32,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 999,
            padding: '8px 20px',
            width: 'fit-content',
          }}
        >
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#34d399' }} />
          <span style={{ color: '#a1a1aa', fontSize: 16 }}>
            Available for internships · New Delhi, India
          </span>
        </div>

        {/* Name */}
        <div style={{ fontSize: 80, fontWeight: 700, color: '#f4f4f5', lineHeight: 1.05, marginBottom: 20 }}>
          Hemang Bhat
        </div>

        {/* Title */}
        <div style={{ fontSize: 30, color: '#818cf8', fontWeight: 500, marginBottom: 28 }}>
          Full-Stack Developer · AI/ML Builder · DSA Enthusiast
        </div>

        {/* Positioning */}
        <div style={{ fontSize: 22, color: '#a1a1aa', maxWidth: 700, lineHeight: 1.5 }}>
          I build full-stack products and AI-driven workflows end to end — from a blank file to something people actually use.
        </div>

        {/* Footer domain */}
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            right: 80,
            fontSize: 20,
            color: '#818cf8',
            fontWeight: 600,
            letterSpacing: 1,
          }}
        >
          hemangbhat.dev
        </div>
      </div>
    ),
    { ...size }
  );
}
