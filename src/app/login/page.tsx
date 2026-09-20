import { Suspense } from "react";
import LoginComponent from "../components/Login";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center text-muted-foreground">
          Loading...
        </div>
      }
    >
      <LoginComponent />
    </Suspense>
  );
}
