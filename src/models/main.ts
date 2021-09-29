export type Nullable<T> = T | null;
export type Undefinable<T> = T | undefined;
export type Nilable<T> = Nullable<Undefinable<T>>;
