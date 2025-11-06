import { NavUser } from "@/features/users/nav-user";
import { authClient } from "@/lib/auth-client";
import { NavLink } from "react-router";

interface NavSidebarProps {
  onNavigate?: () => void;
}

function NavSidebar({ onNavigate }: NavSidebarProps) {
  const { data } = authClient.useSession();

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col gap-2 p-2 mt-8">
        <NavLink to="/" onClick={onNavigate}>
          Home
        </NavLink>
        <NavLink to="/robots" onClick={onNavigate}>
          Robots
        </NavLink>
        <NavLink to="/groups" onClick={onNavigate}>
          Groups
        </NavLink>
      </div>

      {data && (
        <div>
          <NavUser user={data.user} />
        </div>
      )}
    </div>
  );
}

export { NavSidebar };
