export class RequestError extends Error {}

export class RequestResponse<TData> {
  public fetchedData: TData | null;
  public messages: string[] = [];
  public code: number = 500;

  constructor(public hasError: boolean, data: TData | unknown) {
    if (hasError) {
      this.fetchedData = null;
      this.hanldeError(data);
    } else {
      this.fetchedData = data as TData;
    }
  }

  toPlainObject() {
    if (this.hasError) {
      return {
        error: true,
        code: this.code,
        messages: this.messages,
      };
    }

    return {
      error: false,
      data: this.fetchedData,
    };
  }

  private hanldeError(error: unknown) {
    if (error) {
      if (typeof error === 'object') {
        if ('message' in error) {
          if (typeof error.message === 'string') {
            this.messages.push(error.message);
          } else {
            this.messages = error.message as string[];
          }
        }

        if ('statusCode' in error) {
          this.code = error.statusCode as number;
        }
      }
    }
  }
}

async function fetchClient<TData>(
  url: string,
  body: Object | null,
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  accessToken?: string,
  cache?: RequestCache,
  next?: NextFetchRequestConfig
): Promise<RequestResponse<TData>> {
  const response = await fetch(url, {
    cache,
    next,
    method,
    headers: {
      'Access-Control-Allow-Origin': 'true',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: body && JSON.stringify(body),
  });

  // No Content
  if (response.status === 204) {
    return new RequestResponse<TData>(false, null);
  }

  const responseJson = await response.json();

  if (!response.ok) {
    return new RequestResponse(true, responseJson);
  }

  return new RequestResponse<TData>(false, responseJson);
}

export async function getRequest<TData>(
  url: string,
  options: {
    token?: string;
    cache?: RequestCache;
    next?: NextFetchRequestConfig;
  }
): Promise<RequestResponse<TData>> {
  return fetchClient<TData>(
    url,
    null,
    'GET',
    options.token,
    options.cache,
    options.next
  );
}

export async function postRequest<TData>(
  url: string,
  body: Object,
  token?: string
): Promise<RequestResponse<TData>> {
  return fetchClient<TData>(url, body, 'POST', token);
}

export async function patchRequest<TData>(
  url: string,
  body: Object,
  token?: string
): Promise<RequestResponse<TData>> {
  return fetchClient<TData>(url, body, 'PATCH', token);
}

export async function postRequestOld<TData>(
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
