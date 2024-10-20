import { useAuthStore } from "@/stores/auth";
import Link from "next/link";

async function Page() {
  const { session } = useAuthStore.getState();
  return <div className="flex items-center w-full justify-center h-full text-3xl">🏠</div>;
}

export default Page;
