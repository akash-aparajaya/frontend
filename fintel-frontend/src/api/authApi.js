import axios from "./axiosInstance";

export const loginUser = (data) => {
  return axios.post("/auth/login", data);
};

export const verifyOtp = (data) => {
  return axios.post("/auth/verify-otp", data);
};

export const googleLogin = (data) => {
  return axios.post("/auth/google/login ", data);
};
