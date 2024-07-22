import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { URL } from '../constants';
import { IPlanet } from '../interfaces';
import { Resources } from '../interfaces';

const resource: Resources = Resources.Planets;

export const apiSW = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  endpoints(builder) {
    return {
      getPlanets: builder.query<IPlanet[], { page: number; search: string }>({
        query: ({ page = 1, search = '' }) =>
          `${resource}?page=${page}&search=${search}`,
      }),
      getDetails: builder.query<IPlanet, { id: number }>({
        query: ({ id }) => `${resource}/${id}`,
      }),
    };
  },
});

export const useGetPlanetsQuery: (arg: {
  page: number;
  search: string;
}) => ReturnType<typeof apiSW.endpoints.getPlanets.useQuery> =
  apiSW.endpoints.getPlanets.useQuery;

export const useGetDetailsQuery: (arg: {
  id: number;
}) => ReturnType<typeof apiSW.endpoints.getDetails.useQuery> =
  apiSW.endpoints.getDetails.useQuery;
