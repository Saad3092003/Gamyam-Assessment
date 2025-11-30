import { DeleteOutlined, EditOutlined, MoreOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";

const CardView = ({ data, setSelectedProduct, showModal }) => {
  // Action menu items
  const items = [
    {
      key: "1",
      label: "Edit",
      icon: <EditOutlined />,
      onClick: () => {
        setTimeout(() => {
          showModal();
        }, 300);
      },
    },
  ];
  return (
    <div className="mt-3">
      <div className="row gy-4">
        {data?.length > 0 ? (
          data?.map((product) => (
            <div key={product?.id} className="col-lg-4 col-md-6">
              <div className="card h-100 rounded-4 border-lighter shadow-sm p-1">
                <div className="card-body ">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h5 className="fw-normal">₹ {product?.price}</h5>
                      <h5 className="card-title">{product?.name}</h5>
                    </div>
                    <div className="">
                      <Dropdown
                        trigger={["click"]}
                        menu={{ items }}
                        onOpenChange={() => {
                          setSelectedProduct(product);
                        }}
                        placement="bottomRight"
                      >
                        <Button icon={<MoreOutlined />}></Button>
                      </Dropdown>
                    </div>
                  </div>
                  <div className="">
                    <Button size="small" color="purple" variant="filled">
                      {product?.category}
                    </Button>
                  </div>
                  <hr className="mb-2" />
                  <div className="">
                    <p className="mb-1">{product?.description}</p>
                    <div className="d-flex justify-content-between align-items-center flex-row">
                      <div className="text-secondary">
                        <i>
                          <small className="text-capitalize">
                            Tag :{" "}
                            {Array.isArray(product?.tags)
                              ? product?.tags.join(", ")
                              : product?.tags}
                          </small>
                        </i>
                      </div>
                      <div>
                        <small>Stock : {product?.stock}</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-5 text-center shadow-sm bg-white">
            <h4>No products found</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardView;
