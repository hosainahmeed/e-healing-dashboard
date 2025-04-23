import baseApis from '../../baseApis/baseApis';

const termsAndConditionsApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getTermsAndConditions: builder.query({
      query: () => ({
        url: '/manage/get-terms-conditions',
        method: 'GET',
      }),
      providesTags: ['termsAndConditions'],
    }),
    updateTermsAndConditions: builder.mutation({
      query: (body) => ({
        url: '/manage/add-terms-conditions',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['termsAndConditions'],
    }),
  }),
});

export const {
  useGetTermsAndConditionsQuery,
  useUpdateTermsAndConditionsMutation,
} = termsAndConditionsApis;
