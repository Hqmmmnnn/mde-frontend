import { createEffect, restore } from "effector";
import { EngineInfoTable, enginesApi } from "../../api/engines";
import { EngineFileName, filesApi } from "../../api/files";

export const loadEngineFx = createEffect<string, EngineInfoTable[], Error>(enginesApi.fetchEngine);

const initialState: EngineInfoTable[] = [];

export const $engineInfoTables = restore(loadEngineFx, initialState);

export const loadFileNamesFx = createEffect<string, EngineFileName[], Error>(
  filesApi.fetchFilesNames
);

export const $engineFilenames = restore(loadFileNamesFx, []);

export const downloadFileFx = createEffect<string, void, Error>(filesApi.downLoadFile);
