import {
  TicketTransferCheckBoxGroup,
  TicketCompanyCheckBoxGroup,
} from "../../../entities/ticket/ui/ticket-filter-checkbox/TicketFilterCheckbox";
import s from "./AsideTicketFilter.module.css";

export const AsideTicketFilter = () => {
  return (
    <div className={s.asideFilter}>
      <TicketTransferCheckBoxGroup
        title="Количество пересадок"
        titleClassName={s.checkboxTitle}
        wrapClassName={s.checkboxGroup}
      ></TicketTransferCheckBoxGroup>

      <TicketCompanyCheckBoxGroup
        title="Компании"
        titleClassName={s.checkboxTitle}
        wrapClassName={s.checkboxGroup}
      ></TicketCompanyCheckBoxGroup>
    </div>
  );
};
