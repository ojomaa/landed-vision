import { Project, ProjectStatus, projects as seedProjects } from "@/data/projects";
import { Lot, LotStatus } from "@/data/lots";

const STORAGE_KEY = "incon_projects";
const TEAM_KEY = "incon_team";
const AUTH_KEY = "incon_auth";
const ADMIN_PASSWORD = "incon2024";

// ── Team types ────────────────────────────────────────

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
}

// ── Auth ──────────────────────────────────────────────

export function authenticate(password: string): boolean {
  if (password === ADMIN_PASSWORD) {
    localStorage.setItem(AUTH_KEY, "true");
    return true;
  }
  return false;
}

export function isAuthenticated(): boolean {
  return localStorage.getItem(AUTH_KEY) === "true";
}

export function logout(): void {
  localStorage.removeItem(AUTH_KEY);
}

// ── Projects CRUD ─────────────────────────────────────

export function getProjects(): Project[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Project[];
  } catch {
    return [];
  }
}

export function saveProjects(projects: Project[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function getProjectById(id: string): Project | undefined {
  return getProjects().find((p) => p.id === id);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}

export function getProjectsByStatus(status: ProjectStatus): Project[] {
  return getProjects().filter((p) => p.status === status);
}

export function createProject(project: Omit<Project, "id">): Project {
  const projects = getProjects();
  const id = Date.now().toString();
  const newProject: Project = { ...project, id };
  projects.push(newProject);
  saveProjects(projects);
  return newProject;
}

export function updateProject(id: string, data: Partial<Project>): Project | undefined {
  const projects = getProjects();
  const index = projects.findIndex((p) => p.id === id);
  if (index === -1) return undefined;
  projects[index] = { ...projects[index], ...data };
  saveProjects(projects);
  return projects[index];
}

export function deleteProject(id: string): boolean {
  const projects = getProjects();
  const filtered = projects.filter((p) => p.id !== id);
  if (filtered.length === projects.length) return false;
  saveProjects(filtered);
  return true;
}

// ── Lots CRUD (scoped to project) ─────────────────────

export function addLot(projectId: string, lot: Omit<Lot, "id">): Lot | undefined {
  const projects = getProjects();
  const project = projects.find((p) => p.id === projectId);
  if (!project) return undefined;
  const newLot: Lot = { ...lot, id: `lot-${Date.now()}` };
  if (!project.lots) project.lots = [];
  project.lots.push(newLot);
  saveProjects(projects);
  return newLot;
}

export function updateLot(projectId: string, lotId: string, data: Partial<Lot>): Lot | undefined {
  const projects = getProjects();
  const project = projects.find((p) => p.id === projectId);
  if (!project?.lots) return undefined;
  const lotIndex = project.lots.findIndex((l) => l.id === lotId);
  if (lotIndex === -1) return undefined;
  project.lots[lotIndex] = { ...project.lots[lotIndex], ...data };
  saveProjects(projects);
  return project.lots[lotIndex];
}

export function deleteLot(projectId: string, lotId: string): boolean {
  const projects = getProjects();
  const project = projects.find((p) => p.id === projectId);
  if (!project?.lots) return false;
  const before = project.lots.length;
  project.lots = project.lots.filter((l) => l.id !== lotId);
  if (project.lots.length === before) return false;
  saveProjects(projects);
  return true;
}

// ── Image helpers ─────────────────────────────────────

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Compress if image > 500KB
      if (file.size > 500 * 1024 && file.type.startsWith("image/")) {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const maxDim = 1600;
          let { width, height } = img;
          if (width > maxDim || height > maxDim) {
            const ratio = Math.min(maxDim / width, maxDim / height);
            width = Math.round(width * ratio);
            height = Math.round(height * ratio);
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", 0.8));
        };
        img.onerror = reject;
        img.src = result;
      } else {
        resolve(result);
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ── Team CRUD ─────────────────────────────────────────

const defaultTeam: TeamMember[] = [
  {
    id: "1",
    name: "James Mitchell",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&crop=face",
  },
  {
    id: "2",
    name: "Sarah Chen",
    role: "Chief Development Officer",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=800&fit=crop&crop=face",
  },
  {
    id: "3",
    name: "Marcus Rodriguez",
    role: "VP of Operations",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=800&fit=crop&crop=face",
  },
  {
    id: "4",
    name: "Emily Thompson",
    role: "Director of Sustainability",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=800&fit=crop&crop=face",
  },
];

export function getTeam(): TeamMember[] {
  const raw = localStorage.getItem(TEAM_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as TeamMember[];
  } catch {
    return [];
  }
}

export function saveTeam(team: TeamMember[]): void {
  localStorage.setItem(TEAM_KEY, JSON.stringify(team));
}

export function createTeamMember(member: Omit<TeamMember, "id">): TeamMember {
  const team = getTeam();
  const newMember: TeamMember = { ...member, id: Date.now().toString() };
  team.push(newMember);
  saveTeam(team);
  return newMember;
}

export function updateTeamMember(id: string, data: Partial<TeamMember>): TeamMember | undefined {
  const team = getTeam();
  const index = team.findIndex((m) => m.id === id);
  if (index === -1) return undefined;
  team[index] = { ...team[index], ...data };
  saveTeam(team);
  return team[index];
}

export function deleteTeamMember(id: string): boolean {
  const team = getTeam();
  const filtered = team.filter((m) => m.id !== id);
  if (filtered.length === team.length) return false;
  saveTeam(filtered);
  return true;
}

// ── Seed ──────────────────────────────────────────────

export function seedIfEmpty(): void {
  if (!localStorage.getItem(STORAGE_KEY)) {
    saveProjects(seedProjects);
  }
  if (!localStorage.getItem(TEAM_KEY)) {
    saveTeam(defaultTeam);
  }
}
