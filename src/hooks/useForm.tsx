import React from "react";

/**
 * @description this function is used to create a generic context
 * @returns [useContext, ContextProvider]
 * @type ContextProvider is a component that is used to wrap the children components
 * @type useContext is a function that returns the context value type of value provieded to the ContextProvider
 * @todo find a better way to do this without using closures
 */
export const createGenericContext = <T extends object>() => {
  const context = React.createContext<T | undefined>(undefined);

  const useContext = () => {
    const ctx = React.useContext(context);
    if (ctx === undefined) {
      throw new Error("useContext must be inside a Provider with a value");
    }
    return ctx;
  };

  return [useContext, context.Provider] as const;
};

const [useContext, ContextProvider] = createGenericContext();

export { useContext, ContextProvider };
