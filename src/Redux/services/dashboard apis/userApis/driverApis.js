import baseApis from '../../../baseApis/baseApis';

const driverApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getDriver: builder.query({
      query: ({ driverId }) => {
        return {
          url: '/dashboard/get-driver',
          method: 'GET',
          params: {
            driverId: driverId, 
          },
        };
      },
    }),
  }),
});

export const { useGetDriverQuery } = driverApis;
