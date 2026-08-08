import { ImageResponse } from 'next/og';

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0d1128',
          borderRadius: 16,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 30,
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 1,
            fontFamily: 'Arial Black, Arial, sans-serif',
            backgroundImage: 'linear-gradient(135deg, #7cf6d2 0%, #9fb0ff 100%)',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          RK
        </div>
      </div>
    ),
    { ...size },
  );
}
