import RNFS from "react-native-fs";

export async function folderExists(folder) {
  const folderExists = await RNFS.exists(
    RNFS.DocumentDirectoryPath + `/${folder}`
  );

  return folderExists;
}

export async function createFolderAndWriteFile(folder, data) {
  try {
    // Create a new folder
    await RNFS.mkdir(RNFS.DocumentDirectoryPath + `/${folder}`);

    await RNFS.writeFile(
      RNFS.DocumentDirectoryPath + `/${folder}/data.txt`,
      JSON.stringify(data)
    );
  } catch (error) {
    console.error(error);
  }
}

export async function updatedFolder(folder, data) {
  try {
    await RNFS.writeFile(
      RNFS.DocumentDirectoryPath + `/${folder}/data.txt`,
      JSON.stringify(data)
    );
  } catch (error) {
    console.error(error);
  }
}

export async function readStorageFile(path) {
  try {
    const contents = await RNFS.readFile(
      RNFS.DocumentDirectoryPath + `/${path}/data.txt`
    );

    const data = await JSON.parse(contents);

    return data;
  } catch (error) {
    console.error(error);
  }
}
