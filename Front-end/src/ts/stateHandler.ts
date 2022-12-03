import { checkLogin } from './loginHandlers';
import { fetchCategories } from '../ts/categories';
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
