import axios from "axios";

export type EngineFileName = {
  id: string;
  name: string;
};

const getFiles = async (engineId: string) => {
  const filenames = await axios.get<EngineFileName[]>(`/api/filenames/${engineId}`);
  return filenames.data;
};

export type DeleteFileRequest = {
  fileId: string;
  token: string | null;
};

const deleteFile = async ({ fileId, token }: DeleteFileRequest) => {
  await axios.delete(`/api/files/${fileId}`, { headers: { Authorization: token } });
  return fileId;
};

export type SaveEngineFilesData = {
  engineId: string;
  files: File[];
};

export type SaveEngineFilesRequest = {
  data: SaveEngineFilesData;
  token: string | null;
};

const saveFiles = async ({ data, token }: SaveEngineFilesRequest) => {
  const formData = new FormData();
  data.files.forEach((file) => formData.append("files", file));
  const files = await axios.post<EngineFileName[]>(`/api/files/${data.engineId}`, formData, {
    headers: { Authorization: token },
  });
  return files.data;
};

export const filesApi = {
  getFiles,
  saveFiles,
  deleteFile,
};
