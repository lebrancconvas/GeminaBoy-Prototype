// Unsigned Integer.
type Brand<T, K> = T & { __brand: K };
export type u8 = Brand<number, "u8">;
export type u16 = Brand<number, "u16">;


