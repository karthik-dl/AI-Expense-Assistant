import { Mail, Calendar } from "lucide-react";
import Card from "../ui/Card";

function ProfileCard({ profile }) {
  const name = profile?.name || "User";
  const email = profile?.email || "Not Available";
  const createdAt = profile?.created_at;

  const memberSince = createdAt
    ? new Date(createdAt).toLocaleDateString(
        "en-IN",
        {
          year: "numeric",
          month: "long",
        }
      )
    : "N/A";

  const avatarUrl =
    "https://ui-avatars.com/api/?name=" +
    encodeURIComponent(name) +
    "&background=2563EB&color=fff&size=200";

  return (
    <Card>
      <div className="flex flex-col items-center text-center">
        <img
          src={avatarUrl}
          alt={name}
          className="h-32 w-32 rounded-full border-4 border-blue-500 object-cover shadow-lg"
        />

        <h2 className="mt-4 text-2xl font-bold text-slate-800">
          {name}
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Personal Finance Account
        </p>
      </div>

      <div className="mt-8 space-y-4">
        <div className="flex items-center gap-3">
          <Mail
            size={18}
            className="text-blue-600"
          />

          <span className="break-all text-slate-700">
            {email}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Calendar
            size={18}
            className="text-blue-600"
          />

          <span className="text-slate-700">
            Member Since {memberSince}
          </span>
        </div>
      </div>
    </Card>
  );
}

export default ProfileCard;