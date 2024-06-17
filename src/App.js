import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Tab,
  Tabs,
  Box,
  Select,
  MenuItem,
  Grid,
  CircularProgress,
} from '@mui/material';

import RepoCard from './components/RepoCard';
import {
  getStarredRepos,
  starRepo,
  unStarRepo,
} from './utils/localStorageUtils';
import { useTrendingRepos } from './hooks/useTrendingRepos';

function App() {
  const { data: repos, isLoading, error } = useTrendingRepos();
  const [tabValue, setTabValue] = useState(0);
  const [starredRepos, setStarredRepos] = useState([]);
  const allLanguagesKey = 'All languages';
  const [selectedLanguage, setSelectedLanguage] = useState(allLanguagesKey);

  useEffect(() => {
    setStarredRepos(getStarredRepos());
  }, []);

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleStarChange = (repo) => {
    const isStarred = starredRepos.includes(repo.id);
    if (isStarred) {
      unStarRepo(repo.id);
    } else {
      starRepo(repo.id);
    }
    setStarredRepos(getStarredRepos());
  };

  const onCardClick = (repo) => {
    window.open(repo.html_url, '_blank');
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography>Error: {'error'}</Typography>
      </Box>
    );
  }

  const languages = [
    allLanguagesKey,
    ...new Set(repos?.map((repo) => repo.language).filter(Boolean)),
  ];

  const handleLanguageChange = (event) =>
    setSelectedLanguage(event.target.value);

  const filteredRepos = repos?.filter(
    (repo) =>
      selectedLanguage === allLanguagesKey || repo.language === selectedLanguage
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box
        sx={{
          mt: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" marginBottom={4}>
          Trending Repositories
        </Typography>
        <Select
          value={selectedLanguage}
          onChange={handleLanguageChange}
          displayEmpty
          sx={{ mb: 2, width: '150px', textAlign: 'center' }}
        >
          {languages.map((lang) => (
            <MenuItem key={lang} value={lang}>
              {lang || 'Unknown'}
            </MenuItem>
          ))}
        </Select>
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          aria-label="repository tabs"
        >
          <Tab label="All Repositories" />
          <Tab label="Starred Repositories" />
        </Tabs>
        <Grid sx={{ my: 4 }}>
          {tabValue === 0 &&
            filteredRepos?.map((repo) => (
              <RepoCard
                isStarred={starredRepos.includes(repo.id)}
                key={repo.id}
                onCardClick={() => onCardClick(repo)}
                onStarChange={handleStarChange}
                repo={repo}
              />
            ))}
          {tabValue === 1 &&
            (filteredRepos.filter((repo) => starredRepos.includes(repo.id))
              .length > 0 ? (
              filteredRepos
                .filter((repo) => starredRepos.includes(repo.id))
                .map((repo) => (
                  <RepoCard
                    isStarred={starredRepos.includes(repo.id)}
                    key={repo.id}
                    onCardClick={() => onCardClick(repo)}
                    onStarChange={handleStarChange}
                    repo={repo}
                  />
                ))
            ) : (
              <Typography sx={{ textAlign: 'center', mt: 4 }}>
                No starred repositories for this language.
              </Typography>
            ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default App;
