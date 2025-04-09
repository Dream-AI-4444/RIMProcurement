import { z } from 'zod';

// Define environment variables schema
const envSchema = z.object({
  // Required variables with better error handling
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  
  // Make DATABASE_URL optional to handle different connection methods
  DATABASE_URL: z.string().min(1).optional(),
  
  // Add individual database connection parameters as optional
  DB_HOST: z.string().optional(),
  DB_PORT: z.string().optional(),
  DB_NAME: z.string().optional(),
  DB_USER: z.string().optional(),
  DB_PASSWORD: z.string().optional(),
  
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
    const config = envSchema.safeParse(process.env);
    
    if (!config.success) {
      console.error('❌ Invalid environment variables:');
      config.error.errors.forEach(err => {
        console.error(`  - ${err.path.join('.')}: ${err.message}`);
      });
      
      // If DATABASE_URL is missing but we have individual connection params, we can continue
      const hasIndividualDbParams = 
        process.env.DB_HOST && 
        process.env.DB_NAME && 
        process.env.DB_USER;
        
      if (!hasIndividualDbParams) {
        console.error('❌ Database connection parameters missing. Please provide either:');
        console.error('  - DATABASE_URL environment variable');
        console.error('  - or DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD variables');
        process.exit(1);
      }
      
      // Create a minimal valid config with available parameters
      return {
        NODE_ENV: (process.env.NODE_ENV as 'development' | 'production' | 'test') || 'development',
        PORT: parseInt(process.env.PORT || '5000'),
        SESSION_SECRET: process.env.SESSION_SECRET || 'replace_this_with_a_long_secure_random_string_in_production',
        LOG_LEVEL: (process.env.LOG_LEVEL as 'error' | 'warn' | 'info' | 'debug') || 'info',
        DB_HOST: process.env.DB_HOST,
        DB_PORT: process.env.DB_PORT,
        DB_NAME: process.env.DB_NAME,
        DB_USER: process.env.DB_USER,
        DB_PASSWORD: process.env.DB_PASSWORD,
      };
    }
    
    return config.data;
  } catch (error) {
    console.error('❌ Unknown error validating environment variables:', error);
    process.exit(1);
  }
}

// Export validated config
export const config = validateEnv();

// Log starting configuration (but hide sensitive values)
console.log(`Starting server with configuration: 
  NODE_ENV: ${config.NODE_ENV}
  PORT: ${config.PORT}
  DATABASE_URL: ${config.DATABASE_URL ? (config.DATABASE_URL.includes('localhost') ? config.DATABASE_URL : '******') : 'Not provided, using individual connection params'}
  LOG_LEVEL: ${config.LOG_LEVEL}
`);
