export const ResponseTitle = {
  SUCCESS: "Success",
  CREATED: "Created Successfully",
  UPDATED: "Updated Successfully",
  DELETED: "Deleted Successfully",

  BAD_REQUEST: "Bad Request",
  UNAUTHORIZED: "You are not authorized",
  FORBIDDEN: "Forbidden Access",
  NOT_FOUND: "Resource Not Found",
  CONFLICT: "Conflict Detected",
  UNPROCESSABLE: "Unprocessable Entity",
  TOO_MANY_REQUESTS: "Too Many Requests",
  INTERNAL_SERVER_ERROR: "Internal Server Error",
  SERVICE_UNAVAILABLE: "Service Unavailable",
  GATEWAY_TIMEOUT: "Gateway Timeout",

  VALIDATION_ERROR: "Validation Error",
  INVALID_INPUT: "Invalid Input Provided",
  SESSION_EXPIRED: "Session Expired",
  TOKEN_EXPIRED: "Token Expired",
  LOGIN_REQUIRED: "Login Required",
  PERMISSION_DENIED: "Permission Denied",
  EMAIL_NOT_VERIFIED: "Email Not Verified",
  ACCOUNT_DISABLED: "Account Disabled",

  DATABASE_ERROR: "Database Operation Failed",
  NETWORK_ERROR: "Network Error",
  UNKNOWN_ERROR: "Unknown Error",
} as const;

export type ResponseTitleKey = keyof typeof ResponseTitle;


export const HttpStatus = {
  // ✅ 2xx — Success
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,

  // ⚠️ 3xx — Redirection
  MOVED_PERMANENTLY: 301,
  FOUND: 302,
  NOT_MODIFIED: 304,

  // ❌ 4xx — Client Errors
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  GONE: 410,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,

  // 💥 5xx — Server Errors
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
} as const;

export type HttpStatusKey = keyof typeof HttpStatus;
export type HttpStatusCode = (typeof HttpStatus)[HttpStatusKey];

