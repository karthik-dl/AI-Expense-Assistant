import { useCallback, useEffect, useState } from "react";

import Loader from "../../components/ui/Loader";
import PageHeader from "../../components/ui/PageHeader";

import ProfileCard from "../../components/profile/ProfileCard";
import ProfileForm from "../../components/profile/ProfileForm";
import AccountStats from "../../components/profile/AccountStats";
import AvatarUpload from "../../components/profile/AvatarUpload";
import ChangePasswordModal from "../../components/profile/ChangePasswordModal";
import DeleteAccountModal from "../../components/profile/DeleteAccountModal";

import { getProfile } from "../../services/profileService";

function Profile() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({});
  const [error, setError] = useState("");

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const loadProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await getProfile();

      setProfile(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load profile.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="My Profile"
        subtitle="Manage your personal information and account settings."
      />

      <div className="grid gap-6 xl:grid-cols-3">
        {/* Left Column */}
        <div className="space-y-6">
          <ProfileCard profile={profile} />

          <AvatarUpload
            profile={profile}
            onSuccess={loadProfile}
          />

          <AccountStats profile={profile} />
        </div>

        {/* Right Column */}
        <div className="space-y-6 xl:col-span-2">
          <ProfileForm
            profile={profile}
            onSuccess={loadProfile}
          />

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() =>
                setShowPasswordModal(true)
              }
              className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
            >
              Change Password
            </button>

            <button
              onClick={() =>
                setShowDeleteModal(true)
              }
              className="rounded-xl bg-red-600 px-5 py-3 font-medium text-white transition hover:bg-red-700"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>

      <ChangePasswordModal
        open={showPasswordModal}
        onClose={() =>
          setShowPasswordModal(false)
        }
      />

      <DeleteAccountModal
        open={showDeleteModal}
        onClose={() =>
          setShowDeleteModal(false)
        }
      />
    </div>
  );
}

export default Profile;