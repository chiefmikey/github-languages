import { Octokit } from 'octokit';

let octokit;

const fetchLanguage = async (owner, repo, token) => {
  try {
    if (!octokit) {
      octokit = new Octokit({ auth: token });
    }
    const response = await octokit.paginate(
      'GET /repos/{owner}/{repo}/languages',
      {
        owner,
        repo,
        type: 'public',
        per_page: 100,
      },
    );
    if (response) {
      return response;
    }
    return {};
  } catch (error) {
    console.log('Error getting languages', error);
    return {};
  }
};

const getLanguages = (owner, names, token) => {
  const languages = [];
  for (const repo of names) {
    languages.push(fetchLanguage(owner, repo, token));
  }
  return Promise.all(languages);
};

export default getLanguages;
