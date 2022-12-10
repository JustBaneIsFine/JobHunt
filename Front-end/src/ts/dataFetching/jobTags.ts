import { sendRequest } from '../../ts/communication';

export async function fetchTags(): Promise<string[] | false> {
  //
  const result = await sendRequest('/jobTags', 'GET');
  if (result.success) {
    return result.data;
  }
  return false;
}
