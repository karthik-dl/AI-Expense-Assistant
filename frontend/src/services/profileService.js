import api from "./api";

export const getProfile = () => {
  return api.get("/profile");
};

export const updateProfile = (data) => {
  return api.put("/profile", data);
};

export const changePassword = (data) => {
  return api.put("/profile/password", data);
};

export const uploadAvatar = (file) => {
  const formData = new FormData();

  formData.append("avatar", file);

  return api.post("/profile/avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteAvatar = () => {
  return api.delete("/profile/avatar");
};

export const deleteAccount = (password) => {
  return api.delete("/profile", {
    data: {
      password,
    },
  });
};