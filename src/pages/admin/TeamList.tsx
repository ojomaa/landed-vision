import { useState } from "react";
import {
  getTeam,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  fileToBase64,
  TeamMember,
} from "@/lib/storage";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import ImageUpload from "@/components/admin/ImageUpload";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

const TeamList = () => {
  const [team, setTeam] = useState<TeamMember[]>(getTeam);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [form, setForm] = useState({ name: "", role: "", image: "" });

  const refresh = () => setTeam(getTeam());

  const openNew = () => {
    setEditing(null);
    setForm({ name: "", role: "", image: "" });
    setDialogOpen(true);
  };

  const openEdit = (member: TeamMember) => {
    setEditing(member);
    setForm({ name: member.name, role: member.role, image: member.image });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.name || !form.role) {
      toast.error("Name and role are required");
      return;
    }
    if (editing) {
      updateTeamMember(editing.id, form);
      toast.success(`${form.name} updated`);
    } else {
      createTeamMember(form);
      toast.success(`${form.name} added`);
    }
    setDialogOpen(false);
    refresh();
  };

  const handleDelete = (member: TeamMember) => {
    deleteTeamMember(member.id);
    toast.success(`${member.name} removed`);
    refresh();
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold tracking-tight">
          Team
        </h1>
        <Button size="sm" className="gap-1" onClick={openNew}>
          <Plus size={16} />
          Add Member
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {team.map((member) => (
            <TableRow key={member.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  {member.image && (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-10 h-10 object-cover flex-shrink-0"
                    />
                  )}
                  <span className="font-medium text-sm">{member.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-sm">{member.role}</TableCell>
              <TableCell>
                <div className="flex justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => openEdit(member)}
                  >
                    <Pencil size={14} />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Remove {member.name}?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This will remove them from the team page.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(member)}
                        >
                          Remove
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {team.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={3}
                className="text-center text-muted-foreground py-12"
              >
                No team members yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Add / Edit dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Member" : "Add Member"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div>
              <Label>Name</Label>
              <Input
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
              />
            </div>
            <div>
              <Label>Role</Label>
              <Input
                value={form.role}
                onChange={(e) =>
                  setForm((f) => ({ ...f, role: e.target.value }))
                }
              />
            </div>
            <div>
              <Label className="mb-2 block">Photo</Label>
              <ImageUpload
                value={form.image}
                onChange={(image) => setForm((f) => ({ ...f, image }))}
                label="Member photo"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button onClick={handleSave}>
                {editing ? "Save" : "Add"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeamList;
