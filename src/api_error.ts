import type { Response } from "express";
import { STATUS_CODES } from "http";

export default class APIError extends Error {
  public readonly status: number;

  constructor(
    message: string,
    { status = 500, cause }: { status?: number; cause?: unknown }
  ) {
    super(message, { cause });
    this.status = status;
  }

  writeResponse(res: Response): Response {
    res.statusCode = this.status;
    res.statusMessage = STATUS_CODES[this.status] || "Unknown Error";

    return res.send(this.message);
  }
}
