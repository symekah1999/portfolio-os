"use client";
import AboutApp from "@/apps/AboutApp";
import FolderApp from "@/apps/FolderApp";
import ProjectApp from "@/apps/ProjectApp";
import TerminalApp from "@/apps/TerminalApp";
import ContactApp from "@/apps/ContactApp";
import SettingsApp from "@/apps/SettingsApp";

export default function AppRouter({ id }: { id: string }) {
  if (id === "about") return <AboutApp />;
  if (id === "terminal") return <TerminalApp />;
  if (id === "contact") return <ContactApp />;
  if (id === "settings") return <SettingsApp />;
  if (id === "folder:products") return <FolderApp category="products" />;
  if (id === "folder:datascience") return <FolderApp category="datascience" />;
  if (id.startsWith("project:")) return <ProjectApp id={id.slice(8)} />;
  return null;
}
