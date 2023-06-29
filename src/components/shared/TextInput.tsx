import React, { useState, useRef } from "react";
import { twMerge } from "tailwind-merge";

interface TextInputProps {
  label?: string;
  id?: string;
  type: string;
  placeholder?: string;
  leftIcon?: React.ReactElement;
}

function TextInput(props: TextInputProps): React.ReactElement {
  const [isNegativeNumber, setIsNegativeNumber] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleNumberChange = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const allowNegativeNumbers = true;
    try {
      /**
       * what i did here is not necessary
       * wont do it in a real project
       * just wanted to make all number inputs have the same behavior
       * basically i am stoping any unwanted input then let the event handel the rest
       */
      const currentVDomValue = event.currentTarget.value;
      const isInputAllowed =
        event.key === "0" &&
        currentVDomValue.length === 1 &&
        currentVDomValue === "0" &&
        parseInt(event.key);

      if (isInputAllowed) {
        event.stopPropagation();
        event.preventDefault();
        return;
      }
      const shouldDeleteNegativeSign =
        isNegativeNumber &&
        event.key === "Backspace" &&
        currentVDomValue.length === 0;

      if (shouldDeleteNegativeSign) {
        event.preventDefault();
        event.stopPropagation();
        setIsNegativeNumber(false);
        return;
      }

      // let the browser handle deletion, selection, tab, arrow keys, etc
      switch (event.key) {
        case "ArrowLeft":
        case "ArrowRight":
        case "Tab":
        case "Backspace":
        case "Delete":
        case event.ctrlKey && "a":
          return;
      }

      // prevent the user from entering more than 15 characters for number precision
      if (currentVDomValue.length >= 15) return event.preventDefault();
      const shouldInsertNegativeSign =
        allowNegativeNumbers &&
        event.key === "-" &&
        currentVDomValue.length === 0;

      if (shouldInsertNegativeSign) {
        setIsNegativeNumber(true);
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      const number = new Number(currentVDomValue + event.key).toFixed(0);
      if (!parseInt(number)) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="pd-1 flex h-16 items-center gap-5 pb-2 pl-5 pr-5 pt-2">
      {props?.label && (
        <label htmlFor={props.id}>
          <span className="text-white">{props.label}</span>
        </label>
      )}
      <div className="relative h-full">
        <div
          className={twMerge(
            "",
            props.type === "number" &&
              isNegativeNumber &&
              "h-full before:absolute before:bottom-0 before:left-6 before:top-0 before:flex before:items-center before:rounded-l  before:pb-1 before:pl-1 before:pr-1 before:pt-1 before:font-bold before:text-white before:content-['-']",
            props.leftIcon &&
              "absolute bottom-0 left-6 top-1 flex h-5/6 items-center justify-center border-r-2 border-slate-600 pl-1 pr-2"
          )}
        >
          {props.leftIcon}
        </div>
      </div>
      <input
        id={props?.id}
        type={props.type}
        ref={inputRef}
        onKeyDown={(e) => {
          if (props.type === "number") handleNumberChange(e);
        }}
        placeholder={props?.placeholder}
        className={twMerge(
          "h-10 w-48 rounded bg-slate-800 pl-2 pr-2 text-white focus:outline-none active:border-slate-100",
          props.type === "number" && isNegativeNumber && "pl-4",
          props.type === "number" && "w-40",
          props.leftIcon && "pl-10"
        )}
      />
    </div>
  );
}

export default TextInput;
