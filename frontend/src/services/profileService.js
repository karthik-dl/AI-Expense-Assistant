import api from "./api";

export const getProfile = () => {
  return api.get("/profile");
};

export const updateProfile = (data) => {
  return api.put("/profile", data);
};

export const changePassword = (data) => {
  return api.put(
    "/profile/change-password",
    {
      current_password:
        data.currentPassword,
      new_password:
        data.newPassword,
      confirm_password:
        data.confirmPassword,
    }
  );
};

export const deleteAccount = (password) => {
  return api.delete(
    "/profile",
    {
      data: {
        password,
      },
    }
  );
};