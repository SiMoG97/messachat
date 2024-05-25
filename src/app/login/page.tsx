import Image from "next/image";

import { Button } from "@/components/ui/button";

import { VscGithubInverted } from "react-icons/vsc";
import { FaGoogle, FaFacebook, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function LoginPage() {
  return (
    <div className="h-svh w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      {/* left */}

      <div className="relative hidden flex-col px-8 py-4 lg:flex">
        <div>
          <h1 className=" text-green  flex gap-3 font-semibold">
            <FaWhatsapp className="text-[36px]" />
            <span className="text-[24px]">Messachat</span>
          </h1>
        </div>
        <div className="flex w-full flex-1 items-center ">
          <div className="absolute inset-0 -z-10 ">
            <Image
              src="/login_bg.png"
              alt="login_bg.png"
              objectFit="cover"
              layout="fill"
            />
            <div className="absolute inset-0 bg-[#00000096]"></div>
          </div>
          <div className=" text-white-100">
            <h1 className="text-xl leading-none">Message privately</h1>
            <h2 className="text-lg my-8">
              Simple, reliable, private messaging and, <br />
              available all over the world.
            </h2>
          </div>
        </div>
      </div>

      {/* right */}
      <div className="flex h-full items-center justify-center bg-grey-600 py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className=" flex  justify-center gap-3 font-semibold text-white-100 lg:hidden">
              <FaWhatsapp className="text-[48px]" />
              <span className="text-[32px]">Messachat</span>
            </h1>
            <p className="text-balance text-muted-foreground">
              Login using your social accounts
            </p>
          </div>
          <div className="grid gap-4">
            <Button
              variant="outline"
              className="border-1 hover:bg-green flex w-full items-center gap-2 bg-grey-300 text-3sm font-bold text-white-100  "
            >
              <FaGoogle />
              <span>Continue with Google</span>
            </Button>
            <Button
              variant="outline"
              className="border-1 hover:bg-green flex w-full items-center gap-2 bg-grey-300 text-3sm font-bold text-white-100  "
            >
              <FaFacebook />
              <span>Continue with Facebook</span>
            </Button>
            <Button
              variant="outline"
              className="border-1 hover:bg-green flex w-full items-center gap-2 bg-grey-300 text-3sm font-bold text-white-100 "
            >
              <VscGithubInverted />
              <span>Continue with Github</span>
            </Button>
            <Button
              variant="outline"
              className="border-1 hover:bg-green flex w-full items-center gap-2 bg-grey-300 text-3sm font-bold text-white-100 "
            >
              <FaXTwitter />
              <span>Continue with X</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
