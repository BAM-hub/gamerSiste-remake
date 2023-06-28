import React, {
  type Dispatch,
  type SetStateAction,
  useState,
  useRef,
} from "react";
import { twMerge } from "tailwind-merge";

interface TextInputProps {
  label?: string;
  id?: string;
  type: string;
  // value: string | number;
  placeholder?: string;
  // onChange: Dispatch<SetStateAction<number | string>>;
}

function TextInput(props: TextInputProps): React.ReactElement {
  /**
   * @todo split into two components
   * the string in the input type number is an issue with fierfox
   * use refs to handle the input type number tryout
   */
  const [isNegativeNumber, setIsNegativeNumber] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  // if (process.env.NODE_ENV === "development") {
  //   const schema = z
  //     .object({
  //       type: z.union([z.literal("text"), z.literal("number")]),
  //       value: z.union([z.string(), z.number()]),
  //     })
  //     .superRefine((schema, ctx) => {
  //       if (schema.type === "number" && typeof schema.value !== "number") {
  //         const resolvedPath = [
  //           `At input type ${props.type} with id ${
  //             props.id || "no id was provided"
  //           }`,
  //         ];
  //         const message = `input type ${props.type} must be assigned a value of type number`;
  //         return ctx.addIssue({
  //           code: z.ZodIssueCode.invalid_type,
  //           expected: "number",
  //           received: typeof schema.value,
  //           path: ctx.path.length > 0 ? ctx.path : resolvedPath,
  //           message,
  //         });
  //       }
  //       if (schema.type === "text" && typeof schema.value !== "string") {
  //         const message = `input type ${props.type} must be assigned a value of type string`;
  //         const resolvedPath = [
  //           `At input type ${props.type} with id ${
  //             props.id || "no id was provided"
  //           }`,
  //         ];
  //         return ctx.addIssue({
  //           code: z.ZodIssueCode.invalid_type,
  //           expected: "string",
  //           received: typeof schema.value,
  //           path: ctx.path.length > 0 ? ctx.path : resolvedPath,
  //           message,
  //         });
  //       }
  //     });
  //   schema.parse({
  //     type: props.type,
  //     value: props.value,
  //   });
  // }
  const handleNumberChange = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const allowNegativeNumbers = true;
    try {
      const currentVDomValue = event.currentTarget.value;
      console.log(event.key);
      const isInputAllowed =
        event.key === "0" &&
        currentVDomValue.length === 1 &&
        currentVDomValue === "0";

      if (isInputAllowed) {
        event.stopPropagation();
        event.preventDefault();
        return;
      }

      if (event.key === "Backspace") {
        debugger;
        if (currentVDomValue.length === 0) {
          if (isNegativeNumber) setIsNegativeNumber(false);
          return;
        }
        if (inputRef.current) {
          event.preventDefault();
          event.stopPropagation();
          inputRef.current.value = currentVDomValue.slice(0, -1);
          return;
        }
      }
      if (currentVDomValue.length >= 15) return event.preventDefault();

      if (
        allowNegativeNumbers &&
        event.key === "-" &&
        currentVDomValue.length === 0 &&
        inputRef.current
      ) {
        setIsNegativeNumber(true);
        event.preventDefault();
        event.stopPropagation();
        inputRef.current.value = "-";
        return;
      }
      const number = new Number(currentVDomValue + event.key).toFixed(0);
      if (!parseInt(number)) {
        console.log("called", currentVDomValue + event.key);
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      event.preventDefault();
      if (inputRef.current) inputRef.current.value += event.key;
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="pd-1 flex gap-5 pb-2 pl-5 pr-5 pt-2 align-middle">
      {props?.label && (
        <label htmlFor={props.id}>
          <span className="text-white">{props.label}</span>
        </label>
      )}
      <div className="relative">
        <span
          className={twMerge(
            "",
            isNegativeNumber &&
              "before:absolute before:bottom-0 before:left-6 before:top-0 before:rounded-l  before:pb-1 before:pl-1 before:pr-1 before:pt-1 before:font-bold before:text-white before:content-['-']"
          )}
        ></span>
      </div>
      <input
        id={props?.id}
        type={props.type}
        // onSelect={(e) => console.log(e)}
        ref={inputRef}
        onKeyDown={
          handleNumberChange
          //   props.type === "number"
          //     ? handleNumberChange
          //     : (e) => {
          //         if (e.key === "Backspace")
          //           return props.onChange((prevState) =>
          //             (prevState as unknown as string).slice(0, -1)
          //           );
          //         if (e.key.length > 1) return e.preventDefault();
          //         props.onChange(
          //           (prevState) => (prevState as unknown as string) + e.key
          //         );
          //       }
        }
        // value={props.value}
        placeholder={props?.placeholder}
        // value=""
        className={twMerge(
          "h-8 w-80 rounded border-2 border-slate-400 bg-slate-800 pl-1 pr-1 text-white focus:outline-none active:border-slate-100",
          isNegativeNumber && "pl-4"
        )}
      />
    </div>
  );
}

export default TextInput;
