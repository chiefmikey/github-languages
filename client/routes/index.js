import names from './helpers/names';
import getSize from './helpers/size';
import languages from './requests/languages';
import repos from './requests/repos';

const langs = async (inputOwner) => {
  try {
    let owner = inputOwner;
    let allNames;
    if (owner.includes('/')) {
      const [user, repo] = owner.split('/');
      owner = user.replaceAll(' ', '');
      allNames = [repo.replaceAll(' ', '')];
    } else {
      const allRepos = await repos(owner);
      allNames = names(allRepos);
    }
    const allLanguages = await languages(owner, allNames);
    const space = getSize(allLanguages.flat());
    return { data: { allNames, space } };
  } catch (error) {
    console.error('Error getting langs', error);
    return error;
  }
};

export default langs;
