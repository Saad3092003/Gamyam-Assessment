import { DateFormate } from "@/utils/helper";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";

const TableView = ({
  data,
  setSelectedProduct,
  showModal,
  isNewProductAdded,
}) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => (a?.name ?? "").localeCompare(b?.name ?? ""),
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => (a?.price ?? 0) - (b?.price ?? 0),
    },
    {
      title: "Category",
      dataIndex: "category",
      sorter: (a, b) => (a?.category ?? "").localeCompare(b?.category ?? ""),
    },
    {
      title: "Stock",
      dataIndex: "stock",
      sorter: (a, b) => (a?.stock ?? 0) - (b?.stock ?? 0),
    },
    {
      title: "Description",
      dataIndex: "description",
      sorter: (a, b) =>
        (a?.description ?? "").localeCompare(b?.description ?? ""),
    },
    {
      title: "Tags",
      dataIndex: "tags",
      // compare by number of tags; change to another strategy if you need alphabetic tag compare
      render: (tags) => (
        <span className="text-capitalize">
          {Array.isArray(tags) ? tags.join(", ") : tags}
        </span>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      // sorter: (a, b) =>
      //   new Date(a?.createdAt ?? 0) - new Date(b?.createdAt ?? 0),
      render: (ts) => {
        return DateFormate(ts);
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex w-100 mx-auto gap-2">
          <Button
            size="middle"
            variant="filled"
            onClick={() => {
              setSelectedProduct(record);

              setTimeout(() => {
                showModal();
              }, 300);
            }}
            color="primary"
            icon={<EditOutlined />}
          ></Button>
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      bordered
      pagination={{
        pageSize: 10,
        defaultCurrent: isNewProductAdded === true ? data?.length : 1,
      }}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default TableView;
