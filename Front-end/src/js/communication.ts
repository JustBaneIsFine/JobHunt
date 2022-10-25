export async function sendRequest(url: string, method: string, data: object) {
  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    return { errorCode: response.status, error: response.statusText };
  } else {
    return { response: response };
  }
}
