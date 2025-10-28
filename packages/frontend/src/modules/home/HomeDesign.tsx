import { Box, Typography, CircularProgress } from '@mui/material';
import { useQuery } from '@apollo/client';
import FilmCard from './FilmCard';
import bg from '~/assets/background.png';
import { GET_FILMS } from '~/graphql/queries';

export default function HomeDesign() {
  const { data, loading, error } = useQuery(GET_FILMS);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="320px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box padding={2}>
        <Typography color="error">
          Failed to load films: {error.message}
        </Typography>
      </Box>
    );
  }

  const films = data?.films ?? [];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        px: { xs: 2, md: 6 },
        py: { xs: 6, md: 10 },
        boxSizing: 'border-box',
        backgroundImage: `url(${bg}), radial-gradient(circle at 20% 20%, rgba(255,255,255,0.85) 0 8%, transparent 20%), radial-gradient(circle at 80% 40%, rgba(255,255,255,0.7) 0 6%, transparent 18%), linear-gradient(180deg,#8ec5ff 0%,#bfe9ff 100%)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <Typography
        variant="h2"
        component="h1"
        sx={{ fontWeight: 800, mb: 1, textAlign: 'center' }}
      >
        Discover Studio Ghibli Films
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{ color: 'rgba(15,23,42,0.6)', mb: 4 }}
      >
        Select a film & hover to learn more
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
            md: 'repeat(4, 1fr)',
          },
          gap: { xs: 3, md: 4 },
          width: '100%',
          maxWidth: 1200,
          justifyItems: 'center',
        }}
      >
        {films.map((f: any) => (
          <FilmCard key={f.id} film={f} />
        ))}
      </Box>
    </Box>
  );
}
