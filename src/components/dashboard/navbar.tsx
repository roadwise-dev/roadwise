import { ThemeToggle } from "./theme-toggle";
import { UserNav } from "./user-nav";

export default function Navbar() {
  return (
    <div className="top-0 z-20 w-full shadow-sm">
      <div className="max-w-7xl flex flex-row justify-between mx-auto items-center px-10">
        <h1 className="font-bold text-2xl">Roadwise</h1>
        <div className="flex gap-4 h-16 items-center justify-end">
          <ThemeToggle />
          <UserNav />
        </div>
      </div>
    </div >
  );
}
