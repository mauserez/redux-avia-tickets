import { ComponentProps } from "react";
import s from "./ButtonGroup.module.css";

type ButtonGroupType = ComponentProps<"div">;

export const ButtonGroup = (props: ButtonGroupType) => {
  const { children, className = "", ...otherProps } = props;
  return (
    <div className={`${s.group} ${className}`} {...otherProps}>
      {children}
    </div>
  );
};
