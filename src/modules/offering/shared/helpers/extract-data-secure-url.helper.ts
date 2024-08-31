export const extractPublicId = (secureUrl: string): string =>  {
  const urlParts = secureUrl.split('/');
  const fileNameWithExtension = urlParts[urlParts.length - 1];
  const fileName = fileNameWithExtension.split('.')[0];
  return fileName;
}

export const extractPath = (secureUrl: string): string => {
  const urlParts = secureUrl.split('/');
  const uploadIndex = urlParts.indexOf('upload') + 1;
  const pathParts = urlParts.slice(uploadIndex + 1, -1); 
  return `${pathParts.join('/')}/`;
};


