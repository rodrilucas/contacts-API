class AppError {
  readonly message;
  readonly status

  constructor(message: string, status: number = 400) {
    this.message = message;
    this.status = status;
  }
}

export default AppError;