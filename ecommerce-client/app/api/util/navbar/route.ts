export default async function getCategories() {
  
  const response = await fetch(`https://ccns-th.com:80/api/v0/guest/utils/enum/navbar/all`);
  
  if (!response.ok) {
    throw new Error("failed to fetch data");
  }
  const { data } = await response.json();
  return data;
}
