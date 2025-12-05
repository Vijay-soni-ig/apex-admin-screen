import { z } from "zod";

// Auth validation schemas
export const loginSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export const signupSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  fullName: z.string().trim().min(1, { message: "Full name is required" }).max(100, { message: "Name must be less than 100 characters" }),
});

// User form validation
export const userFormSchema = z.object({
  firstName: z.string().trim().min(1, { message: "First name is required" }).max(50, { message: "First name must be less than 50 characters" }),
  lastName: z.string().trim().min(1, { message: "Last name is required" }).max(50, { message: "Last name must be less than 50 characters" }),
  email: z.string().trim().email({ message: "Invalid email address" }).max(255, { message: "Email must be less than 255 characters" }),
  phone: z.string().trim().regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, { message: "Invalid phone number" }).optional().or(z.literal("")),
  role: z.enum(["admin", "moderator", "user"], { message: "Invalid role" }),
  city: z.string().optional(),
  status: z.enum(["active", "inactive", "pending"], { message: "Invalid status" }),
});

// Team settings validation
export const teamSettingsSchema = z.object({
  name: z.string().trim().min(1, { message: "Team name is required" }).max(100, { message: "Team name must be less than 100 characters" }),
  description: z.string().trim().max(500, { message: "Description must be less than 500 characters" }).optional(),
});

// Message validation
export const messageSchema = z.object({
  content: z.string().trim().min(1, { message: "Message cannot be empty" }).max(5000, { message: "Message must be less than 5000 characters" }),
});

// Role form validation
export const roleFormSchema = z.object({
  roleName: z.string().trim().min(1, { message: "Role name is required" }).max(50, { message: "Role name must be less than 50 characters" }),
  description: z.string().trim().max(500, { message: "Description must be less than 500 characters" }).optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type UserFormData = z.infer<typeof userFormSchema>;
export type TeamSettingsFormData = z.infer<typeof teamSettingsSchema>;
export type MessageFormData = z.infer<typeof messageSchema>;
export type RoleFormData = z.infer<typeof roleFormSchema>;
