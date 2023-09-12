import axios from "axios";

export const BASE_URL = "https://muzikant-api.jorgadev.com";

export const ENDPOINTS = {
  LOGIN: "/user/login",
  REGISTER: "/user/register",

  GET_USER: "/user",
  UPDATE_USER_COINS: "/user/update-coins",
  UPDATE_USER_CHARACTER: "/user/update-character",

  UPDATE_TRACKS: "/spotify/update-tracks",

  GET_PLAYLISTS: "/spotify/playlists",
  GET_PLAYLIST_TRACKS: "/spotify/playlist/{playlistId}",
};

export const ApiManager = {
  login: (email, password) =>
    axios.post(`${BASE_URL}${ENDPOINTS.LOGIN}`, {
      email,
      password,
    }),
  register: (username, email, password) =>
    axios.post(`${BASE_URL}${ENDPOINTS.REGISTER}`, {
      username,
      email,
      password,
    }),

  getUser: (token) =>
    axios.get(`${BASE_URL}${ENDPOINTS.GET_USER}`, {
      headers: {
        "auth-token": token,
      },
    }),
  updateUserCoins: (id, coins) =>
    axios.post(`${BASE_URL}${ENDPOINTS.UPDATE_USER_COINS}`, { id, coins }),
  updateUserCharacter: (id, character) =>
    axios.post(`${BASE_URL}${ENDPOINTS.UPDATE_USER_CHARACTER}`, {
      id,
      character,
    }),

  updateDatabase: () => axios.get(`${BASE_URL}${ENDPOINTS.UPDATE_TRACKS}`),

  getPlaylists: () => axios.get(`${BASE_URL}${ENDPOINTS.GET_PLAYLISTS}`),
  getPlaylistTracks: (playlistId) =>
    axios.get(
      `${BASE_URL}${ENDPOINTS.GET_PLAYLIST_TRACKS.replace(
        "{playlistId}",
        playlistId
      )}`
    ),
};
