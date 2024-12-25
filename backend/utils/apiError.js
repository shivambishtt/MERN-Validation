class apiError extends Error {
  constructor(
    errMessage = "Something went wrong",
    errStatus,
    errors = [],
    stack = ""
  ) {
    super(errMessage);
    this.errMessage = errMessage;
    this.errStatus = errStatus;
    this.data = null;
    this.errors = errors;
    this.success = false;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default apiError;
