
// TODO : revisar esto es de offering cuando se carga archivos, usar code json as code

export interface FilesProps {
  path: string;
  preview: string;
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}