import { checkLogin } from './loginHandlers';
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
