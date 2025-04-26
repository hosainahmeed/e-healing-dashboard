import baseApis from '../../../baseApis/baseApis';

const totalOverviewApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getTotalOverview: builder.query({
      query: () => ({
        url: '/dashboard/total-overview',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetTotalOverviewQuery } = totalOverviewApis;
