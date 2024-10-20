import { useAuthStore } from "@/stores/auth";
import Link from "next/link";

async function Page() {
  const { session } = useAuthStore.getState();
  return (
    <div className="flex items-center h-full">
      {JSON.stringify(session, null, 2)}
      <Link href="/profile">Profile</Link>
    </div>
  );
}

export default Page;
