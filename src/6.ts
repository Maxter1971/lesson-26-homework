// Задача состоит в том что написать калькулято для натуральных чисел, но только на типах!
// Ниже приведена заготовка
// Хочется поддержки сложения и вычитания, если хочется еще челленджа, то деление и умножение
// Из-за ограничений глубины вычислений поддержать все натуральные числа не получится, это нормально

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Increase<
  A,
  tailRec extends Array<number> = []
> = tailRec["length"] extends A
  ? [...tailRec, 0]["length"]
  : Increase<A, [...tailRec, 0]>;

type Decrease<A, tailRec extends Array<number> = []> = [
  ...tailRec,
  0
]["length"] extends A
  ? tailRec["length"]
  : Decrease<A, [...tailRec, 0]>;

type ZERO = 0;

type Equals<A, B> = A extends B ? (B extends A ? "success" : never) : never;

type Add<A, B> = A extends ZERO ? B : Add<Decrease<A>, Increase<B>>;
type Subtract<A, B> = B extends ZERO ? A : Subtract<Decrease<A>, Decrease<B>>;
type Mul<A, B, I = 0, Result = 0> = I extends B
  ? Result
  : Mul<A, B, Increase<I>, Add<Result, A>>;

type Div<A, B, I = 0, Result = 0> = I extends B
  ? Result
  : Div<A, B, Decrease<I>, Subtract<Result, A>>;

export type OnePlusOneTest = Equals<Add<1, 1>, 2>;
export type OnePlusFiveTest = Equals<Add<1, 5>, 6>;
export type TwoMinusOneTest = Equals<Subtract<2, 1>, 1>;
export type FiveMinusTwoTest = Equals<Subtract<5, 2>, 3>;
export type FiveMulTwoTest = Equals<Mul<5, 2>, 10>;
// export type SixDivTwoTest = Equals<Div<6, 2>, 3>;
