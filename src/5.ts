// Есть функция которая достает из реакт компонента (любого, и Functional и Class) его defaultProps
// Нужно заменить FIXME на правильный тип

// eslint-disable-next-line @typescript-eslint/no-explicit-any

namespace React {
  export type ComponentType<T> = { defaultProps: T };
}

type FIXME<T> = ReturnType<
  (component: React.ComponentType<T>) => typeof component.defaultProps
>;

// Hint: infer
export const getDefaultProps = <T>(
  component: React.ComponentType<T>
): FIXME<T> => {
  return component.defaultProps;
};
