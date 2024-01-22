import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { Button } from "../../../../shared/ui/button/Button";
import { getNoun } from "../../../../utils/textHelper";
import {
  selectSettings,
  selectApiStatus,
  setLimit,
} from "../../slice/ticketSlice";

import s from "./TicketLoadMore.module.css";

type TicketLoadMoreButtonProps = {
  filteredTicketsLeft: number;
};
export const TicketLoadMoreButton = (props: TicketLoadMoreButtonProps) => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector(selectSettings);
  const apiStatus = useAppSelector(selectApiStatus);

  const handleLoadMore = () => {
    dispatch(setLimit(settings.limit + 3));
  };

  const { filteredTicketsLeft } = props;
  return (
    <Button disabled={!filteredTicketsLeft} onClick={handleLoadMore}>
      {filteredTicketsLeft === 0 &&
      !["loading", "start"].includes(apiStatus) ? (
        "Больше билетов нет"
      ) : apiStatus !== "loading" ? (
        <div className={s.loadMoreBtn}>
          <div>Загрузить еще</div>
          <div className={s.ticketsFound}>
            Найдено {filteredTicketsLeft} &nbsp;
            {getNoun(filteredTicketsLeft ?? 0, "билет", "билета", "билетов")}
          </div>
        </div>
      ) : (
        "Загрузка"
      )}
    </Button>
  );
};
