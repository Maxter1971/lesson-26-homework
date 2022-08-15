// В функцию приходит массив состояний заказа и фильтруется
// Нужно заменить FIXME на тип который вычисляется на освове OrderState

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type First = Array<typeof orderStates[0 | 1 | 4]>;

const orderStates = [
  "initial",
  "inWork",
  "buyingSupplies",
  "producing",
  "fullfilled",
] as const;

type OrderState = typeof orderStates[number];

export const getUserOrderStates = (orderStates: OrderState[]): First => {
  const filteredStates = [] as First;
  orderStates.forEach((element) => {
    if (element !== "buyingSupplies" && element !== "producing") {
      filteredStates.push(element);
    }
  });
  return filteredStates;
};

// Есть объединение (юнион) типов заказов в различных состояниях
// Нужно заменить FIXME на тип который достанет из Order все возможные состояния (state)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Second = Order["state"];

type Order =
  | {
      state: "initial";
      sum: number;
    }
  | {
      state: "inWork";
      sum: number;
      workerId: number;
    }
  | {
      state: "buyingSupplies";
      sum: number;
      workerId: number;
      suppliesSum: number;
    }
  | {
      state: "producing";
      sum: number;
      workerId: number;
      suppliesSum: number;
      produceEstimate: Date;
    }
  | {
      state: "fullfilled";
      sum: number;
      workerId: number;
      suppliesSum: number;
      produceEstimate: Date;
      fullfillmentDate: Date;
    };

export const getOrderState = (order: Order): Second => order.state;

// Есть общая функция omit которая удаляет поле из объекта и возвращает его без этого поля
// Нужно заменить FIXME на соответствующий тип

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Third<T, K extends keyof T> = Omit<T, K>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const omit = <T extends Record<any, any>, K extends keyof T>(
  obj: T,
  keyToOmit: K
): Third<T, K> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { [keyToOmit]: _, ...withoutKey } = obj;
  return withoutKey;
};

// Есть объединение (юнион) типов заказов в различных состояниях
// и функция filterOnlyInitialAndInWorkOrder которая принимает заказы в любых состояниях
// А возвращает только initial и inWork
// Нужно заменить FIXME на правильный тип вычисленный на основе Order

type Fourth = Extract<Order, { state: "initial" } | { state: "inWork" }> | null;

export const filterOnlyInitialAndInWorkOrder = (order: Order): Fourth => {
  if (order.state === "initial" || order.state === "inWork") {
    return order;
  }
  return null;
};

// Есть функция которая достает из реакт компонента (любого, и Functional и Class) его defaultProps
// Нужно заменить FIXME на правильный тип

// eslint-disable-next-line @typescript-eslint/no-explicit-any

namespace React {
  export type ComponentType<T> = { defaultProps: T };
}

type Five<T> = ReturnType<
  (component: React.ComponentType<T>) => typeof component.defaultProps
>;

// Hint: infer
export const getDefaultProps = <T>(
  component: React.ComponentType<T>
): Five<T> => {
  return component.defaultProps;
};

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

type Div<A, B, I = 1, Result = 1> = I extends B
  ? Result
  : Div<A, B, Decrease<I>, Subtract<Result, A>>;

export type OnePlusOneTest = Equals<Add<1, 1>, 2>;
export type OnePlusFiveTest = Equals<Add<1, 5>, 6>;
export type TwoMinusOneTest = Equals<Subtract<2, 1>, 1>;
export type FiveMinusTwoTest = Equals<Subtract<5, 2>, 3>;
export type FiveMulTwoTest = Equals<Mul<5, 2>, 10>;
export type SixDivTwoTest = Equals<Div<6, 2>, 3>;
