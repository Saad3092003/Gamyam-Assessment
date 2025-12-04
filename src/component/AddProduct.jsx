import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";

const AddProduct = ({
  setPage,
  categories,
  products,
  setVisibleProducts,
  setProducts,
  setIsNewProductAdded,
}) => {
  const [errors, setErrors] = useState([
    {
      slug: "none",
      message: "none",
    },
  ]);
  const [selectedCategory, setSelectedCategory] = useState("none");
  const validateForm = (formData) => {
    const newErrors = [];
    if (!formData.get("name")) {
      newErrors.push({ slug: "name", message: "Product name is required" });
    }
    if (!formData.get("price")) {
      newErrors.push({ slug: "price", message: "Product price is required" });
    }
    if (
      selectedCategory === null ||
      selectedCategory === "none" ||
      categories.indexOf(selectedCategory) === -1
    ) {
      newErrors.push({
        slug: "category",
        message: "Product category is required",
      });
    }
    if (!formData.get("stock")) {
      newErrors.push({ slug: "stock", message: "Product stock is required" });
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.target);
      const newErrors = validateForm(formData);
      setErrors(newErrors);
      if (newErrors.length > 0) {
        return;
      }
      const data = Object.fromEntries(formData);
      let newProduct = {
        id: products.length + 1,
        name: data.name,
        price: parseFloat(data.price),
        category: selectedCategory,
        stock: parseInt(data.stock),
        description: data.description || "",
        createdAt: new Date().toISOString(),
        isActive: true,
        tags: data.tags ? data.tags.split(",").map((tag) => tag.trim()) : [],
      };
      setVisibleProducts([...products, newProduct]);
      setProducts([...products, newProduct]);
      setIsNewProductAdded(true);
      alert("Product added successfully!");
      setPage("list");
    } catch (err) {
      console.error("Error adding product:", err);
      alert("There was an error adding the product. Please try again.");
    }
  };

  return (
    <>
      <div className="mt-5 d-flex justify-content-between align-items-center">
        <Button
          onClick={() => setPage("list")}
          variant="filled"
          color="geekblue"
          icon={<ArrowLeftOutlined />}
        >
          Go Back
        </Button>
        <h3 className="my-0">New Product</h3>
      </div>
      <form
        onSubmit={handleSubmit}
        className="d-block mt-4 p-4 rounded-4 shadow-sm bg-white"
      >
        <div className="row gy-4">
          <div className="col-md-6 col-lg-6">
            <Input
              placeholder="Enter Product Name"
              name="name"
              status={errors?.find((e) => e.slug === "name") ? "error" : ""}
              size="large"
            />
            {errors?.find((e) => e.slug === "name") && (
              <small className="text-danger">
                {errors?.find((e) => e.slug === "name").message}
              </small>
            )}
          </div>
          <div className="col-md-6 col-lg-6">
            <Input
              placeholder="Enter Product Price"
              type={"number"}
              name="price"
              status={errors?.find((e) => e.slug === "price") ? "error" : ""}
              size="large"
            />
            {errors?.find((e) => e.slug === "price") && (
              <small className="text-danger">
                {errors?.find((e) => e.slug === "price").message}
              </small>
            )}
          </div>
          <div className="col-md-6 col-lg-6">
            <Select
              defaultValue="none"
              size="large"
              name="category"
              onChange={(value) => setSelectedCategory(value)}
              value={selectedCategory}
              status={errors?.find((e) => e.slug === "category") ? "error" : ""}
              className="w-100"
              options={[
                { value: "none", label: "Select Category", disabled: true },
                ...categories.map((cat) => ({ value: cat, label: cat })),
              ]}
            />
            {errors?.find((e) => e.slug === "category") && (
              <small className="text-danger">
                {errors?.find((e) => e.slug === "category").message}
              </small>
            )}
          </div>
          <div className="col-md-6 col-lg-6">
            <Input
              placeholder="Enter Stock Quantity"
              type={"number"}
              name="stock"
              status={errors?.find((e) => e.slug === "stock") ? "error" : ""}
              size="large"
            />
            {errors?.find((e) => e.slug === "stock") && (
              <small className="text-danger">
                {errors?.find((e) => e.slug === "stock").message}
              </small>
            )}
          </div>
          <div className="col-12">
            <TextArea
              rows={4}
              size="large"
              placeholder="Enter Product Description (optional)"
              name="description"
            />
          </div>
          <div className="col-12">
            <Input
              placeholder="Enter Product Tags Comma Separated (optional)"
              name="tags"
              size="large"
            />
          </div>
          <div className="col-12 text-end">
            <Button type="primary" size="large" htmlType="submit">
              Add Product
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};
export default AddProduct;
