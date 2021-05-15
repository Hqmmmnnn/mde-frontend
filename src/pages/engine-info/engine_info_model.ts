import axios from "axios";
import { createEffect, restore } from "effector";
import { EngineFileName } from "../../api/Files";

type EngineInfoRow = {
  name: string;
  value: number | string | boolean;
};

export type EngineInfoTable = {
  name: string;
  rows: EngineInfoRow[];
};

export const loadEngineFx = createEffect<string, EngineInfoTable[], Error>(async (engineId) => {
  const engineData = await axios.get<EngineInfoTable[]>(`/engines/${engineId}`);
  return engineData.data;
});

const initialState: EngineInfoTable[] = [];

export const $engineInfoTables = restore(loadEngineFx, initialState);

export const loadFileNamesFx = createEffect<string, EngineFileName[], Error>(async (engineId) => {
  const filenames = await axios.get<EngineFileName[]>(`/filenames/${engineId}`);
  return filenames.data;
});

export const $engineFilenames = restore(loadFileNamesFx, []);

export const loadFileFx = createEffect<string, void, Error>(async (filename) => {
  axios.get(`/download/${filename}`, { responseType: "blob" }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
  });
});
