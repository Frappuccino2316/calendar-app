import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseUrl } from 'constants/constants';

export const getMyself = createAsyncThunk('user/get', async (token: string) => {
  const res = await axios.get(`${baseUrl}myself/`, {
    headers: {
      Authorization: `JWT ${token}`,
    },
  });
  return res.data;
});

type Team = {
  id: string;
  teamName: string;
  createdAt: string;
  updatedAt: string;
};

type User = {
  id: string;
  username: string;
  email: string;
  team_of_affiliation: Team | null;
};

const initialState: User = {
  id: '',
  username: '',
  email: '',
  team_of_affiliation: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setMyself: (state, action) => {
      state = action.payload;
    },
    reset: (state) => {
      state = {
        id: '',
        username: '',
        email: '',
        team_of_affiliation: {
          id: '',
          teamName: '',
          createdAt: '',
          updatedAt: '',
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMyself.fulfilled, (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    });
  },
});

export const { setMyself, reset } = userSlice.actions;

export default userSlice.reducer;
