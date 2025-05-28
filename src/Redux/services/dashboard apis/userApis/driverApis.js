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
    createDriver: builder.mutation({
      query: ({ data }) => {
        return {
          url: '/dashboard/post-driver',
          method: 'POST',
          body: data,
        };
      },
    }),
    updateDriver: builder.mutation({
      query: ({ data }) => {
        return {
          url: '/dashboard/edit-driver',
          method: 'PATCH',
          body: data,
        };
      },
    }),
  }),
});

export const {
  useGetDriverQuery,
  useCreateDriverMutation,
  useUpdateDriverMutation,
} = driverApis;
