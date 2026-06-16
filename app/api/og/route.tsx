import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(_req: NextRequest) {
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
        {/* Glow top-left */}
        <div
          style={{
            position: 'absolute',
            top: -80,
            left: -80,
            width: 560,
            height: 560,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(129,140,248,0.30) 0%, transparent 70%)',
          }}
        />
        {/* Glow bottom-right */}
        <div
          style={{
            position: 'absolute',
            bottom: -60,
            right: 60,
            width: 360,
            height: 360,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(167,139,250,0.18) 0%, transparent 70%)',
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 36,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.10)',
            borderRadius: 999,
            padding: '8px 20px',
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#34d399',
            }}
          />
          <span style={{ color: '#a1a1aa', fontSize: 15 }}>
            Available for internships · New Delhi, India
          </span>
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: 82,
            fontWeight: 700,
            color: '#f4f4f5',
            lineHeight: 1.05,
            marginBottom: 18,
          }}
        >
          Hemang Bhat
        </div>

        {/* Role */}
        <div
          style={{
            fontSize: 28,
            color: '#818cf8',
            fontWeight: 500,
            marginBottom: 32,
          }}
        >
          Full-Stack Developer · AI/ML Builder · DSA Enthusiast
        </div>

        {/* Tagline */}
        <div style={{ fontSize: 21, color: '#a1a1aa', maxWidth: 700, lineHeight: 1.55 }}>
          I turn ideas into working products — clean interfaces, scalable systems, and AI that actually ships.
        </div>

        {/* Domain */}
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
    { width: 1200, height: 630 }
  );
}
