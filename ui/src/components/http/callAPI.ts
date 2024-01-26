export enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export const callAPI = async (
  url: string,
  method: RequestMethod,
  dataHandler: (data: any) => void,
  errorHandler: (error: any) => void,
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
        requestHandler(url, 'POST', dataHandler, errorHandler, body);
  }
    if(method === RequestMethod.PUT) {
        requestHandler(url, 'PUT', dataHandler, errorHandler, body);
    }
    if(method === RequestMethod.DELETE) {
        requestHandler(url, 'DELETE', dataHandler, errorHandler, body);
    }

};


async function requestHandler(url: string, method: string, dataHandler: (data: any) => void,   errorHandler: (error: any) => void,body?: string) {
    try {
    const res = await fetch(url, {
        method: method,
        headers: {
        'Content-Type': 'application/json',
        },
        body: body,
    });
    if(res.status === 500) {
      return console.log('error 500');
    }
    const data = await res.json();
    dataHandler(data);
    } catch (err) {
    dataHandler(err);
    }
}