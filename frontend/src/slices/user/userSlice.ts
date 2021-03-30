import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: '',
    username: '',
    email: '',
    teamOfAffiliation: {
      id: '',
      teamName: '',
      createdAt: '',
      updatedAt: '',
    },
  },
  reducers: {
    setMyself: (state, action) => {
      state = action.payload;
    },
    reset: (state) => {
      state = {
        id: '',
        username: '',
        email: '',
        teamOfAffiliation: {
          id: '',
          teamName: '',
          createdAt: '',
          updatedAt: '',
        },
      };
    },
  },
});

export const { setMyself, reset } = userSlice.actions;

export default userSlice.reducer;
