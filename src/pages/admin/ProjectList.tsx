import { useState } from "react";
import { Link } from "react-router-dom";
import { getProjects, deleteProject } from "@/lib/storage";
import { Project, ProjectStatus } from "@/data/projects";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2, Map } from "lucide-react";
import { toast } from "sonner";

const statusLabel: Record<ProjectStatus, string> = {
  current: "Current",
  past: "Completed",
  future: "Upcoming",
};

const statusVariant: Record<ProjectStatus, "default" | "secondary" | "outline"> = {
  current: "default",
  past: "secondary",
  future: "outline",
};

type FilterTab = "all" | ProjectStatus;

const tabs: { id: FilterTab; label: string }[] = [
  { id: "all", label: "All" },
  { id: "current", label: "Current" },
  { id: "past", label: "Completed" },
  { id: "future", label: "Upcoming" },
];

const ProjectList = () => {
  const [filter, setFilter] = useState<FilterTab>("all");
  const [projects, setProjects] = useState<Project[]>(getProjects);

  const filtered =
    filter === "all" ? projects : projects.filter((p) => p.status === filter);

  const handleDelete = (id: string, title: string) => {
    deleteProject(id);
    setProjects(getProjects());
    toast.success(`"${title}" deleted`);
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold tracking-tight">
          Projects
        </h1>
        <Button asChild size="sm" className="gap-1">
          <Link to="/admin/projects/new">
            <Plus size={16} />
            Add Project
          </Link>
        </Button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-4 mb-6 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`pb-2 text-xs tracking-[0.1em] uppercase font-medium transition-colors border-b-2 -mb-px ${
              filter === tab.id
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Project</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Acres</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((project) => (
            <TableRow key={project.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-10 h-10 object-cover flex-shrink-0"
                    />
                  )}
                  <span className="font-medium text-sm">{project.title}</span>
                </div>
              </TableCell>
              <TableCell className="text-sm">{project.category}</TableCell>
              <TableCell>
                <Badge variant={statusVariant[project.status]}>
                  {statusLabel[project.status]}
                </Badge>
              </TableCell>
              <TableCell className="text-sm">{project.location}</TableCell>
              <TableCell className="text-sm">{project.stats.acres}</TableCell>
              <TableCell>
                <div className="flex justify-end gap-1">
                  <Button asChild variant="ghost" size="icon" className="h-8 w-8">
                    <Link to={`/admin/projects/${project.id}`}>
                      <Pencil size={14} />
                    </Link>
                  </Button>

                  {project.status === "current" && project.siteMap && (
                    <Button asChild variant="ghost" size="icon" className="h-8 w-8">
                      <Link to={`/admin/projects/${project.id}/lots`}>
                        <Map size={14} />
                      </Link>
                    </Button>
                  )}

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                        <Trash2 size={14} />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete "{project.title}"?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. The project and all its lots will be permanently removed.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(project.id, project.title)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}

          {filtered.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-muted-foreground py-12">
                No projects found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProjectList;
