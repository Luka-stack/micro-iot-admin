export class RequestError extends Error {}

export async function postRequest<TData>(
  url: string,
  body: unknown,
  expectedStatus?: number,
  cache: RequestCache = 'no-cache'
): Promise<TData> {
  const response = await fetch(url, {
    cache,
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': 'true',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const responseJson = await response.json();

  if (!response.ok) {
    throw new RequestError('Request failed');
  }

  if (expectedStatus && response.status !== expectedStatus) {
    throw new RequestError('Different response status than expected', {
      cause: responseJson,
    });
  }

  return responseJson;
}
