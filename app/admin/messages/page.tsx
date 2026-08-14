import type { Metadata } from "next";
import { redirect } from "next/navigation";
import {
  markMessageReadAction,
  deleteMessageAction,
} from "@/app/admin/actions";
import { requireAdmin } from "@/lib/auth";
import { formatDate } from "@/lib/utils";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Messages — Admin",
};

export default async function AdminMessagesPage() {
  const user = await requireAdmin();
  if (!user) redirect("/admin/login");

  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <p className="section-label mb-3">Inbox</p>
      <h1 className="heading mb-8">Contact messages</h1>

      <div className="space-y-4">
        {messages.map((message) => (
          <article key={message.id} className="card-surface p-5 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm text-ink-muted">
                  {formatDate(message.createdAt)}
                  {message.read ? "" : " · New"}
                </p>
                <h2 className="mt-1 text-xl font-bold">
                  {message.subject || "No subject"}
                </h2>
                <p className="mt-1 text-sm font-semibold text-ink">
                  {message.name}
                </p>
                <p className="mt-1 text-sm text-ink-muted">
                  <a
                    href={`mailto:${message.email}`}
                    className="font-medium text-ink underline-offset-4 hover:underline"
                  >
                    {message.email}
                  </a>
                  {message.phone ? (
                    <>
                      {" · "}
                      <a
                        href={`tel:${message.phone.replace(/\s+/g, "")}`}
                        className="font-medium text-ink underline-offset-4 hover:underline"
                      >
                        {message.phone}
                      </a>
                    </>
                  ) : null}
                </p>
              </div>
              <div className="flex gap-2">
                {!message.read ? (
                  <form action={markMessageReadAction}>
                    <input type="hidden" name="id" value={message.id} />
                    <button type="submit" className="btn btn-ghost py-2 text-sm">
                      Mark read
                    </button>
                  </form>
                ) : null}
                <form action={deleteMessageAction}>
                  <input type="hidden" name="id" value={message.id} />
                  <button type="submit" className="btn btn-ghost py-2 text-sm">
                    Delete
                  </button>
                </form>
              </div>
            </div>
            <p className="mt-4 whitespace-pre-wrap body-text text-ink">
              {message.message}
            </p>
          </article>
        ))}
        {messages.length === 0 ? (
          <p className="body-text">No messages yet.</p>
        ) : null}
      </div>
    </div>
  );
}
