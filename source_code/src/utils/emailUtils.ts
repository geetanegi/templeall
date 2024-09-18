// emailUtils.ts

// Function to split email into local and domain parts
export const splitEmail = (
  email: string,
): { localPart: string; domainPart: string } => {
  const [localPart, domainPart] = email.split("@");
  return { localPart: localPart || "", domainPart: domainPart || "" };
};

// Function to mask the local part of the email
export const maskEmail = (email: string): string => {
  const { localPart, domainPart } = splitEmail(email);

  if (localPart.length > 3) {
    const maskedLocalPart = localPart.substring(0, 3) + "*****";
    return `${maskedLocalPart}@${domainPart}`;
  }

  return email; // Return the original email if the local part is too short to mask
};
