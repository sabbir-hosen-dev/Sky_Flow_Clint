const useFileNameRename = (fileName) => {
  if (!fileName) return ''; // Handle case when fileName is null or undefined
  const fileExtension = fileName.substring(fileName.lastIndexOf('.'));
  const baseName = fileName.substring(0, fileName.lastIndexOf('.'));
  return baseName.length > 20
    ? `${baseName.substring(0, 17)}...${fileExtension}`
    : fileName;
};

export default useFileNameRename;
