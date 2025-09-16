import { Environment } from "../env/base-env.validation";
import { env } from "../env/env";
import { createLogger, LogLevel } from "./logger";

export const logger = createLogger({
  level:
    env.app.env == Environment.LOCAL ||
    env.app.env == Environment.DEVELOPMENT ||
    env.app.env == Environment.STAGING ||
    env.app.env == Environment.UAT
      ? LogLevel.ALL
      : LogLevel.NONE,
});
