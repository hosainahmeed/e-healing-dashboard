const url = import.meta.env.VITE_API_URL;
console.log(url);
console.log(import.meta.env);

export const imageUrl = (image) => {
  return image
    ? image?.startsWith('http')
      ? image
      : image?.startsWith('/')
      ? `${url}${image}`
      : `${url}/${image}`
    : 'https://placehold.co/400';
};
