import { ComponentProps } from "react";
import s from "./Card.module.css";

export type CardProps = ComponentProps<"div">;
export const Card = (props: CardProps) => {
  const { children, className = "", ...cardProps } = props;

  return (
    <div className={`${s.card} ${className}`} {...cardProps}>
      {children}
    </div>
  );
};
