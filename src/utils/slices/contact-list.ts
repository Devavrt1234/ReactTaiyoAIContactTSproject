import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TFormfields, TinitialState } from './types/type';
import { RootState } from "../store";

const initialState: TinitialState = {
  contactList: [],
};

export const contactList = createSlice({
  name: "contactList",
  initialState: initialState,
  reducers: {
    setContactList: (state, action: PayloadAction<TFormfields>) => {
      state.contactList.push(action.payload);
    },

    removeContactList: (state, action: PayloadAction<string>) => {
      const remainingList = state.contactList.filter((list) => {
        return list.id !== action.payload;
      });

      return {
        contactList: remainingList,
      };
    },

    updateContactList: (state, action: PayloadAction<TFormfields[]>) => {
      const payload = action.payload;

      return {
        ...state,
        contactList: payload,
      };
    },
  },
});

export const getContactList = (state: RootState) =>
  state.contactList.contactList;
// This selector function takes the RootState as an argument and returns the contactList array from the contactList slice.
export const { setContactList, removeContactList, updateContactList } =
  contactList.actions;
  // The code exports the three action creators (setContactList, removeContactList, and updateContactList) from the contactList slice, as well as the reducer function itself
export default contactList.reducer;
