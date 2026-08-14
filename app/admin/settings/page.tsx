import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SettingsForm } from "@/components/admin/settings-form";
import { requireAdmin } from "@/lib/auth";
import { getSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Settings — Admin",
};

export default async function AdminSettingsPage() {
  const user = await requireAdmin();
  if (!user) redirect("/admin/login");

  const settings = await getSettings();

  return (
    <div>
      <p className="section-label mb-3">Site</p>
      <h1 className="heading mb-3">Settings</h1>
      <p className="lede mb-10">
        Edit hero copy, about photo and story, disciplines, career timeline,
        FAQ, how you work, contact details, and socials without touching code.
      </p>
      <SettingsForm settings={settings} />
    </div>
  );
}
