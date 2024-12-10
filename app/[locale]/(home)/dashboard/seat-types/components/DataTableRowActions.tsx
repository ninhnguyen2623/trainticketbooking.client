import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/custom/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/DropdownMenu";

import { AlertModal } from "@/components/modal/AlertModal";
import { useState } from "react";
import { Link } from "@/i18n/routing";
import { Eye, Trash2 } from "lucide-react";
import { FiEdit } from "react-icons/fi";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { useDeleteSeatTypeMutation } from "@/services/seatTypeApi";
import { toast } from "sonner";
interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row
}: DataTableRowActionsProps<TData>) {
  const [open, setOpen] = useState(false);
  const [deleteSeatType, { isLoading }] = useDeleteSeatTypeMutation();

  const onConfirm = async () => {
    try {
      toast.loading("Deleting SeatType...", { id: "delete-SeatType" });

      const result = await deleteSeatType(row.getValue("id")).unwrap();
      if (result.success) {
        toast.success("SeatType deleted successfully!", { id: "delete-SeatType" });
      } else {
        const error = result.errors?.[0];
        if (error) {
          toast.error(`${error.description || "An error occurred"}`, {
            id: "delete-SeatType"
          });
        } else {
          toast.error("Failed to delete the SeatType. Please try again.", {
            id: "delete-SeatType"
          });
        }
      }
      setOpen(false);
    } catch (err: any) {
      const errorMessage =
        err?.message || "Failed to delete the SeatType. Please try again.";
      toast.error(errorMessage, { id: "delete-SeatType" });
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={isLoading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>
            <Link
              href={`/dashboard/seat-types/detail/${row.getValue("id")}`}
              className="flex w-full content-between gap-3"
            >
              <Eye className="text-[#6c757d]" size={20} />
              <span>Detail</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={`/dashboard/seat-types/edit/${row.getValue("id")}`}
              className="flex w-full content-between gap-3"
            >
              <FiEdit className="text-[#ffc107]" size={20} />
              <span>Update</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <div className=" flex w-full content-between gap-3">
              <Trash2 className="text-[#dc3545]" size={20} />
              <span>Delete</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
