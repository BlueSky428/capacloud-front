import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from 'crypto';

/**
 * Encryption utility for sensitive data
 * Uses AES-256-GCM for encryption
 */

const ALGORITHM = 'aes-256-gcm';
const SALT_LENGTH = 32;
const IV_LENGTH = 16;
const TAG_LENGTH = 16;

/**
 * Get encryption key from environment variable
 * In production, use a secure key management service (AWS KMS, HashiCorp Vault, etc.)
 */
function getEncryptionKey(): Buffer {
  const key = process.env.ENCRYPTION_KEY;
  if (!key) {
    // Fallback: generate a key from a default (NOT SECURE FOR PRODUCTION)
    // In production, this should be a strong, randomly generated key stored securely
    console.warn('WARNING: ENCRYPTION_KEY not set. Using default key (NOT SECURE FOR PRODUCTION)');
    return scryptSync('default-key-change-in-production', 'salt', 32);
  }
  
  // If key is provided as hex string, convert it
  if (key.length === 64) {
    return Buffer.from(key, 'hex');
  }
  
  // Otherwise, derive key from the provided string
  return scryptSync(key, 'capa-cloud-salt', 32);
}

/**
 * Encrypt sensitive data
 * @param plaintext - Data to encrypt
 * @returns Encrypted data as base64 string (format: salt:iv:tag:encrypted)
 */
export function encrypt(plaintext: string): string {
  try {
    const key = getEncryptionKey();
    const salt = randomBytes(SALT_LENGTH);
    const iv = randomBytes(IV_LENGTH);
    
    // Derive key from master key and salt
    const derivedKey = scryptSync(key, salt, 32);
    
    const cipher = createCipheriv(ALGORITHM, derivedKey, iv);
    
    let encrypted = cipher.update(plaintext, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    
    const tag = cipher.getAuthTag();
    
    // Return format: salt:iv:tag:encrypted (all base64)
    return `${salt.toString('base64')}:${iv.toString('base64')}:${tag.toString('base64')}:${encrypted}`;
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt data');
  }
}

/**
 * Decrypt sensitive data
 * @param ciphertext - Encrypted data (format: salt:iv:tag:encrypted)
 * @returns Decrypted plaintext
 */
export function decrypt(ciphertext: string): string {
  try {
    const key = getEncryptionKey();
    const parts = ciphertext.split(':');
    
    if (parts.length !== 4) {
      throw new Error('Invalid ciphertext format');
    }
    
    const [saltBase64, ivBase64, tagBase64, encrypted] = parts;
    
    const salt = Buffer.from(saltBase64, 'base64');
    const iv = Buffer.from(ivBase64, 'base64');
    const tag = Buffer.from(tagBase64, 'base64');
    
    // Derive key from master key and salt
    const derivedKey = scryptSync(key, salt, 32);
    
    const decipher = createDecipheriv(ALGORITHM, derivedKey, iv);
    decipher.setAuthTag(tag);
    
    let decrypted = decipher.update(encrypted, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Failed to decrypt data');
  }
}

