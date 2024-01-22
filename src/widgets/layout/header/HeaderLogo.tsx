import s from "./HeaderLogo.module.css";

export const HeaderLogo = () => {
  return (
    <div className={s.logoWrap}>
      <img className={s.logo} alt="logo" src="/images/logo/logo.svg" />
      <HeaderTitle />
    </div>
  );
};

export const HeaderTitle = () => {
  return <div className={s.title}>Поиск авиабилетов</div>;
};
