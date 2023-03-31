const request = async (url) => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    const errorData = await response.json();
    throw errorData;
  } catch (err) {
    console.log(err);
  }
};

const getCartData = async () => {
  const result = await request('./api/productData.json');
  return result;
};

export default getCartData;
