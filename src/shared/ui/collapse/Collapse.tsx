import { ComponentProps, ReactNode, useState } from "react";
import s from "./Collapse.module.css";

type CollapseProps = ComponentProps<"div"> & {
  collapsed?: boolean;
  collapseTitle: string | ReactNode;
  collapseToggler?: ReactNode;
  onCollapse?: () => {};
};

export const Collapse = (props: CollapseProps) => {
  const {
    children,
    className = "",
    collapsed = true,
    collapseToggler,
    collapseTitle,
    onCollapse,
    ...collapseProps
  } = props;

  const [collapsedState, setCollapsedState] = useState(collapsed);

  const onCollapseToggle = onCollapse ? onCollapse : () => {};

  const toggleCollapse = () => {
    onCollapseToggle();
    setCollapsedState(!collapsedState);
  };
  const openClass = !collapsedState ? s.collapseOpen : "";

  return (
    <div
      className={`${s.collapse} ${openClass} ${className}`}
      {...collapseProps}
    >
      <div>
        <div onClick={toggleCollapse} className={s.collapseTitle}>
          <div>{collapseTitle}</div>
          <div>
            {!collapseToggler ? (
              <CollapseToggler collapsed={collapsedState} />
            ) : (
              collapseToggler
            )}
          </div>
        </div>
      </div>
      {!collapsedState ? (
        <div className={s.collapseBody}>{children}</div>
      ) : null}
    </div>
  );
};

type CollapseTogglerProps = {
  collapsed: boolean;
};

const CollapseToggler = (props: CollapseTogglerProps) => {
  const { collapsed } = props;
  const title = collapsed ? "Открыть настройки" : "Закрыть настройки";
  const icon = collapsed ? "openCollapse" : "closeCollapse";

  return (
    <div className={`${s.collapseToggler}`}>
      <div className={s.collapseTogglerTitle}>{title}</div>
      <img alt="collapse-icon" src={`/images/icons/${icon}.svg`} />
    </div>
  );
};
