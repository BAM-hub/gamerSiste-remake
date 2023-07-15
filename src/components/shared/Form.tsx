import React, { createRef, useRef } from "react";
import { useContext, ContextProvider } from "~/hooks/useForm";

interface FormComputedProps<Values> {
  children: JSX.Element[] | JSX.Element;
  className?: string;
  initialValues: Values;
  onSubmit: (event: React.FormEvent<HTMLFormElement>, values: Values) => void;
}

function Form({
  children,
  className,
  initialValues,
  onSubmit,
}: FormComputedProps<any>) {
  const InputsRef = useRef(
    React.Children.toArray(children).map(() =>
      createRef<{ getValue: () => { key: string } }>()
    )
  );
  const context = useContext();

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ context });
    let values = {};
    if (InputsRef.current) {
      InputsRef.current.forEach((input) => {
        if (
          typeof input.current?.getValue === "function" &&
          input.current?.getValue() !== undefined
        ) {
          values = { ...values, ...input.current?.getValue() };
        }
        // console.log(input.current?.getValue());
        // return input.current?.getValue();
      });
    }
    console.log(values);
  };

  const getValuesInCorrectShape = () => {
    const values = {};
    if (InputsRef.current) {
      InputsRef.current.forEach((input) => {
        if (
          typeof input.current?.getValue === "function" &&
          input.current?.getValue() !== undefined
        )
          console.log(input.current?.getValue());
        // return input.current?.getValue();
      });
    }
  };

  return (
    <form className={className} onSubmit={submitHandler}>
      {React.Children.map(children, (Child, index) => (
        <Child.type
          {...Child.props}
          ref={InputsRef.current[index]}
          key={index}
        />
      ))}
    </form>
  );
}

const WithForm = <Values extends object>({
  children,
  className,
  initialValues,
  onSubmit,
}: FormComputedProps<Values>) => {
  const valuesRef = useRef(initialValues);
  return (
    <ContextProvider value={initialValues}>
      <Form
        onSubmit={(event) => {
          event.preventDefault();
          void onSubmit(event, valuesRef.current ?? initialValues);
        }}
        className={className}
        initialValues={initialValues}
      >
        {children}
      </Form>
    </ContextProvider>
  );
};

export default WithForm;
