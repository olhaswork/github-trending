/**
 * Retrieve starred repos from local storage.
 */
export const getStarredRepos = () => {
  const starred = localStorage.getItem('starredRepos');
  return starred ? JSON.parse(starred) : [];
};

/**
 * Save a new starred repo to local storage.
 * @param {number} id - Repository ID to star.
 */
export const starRepo = (id) => {
  const currentStarred = getStarredRepos();
  if (!currentStarred.includes(id)) {
    localStorage.setItem(
      'starredRepos',
      JSON.stringify([...currentStarred, id])
    );
  }
};

/**
 * Remove a starred repo from local storage.
 * @param {number} id - Repository ID to unStar.
 */
export const unStarRepo = (id) => {
  const currentStarred = getStarredRepos();
  const newStarred = currentStarred.filter((repoId) => repoId !== id);
  localStorage.setItem('starredRepos', JSON.stringify(newStarred));
};
