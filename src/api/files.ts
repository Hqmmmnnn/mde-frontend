import axios from "axios";

export type EngineFileName = {
  id: string;
  name: string;
};

const fetchFiles = async (engineId: string) => {
  const filenames = await axios.get<EngineFileName[]>(`/api/filenames/${engineId}`);
  return filenames.data;
};

const fetchFilesNames = async (engineId: string) => {
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

const downLoadFile = async (filename: string) => {
  axios.get(`/api/download/${filename}`, { responseType: "blob" }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
  });
};

export const filesApi = {
  fetchFiles,
  fetchFilesNames,
  saveFiles,
  deleteFile,
  downLoadFile,
};
