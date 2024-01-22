export type TicketTimeType = {
  startTime: string;
  endTime: string;
};

export type TicketType = {
  id: number;
  from: string;
  to: string;
  company: number;
  price: number;
  currency: "RUB";
  time: TicketTimeType;
  duration: number;
  date: string;
  transfer: number;
};
