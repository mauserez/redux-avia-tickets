import type { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../../../app/createAppSlice";
import { TicketType } from "../types/ticketTypes";
import { getFilteredTickets } from "../api/ticketApi";
import { ALL_TICKETS } from "../constants/allTickets";
import { RootState } from "../../../app/store";

export type TicketFilterSettingsType = {
  best: string;
  transfer: number[];
  company: number[];
  limit: number;
  start: number;
};

export type TicketSliceStateType = {
  settings: TicketFilterSettingsType;
  apiStatus: "idle" | "loading" | "failed" | "start";
  allTickets: TicketType[];
  filteredTickets: TicketType[];
  filteredTicketsLeft: number | null;
};

const localSettings = localStorage.getItem("settings");

const initSettings = !localSettings
  ? {
      best: "price",
      transfer: [0],
      company: [1, 2],
      limit: 3,
      start: 0,
    }
  : JSON.parse(localSettings);

const initialState: TicketSliceStateType = {
  settings: initSettings,
  apiStatus: "start",
  allTickets: ALL_TICKETS,
  filteredTickets: [],
  filteredTicketsLeft: null,
};

const saveLocalSettings = (settings: TicketFilterSettingsType) => {
  localStorage.setItem("settings", JSON.stringify(settings));
};

const delay = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const ticketSlice = createAppSlice({
  name: "ticket",
  initialState,
  reducers: create => ({
    setSettings: create.reducer(
      (state, action: PayloadAction<TicketFilterSettingsType>) => {
        const resetSettings = { limit: 3, start: 0 };
        state.settings = { ...action.payload, ...resetSettings };
        saveLocalSettings(state.settings);
      },
    ),
    setLimit: create.reducer((state, action: PayloadAction<number>) => {
      state.settings = { ...state.settings, limit: action.payload };
    }),
    setOrder: create.reducer((state, action: PayloadAction<string>) => {
      state.settings = { ...state.settings, best: action.payload };
      saveLocalSettings(state.settings);
    }),
    getTickets: create.asyncThunk(
      async (_, { getState }) => {
        const state = getState() as RootState;
        const currentState = state.ticket;

        // The value we return becomes the `fulfilled` action payload
        const f = await delay(400).then(() => {
          const filtered = getFilteredTickets(
            currentState.settings,
            currentState.allTickets,
          );

          return filtered;
        });

        return f;
      },
      {
        pending: state => {
          state.apiStatus = "loading";
        },
        fulfilled: (state, action) => {
          state.apiStatus = "idle";
          state.filteredTickets = action.payload.filteredTickets;
          state.filteredTicketsLeft = action.payload.ticketsLeft;
        },
        rejected: state => {
          state.apiStatus = "failed";
        },
      },
    ),
  }),

  selectors: {
    selectSettings: state => state.settings,
    selectApiStatus: state => state.apiStatus,
    selectFilteredTickets: state => state.filteredTickets,
    selectFilteredTicketsLeft: state => state.filteredTicketsLeft,
  },
});

export const { setSettings, setLimit, setOrder, getTickets } =
  ticketSlice.actions;

export const {
  selectSettings,
  selectApiStatus,
  selectFilteredTickets,
  selectFilteredTicketsLeft,
} = ticketSlice.selectors;
