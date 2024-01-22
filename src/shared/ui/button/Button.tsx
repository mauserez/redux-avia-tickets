import { ComponentProps } from "react";
import s from "./Button.module.css";

export type ButtonPropsType = ComponentProps<"button">;

export const Button = (props: ButtonPropsType) => {
  const { children, type = "button", className = "", ...btnProps } = props;
  return (
    <button type={type} className={`${s.button} ${className}`} {...btnProps}>
      {props.children}
    </button>
  );
};
