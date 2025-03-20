/**
 * Environment configuration with type checking
 * Provides a single source of truth for accessing environment variables
 */

/**
 * Type definition for environment variables
 */
export interface EnvironmentVars {
  OPENAI_API_KEY: string;
  DATABASE_URL: string;
  NODE_ENV: "development" | "production" | "test";
}

/**
 * Get environment variable with type checking
 * @param key - Environment variable key
 * @param required - Whether the environment variable is required
 * @param defaultValue - Default value if the environment variable is not set and not required
 */
export function getEnv<K extends keyof EnvironmentVars>(
  key: K,
  required: boolean = true,
  defaultValue?: EnvironmentVars[K]
): EnvironmentVars[K] {
  const value = process.env[key] as EnvironmentVars[K];

  if (!value && required && defaultValue === undefined) {
    throw new Error(`Environment variable ${key} is required but not set.`);
  }

  return value || (defaultValue as EnvironmentVars[K]);
}

/**
 * Get all environment variables
 */
export function getAllEnv(): Partial<EnvironmentVars> {
  return {
    OPENAI_API_KEY: getEnv("OPENAI_API_KEY"),
    DATABASE_URL: getEnv("DATABASE_URL"),
    NODE_ENV: getEnv("NODE_ENV", false, "development"),
  };
}
