import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { error, success } from "@/lib/utils";
import { Loader2, Trash2Icon } from "lucide-react";
import { deleteGroupDB } from "@/lib/actions/group.actions";
import { useGroups } from "@/hooks/useGroups";
import { useDataStore } from "@/stores/data";
import { useRouter } from "next/navigation";

const DeleteGroup = ({ id }: { id: string }) => {
  const navigate = useRouter();
  const { groups, setGroups } = useDataStore();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handledelete = async () => {
    setLoading(true);
    const res = await deleteGroupDB({ id });
    setLoading(false);
    if (!res.ok) return error(res.error!);

    const updatedGroups = groups.filter((group) => group.id !== id);
    setGroups(updatedGroups);
    setOpen(false);
    success("Group deleted successfully");
    navigate.replace("/");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Trash2Icon className="w-4 h-4 text-red-500 cursor-pointer" />
      </DialogTrigger>
      <DialogDescription className="sr-only">Delete Group</DialogDescription>
      <DialogContent>
        <DialogTitle className="">Delete Group</DialogTitle>
        <Label htmlFor="question" className="text-sm font-normal">
          Are you sure you want to delete this group? This action cannot be undone
        </Label>
        <DialogFooter className="flex gap-2">
          <Button variant={"outline"} onClick={() => setOpen(false)} size={"sm"}>
            Cancel
          </Button>
          <Button
            variant={"outline"}
            onClick={handledelete}
            className="bg-red-100 text-red-500"
            size={"sm"}
            disabled={loading}
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteGroup;
