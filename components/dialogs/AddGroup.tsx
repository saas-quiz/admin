"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { success } from "@/lib/utils";
import { useDataStore } from "@/stores/data";
import React from "react";

export default function AddGroup({ fullWidth }: { fullWidth?: boolean }) {
  const { groups, setGroups } = useDataStore();
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [name, setName] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    if (!name) {
      setError("Name is required");
      return;
    }

    setIsLoading(true);
    const res = await fetch("/api/groups", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description }),
    }).then((res) => res.json());
    setIsLoading(false);

    if (!res.ok) {
      setError(res.error);
      return;
    }

    setName("");
    setDescription("");
    setError("");

    const updatedGroups = groups.concat({ ...res.data, quizzes: [] });
    setGroups(updatedGroups);
    success(res.message);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={`mt-4 ${fullWidth && "w-full"}`} asChild>
        <Button variant={"outline"}>Add Group</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Group</DialogTitle>
          <DialogDescription>Enter group name and description</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <div className="col-span-3">
              <Input
                id="name"
                value={name}
                onChange={(e) => {
                  setError("");
                  setName(e.target.value);
                }}
                className={`col-span-3 ${error && "border-red-500"}`}
              />
              {error && <p className="text-red-500 text-sm text-right">{error}</p>}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <Label htmlFor="desc" className="text-right">
              Description
            </Label>
            <Input
              id="desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
              placeholder="Optional"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button type="submit" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Creating..." : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
