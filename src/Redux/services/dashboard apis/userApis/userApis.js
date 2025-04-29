import baseApis from '../../../baseApis/baseApis';

export const userApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getAllUserOrDriver: builder.query({
      query: ({ params }) => ({
        url: '/dashboard/get-all-drivers-or-users',
        method: 'GET',
        params: params,
      }),
    }),
    updateUserStatus: builder.mutation({
      query: ({ userId, status }) => ({
        url: `/dashboard/block-unblock-user-driver`,
        method: 'PATCH',
        body: {
          authId: userId,
          isBlocked: status,
        },
      }),
    }),
    getSingleUserOrDriver: builder.query({
      query: ({ id }) => ({
        url: `/dashboard/get-user`,
        method: 'GET',
        params: { userId: id },
      }),
    }),
  }),
});

export const {
  useGetAllUserOrDriverQuery,
  useUpdateUserStatusMutation,
  useGetSingleUserOrDriverQuery,
} = userApis;
