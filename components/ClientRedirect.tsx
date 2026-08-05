"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Static-export friendly client redirect (next.config redirects unsupported with output: export). */
export function ClientRedirect({ to }: { to: string }) {
  const router = useRouter();

  useEffect(() => {
    router.replace(to);
  }, [router, to]);

  return (
    <div className="flex min-h-[40vh] items-center justify-center text-sm text-muted-foreground">
      Đang chuyển hướng…
    </div>
  );
}
