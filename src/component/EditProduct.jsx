import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useRef, useState } from "react";

const EditProduct = ({
  product,
  isModalOpen,
  setProducts,
  categories,
  setVisibleProducts,
  setIsModalOpen,
}) => {
  const [currentProduct, setCurrentProduct] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("none");
  const [errors, setErrors] = useState([
    {
      slug: "none",
      message: "none",
    },
  ]);

  useEffect(() => {
    setCurrentProduct(product);
    setSelectedCategory(product?.category || "none");
  }, [product]);

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
        id: currentProduct.id,
        name: data.name,
        price: parseFloat(data.price),
        category: selectedCategory,
        stock: parseInt(data.stock),
        description: data.description || "",
        createdAt: currentProduct.createdAt,
        isActive: true,
        tags: data.tags ? data.tags.split(",").map((tag) => tag.trim()) : [],
      };
      setVisibleProducts((prev) =>
        prev.map((prod) => (prod.id === newProduct.id ? newProduct : prod))
      );
      setProducts((prev) =>
        prev.map((prod) => (prod.id === newProduct.id ? newProduct : prod))
      );
      setIsModalOpen(false);
      alert("Product Updated successfully!");
    } catch (err) {
      console.error("Error Updating product:", err);
      alert("There was an error updating the product. Please try again.");
    }
  };
  let formRef = useRef();

  return (
    <>
      {/* <div className="mt-5 d-flex justify-content-between align-items-center">
        <Button
          onClick={() => setPage("list")}
          variant="filled"
          color="geekblue"
          icon={<ArrowLeftOutlined />}
        >
          Go Back
        </Button>
        <h3 className="my-0">New Product</h3>
      </div> */}
      <Modal
        title="Basic Modal"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        okText="Update Product"
        onOk={() => {
          formRef.current.dispatchEvent(
            new Event("submit", { cancelable: true, bubbles: true })
          );
        }}
        width={800}
      >
        <form onSubmit={handleSubmit} ref={formRef} className="d-block mt-4">
          <div className="row gy-4">
            <div className="col-md-6 col-lg-6">
              <Input
                placeholder="Enter Product Name"
                name="name"
                value={currentProduct?.name}
                onChange={(e) =>
                  setCurrentProduct({
                    ...currentProduct,
                    name: e.target.value,
                  })
                }
                status={errors?.find((e) => e.slug === "name") ? "error" : ""}
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
                value={currentProduct?.price}
                onChange={(e) =>
                  setCurrentProduct({
                    ...currentProduct,
                    price: e.target.value,
                  })
                }
                name="price"
                status={errors?.find((e) => e.slug === "price") ? "error" : ""}
              />
              {errors?.find((e) => e.slug === "price") && (
                <small className="text-danger">
                  {errors?.find((e) => e.slug === "price").message}
                </small>
              )}
            </div>
            <div className="col-md-6 col-lg-6">
              <Select
                name="category"
                onChange={(value) => {
                  setSelectedCategory(value);
                  setCurrentProduct({
                    ...currentProduct,
                    category: value,
                  });
                }}
                value={selectedCategory}
                status={
                  errors?.find((e) => e.slug === "category") ? "error" : ""
                }
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
                value={currentProduct?.stock}
                onChange={(e) => {
                  setCurrentProduct({
                    ...currentProduct,
                    stock: e.target.value,
                  });
                }}
                placeholder="Enter Stock Quantity"
                type={"number"}
                name="stock"
                status={errors?.find((e) => e.slug === "stock") ? "error" : ""}
              />
              {errors?.find((e) => e.slug === "stock") && (
                <small className="text-danger">
                  {errors?.find((e) => e.slug === "stock").message}
                </small>
              )}
            </div>
            <div className="col-12">
              <TextArea
                value={currentProduct?.description}
                onChange={(e) =>
                  setCurrentProduct({
                    ...currentProduct,
                    description: e.target.value,
                  })
                }
                rows={4}
                placeholder="Enter Product Description (optional)"
                name="description"
              />
            </div>
            <div className="col-12">
              <Input
                value={currentProduct?.tags?.join(", ")}
                onChange={(e) =>
                  setCurrentProduct({
                    ...currentProduct,
                    tags: e.target.value.split(",").map((tag) => tag.trim()),
                  })
                }
                placeholder="Enter Product Tags Comma Separated (optional)"
                name="tags"
              />
            </div>
            <div className="col-12 text-end">
              <Button
                className="mt-2 d-none"
                type="primary"
                size="large"
                htmlType="submit"
              >
                Update Product
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};
export default EditProduct;
