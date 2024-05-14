export default async function getProductById(productId:number) {
    try {
      const response = await fetch(`${process.env.API_URL}/guest/products/${productId}`, { next: { revalidate: 1 }});

      if (!response.ok) {
        throw new Error("failed to fetch data");
      }
      const { data } = await response.json();

      return data;

    } catch (error: any) {
      console.log(error);
    }
}