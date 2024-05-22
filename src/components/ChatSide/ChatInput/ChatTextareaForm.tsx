"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { type ChangeEvent, useRef } from "react";
import { cn } from "@/lib/utils";
// import { toast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  message: z.string(),
});

type FormInputsType = z.infer<typeof FormSchema>;

export function ChatTextareaForm() {
  const form = useForm<FormInputsType>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: FormInputsType) {
    console.log(data);
  }

  const calcTaHeightHandler = ({
    target,
  }: {
    target: EventTarget & HTMLTextAreaElement;
  }) => {
    const maxHeight = parseInt(window.getComputedStyle(target).maxHeight);

    target.style.height = window.getComputedStyle(target).minHeight;
    target.style.height = target.scrollHeight + "px";
    target.style.overflowY =
      target.scrollHeight > maxHeight ? "scroll" : "hidden";
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-[400px] items-center gap-3 "
      >
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="w-full">
              {/* <FormLabel>Bio</FormLabel> */}
              <FormControl>
                <div className="bg-[red]">
                  <Textarea
                    placeholder="Type a message"
                    className={cn(
                      " h-[23px] max-h-[175px] min-h-[23px] w-full resize-none overflow-hidden  border-none  p-0 pr-1 text-md",
                    )}
                    {...field}
                    onChange={calcTaHeightHandler}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
