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
import { useDeleteTrainMutation } from "@/services/trainApi";
import { toast } from "sonner";
interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row
}: DataTableRowActionsProps<TData>) {
  const [open, setOpen] = useState(false);
  const [deleteTrain, { isLoading }] = useDeleteTrainMutation();

  const onConfirm = async () => {
    try {
      toast.loading("Deleting train...", { id: "delete-train" });

      const result = await deleteTrain(row.getValue("id")).unwrap();
      if (result.success) {
        toast.success("Train deleted successfully!", { id: "delete-train" });
      } else {
        const error = result.errors?.[0];
        if (error) {
          toast.error(`${error.description || "An error occurred"}`, {
            id: "delete-train"
          });
        } else {
          toast.error("Failed to delete the train. Please try again.", {
            id: "delete-train"
          });
        }
      }
      setOpen(false);
    } catch (err: any) {
      const errorMessage =
        err?.message || "Failed to delete the train. Please try again.";
      toast.error(errorMessage, { id: "delete-train" });
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
              href={`/dashboard/trains/detail/${row.getValue("id")}`}
              className="flex w-full content-between gap-3"
            >
              <Eye className="text-[#6c757d]" size={20} />
              <span>Detail</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href={`/dashboard/trains/edit/${row.getValue("id")}`}
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
