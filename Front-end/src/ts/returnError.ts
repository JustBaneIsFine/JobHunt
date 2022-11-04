export function returnError(response, type) {
  const serverError = response.serverError ? response.serverError : undefined;
  const typeError = serverError === undefined ? response[`${type}Error`] : undefined;

  if (serverError != undefined) {
    if (serverError.includes(type)) {
      return serverError;
    } else {
      return '';
    }
  } else if (typeError != undefined && typeError != '') {
    return typeError;
  } else {
    return '';
  }
}
