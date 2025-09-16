import { z } from "zod";

export enum Environment {
  LOCAL = "local",
  DEVELOPMENT = "development",
  STAGING = "staging",
  UAT = "uat",
  PRODUCTION = "production",
}

export const baseEnvSchema = z
  .object({
    VITE_APP_ENV: z.nativeEnum(Environment).default(Environment.LOCAL),
    VITE_APP_PORT: z.coerce.number().default(3000),
    VITE_APP_VERSION: z.string().default("1"),
    VITE_APP_ID: z.string(),
    VITE_APP_URL: z.string(),
    VITE_APP_NAME: z.string(),

    VITE_API_PROXY_URL: z.string(),
    VITE_API_AUTH_URL: z.string(),
    VITE_API_BILLING_URL: z.string(),

    VITE_GOOGLE_MEASURE_ID: z.string(),

    VITE_AWS_BUCKET_NAME: z.string(),
  })
  .catchall(z.any().optional());

export type BaseEnvConfig = z.infer<typeof baseEnvSchema>;

export const envSchema = z.object({
  app: z.object({
    id: z.string(),
    env: z.string(),
    port: z.coerce.number().default(2000),
    version: z.string().default("1"),
    url: z.string(),
    name: z.string(),
  }),
  api: z.object({
    proxy: z.string(),
    auth: z.string(),
    billing: z.string(),
  }),
  google: z.object({
    measureId: z.string(),
  }),
  aws: z.object({
    bucketName: z.string(),
  }),
});

export type envInfo = z.infer<typeof envSchema>;
