import { sql } from '@vercel/postgres';

// Database connection utility for Vercel Neon
export { sql };

// Simple user table creation (run this once in your database)
export const createTables = async () => {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255),
        is_admin BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log('Tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
  }
};

// User operations
export const createUser = async (email: string, password: string, name?: string) => {
  try {
    const result = await sql`
      INSERT INTO users (email, password, name)
      VALUES (${email}, ${password}, ${name})
      RETURNING id, email, name, is_admin, created_at;
    `;
    return result.rows[0];
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const result = await sql`
      SELECT id, email, name, is_admin, created_at, updated_at
      FROM users
      WHERE email = ${email};
    `;
    return result.rows[0];
  } catch (error) {
    console.error('Error getting user:', error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const result = await sql`
      SELECT id, email, name, is_admin, created_at
      FROM users
      ORDER BY created_at DESC;
    `;
    return result.rows;
  } catch (error) {
    console.error('Error getting users:', error);
    throw error;
  }
};
