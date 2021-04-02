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

type User = {
  id: string;
  username: string;
  email: string;
  teamOfAffiliation: {
    id: string;
    teamName: string;
    createdAt: string;
    updatedAt: string;
  };
};

const initialState: User = {
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
        teamOfAffiliation: {
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
