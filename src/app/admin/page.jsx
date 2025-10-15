import { auth, signOut } from "@/auth";
import clientPromise from "@/lib/mongodb";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await auth();
  if (!session?.user) redirect("/");
  if (session.user.role !== "admin") redirect("/");

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const users = await db
    .collection("users")
    .find({}, { projection: { name: 1, email: 1, role: 1, lastLogin: 1, image: 1 } })
    .sort({ lastLogin: -1 })
    .toArray();

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button className="rounded-md bg-white/10 px-4 py-2 text-sm hover:bg-white/20">
              Sign out
            </button>
          </form>
        </div>

        <p className="text-sm text-white/60 mb-4">
          Signed in as <span className="font-medium">{session.user.email}</span> · Role: {session.user.role}
        </p>

        <div className="overflow-x-auto rounded-lg border border-white/10">
          <table className="min-w-full divide-y divide-white/10">
            <thead className="bg-white/5">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Role</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Last Login</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {users.map((u) => (
                <tr key={u._id} className="hover:bg-white/5">
                  <td className="px-4 py-3 whitespace-nowrap">{u.name || "—"}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{u.email}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-300">
                      {u.role || "user"}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-white/70">
                    {u.lastLogin ? new Date(u.lastLogin).toLocaleString() : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

