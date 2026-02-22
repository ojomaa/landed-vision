import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { logout } from "@/lib/storage";
import { FolderOpen, LogOut, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-56 bg-primary text-primary-foreground flex flex-col flex-shrink-0">
        <div className="p-5 border-b border-primary-foreground/10">
          <span className="font-display text-lg font-bold tracking-tight">
            Incon Admin
          </span>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          <NavLink
            to="/admin/projects"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary-foreground/15 text-primary-foreground"
                  : "text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10"
              }`
            }
          >
            <FolderOpen size={16} />
            Projects
          </NavLink>
          <NavLink
            to="/admin/team"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary-foreground/15 text-primary-foreground"
                  : "text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10"
              }`
            }
          >
            <Users size={16} />
            Team
          </NavLink>
        </nav>

        <div className="p-3 border-t border-primary-foreground/10">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="w-full justify-start gap-2 text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10"
          >
            <LogOut size={16} />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-background overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
