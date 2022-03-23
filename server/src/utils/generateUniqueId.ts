import crypto from 'crypto';

const generateUniqueId = (number: number): string => {
  return crypto.randomBytes(number).toString('hex');
};

export default generateUniqueId;
