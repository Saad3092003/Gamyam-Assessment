"use client";
import TableView from "@/component/TableView";
import {
  AppstoreOutlined,
  DeleteOutlined,
  EditOutlined,
  GroupOutlined,
  MenuOutlined,
  MoreOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Input, Modal, Radio } from "antd";
import { useEffect, useRef, useState } from "react";
import CardView from "./CardView";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";

export default function ProductPage({ productData, categories }) {
  const [products, setProducts] = useState(productData);
  const [visibleProducts, setVisibleProducts] = useState(products);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [view, setView] = useState("list");
  const [page, setPage] = useState("list");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewProductAdded, setIsNewProductAdded] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const debounceRef = useRef(null);

  return (
    <div className="container">
      {page === "list" ? (
        <>
          <div className="mt-5">
            <h3>Product List</h3>
          </div>
          <div className="row mt-4 g-3 align-items-center">
            <div className="col-md-7">
              <Input
                className="rounded-pill"
                placeholder="Search Products ..."
                size="large"
                onChange={(e) => {
                  const value = e.target.value.toLowerCase();

                  if (debounceRef.current) {
                    clearTimeout(debounceRef.current);
                  }

                  debounceRef.current = setTimeout(() => {
                    const filtered = products.filter(
                      (product) =>
                        product.name.toLowerCase().includes(value) ||
                        product.category.toLowerCase().includes(value)
                      // I have commented out these below lines that can be used to search in category and tags as well
                      // product.category.toLowerCase().includes(value) ||
                      // product.tags.some((tag) =>
                      //   tag.toLowerCase().includes(value)
                      // )
                    );

                    setVisibleProducts(filtered);
                  }, 500);
                }}
                prefix={<SearchOutlined className="me-2" />}
              />
            </div>
            <div className="col-md-5 text-end">
              <Button
                size="large"
                variant="solid"
                color="default"
                onClick={() => setPage("add")}
                className="rounded-pill"
                icon={<PlusOutlined />}
              >
                Add New Product
              </Button>
            </div>
          </div>
          <div className="my-3 w-fit ">
            <Radio.Group
              block
              options={[
                { label: <MenuOutlined />, value: "list" },
                { label: <AppstoreOutlined />, value: "grid" },
              ]}
              onChange={(e) => setView(e.target.value)}
              defaultValue={view}
              optionType="button"
              buttonStyle="solid"
            />
          </div>
          {view === "list" ? (
            <TableView
              isNewProductAdded={isNewProductAdded}
              showModal={showModal}
              data={visibleProducts}
              setSelectedProduct={setSelectedProduct}
            />
          ) : view === "grid" ? (
            <CardView
              showModal={showModal}
              data={visibleProducts}
              setSelectedProduct={setSelectedProduct}
            />
          ) : (
            <div className="p-5 text-center shadow-sm bg-white">
              <h4>Something went wrong</h4>
            </div>
          )}
        </>
      ) : page === "add" ? (
        <AddProduct
          setPage={setPage}
          setIsNewProductAdded={setIsNewProductAdded}
          setProducts={setProducts}
          categories={categories}
          products={products}
          setVisibleProducts={setVisibleProducts}
        />
      ) : (
        <div className="p-5 text-center shadow-sm bg-white">
          <h4>Something went wrong</h4>
        </div>
      )}
      <EditProduct
        product={selectedProduct}
        isModalOpen={isModalOpen}
        setProducts={setProducts}
        categories={categories}
        setVisibleProducts={setVisibleProducts}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
}
