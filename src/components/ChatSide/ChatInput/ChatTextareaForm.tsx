"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import EmojiPicker, { Theme } from "emoji-picker-react";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { EmojiSvg, SendIcon } from "@/components/SVGs";

const FormSchema = z.object({
  message: z.string(),
});

type FormInputsType = z.infer<typeof FormSchema>;

export function ChatTextareaForm() {
  const [emojiOpen, setEmojiOpen] = useState(false);
  const taRef = useRef<HTMLTextAreaElement>(null);
  const form = useForm<FormInputsType>({
    resolver: zodResolver(FormSchema),
  });
  const taValue = form.watch("message");

  function onSubmit(data: FormInputsType) {
    console.log(data);
    form.reset({ message: "" });
  }

  const calcTaHeightHandler = (ta: HTMLTextAreaElement) => {
    const maxHeight = parseInt(window.getComputedStyle(ta).maxHeight);

    ta.style.height = window.getComputedStyle(ta).minHeight;
    ta.style.height = ta.scrollHeight + "px";
    ta.style.overflowY = ta.scrollHeight > maxHeight ? "scroll" : "hidden";
  };

  useEffect(() => {
    if (!taRef.current) return;
    calcTaHeightHandler(taRef.current);
  }, [taValue]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full items-center gap-4  bg-grey-300 px-6 py-2"
      >
        <div className="relative place-self-end">
          <Button
            className="px-0"
            variant={null}
            onClick={() => setEmojiOpen((prev) => !prev)}
            type="button"
          >
            <span
              className={cn("text-grey-100", {
                "text-primary": emojiOpen,
                "text-grey-100": !emojiOpen,
              })}
            >
              <EmojiSvg />
            </span>
          </Button>
          <div className="absolute bottom-12">
            <EmojiPicker
              open={emojiOpen}
              theme={Theme.DARK}
              onEmojiClick={({ emoji }) => {
                const taValue = form.getValues("message") ?? "";
                form.setValue("message", taValue + emoji);
              }}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <div className="rounded-[8px] bg-grey-200 px-4 py-2">
                  <Textarea
                    placeholder="Type a message"
                    className={cn(
                      " focux:border-none h-[23px] max-h-[175px] min-h-[23px] w-full resize-none overflow-hidden border-none bg-grey-200 p-0  pr-1  text-md text-white-100 outline-none placeholder:text-md placeholder:text-grey-100 focus:outline-none",
                    )}
                    {...field}
                    ref={taRef}
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          variant={null}
          type="submit"
          className="place-self-end px-0"
          disabled={!taValue}
        >
          <span
            className={cn("text-primary ", {
              "text-grey-100": !taValue,
            })}
          >
            <SendIcon />
          </span>
        </Button>
      </form>
    </Form>
  );
}
