/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  accent?: string;
}

export default function Button({ accent = "pri", ...props }: ButtonProps): JSX.Element {
  const { children, className } = props;
  let defCls =
    "block px-5 py-3 text-sm font-medium text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring ";
  if (className) defCls += ` ${className}`;
  return (
    // eslint-disable-next-line jsx-a11y/control-has-associated-label
    <button
      type="button"
      {...props}
      className={`${defCls}  cursor-auto disabled:cursor-not-allowed	disabled:bg-indigo-300`}
    >
      {children}
    </button>
  );
}
