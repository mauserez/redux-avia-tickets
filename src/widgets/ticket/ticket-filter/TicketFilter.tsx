import {
  TicketTransferCheckBoxGroup,
  TicketCompanyCheckBoxGroup,
} from "../../../entities/ticket/ui/ticket-filter-checkbox/TicketFilterCheckbox";

import { TicketOrderButtonGroup } from "../../../entities/ticket/ui/ticket-filter-button/TicketFilterButton";
import { Collapse } from "../../../shared/ui/collapse/Collapse";

import s from "./TicketFilter.module.css";
import { useAppSelector } from "../../../app/hooks";
import { selectSettings } from "../../../entities/ticket/slice/ticketSlice";
import {
  COMPANY_LIST,
  TRANSFER_LIST,
} from "../../../entities/ticket/constants/ticketFilterEntities";

export const TicketFilter = () => {
  return (
    <div className={s.filter}>
      <TicketOrderButtonGroup></TicketOrderButtonGroup>
      <Collapse
        className={s.filterCollapse}
        collapseTitle={<TicketFilterCollapseTitle />}
      >
        <TicketCompanyCheckBoxGroup
          title="Компании"
          reverseColors={true}
          wrapClassName={s.checkboxGroup}
          bodyClassName={s.checkboxGroupBody}
        ></TicketCompanyCheckBoxGroup>

        <TicketTransferCheckBoxGroup
          title="Количество пересадок"
          reverseColors={true}
          wrapClassName={s.checkboxGroup}
          bodyClassName={s.checkboxGroupBody}
        ></TicketTransferCheckBoxGroup>
      </Collapse>
    </div>
  );
};

const TicketFilterCollapseTitle = () => {
  const settings = useAppSelector(selectSettings);
  const companiesSelected = settings.company;
  const companiesText = [] as string[];

  let title = "";

  if (companiesSelected) {
    companiesSelected.forEach(c => {
      const search = COMPANY_LIST.find(o => o.id === c)?.label;
      if (search !== undefined) {
        companiesText.push(search);
      }
    });
  }

  title +=
    companiesSelected.length === COMPANY_LIST.length ||
    companiesSelected.length === 0
      ? "Любая авиакомпания"
      : `Авиакомпании: ${companiesText.join(",")}`;

  title += ", ";

  const transferSelected = settings.transfer;
  const transferText = [] as number[];

  if (transferSelected) {
    transferSelected.forEach(c => {
      const search = TRANSFER_LIST.find(o => o.value === c)?.value;
      if (search !== undefined) {
        transferText.push(search);
      }
    });
  }

  title +=
    transferSelected.length === TRANSFER_LIST.length ||
    transferSelected.length === 0
      ? "Любое кол-во пересадок"
      : `пересадок: ${transferText.sort().join(",")}`;

  return title;
};
