// encryptionUtils.ts
import forge from 'node-forge';

export const secretKey = "0JJ66GxLUbkIiMu1GomPJg=="
// Encrypt a plain text string using AES-GCM and a secret key
export const encryptData = async (plainText: string, secretKey: string): Promise<string> => {
  try {
    const secretKeyBuffer = forge.util.createBuffer(forge.util.decode64(secretKey));
    const plainTextBuffer = forge.util.createBuffer(plainText);

    const iv = forge.random.getBytesSync(12);
    const cipher = forge.cipher.createCipher('AES-GCM', secretKeyBuffer);
    cipher.start({ iv: iv });
    cipher.update(plainTextBuffer);
    cipher.finish();

    const cipherText = cipher.output.getBytes();
    const tag = cipher.mode.tag.getBytes();

    const combinedData = forge.util.createBuffer();
    combinedData.putBytes(iv);
    combinedData.putBytes(cipherText);
    combinedData.putBytes(tag);

    const base64CipherText = forge.util.encode64(combinedData.bytes());
    return base64CipherText || '';
  } catch (error) {
    console.error('Encryption failed:', error);
    return '';
  }
};

// Decrypt a cipher text string using AES-GCM and a secret key
export const decryptData = (cipherText: string, secretKey: string): any => {
    try {
      const secretKeyBuffer = forge.util.createBuffer(forge.util.decode64(secretKey));
      const combinedData = forge.util.createBuffer(forge.util.decode64(cipherText));
  
      // Extract IV, ciphertext, and tag from combined data
      const iv = forge.util.createBuffer(combinedData.getBytes(12));  // Convert IV to ByteStringBuffer
      const ciphertext = combinedData.getBytes(combinedData.length() - 16);
      const tag = forge.util.createBuffer(combinedData.getBytes(16)); // Convert tag to ByteStringBuffer
  
      // Create decipher object
      const decipher = forge.cipher.createDecipher('AES-GCM', secretKeyBuffer);
      decipher.start({ iv, tag });
      decipher.update(forge.util.createBuffer(ciphertext));
      decipher.finish();
  
      // Get the decrypted plaintext
      const decryptedPlainText = decipher.output.toString(); // No argument needed
      return decryptedPlainText;
    } catch (error) {
      console.error('Decryption failed:', error);
      return null;
    }
  };
  
