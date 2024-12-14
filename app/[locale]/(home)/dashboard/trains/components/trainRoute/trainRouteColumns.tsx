import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/Badge";
import { Checkbox } from "@/components/ui/Checkbox";
import { DataTableColumnHeader } from "@/components/datatable/DataTableColumnHeader";
import { DataTableRowActionsTrainRoute } from "./DataTableRowActionsTrainRoute";

import { TrainRoute } from "@/interfaces";

export const trainRouteColumns: ColumnDef<TrainRoute>[] = [
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
    accessorKey: "startStationName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start Station" />
    ),
    cell: ({ row }) => <div>{row.getValue("startStationName")}</div>,
  },
  {
    accessorKey: "endStationName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="End Station" />
    ),
    cell: ({ row }) => <div>{row.getValue("endStationName")}</div>,
  },
  {
    accessorKey: "arrivalTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Arrival" />
    ),
    cell: ({ row }) => <div>{row.getValue("arrivalTime")}</div>,
  },
  {
    accessorKey: "departureTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Departure" />
    ),
    cell: ({ row }) => <div>{row.getValue("departureTime")}</div>,
  },
  {
    accessorKey: "distance",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Distance (km)" />
    ),
    cell: ({ row }) => <div>{row.getValue("distance")} km</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue<string>("status");
      const variant = status === "Active" ? "default" : "destructive"; // Map status to valid variant
      return <Badge variant={variant}>{status}</Badge>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActionsTrainRoute row={row} />
  }
];
