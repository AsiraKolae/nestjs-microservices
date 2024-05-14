export default async function getProductByName(productName:string) {
  
    const response = await fetch(`${process.env.API_URL}/guest/products/?filters={ "name": "${productName}" }`, { next: { revalidate: 3 }});
    
    if (!response.ok) {
      throw new Error("failed to fetch data");
    }

    const { data } = await response.json();
  
    return data;
  }