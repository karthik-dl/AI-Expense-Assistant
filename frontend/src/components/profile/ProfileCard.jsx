import { Mail, Phone, MapPin, Calendar } from "lucide-react";
import Card from "../ui/Card";

function ProfileCard({ profile }) {
  const {
    name = "User",
    email = "Not Available",
    phone = "Not Available",
    location = "Not Specified",
    bio = "No bio available.",
    avatar = "",
    joinedAt,
  } = profile;

  const memberSince = joinedAt
    ? new Date(joinedAt).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
      })
    : "N/A";

  return (
    <Card>
      <div className="flex flex-col items-center text-center">
        <img
          src={
            avatar ||
            "https://ui-avatars.com/api/?name=" +
              encodeURIComponent(name) +
              "&background=2563EB&color=fff&size=200"
          }
          alt={name}
          className="h-32 w-32 rounded-full border-4 border-blue-500 object-cover shadow-lg"
        />

        <h2 className="mt-4 text-2xl font-bold text-slate-800">
          {name}
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          {bio}
        </p>
      </div>

      <div className="mt-8 space-y-4">
        <div className="flex items-center gap-3">
          <Mail
            size={18}
            className="text-blue-600"
          />
          <span className="text-slate-700">
            {email}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Phone
            size={18}
            className="text-blue-600"
          />
          <span className="text-slate-700">
            {phone}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <MapPin
            size={18}
            className="text-blue-600"
          />
          <span className="text-slate-700">
            {location}
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