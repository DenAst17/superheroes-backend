/* eslint-disable no-console */

class ErrorHandler {
  listen(error: any, req: any, res: any) {
    console.log(`error ${error.message}`);
    const status = error.status || 500;
    res.status(status).send(error.message);
  }
}

export default ErrorHandler;
