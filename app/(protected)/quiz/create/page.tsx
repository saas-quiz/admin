"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useMemo } from "react";
import AddUserInput from "./components/AddQuizInput";
import ImageUplaod from "./components/ImageUplaod";
import QuizTitle from "./components/QuizTitle";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDataStore } from "@/stores/data";
import { error, success, uploadImage } from "@/lib/utils";
import { useGroups } from "@/hooks/useGroups";
import { createQuizDB } from "@/lib/actions/group.actions";
import { useAuthStore } from "@/stores/auth";
import { Session, User } from "next-auth";
import { useSession } from "next-auth/react";
import { IQuiz } from "@/types";

const Page = ({ searchParams }: { searchParams: { group: string } }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { groups, setGroups } = useDataStore();

  const { groups: data, isLoading: isGroupsLoading, error: fetchingError } = useGroups();
  const group = useMemo(() => data.find((group) => group.id === searchParams.group), [data]);

  const [images, setImages] = React.useState<{ key: string; publicId?: string; file?: File; url: string }[]>([]);
  const [quizName, setQuizName] = React.useState("");
  const [inputs, setInputs] = React.useState<string[]>([]);
  const [formStatus, setFormStatus] = React.useState("");

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus("loading...");
    // Get form data
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const values = Object.fromEntries(formData.entries());

    if (!values.title) {
      setFormStatus("");
      return error("Quiz title is required", 1000);
    }

    // upload images
    if (images.length > 0) {
      setFormStatus("uploading...");
      for (const image of images) {
        const res = await uploadImage(image.file!);
        if (!res.ok) {
          error(res.error, 1000);
          setFormStatus("");
          return;
        }
        const { public_id, secure_url } = res.data;
        setImages((prevImages) => {
          return prevImages.map((img) => {
            if (img.key === image.key) {
              return { ...img, publicId: public_id, url: secure_url };
            }
            return img;
          });
        });
      }
    }

    setFormStatus("creating...");
    const res = await createQuizDB(values, {
      author: session?.user?.name!,
      groupId: group?.id!,
      userInputs: inputs,
    });
    if (!res.ok) {
      error(res.error!, 1000);
      setFormStatus("");
      return;
    }

    // update group
    const updatedGroups = groups.map((group) => {
      if (group.id === searchParams.group) {
        const newQuiz: IQuiz = { ...res.data, questions: [] } as IQuiz;
        return { ...group, quizzes: group.quizzes ? [...group.quizzes, newQuiz] : [newQuiz] };
      }
      return group;
    });
    setGroups(updatedGroups);
    setFormStatus("");
    success("Quiz created successfully");

    // redirect to group
    router.push(`/group?id=${group?.id}`);
  };

  // check if group exists
  useEffect(() => {
    if (!isGroupsLoading && !group) {
      error("Group not found", 1000);
      router.push("/");
    }
    if (fetchingError) {
      error(fetchingError, 1000);
      router.push("/");
    }
  }, [groups, isGroupsLoading, fetchingError]);

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="flex justify-between gap-2 w-full">
        <ImageUplaod type="left" setImages={setImages} images={images} />
        {/* <QuizTitle title="Quiz Title" /> */}
        {/* <div className="text-center border border-dotted w-fit h-fit p-2 rounded bg-gray-100">
          <h1 className="md:text-xl font-semibold line-clamp-2">{quizName}</h1>
        </div> */}
        <ImageUplaod type="right" setImages={setImages} images={images} />
      </div>

      <form onSubmit={submitHandler}>
        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-1 gap-2">
            <Label>Quiz Title</Label>
            <Input type="text" name="title" onChange={(e) => setQuizName(e.target.value)} />
          </div>

          <div className="grid grid-cols-1 gap-2">
            <Label>Quiz Description</Label>
            <Textarea placeholder="Enter quiz description" name="desc" rows={2} />
          </div>

          <div className="grid grid-cols-1 gap-2">
            <div className="flex justify-between gap-2">
              <div className="w-full">
                <Label>Time Duration</Label>
                <Input type="number" name="duration" />
              </div>
              <div className="w-full">
                <Label>Max Marks</Label>
                <Input type="number" name="maxMarks" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2">
            <AddUserInput inputs={inputs} setInputs={setInputs} />
          </div>

          <Separator />

          <Label>Quiz Footer</Label>
          <div className="grid grid-cols-1 gap-2">
            <Input
              className="font-semibold text-xl"
              type="text"
              placeholder="Heading1 eg. Company Name"
              name="footerHeading1"
            />
            <Input
              className="font-medium text-lg"
              type="text"
              placeholder="Heading2 eg. Company Address"
              name="footerHeading2"
            />
            <Input className="" type="text" placeholder="Text1 eg. Email" name="footerText1" />
            <Input className="" type="text" placeholder="Text2 eg. Contact" name="footerText2" />
            <Input className="" type="text" placeholder="Link eg. Website" name="footerLink" />
          </div>

          <div className="grid grid-cols-1 gap-2 place-items-end">
            <Button type="submit" className="w-fit">
              {formStatus ? formStatus : "Create"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Page;