import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Arrow, CheckIcon, EditPenIcon } from "../SVGs";
import { CircleImage } from "../ui/CircleImage";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoIosClose } from "react-icons/io";
import { FaCamera } from "react-icons/fa";
import {
  CldUploadButton,
  type CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useToast } from "../ui/use-toast";
import { type SettingsFormType, SettingsFromSchema } from "@/types";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";

type SettignsAsidePropsT = {
  closeHandler: () => void;
};

export default function SettingsAside({ closeHandler }: SettignsAsidePropsT) {
  const session = useSession();

  return (
    <div className="h-full w-full bg-grey-500">
      <div className="flex bg-grey-300">
        <div className="mt-[50px] flex items-center gap-3 px-2 py-3 text-5md font-medium text-white-100">
          <Button variant={"rounded"} onClick={closeHandler}>
            <span>
              <Arrow />
            </span>
          </Button>
          <div>Settings</div>
        </div>
      </div>

      <SettingsImageForm initValue={session.data?.user.image ?? undefined} />
      <SettingsForm
        key="changeNameKey123"
        title="Your name"
        name="name"
        description="This name will be visible to your Messachat contacts."
        initValue={session.data?.user.name ?? ""}
        max={25}
      />

      <SettingsForm
        key="changeBioFormKey123"
        title="About"
        name="bio"
        initValue={session.data?.user.bio ?? ""}
        placeholder="Add About you"
        max={80}
      />
    </div>
  );
}

function SettingsForm({
  title,
  name,
  description,
  initValue,
  max,
  placeholder = "",
}: {
  title: string;
  name: keyof SettingsFormType;
  description?: string;
  initValue?: string;
  max?: number;
  placeholder?: string;
}) {
  const [openForm, setOpenForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(initValue);
  const router = useRouter();
  const { toast } = useToast();
  const session = useSession();
  const { handleSubmit, register, watch, reset } = useForm<SettingsFormType>({
    resolver: zodResolver(SettingsFromSchema),
    defaultValues: {
      [name]: useMemo(() => value, [value]),
    },
  });
  useEffect(() => {
    reset({ [name]: value });
  }, [value, name, reset]);

  const onSubmit = (data: SettingsFormType) => {
    setIsLoading(true);
    axios
      .post<SettingsFormType>("/api/settings", data)
      .then(async (res) => {
        setValue(res.data[name]);
        reset({ [name]: value });
        router.refresh();
      })
      .catch((error) => {
        console.error(error);
        // // setValue(initValue);
        // console.log("so this is what happening");
        // session.update({user})
        toast({
          title: "Something went wrong!",
          variant: "destructive",
        });
      })
      .finally(() => {
        setOpenForm(false);
        setIsLoading(false);
      });
  };
  return (
    <div className="p-5 text-white-100">
      <div className="mb-4 text-3sm text-primary">{title}</div>
      <div className="mb-4">
        {!openForm && (
          <div className="flex h-[34px] items-center justify-between  pl-[1px] text-2md">
            {/* <div>{initValue ? initValue : placeholder}</div> */}
            <div>{value ? value : placeholder}</div>
            <div>
              <button
                className="text-grey-100"
                onClick={() => setOpenForm(true)}
              >
                <EditPenIcon />
              </button>
            </div>
          </div>
        )}
        {openForm && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="disabled group flex items-center gap-2  shadow-input shadow-grey-100/90 focus-within:shadow-primary"
          >
            <input
              {...register(name)}
              className="h-[34px] flex-1 border-none bg-[#00000000] pl-[1px]  outline-none disabled:cursor-not-allowed "
              disabled={isLoading}
            />
            {max && (
              <span className="text-2sm text-grey-100">
                {max - (watch(name) ?? "").length}
              </span>
            )}
            <button
              type="button"
              className="text-[27px] text-grey-100 disabled:cursor-not-allowed"
              disabled={isLoading}
              onClick={() => {
                reset();
                setOpenForm(false);
              }}
            >
              <IoIosClose />
            </button>
            <button
              type="submit"
              className="scale-125 text-grey-100 disabled:cursor-not-allowed group-focus-within:text-primary"
              disabled={isLoading}
            >
              <CheckIcon />
            </button>
          </form>
        )}
      </div>
      {description && (
        <div className="text-3sm text-white-200">
          <p>{description}</p>
        </div>
      )}
    </div>
  );
}

function SettingsImageForm({ initValue = "" }: { initValue?: string }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const { handleSubmit, watch, setValue } = useForm<SettingsFormType>({
    resolver: zodResolver(SettingsFromSchema),
    defaultValues: {
      image: initValue,
    },
  });

  const handleUpload = (result: CloudinaryUploadWidgetResults) => {
    console.log(result);
    let imgUrl = null;
    if (result.info && typeof result.info !== "string") {
      imgUrl = result.info.secure_url;
    }
    if (!imgUrl) return;
    setValue("image", imgUrl);

    formRef.current?.dispatchEvent(
      new Event("submit", { cancelable: true, bubbles: true }),
    );
    // handleSubmit( )
  };
  const onSubmit = (data: SettingsFormType) => {
    // handleUpload
    setIsLoading(true);
    axios
      .post<SettingsFormType>("/api/settings", data)
      .then((res) => {
        console.log(res);
        router.refresh();
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: "Something went wrong!",
          variant: "destructive",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const image = watch("image");
  return (
    <div className="flex justify-center py-7">
      <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
        <CircleImage size={"xl"} className="relative" src={image ?? initValue}>
          <div className="absolute h-full w-full cursor-pointer rounded-full bg-[#00000091] opacity-0 hover:opacity-100">
            <CldUploadButton
              options={{ maxFiles: 1 }}
              onSuccess={handleUpload}
              uploadPreset="lr97df2p"
              className="flex h-full w-full items-center justify-center text-white-100"
            >
              <div className="flex flex-col items-center gap-2">
                {/* <div> */}
                <FaCamera className="text-[26px]" />
                {/* </div> */}
                <div className="text-2sm">
                  CHANGE
                  <br /> PROFILE PHOTO
                </div>
              </div>
            </CldUploadButton>
          </div>
        </CircleImage>
      </form>
    </div>
  );
}
