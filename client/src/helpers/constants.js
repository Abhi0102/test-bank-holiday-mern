import { getAuthToken } from "./utils";

export const dateSelection = ["Yesterday", "Last Week", "Last Month", "Custom"];

export const headerWithoutAuth = {
  "Content-Type": "application/x-www-form-urlencoded",
};

export const headerWithAuth = {
  "Content-Type": "application/x-www-form-urlencoded",
  Authorization: `Bearer ${getAuthToken()}`,
};
