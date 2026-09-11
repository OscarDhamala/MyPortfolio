import { ComponentType } from "react";
import {
  SiDocker,
  SiMongodb,
  SiMysql,
  SiN8N,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiPython,
  SiReact,
  SiSupabase,
  SiTensorflow,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { BarChart3, Brain, Braces } from "lucide-react";

export interface TechIconDef {
  icon: ComponentType<{ size?: number | string; color?: string; className?: string }>;
  color: string;
}

export const TECH_ICON_MAP: Record<string, TechIconDef> = {
  React: { icon: SiReact, color: "#61DAFB" },
  "Next.js": { icon: SiNextdotjs, color: "#FFFFFF" },
  Supabase: { icon: SiSupabase, color: "#3ECF8E" },
  PHP: { icon: SiPhp, color: "#8892BF" },
  "Node.js": { icon: SiNodedotjs, color: "#5FA04E" },
  Python: { icon: SiPython, color: "#3776AB" },
  Docker: { icon: SiDocker, color: "#2496ED" },
  n8n: { icon: SiN8N, color: "#EA4B71" },
  MongoDB: { icon: SiMongodb, color: "#47A248" },
  SQL: { icon: SiMysql, color: "#4479A1" },
  PostgreSQL: { icon: SiPostgresql, color: "#336791" },
  AWS: { icon: FaAws, color: "#FF9900" },
  PowerBI: { icon: BarChart3, color: "#F2C811" },
  TensorFlow: { icon: SiTensorflow, color: "#FF6F00" },
  "AI Agents": { icon: Brain, color: "#A78BFA" },
  "REST API": { icon: Braces, color: "#38BDF8" },
};
