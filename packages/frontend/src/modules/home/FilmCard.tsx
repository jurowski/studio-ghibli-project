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
export default function FilmCard({ film }: { film: Film }) {
  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: 16,
        padding: 0,
        boxShadow: '0 10px 30px rgba(15, 23, 42, 0.12)',
        border: '1px solid rgba(0, 0, 0, 0.06)',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        width: 300,
        overflow: 'hidden',
        transition: 'transform 180ms ease, box-shadow 180ms ease',
        cursor: 'pointer',
      }}
      role="article"
      aria-label={film?.title ?? 'Film card'}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform =
          'translateY(-6px)';
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          '0 20px 40px rgba(15,23,42,0.14)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          '0 10px 30px rgba(15,23,42,0.12)';
      }}
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
