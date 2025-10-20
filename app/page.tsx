'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import "nextjs-reusable-table/dist/index.css"; // Import default styles

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard");
  }, [router]);

  return null;
}
