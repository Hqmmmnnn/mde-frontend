import axios from "axios";

const getImage = async (engineId: string) => {
  const blob = await axios.get<Blob>(`/api/images/${engineId}`, { responseType: "blob" });
  return blob.data;
};

const getImageForUpdate = async (engineId: string) => {
  const blob = await axios.get<Blob>(`/api/images/update/${engineId}`, { responseType: "blob" });
  return blob.data;
};

export type SaveEngineImageData = {
  engineId: string;
  image: File;
};

export type SaveImageRequest = {
  data: SaveEngineImageData;
  token: string | null;
};

const saveImage = async ({ data, token }: SaveImageRequest) => {
  const formData = new FormData();
  formData.append("image", data.image);
  axios.post(`/api/images/${data.engineId}`, formData, { headers: { Authorization: token } });
};

export type DeleteImageRequest = {
  engineId: string;
  token: string | null;
};

const deleteImage = async ({ engineId, token }: DeleteImageRequest) => {
  await axios.delete(`/api/images/${engineId}`, {
    headers: { Authorization: token },
  });
};

export const imagesApi = {
  getImage,
  getImageForUpdate,
  saveImage,
  deleteImage,
};
