import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/Badge";
import { Checkbox } from "@/components/ui/Checkbox";
import { DataTableColumnHeader } from "@/components/datatable/DataTableColumnHeader";
import { DataTableRowActions } from "./DataTableRowActions";

import { Booking } from "@/interfaces";

export const columns: ColumnDef<Booking>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Id" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: true,
    enableHiding: false
  },
  {
    accessorKey: "startStation",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="StartStation" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
            {row.getValue("startStation")}
          </span>
        </div>
      );
    }
  },
  {
    accessorKey: "endStation",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="EndStation" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
            {row.getValue("endStation")}
          </span>
        </div>
      );
    }
  },
  {
    accessorKey: "departureDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="DepartureDate" />
    ),
    cell: ({ row }) => {
      const departureDate = row.getValue("departureDate") as string | null;

      // Định dạng ngày
      const formattedDate = departureDate
        ? (() => {
          const date = new Date(departureDate); // Tạo đối tượng Date từ chuỗi
          const day = String(date.getUTCDate()).padStart(2, "0"); // Lấy ngày (dd)
          const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Lấy tháng (mm)
          const year = date.getUTCFullYear(); // Lấy năm (yyyy)
          return `${day}/${month}/${year}`; // Kết hợp thành chuỗi dd:mm:yyyy
        })()
        : "N/A"; // Nếu giá trị không tồn tại, hiển thị "N/A"

      return (
        <div className="flex space-x-2">
          <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
            {formattedDate}
          </span>
        </div>
      );
    }
  },
  {
    accessorKey: "totalPrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="TotalPrice" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
            {row.getValue("totalPrice")}
          </span>
        </div>
      );
    }
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue<string>("status");
      const variant = status === "Pending" ? "default" : "destructive"; // Map status to valid variant
      return <Badge variant={variant}>{status}</Badge>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />
  }
];
