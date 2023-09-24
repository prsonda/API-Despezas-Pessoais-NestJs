import { messages } from './messages';

class ErrorService {
  responseError(error: any) {
    const err = error as Error;

    let status = 500;
    let message = err.message;

    if (message.includes(': ')) {
      const [statusCodeStr, errorMessage] = err.message.split(': ');

      const statusCode = Number(statusCodeStr);

      if (!isNaN(statusCode)) {
        status = statusCode;
        message = errorMessage.trim();
      }
    }

    return { status, message };
  }

  authenticationError() {
    throw new Error(`401: ${messages.validate.login}`);
  }

  authorizationError() {
    throw new Error(`401: ${messages.permission.authorization}`);
  }

  userNotLogged() {
    throw new Error(`401: ${messages.permission.userNotLogged}`);
  }

  userInactive() {
    throw new Error(`401: ${messages.permission.userInactive}`);
  }

  duplicateError(resource: string) {
    throw new Error(`409: ${messages.created.Duplicate(resource)}`);
  }

  notNumber(resource: string) {
    throw new Error(`400: ${messages.validate.isNumber(resource)}`);
  }

  notFound(resource: string) {
    throw new Error(`404: ${messages.notFound.notFound(resource)}`);
  }

  productStockError() {
    throw new Error(`400: ${messages.validate.productStock}`);
  }

  isInvalidError(resource: string) {
    throw new Error(`400: ${messages.validate.isInvalid(resource)}`);
  }
}

export default new ErrorService();
