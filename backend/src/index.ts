import { csvFileChanges } from "./trigger/time-driven/csvFileChanges";
import { doPost } from "./trigger/doPost/doPost";

declare const global: {
  [x: string]: unknown;
};

global.csvFileChanges = csvFileChanges;
global.doPost = doPost;
