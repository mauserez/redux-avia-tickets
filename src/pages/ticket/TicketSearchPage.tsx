import { AsideTicketFilter } from "../../widgets/ticket/aside-ticket-filter/AsideTicketFilter";
import { TicketFilter } from "../../widgets/ticket/ticket-filter/TicketFilter";
import { TicketList } from "../../widgets/ticket/ticket-list/TicketList";
import s from "./TicketSearchPage.module.css";

export const TicketSearchPage = () => {
  return (
    <section className={s.searchPage}>
      <AsideTicketFilter />
      <div className={s.searchPageContent}>
        <TicketFilter />
        <TicketList />
      </div>
    </section>
  );
};
