enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export const callAPI = async (
  url: string,
  method: RequestMethod,
  dataHandler: (data: any) => void,
  body?: string
): Promise<void> => {
  if (method === RequestMethod.GET) {
    try {
      const res = await fetch(url);
      const data = await res.json();
      dataHandler(data);
    } catch (err) {
      dataHandler(err);
    }
  }
  if(method === RequestMethod.POST) {
        requestHandler(url, 'POST', dataHandler, body);
  }
    if(method === RequestMethod.PUT) {
        requestHandler(url, 'PUT', dataHandler, body);
    }
    if(method === RequestMethod.DELETE) {
        requestHandler(url, 'DELETE', dataHandler, body);
    }

};


async function requestHandler(url: string, method: string, dataHandler: (data: any) => void, body?: string) {
    try {
    const res = await fetch(url, {
        method: method,
        headers: {
        'Content-Type': 'application/json',
        },
        body: body,
    });
    const data = await res.json();
    dataHandler(data);
    } catch (err) {
    dataHandler(err);
    }
}