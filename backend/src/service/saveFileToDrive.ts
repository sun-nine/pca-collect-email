export const saveFileToDrive = (file: any, name: any, folder: any) => {
  folder.createFile(file).setName(name + ".png");
};
