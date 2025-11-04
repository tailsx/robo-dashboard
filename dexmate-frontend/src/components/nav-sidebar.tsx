import { NavUser } from "@/features/users/nav-user";
import { authClient } from "@/lib/auth-client";
import { NavLink } from "react-router";

function NavSidebar() {
  const { data } = authClient.useSession();

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col">
        <div>Navigation Sidebar</div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/robots">Robots</NavLink>
        <NavLink to="/groups">Groups</NavLink>
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
