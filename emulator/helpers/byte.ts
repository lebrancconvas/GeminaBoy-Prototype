// Convert any type of byte size to be just byte (B) for standarding.

export const BYTE = (size: number) => size;
export const KB = (size: number) => size * (2**10);
export const MB = (size: number) => size * (2**20);
export const GB = (size: number) => size * (2**30);
export const TB = (size: number) => size * (2**40);

