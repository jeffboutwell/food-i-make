import { signOut } from "@/lib/auth";
import { Button } from "@/lib/components/ui/button";

export default function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button type="submit">Signout</Button>
    </form>
  );
}
