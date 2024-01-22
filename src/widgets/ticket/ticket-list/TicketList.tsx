import { TicketCard } from "../../../entities/ticket/ui/ticket-card/TicketCard";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";

import {
  getTickets,
  selectFilteredTickets,
  selectFilteredTicketsLeft,
  selectSettings,
} from "../../../entities/ticket/slice/ticketSlice";
import { TicketLoadMoreButton } from "../../../entities/ticket/ui/ticket-load-more/TicketLoadMore";

import s from "./TicketList.module.css";

export const TicketList = () => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector(selectSettings);
  const filteredTickets = useAppSelector(selectFilteredTickets);
  const filteredTicketsLeft = useAppSelector(selectFilteredTicketsLeft);

  useEffect(() => {
    dispatch(getTickets(null));
  }, [settings, dispatch]);

  return (
    <div className={s.list}>
      {filteredTickets.map(ticket => (
        <div data-id={ticket.id} key={ticket.id} className={s.list}>
          <TicketCard ticket={ticket} />
        </div>
      ))}

      <TicketLoadMoreButton filteredTicketsLeft={filteredTicketsLeft ?? 0} />
    </div>
  );
};
