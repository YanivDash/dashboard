"use client";
import React from "react";
import Table from "@/components/tabletab/table";
import HeaderCell from "@/components/tabletab/header-cell";
import { Checkbox, Text, Badge } from "rizzui";

function getStatusBadge(status: string) {
  switch (status.toLowerCase()) {
    case "pending":
      return (
        <Badge variant="flat" color="warning">
          {status}
        </Badge>
      );
    case "active":
      return (
        <Badge variant="flat" color="success">
          {status}
        </Badge>
      );
    case "inactive":
      return (
        <Badge variant="flat" color="danger">
          {status}
        </Badge>
      );
    default:
      return null;
  }
}

const getColumns = (
  order: string,
  column: string,
  onHeaderClick: (value: string) => void
) => [
  {
    title: <></>,
    dataIndex: "checked",
    key: "checked",
    width: 50,
    render: () => (
      <div className="inline-flex cursor-pointer ]">
        <Checkbox variant="flat" />
      </div>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Id"
        sortable
        ascending={order === "asc" && column === "id"}
      />
    ),
    onHeaderCell: () => onHeaderClick("id"),
    dataIndex: "id",
    key: "id",
    width: 50,
  },
  {
    title: (
      <HeaderCell
        title="name"
        sortable
        ascending={order === "asc" && column === "name"}
      />
    ),
    onHeaderCell: () => onHeaderClick("name"),
    dataIndex: "name",
    key: "name",
    width: 150,
    render: (name: string) => (
      <div className="flex items-center">
        <div className=" rtl:ml-0 rtl:mr-3">
          <Text as="small" className="mb-0.5 !text-sm font-medium">
            {name}
          </Text>
        </div>
      </div>
    ),
  },
  {
    title: <HeaderCell title="Status" />,
    dataIndex: "status",
    key: "status",
    width: 120,
    render: (value: string) => getStatusBadge(value),
  },
  {
    title: <HeaderCell title="role" />,
    dataIndex: "role",
    key: "role",
    width: 320,
    render: (role: string) => (
      <div>
        <Text as="small" className="mb-0.5 !text-sm font-medium">
          {role}
        </Text>
      </div>
    ),
  },

  {
    title: <HeaderCell title="Email" />,
    dataIndex: "email",
    key: "email",
    width: 200,
  },
  {
    title: <HeaderCell title="assigned-warhouse" />,
    dataIndex: "warehouse",
    key: "warehouse",
    width: 200,
  },
  {
    title: <></>,
    dataIndex: "action",
    key: "action",
    width: 120,
    render: (_: string, row: User) => (
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="text-primary underline"
          onClick={() => alert(`Edit item #${row.id}`)}
        >
          Edit
        </button>
        <button type="button" className="underline">
          View
        </button>
      </div>
    ),
  },
];

interface User {
  id: string;
  name: string;
  role: string;
  email: string;
  status: string;
  warehouse: string;
}

interface TableTabProps {
  initialData: User[]; // Define props for the component
}

const TableTab: React.FC<TableTabProps> = ({ initialData }) => {
  const [order, setOrder] = React.useState<string>("desc");
  const [column, setColumn] = React.useState<string>("");
  const [data, setData] = React.useState<User[]>(initialData);
  const onHeaderClick = (value: string) => ({
    onClick: () => {
      setColumn(value);
      setOrder(order === "desc" ? "asc" : "desc");
      if (order === "desc") {
        // @ts-expect-error idk
        setData([...data.sort((a, b) => (a[value] > b[value] ? -1 : 1))]);
      } else {
        // @ts-expect-error idk
        setData([...data.sort((a, b) => (a[value] > b[value] ? 1 : -1))]);
      }
    },
  });
  const columns: any = React.useMemo(
    () => getColumns(order, column, onHeaderClick),
    [order, column, onHeaderClick]
  );

  return <Table data={data} columns={columns} className="text-sm " />;
};

export default TableTab;
