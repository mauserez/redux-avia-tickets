import { ComponentProps } from "react";
import s from "./Checkbox.module.css";

export type CheckboxPropsType = ComponentProps<"input"> & {
  labelClassName?: string;
  wrapClassName?: string;
  reverseColors?: boolean;
  checkboxType?: "square" | "circle";
};

export const Checkbox = (props: CheckboxPropsType) => {
  const {
    children,
    className = "",
    wrapClassName = "",
    labelClassName = "",
    checkboxType = "square",
    reverseColors = false,
    ...chxProps
  } = props;

  const checkboxTypeClass =
    checkboxType === "square" ? s.checkbox : s.checkboxRadio;
  let checkboxColorClass = "";

  if (reverseColors) {
    if (checkboxType === "square") {
      checkboxColorClass = s.checkboxReverseColors;
    } else {
      checkboxColorClass = s.checkboxRadioReverseColors;
    }
  }

  return (
    <div className={`${s.checkboxWrap} ${wrapClassName}`}>
      <input
        className={`${checkboxTypeClass} ${checkboxColorClass} ${className}`}
        type="checkbox"
        {...chxProps}
      />
      <label className={`${labelClassName}`}>{children}</label>
    </div>
  );
};
