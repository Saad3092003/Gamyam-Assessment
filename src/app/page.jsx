import ProductPage from "@/component/ProductPage";
import { promises as fs } from "fs";
import path from "path";

export default async function Home() {
  const filePath = path.join("src", "utils", "products.json");
  const jsonData = await fs.readFile(filePath, "utf8");
  const data = JSON.parse(jsonData);
  let productData = data?.sort(
    (a, b) => new Date(a?.createdAt ?? 0) - new Date(b?.createdAt ?? 0)
  );
  const categories = [
    ...new Set(productData.map((product) => product.category)),
  ];

  return (
    <div className="pb-5">
      <ProductPage productData={productData} categories={categories} />
    </div>
  );
}
