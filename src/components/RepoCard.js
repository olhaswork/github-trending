import { Card, CardContent, Typography, Box, Link, Grid } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const RepoCard = ({ isStarred, repo, onStarChange, onCardClick }) => {
  const handleStar = (event) => {
    event.stopPropagation();
    onStarChange(repo);
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} key={repo.id}>
      <Card
        onClick={onCardClick}
        sx={{
          width: {
            xs: '100%',
            md: 700,
          },
          marginBottom: 2,
          position: 'relative',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.15)',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.02)',
            cursor: 'pointer',
          },
        }}
      >
        <Box position="absolute" top={0} right={0} p={1}>
          {isStarred ? (
            <StarIcon
              sx={{ color: 'gold', cursor: 'pointer' }}
              onClick={handleStar}
            />
          ) : (
            <StarBorderIcon
              sx={{ color: 'grey', cursor: 'pointer' }}
              onClick={handleStar}
            />
          )}
        </Box>
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <Typography variant="h5" component="div">
            <Link
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
            >
              {repo.name}
            </Link>
          </Typography>
          <Typography sx={{ mb: 1.5, mt: 1.5 }} color="text.secondary">
            {repo.description}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {repo.stargazers_count} Stars
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default RepoCard;
