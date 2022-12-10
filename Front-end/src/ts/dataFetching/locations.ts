import { sendRequest } from '../../ts/communication';

export async function fetchLocations(): Promise<string[] | false> {
  //
  const result = await sendRequest('/locations', 'GET');
  if (result.success) {
    return result.data;
  }
  return false;
}
