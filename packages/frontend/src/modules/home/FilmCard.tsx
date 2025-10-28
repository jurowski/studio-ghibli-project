import React, { useCallback, useState } from 'react';

type Film = {
  id?: string;
  title?: string;
  description?: string;
  image?: string;
  running_time?: string | number;
  director?: string;
  release_date?: string;
  rt_score?: string | number;
};

export default function FilmCard({
  film,
  selected = false,
  onSelect,
}: {
  film: Film;
  selected?: boolean;
  onSelect?: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  const handleToggle = useCallback(() => {
    if (onSelect) onSelect();
  }, [onSelect]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleToggle();
      }
    },
    [handleToggle],
  );

  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: 16,
        padding: 0,
        boxShadow:
          hovered || selected
            ? '0 20px 40px rgba(15,23,42,0.14)'
            : '0 10px 30px rgba(15, 23, 42, 0.12)',
        border: selected
          ? '3px solid rgba(99,102,241,0.85)'
          : '1px solid rgba(0, 0, 0, 0.06)',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        width: 300,
        overflow: 'hidden',
        transition:
          'transform 180ms ease, box-shadow 180ms ease, border 160ms ease',
        cursor: 'pointer',
        transform: hovered || selected ? 'translateY(-6px)' : 'translateY(0)',
        position: 'relative',
      }}
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      aria-label={film?.title ?? 'Film card'}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleToggle}
      onKeyDown={onKeyDown}
    >
      {/* Film Image */}
      <div style={{ position: 'relative', width: '100%' }}>
        <div
          style={{
            width: '100%',
            height: 180,
            overflow: 'hidden',
            background: '#f0f0f0',
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }}
        >
          {film?.image ? (
            // eslint-disable-next-line jsx-a11y/img-redundant-alt
            <img
              src={film.image}
              alt={film.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, #e0f2fe 0%, #bfdbfe 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 48,
              }}
            >
              🎬
            </div>
          )}
        </div>

        {/* RT Badge (bottom-left over image) */}
        <div
          style={{
            position: 'absolute',
            left: 12,
            bottom: 12,
            background: '#ffffff',
            borderRadius: 999,
            padding: '6px 10px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            boxShadow: '0 6px 18px rgba(15,23,42,0.12)',
            border: '2px solid rgba(0,0,0,0.03)',
          }}
        >
          <span style={{ fontSize: 18 }}>🍅</span>
          <span style={{ fontWeight: 800, color: '#059669' }}>
            {film?.rt_score ?? '-'}
          </span>
        </div>
      </div>

      {/* Hover / Selected Info Overlay */}
      <div
        data-testid="filmcard-overlay"
        aria-hidden={!hovered && !selected}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          transition: 'opacity 160ms ease, transform 200ms ease',
          opacity: hovered || selected ? 1 : 0,
          pointerEvents: hovered || selected ? 'auto' : 'none',
          transform: hovered || selected ? 'translateY(0)' : 'translateY(6px)',
          background:
            'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.96) 60%)',
        }}
      >
        <div
          style={{
            padding: 16,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
            background: 'rgba(255,255,255,0.98)',
            boxShadow: '0 -6px 18px rgba(15,23,42,0.04)',
            minHeight: 120,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>
            {film?.title}
          </div>
          <div
            style={{
              fontSize: 13,
              color: '#475569',
              marginBottom: 8,
              maxHeight: 64,
              overflow: 'hidden',
            }}
          >
            {film?.description}
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ color: '#94a3b8', fontSize: 12 }}>
              Runtime:{' '}
              <span style={{ color: '#0f172a', fontWeight: 700 }}>
                {film?.running_time ?? '-'} min
              </span>
            </div>
            <div style={{ color: '#059669', fontWeight: 800, fontSize: 18 }}>
              {film?.rt_score ?? '-'}
            </div>
          </div>
        </div>
      </div>

      {/* Film Content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: 16,
        }}
      >
        {/* Title */}
        <h3
          style={{
            margin: '0 0 8px 0',
            fontSize: 18,
            fontWeight: 800,
            color: '#0f172a',
            letterSpacing: '-0.01em',
          }}
        >
          {film?.title}
        </h3>

        {/* Description */}
        {film?.description && (
          <p
            style={{
              margin: '0 0 12px 0',
              fontSize: 13,
              lineHeight: 1.45,
              color: '#475569',
              flex: 1,
              maxHeight: 72,
              overflow: 'hidden',
            }}
          >
            {film.description}
          </p>
        )}

        {/* Details Grid */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            paddingTop: 12,
            borderTop: '1px dashed rgba(15,23,42,0.04)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span style={{ color: '#94a3b8', fontWeight: 600, fontSize: 12 }}>
              Runtime
            </span>
            <span style={{ color: '#0f172a', fontWeight: 700, fontSize: 13 }}>
              {film?.running_time ?? '-'} min
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span style={{ color: '#94a3b8', fontWeight: 600, fontSize: 12 }}>
              Director
            </span>
            <span style={{ color: '#0f172a', fontWeight: 700, fontSize: 13 }}>
              {film?.director ?? '-'}
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span style={{ color: '#94a3b8', fontWeight: 600, fontSize: 12 }}>
              Released
            </span>
            <span style={{ color: '#0f172a', fontWeight: 700, fontSize: 13 }}>
              {film?.release_date ?? '-'}
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 4,
            }}
          >
            <span style={{ color: '#94a3b8', fontWeight: 600, fontSize: 12 }}>
              RT Score
            </span>
            <span style={{ color: '#059669', fontWeight: 800, fontSize: 16 }}>
              {film?.rt_score ?? '-'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
