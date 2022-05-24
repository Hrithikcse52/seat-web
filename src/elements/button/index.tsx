/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import {
  ButtonHTMLAttributes,
  FC,
  InputHTMLAttributes,
  ReactNode,
} from "react";
import styled from "styled-components";
import tw from "tailwind-styled-components";

// const SytledButton = styled.button`
//   display: block;
//   padding-left: 1.25rem /* 20px */;
//   padding-right: 1.25rem /* 20px */;
//   padding-top: 0.75rem /* 12px */;
//   padding-bottom: 0.75rem /* 12px */;
//   font-size: 0.875rem /* 14px */;
//   font-weight: 500;
//   color: white;
//   line-height: 1.25rem /* 20px */;
//   transition-property: color, background-color, border-color,
//     text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter,
//     backdrop-filter;
//   transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
//   transition-duration: 150ms;
//   border-radius: 0.5rem /* 8px */;
//   background-color: rgb(79 70 229);
//   :hover {
//     background-color: rgb(67 56 202);
//   }
//   :focus {
//     outline: 2px solid transparent;
//     outline-offset: 2px;
//   }
// `;

export const PButton = styled.button`
  display: block;
`;

export const DButton = tw.button`
        flex
    inline-flex
    items-center
    border
    border-transparent
    text-xs
    font-medium
    rounded
    shadow-sm
    text-white

    hover:bg-indigo-700
    focus:outline-none`;

/* export const Button = styled.button.attrs({

}) */

export const PrimartButton = styled.button.attrs(args => {
  console.log("args", args);
});

export const ButtonShade = styled.button.attrs({
  className:
    "block px-5 py-3 text-sm font-medium text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring",
});

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  accent?: string;
}

export default function Buttonclass({
  accent = "pri",
  ...props
}: ButtonProps): JSX.Element {
  const { children } = props;
  console.log("accent", accent);
  return (
    // eslint-disable-next-line jsx-a11y/control-has-associated-label
    <button
      type="button"
      {...props}
      className="block px-5 py-3 text-sm font-medium text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring"
    >
      {children}
    </button>
  );
}

// export default function Buttonclass(props: ButtonProps) {
//   const { children } = props;
//   return (
//     // eslint-disable-next-line jsx-a11y/control-has-associated-label
//     <button
//       type="button"
//       {...props}
//       className="block px-5 py-3 text-sm font-medium text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring"
//     >
//       {children}
//     </button>
//   );
// }
