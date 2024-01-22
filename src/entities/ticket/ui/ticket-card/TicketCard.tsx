import { Card } from "../../../../shared/ui/card/Card";
import { getNoun } from "../../../../utils/textHelper";
import { TicketType } from "../../types/ticketTypes";

import s from "./TicketCard.module.css";

type TicketCardProps = { ticket: TicketType };
export const TicketCard = (props: TicketCardProps) => {
  const { ticket } = props;
  return (
    <Card className={s.ticketCard}>
      <div className={s.ticketCardRow}>
        <div className={s.ticketPrice}>{ticket.price} Р</div>
        <img
          alt="airline-logo"
          src={`/images/airlines/${ticket.company}.svg`}
        />
      </div>
      <div className={s.ticketCardRow}>
        <div className={s.smallValBlock}>
          <div className={s.smallValTitle}>
            {ticket.from}-{ticket.to}
          </div>
          <div className={s.smallVal}>
            {ticket.time.startTime}-{ticket.time.endTime}
          </div>
        </div>
        <div className={s.smallValBlock}>
          <div className={s.smallValTitle}>В пути</div>
          <div className={s.smallVal}>{ticket.duration}ч 00 мин</div>
        </div>
        <div className={s.smallValBlock}>
          <div className={s.smallValTitle}>Пересадки</div>
          <div className={s.smallVal}>
            {ticket.transfer}&nbsp;
            {getNoun(ticket.transfer, "пересадка", "пересадки", "пересадок")}
          </div>
        </div>
      </div>
    </Card>
  );
};
