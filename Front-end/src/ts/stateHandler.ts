import { checkLogin } from './loginHandlers';
import { fetchCategories } from '../ts/categories';
import { fetchTags } from '../ts/dataFetching/jobTags';
import { fetchLocations } from '../ts/dataFetching/locations';

// main state handlers
export async function checkAndUpdateState(setState) {
  const result = await checkLogin();
  if (result != false) {
    setState({
      loggedIn: true,
      username: result.username,
    });
  } else {
    setState({
      loggedIn: false,
      username: '',
    });
  }
}

export async function checkAndUpdateCategoriesState(setState) {
  const result = await fetchCategories();
  if (result.success) {
    setState(result.categories);
  } else {
    setState('error');
  }
}

export async function updateJobTags(updateState) {
  const x = await fetchTags();
  if (x !== false) {
    updateState(x);
    return;
  }
  updateState('error');
}

export async function updateLocations(updateState) {
  const x = await fetchLocations();
  if (x !== false) {
    updateState(x);
    return;
  }
  updateState('error');
}
