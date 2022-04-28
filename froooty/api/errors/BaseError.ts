export default class BaseError extends Error {
    public message;
    public statusCode;
    constructor(message, statusCode) {
      super();
      this.message = message;
      this.statusCode = statusCode;
    }
  }
    