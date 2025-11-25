import { Link } from "react-router";
import { Tasks } from "./modules/task/tasks";

export function App() {
  return (
    <div className="flex justify-center">
      <main className="w-full max-w-lg space-y-8">
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

        <Tasks />
      </main>
    </div>
  );
}
