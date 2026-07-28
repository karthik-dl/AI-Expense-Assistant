import { useEffect, useState } from "react";
import { User, Mail, Calendar, Edit, Lock } from "lucide-react";
import toast from "react-hot-toast";

import { getProfile } from "../../services/profileService";
import EditProfileModal from "../../components/profile/EditProfileModal";
import ChangePasswordModal from "../../components/profile/ChangePasswordModal";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const [openEditModal, setOpenEditModal] = useState(false);
  const [openPasswordModal, setOpenPasswordModal] = useState(false);

  const loadProfile = async () => {
    try {
      setLoading(true);

      const response = await getProfile();

      setProfile(response.user);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
        "Failed to load profile"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-72">
        <p className="text-gray-500 text-lg">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-4xl mx-auto px-6 py-8">

        <div className="bg-white rounded-2xl shadow-lg border overflow-hidden">

          <div className="h-36 bg-linear-to-r from-blue-600 to-indigo-600" />

          <div className="px-8 pb-8">

            <div className="-mt-14 flex flex-col md:flex-row md:justify-between md:items-end gap-4">

              <div className="flex items-center gap-5">

                <div className="w-28 h-28 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center">
                  <User size={48} className="text-blue-600" />
                </div>

                <div className="mt-8">
                  <h2 className="text-2xl font-bold">
                    {profile?.name}
                  </h2>

                  <p className="text-gray-500">
                    {profile?.email}
                  </p>
                </div>

              </div>

              <div className="flex gap-3">

                <button
                  onClick={() => setOpenEditModal(true)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
                >
                  <Edit size={18} />
                  Edit Profile
                </button>

                <button
                  onClick={() => setOpenPasswordModal(true)}
                  className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-5 py-2 rounded-lg transition"
                >
                  <Lock size={18} />
                  Change Password
                </button>

              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-10">

              <div className="border rounded-xl p-5">

                <div className="flex items-center gap-3 mb-3">
                  <User className="text-blue-600" />
                  <span className="font-semibold">
                    Full Name
                  </span>
                </div>

                <p className="text-gray-700">
                  {profile?.name}
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <div className="flex items-center gap-3 mb-3">
                  <Mail className="text-green-600" />
                  <span className="font-semibold">
                    Email Address
                  </span>
                </div>

                <p className="text-gray-700">
                  {profile?.email}
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <div className="flex items-center gap-3 mb-3">
                  <Calendar className="text-purple-600" />
                  <span className="font-semibold">
                    Member Since
                  </span>
                </div>

                <p className="text-gray-700">
                  {profile?.created_at
                    ? new Date(
                        profile.created_at
                      ).toLocaleDateString()
                    : "-"}
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <div className="flex items-center gap-3 mb-3">
                  <Lock className="text-red-600" />
                  <span className="font-semibold">
                    Password
                  </span>
                </div>

                <p className="text-gray-700">
                  ••••••••••••
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      <EditProfileModal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        profile={profile}
        onSuccess={loadProfile}
      />

      <ChangePasswordModal
        open={openPasswordModal}
        onClose={() => setOpenPasswordModal(false)}
      />
    </>
  );
};

export default Profile;