import { baseEnvSchema, envSchema } from "./base-env.validation";

const envValidation = baseEnvSchema.safeParse(import.meta.env);
if (!envValidation.success) {
  console.error("Invalid environment variables:", envValidation.error.format());
  throw new Error("Invalid environment variables");
}

export const env = envSchema.parse({
  app: {
    id: envValidation.data.VITE_APP_ID,
    env: envValidation.data.VITE_APP_ENV,
    port: envValidation.data.VITE_APP_PORT,
    version: envValidation.data.VITE_APP_VERSION,
    url: envValidation.data.VITE_APP_URL,
    name: envValidation.data.VITE_APP_NAME,
  },
  api: {
    auth: envValidation.data.VITE_API_AUTH_URL,
    proxy: envValidation.data.VITE_API_PROXY_URL,
    billing: envValidation.data.VITE_API_BILLING_URL,
  },
  google: {
    measureId: envValidation.data.VITE_GOOGLE_MEASURE_ID,
  },
  aws: {
    bucketName: envValidation.data.VITE_AWS_BUCKET_NAME,
  },
});
