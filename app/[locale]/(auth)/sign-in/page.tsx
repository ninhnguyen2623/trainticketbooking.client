import { Card } from "@/components/ui/Card";
import UserAuthForm from "../_components/UserAuthForm";
import { Link } from "@/i18n/routing";

export default function SignIn() {
  return (
    <>
      <div className="container grid h-svh flex-col items-center justify-center bg-primary-foreground lg:max-w-none lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[480px] lg:p-8">
          <div className="mb-4 flex items-center justify-center">
            <h1 className="font-semibold md:text-xl  lg:text-3xl">
              TrainTicket.Hub Admin
            </h1>
          </div>
          <Card className="p-6">
            <div className="flex flex-col space-y-2 text-left">
              <h1 className="text-center text-2xl font-semibold tracking-tight">
                Login
              </h1>
            </div>
            <UserAuthForm />
          </Card>
        </div>
      </div>
    </>
  );
}
