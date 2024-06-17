import axios from 'axios';
import { useQuery } from 'react-query';

import { oneWeekAgo } from '../utils/dateUtils';

const fetchTrendingRepos = async () => {
  const date = oneWeekAgo();
  const url = `https://api.github.com/search/repositories?q=created:>${date}&sort=stars&order=desc`;
  const { data } = await axios.get(url);
  return data.items;
};

export const useTrendingRepos = () =>
  useQuery('trendingRepos', fetchTrendingRepos);
