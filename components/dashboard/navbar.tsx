import { MainNav } from "./main-nav";
import TeamSwitcher from "./team-switcher";
import { UserNav } from "./user-nav";

export default function Navbar() {
  return (
    <div className="flex h-16 items-center justify-between">
      <TeamSwitcher />
      <div className="flex-grow flex justify-center">
        <MainNav />
      </div>
      <div className="flex items-center space-x-4">
        <UserNav />
      </div>
    </div>
  );
}
