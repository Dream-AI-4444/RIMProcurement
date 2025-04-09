import { z } from 'zod';

// Define environment variables schema
const envSchema = z.object({
  // Required variables
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DATABASE_URL: z.string().min(1),
  
  // Optional variables with defaults
  PORT: z.coerce.number().positive().default(5000),
  SESSION_SECRET: z.string().min(32).default('replace_this_with_a_long_secure_random_string_in_production'),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
});

// Process environment variables
export type EnvConfig = z.infer<typeof envSchema>;

function validateEnv(): EnvConfig {
  try {
    // Validate and parse environment variables
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Invalid environment variables:');
      error.errors.forEach(err => {
        console.error(`  - ${err.path.join('.')}: ${err.message}`);
      });
    } else {
      console.error('❌ Unknown error validating environment variables:', error);
    }
    process.exit(1);
  }
}

// Export validated config
export const config = validateEnv();

// Log starting configuration (but hide sensitive values)
console.log(`Starting server with configuration: 
  NODE_ENV: ${config.NODE_ENV}
  PORT: ${config.PORT}
  DATABASE_URL: ${config.DATABASE_URL.includes('localhost') ? config.DATABASE_URL : '******'}
  LOG_LEVEL: ${config.LOG_LEVEL}
`);
