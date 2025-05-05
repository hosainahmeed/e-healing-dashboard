import baseApis from '../../../baseApis/baseApis';

const dCoinsApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getDCoins: builder.query({
      query: () => ({
        url: '/dcoin/get-all-dCoins',
        method: 'GET',
      }),
      providesTags: ['dCoins'],
    }),
    updateDCoin: builder.mutation({
      query: ({ updateData }) => ({
        url: '/dcoin/update-dcoin',
        method: 'PATCH',
        body: updateData,
      }),
      invalidatesTags: ['dCoins'],
    }),
    deleteDCoin: builder.mutation({
      query: ({ data }) => ({
        url: '/dcoin/delete-dCoin',
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: ['dCoins'],
    }),
    addNewDcoin: builder.mutation({
      query: ({ data }) => ({
        url: '/dcoin/post-dCoin-packet',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['dCoins'],
    }),
  }),
});

export const {
  useGetDCoinsQuery,
  useUpdateDCoinMutation,
  useDeleteDCoinMutation,
  useAddNewDcoinMutation,
} = dCoinsApis;
