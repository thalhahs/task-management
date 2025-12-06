import { Link, Outlet } from "react-router";
import { CheckSquareIcon } from "lucide-react";

export function Layout() {
  return (
    <div className="flex min-h-screen justify-center bg-background">
      <div className="w-full max-w-4xl px-4 py-6">
        <nav className="mb-8 flex items-center justify-between gap-4 border-b pb-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-primary transition-colors hover:text-primary/80"
          >
            <CheckSquareIcon className="size-6" />
            Task Manager
          </Link>

          <ul className="inline-flex gap-4">
            <li>
              <Link
                to="/"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                About
              </Link>
            </li>
          </ul>
        </nav>

        <main className="w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
