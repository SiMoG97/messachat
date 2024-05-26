import Image from "next/image";

import {
  FaGoogle,
  FaFacebook,
  FaWhatsapp,
  FaDiscord,
  FaGithub,
} from "react-icons/fa";
import { SignInButton } from "./components/SignInButton";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getServerAuthSession();
  if (session) return redirect("/");

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
            <SignInButton
              label="Continue with Google"
              loginProviderName="google"
              ProviderIcon={<FaGoogle />}
            />
            <SignInButton
              label="Continue with Facebook"
              loginProviderName="facebook"
              ProviderIcon={<FaFacebook />}
            />
            <SignInButton
              label="Continue with Discord"
              loginProviderName="discord"
              ProviderIcon={<FaDiscord />}
            />
            <SignInButton
              label="Continue with Github"
              loginProviderName="github"
              ProviderIcon={<FaGithub />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
