import { Checkbox } from "../../../../shared/ui/checkbox/Checkbox";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { setSettings, selectSettings } from "../../slice/ticketSlice";

import {
  TRANSFER_LIST,
  COMPANY_LIST,
} from "../../constants/ticketFilterEntities";

import s from "./TicketFilterCheckbox.module.css";

type TicketCheckboxGroupType = {
  title: string;
  titleClassName?: string;
  wrapClassName?: string;
  bodyClassName?: string;
  reverseColors?: boolean;
};

export const TicketTransferCheckBoxGroup = (props: TicketCheckboxGroupType) => {
  const {
    title = "",
    titleClassName = "",
    wrapClassName = "",
    bodyClassName = "",
    reverseColors = false,
  } = props;

  const dispatch = useAppDispatch();
  const settings = useAppSelector(selectSettings);
  const transferFilter = settings.transfer;

  return (
    <div className={`${s.checkboxGroup} ${wrapClassName}`}>
      <div className={`${s.checkboxGroupTitle} ${titleClassName}`}>{title}</div>
      <div className={`${s.checkboxGroupBody} ${bodyClassName}`}>
        {TRANSFER_LIST.map(t => {
          return (
            <Checkbox
              reverseColors={reverseColors}
              onChange={() => {
                const newTransferFilter = transferFilter.includes(t.value)
                  ? transferFilter.filter(value => value !== t.value)
                  : [...transferFilter, t.value];
                dispatch(
                  setSettings({ ...settings, transfer: newTransferFilter }),
                );
              }}
              checked={transferFilter.some(value => value === t.value)}
              key={t.value}
            >
              {t.label}
            </Checkbox>
          );
        })}
      </div>
    </div>
  );
};

export const TicketCompanyCheckBoxGroup = (props: TicketCheckboxGroupType) => {
  const {
    title = "",
    titleClassName = "",
    wrapClassName = "",
    bodyClassName = "",
    reverseColors = false,
  } = props;

  const dispatch = useAppDispatch();
  const settings = useAppSelector(selectSettings);
  const companyFilter = settings.company;

  return (
    <div className={`${s.checkboxGroup} ${wrapClassName}`}>
      <div className={`${s.checkboxGroupTitle} ${titleClassName}`}>{title}</div>
      <div className={`${s.checkboxGroupBody} ${bodyClassName}`}>
        {COMPANY_LIST.map(c => {
          return (
            <Checkbox
              reverseColors={reverseColors}
              checkboxType="circle"
              onChange={() => {
                const newCompanyFilter = companyFilter.includes(c.id)
                  ? companyFilter.filter(id => id !== c.id)
                  : [...companyFilter, c.id];

                dispatch(
                  setSettings({ ...settings, company: newCompanyFilter }),
                );
              }}
              checked={companyFilter.some(id => id === c.id)}
              key={c.id}
            >
              {c.label}
            </Checkbox>
          );
        })}
      </div>
    </div>
  );
};
