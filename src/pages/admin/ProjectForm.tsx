import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getProjectById,
  createProject,
  updateProject,
  fileToBase64,
} from "@/lib/storage";
import { ProjectStatus } from "@/data/projects";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import ImageUpload from "@/components/admin/ImageUpload";
import FeatureListEditor from "@/components/admin/FeatureListEditor";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  category: z.string().min(1, "Category is required"),
  status: z.enum(["past", "current", "future"] as const),
  location: z.string().min(1, "Location is required"),
  description: z.string().min(1, "Description is required"),
  fullDescription: z.string().optional(),
  acres: z.string().min(1, "Acres is required"),
  units: z.string().optional(),
  sqft: z.string().optional(),
  year: z.string().min(1, "Year is required"),
});

type FormValues = z.infer<typeof schema>;

const ProjectForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [image, setImage] = useState("");
  const [siteMap, setSiteMap] = useState("");
  const [gallery, setGallery] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      slug: "",
      category: "",
      status: "future",
      location: "",
      description: "",
      fullDescription: "",
      acres: "",
      units: "",
      sqft: "",
      year: "",
    },
  });

  useEffect(() => {
    if (!id) return;
    const project = getProjectById(id);
    if (!project) {
      toast.error("Project not found");
      navigate("/admin/projects", { replace: true });
      return;
    }
    form.reset({
      title: project.title,
      slug: project.slug,
      category: project.category,
      status: project.status,
      location: project.location,
      description: project.description,
      fullDescription: project.fullDescription || "",
      acres: project.stats.acres,
      units: project.stats.units || "",
      sqft: project.stats.sqft || "",
      year: project.stats.year,
    });
    setImage(project.image || "");
    setSiteMap(project.siteMap || "");
    setGallery(project.gallery || []);
    setFeatures(project.features || []);
  }, [id]);

  // Auto-generate slug from title
  const watchTitle = form.watch("title");
  useEffect(() => {
    if (!isEdit && watchTitle) {
      const slug = watchTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      form.setValue("slug", slug);
    }
  }, [watchTitle, isEdit]);

  const onSubmit = (values: FormValues) => {
    const projectData = {
      slug: values.slug,
      image,
      category: values.category,
      title: values.title,
      description: values.description,
      fullDescription: values.fullDescription || "",
      status: values.status as ProjectStatus,
      location: values.location,
      stats: {
        acres: values.acres,
        units: values.units || undefined,
        sqft: values.sqft || undefined,
        year: values.year,
      },
      features: features.filter(Boolean),
      gallery: gallery.filter(Boolean),
      siteMap: siteMap || undefined,
    };

    if (isEdit) {
      const existing = getProjectById(id!);
      updateProject(id!, { ...projectData, lots: existing?.lots });
      toast.success("Project updated");
    } else {
      createProject(projectData);
      toast.success("Project created");
    }
    navigate("/admin/projects");
  };

  const handleGalleryAdd = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newImages: string[] = [];
    for (const file of Array.from(files)) {
      if (file.type.startsWith("image/")) {
        newImages.push(await fileToBase64(file));
      }
    }
    setGallery((prev) => [...prev, ...newImages]);
    e.target.value = "";
  };

  const removeGalleryImage = (index: number) => {
    setGallery((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 lg:p-8 max-w-3xl">
      {/* Header */}
      <button
        onClick={() => navigate("/admin/projects")}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
      >
        <ArrowLeft size={14} />
        Back to Projects
      </button>
      <h1 className="font-display text-2xl font-bold tracking-tight mb-6">
        {isEdit ? "Edit Project" : "New Project"}
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Info */}
          <section className="space-y-4">
            <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Basic Info
            </h2>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Residential">Residential</SelectItem>
                        <SelectItem value="Commercial">Commercial</SelectItem>
                        <SelectItem value="Mixed-Use">Mixed-Use</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="current">Current</SelectItem>
                        <SelectItem value="past">Completed</SelectItem>
                        <SelectItem value="future">Upcoming</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </section>

          <Separator />

          {/* Content */}
          <section className="space-y-4">
            <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Content
            </h2>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={3} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fullDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={5} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>

          <Separator />

          {/* Stats */}
          <section className="space-y-4">
            <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Stats
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <FormField
                control={form.control}
                name="acres"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Acres</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="units"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Units</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sqft"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sq Ft</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </section>

          <Separator />

          {/* Features */}
          <section className="space-y-4">
            <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Features
            </h2>
            <FeatureListEditor value={features} onChange={setFeatures} />
          </section>

          <Separator />

          {/* Images */}
          <section className="space-y-4">
            <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Images
            </h2>

            <div>
              <label className="text-sm font-medium mb-2 block">Hero Image</label>
              <ImageUpload value={image} onChange={setImage} label="Hero image" />
            </div>

            {/* Gallery */}
            <div>
              <label className="text-sm font-medium mb-2 block">Gallery</label>
              <div className="grid grid-cols-4 gap-2 mb-2">
                {gallery.map((img, i) => (
                  <div key={i} className="relative group">
                    <img
                      src={img}
                      alt={`Gallery ${i + 1}`}
                      className="w-full h-24 object-cover border border-border"
                    />
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(i)}
                      className="absolute top-1 right-1 bg-destructive text-destructive-foreground w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
              <label className="inline-flex items-center gap-2 text-xs text-muted-foreground border border-dashed border-border px-3 py-2 cursor-pointer hover:border-muted-foreground/50 transition-colors">
                + Add images
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleGalleryAdd}
                />
              </label>
            </div>

            {/* Site Map — only for current projects */}
            {form.watch("status") === "current" && (
              <div>
                <label className="text-sm font-medium mb-2 block">Site Map</label>
                <ImageUpload
                  value={siteMap}
                  onChange={setSiteMap}
                  label="Site map image"
                />
              </div>
            )}
          </section>

          <Separator />

          <div className="flex gap-3">
            <Button type="submit">
              {isEdit ? "Save Changes" : "Create Project"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin/projects")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProjectForm;
