//  rtk-query to handle caching and avoid unnecessary backend calls.
//  rtk-query is part of Redux Toolkit
//  It provides a powerful way to manage server-side data, including caching, synchronization, and automatic re-fetching

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Investor, Commitment } from "./api";

const API_BASE_URL = "http://127.0.0.1:8000";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    fetchInvestors: builder.query<Investor[], number[]>({
      query: (firmIds) => ({
        url: "/api/investors",
        transformResponse: (response: Investor[]) =>
          response.filter((investor) => firmIds.includes(investor.firm_id)),
      }),
    }),

    fetchCommitment: builder.query<
      Commitment[],
      { assetClass: string; investorId: number }
    >({
      query: ({ assetClass, investorId }) =>
        `/api/investor/commitment/${assetClass}/${investorId}`,
    }),
  }),
});

export const { useFetchInvestorsQuery, useFetchCommitmentQuery } = apiSlice;
