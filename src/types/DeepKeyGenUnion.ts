type Counter = [never, 0, 1, 2, 3, 4, 5, 6, 7]

type ValidStr = string | number

type IsObject<T> = T extends Array<T[keyof T]>
  ? false
  : T extends object
    ? true
    : false

type JoinStr<
  T extends ValidStr,
  P extends ValidStr,
  K extends ValidStr = '.'
> = `${T}${'' extends P ? '' : K}${P}`

type DeepKeyGenUnion<
  T,
  P extends number = 3
> = P extends never
  ? never
  : IsObject<T> extends true
    ? { [K in keyof T]-?: K extends ValidStr
      ? K | JoinStr<K, DeepKeyGenUnion<T[K], Counter[P]>, '.'>
      : never
    }[keyof T]
    : ''

export default DeepKeyGenUnion;
