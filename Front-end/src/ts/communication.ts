import { userDatabase } from './interfaces/types';
export async function sendRequest(url: string, method: string, data?: object) {
  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  const responseData = await response.json();
  if (responseData.success === true) {
    return responseData;
  } else {
    return { serverError: responseData.error };
  }
}

export async function requestLoginCheck(): Promise<false | userDatabase> {
  const response = await fetch('/login', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    console.log('the error', response.statusText);
    return false;
  }

  const result = await response.json();
  if (result.loggedIn === true) {
    return result.user;
  } else {
    return false;
  }
}

export async function requestLogOut(): Promise<true | false> {
  const response = await fetch('/logout', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  if (!response.ok) {
    console.log('the error', response.statusText);
    return false;
  }
  return true;
}

export async function requestUserDeletion(): Promise<true | false> {
  const response = await fetch('/deleteUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  if (!response.ok) {
    console.log('the error', response.statusText);
    return false;
  }
  return true;
}
