import { TicketType } from "../types/ticketTypes";
import { TicketFilterSettingsType } from "../slice/ticketSlice";

// A mock function to mimic making an async request for data
export const getFilteredTickets = async (
  filterSettings: TicketFilterSettingsType,
  allTickets: TicketType[],
) => {
  let newTickets = [...allTickets];

  newTickets.sort((a, b) => {
    const field = filterSettings.best as keyof TicketType;
    return a[field] > b[field] ? 1 : -1;
  });

  if (filterSettings.company.length > 0) {
    newTickets = newTickets.filter(v =>
      filterSettings.company.includes(v.company),
    );
  }

  if (filterSettings.transfer.length > 0) {
    newTickets = newTickets.filter(v =>
      filterSettings.transfer.includes(v.transfer),
    );
  }

  const unslicedTickets = [...newTickets];
  newTickets = newTickets.slice(filterSettings.start, filterSettings.limit);

  return {
    filteredTickets: newTickets,
    ticketsLeft: unslicedTickets.length - newTickets.length,
  };
};
