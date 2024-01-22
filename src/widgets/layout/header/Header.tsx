import { ComponentProps } from "react";
import { HeaderLogo } from "./HeaderLogo";
import s from "./Header.module.css";

type HeaderProps = ComponentProps<"header">;
export const Header = (props: HeaderProps) => {
  return (
    <header className={s.header} {...props}>
      <HeaderLogo />
    </header>
  );
};
