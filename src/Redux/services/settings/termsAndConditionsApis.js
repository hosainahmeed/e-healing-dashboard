import baseApis from '../../baseApis/baseApis';

const termsAndConditionsApis = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    getTermsAndConditions: builder.query({
      query: () => ({
        url: '/settings/terms-and-conditions',
        method: 'GET',
      }),
      providesTags: ['termsAndConditions'],
    }),
  }),
});

export const { useGetTermsAndConditionsQuery } = termsAndConditionsApis;
