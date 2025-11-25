import { Link, Outlet } from "react-router";

export function Layout() {
  return (
    <div>
      <nav className="flex items-center justify-between gap-4">
        <h1 className="my-4 text-2xl font-bold text-sky-700">
          <Link to="/">Task Management</Link>
        </h1>

        <ul className="inline-flex gap-4">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </div>
  );
}
