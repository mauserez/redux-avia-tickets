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

// If you are not using async thunks you can use the standalone `createSlice`.
export const ticketSlice = createAppSlice({
  name: "ticket",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
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
    // The function below is called a thunk and allows us to perform async logic. It
    // can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
    // will call the thunk with the `dispatch` function as the first argument. Async
    // code can then be executed and other actions can be dispatched. Thunks are
    // typically used to make async requests.
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

  // You can define your selectors here. These selectors receive the slice
  // state as their first argument.
  selectors: {
    selectSettings: state => state.settings,
    selectApiStatus: state => state.apiStatus,
    selectFilteredTickets: state => state.filteredTickets,
    selectFilteredTicketsLeft: state => state.filteredTicketsLeft,
  },
});

// Action creators are generated for each case reducer function.
export const { setSettings, setLimit, setOrder, getTickets } =
  ticketSlice.actions;

// Selectors returned by `slice.selectors` take the root state as their first argument.
export const {
  selectSettings,
  selectApiStatus,
  selectFilteredTickets,
  selectFilteredTicketsLeft,
} = ticketSlice.selectors;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const useSettings = (name: string) => {
  
};
