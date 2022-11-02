export async function sendRequest(url: string, method: string, data: object) {
  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const responseData = await response.json();
  if (responseData.success === true) {
    return true;
  } else {
    return { serverError: responseData.error };
  }
}
