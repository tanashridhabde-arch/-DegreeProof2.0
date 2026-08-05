import { StrKey } from '@stellar/stellar-sdk';

export function isValidStellarAddress(address: string): boolean {
  if (!address) return false;
  return StrKey.isValidEd25519PublicKey(address);
}

export function formatBalance(balance: string | undefined | null, decimals: number = 2): string {
  if (!balance) return '0.00';
  
  const num = parseFloat(balance);
  if (isNaN(num)) return '0.00';
  
  return num.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
}

export function truncateAddress(address: string | null | undefined, startChars: number = 4, endChars: number = 4): string {
  if (!address) return '';
  if (address.length <= startChars + endChars) return address;
  
  return `${address.substring(0, startChars)}...${address.substring(address.length - endChars)}`;
}
