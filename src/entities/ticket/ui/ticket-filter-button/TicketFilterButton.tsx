import { Button } from "../../../../shared/ui/button/Button";
import { ButtonGroup } from "../../../../shared/ui/button-group/ButtonGroup";

import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { setOrder, selectSettings } from "../../slice/ticketSlice";
import { ORDER_LIST } from "../../constants/ticketFilterEntities";

import s from "./TicketFilterButton.module.css";

export const TicketOrderButtonGroup = () => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector(selectSettings);
  const selected = settings.best;

  return (
    <ButtonGroup>
      {ORDER_LIST.map(b => {
        return (
          <Button
            onClick={() => {
              dispatch(setOrder(b.value));
            }}
            className={`${s.orderBtn} ${b.value === selected ? "active" : ""}`}
            key={b.id}
          >
            {b.label}
          </Button>
        );
      })}
    </ButtonGroup>
  );
};
