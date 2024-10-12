/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { useCallback, useEffect } from 'react';

import { type UseFormReturn } from 'react-hook-form';

import { type OfferingIncomeFormData } from '@/modules/offering/income/interfaces';
import { type RejectionProps, type FilesProps } from '@/modules/offering/shared/interfaces';

interface Options {
  files: FilesProps[];
  setFiles: React.Dispatch<React.SetStateAction<FilesProps[]>>;
  setRejected: React.Dispatch<React.SetStateAction<RejectionProps[]>>;
  offeringIncomeForm: UseFormReturn<OfferingIncomeFormData, any, OfferingIncomeFormData>;
}

export const useOfferingIncomeFileDropZone = ({
  offeringIncomeForm,
  files,
  setRejected,
  setFiles,
}: Options) => {
  //* DropZone functions
  console.log(files);
  const onDrop = useCallback(
    (acceptedFiles: any[], rejectedFiles: any[]) => {
      if (acceptedFiles?.length) {
        const mappedFiles = acceptedFiles?.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        );

        // Verifica si ya existe un archivo con el mismo nombre
        mappedFiles?.forEach((newFile) => {
          const existingFileIndex = files.findIndex(
            (existingFile) => existingFile.name === newFile.name
          );

          if (existingFileIndex !== -1) {
            setFiles((previousFiles) => [...previousFiles]);
          } else {
            setFiles((previousFiles) => [...previousFiles, newFile]);
          }
        });

        const allFileNames = [
          ...files.filter((item) => item instanceof File).map((file) => file?.name),
          ...mappedFiles.map((file) => file?.name),
        ];

        offeringIncomeForm.setValue('fileNames', allFileNames); // Actualiza el campo de formulario con las URLs de los archivos
      }

      if (rejectedFiles?.length) {
        setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
      }
    },
    [offeringIncomeForm, files, setFiles]
  );

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => {
      files?.forEach((file) => {
        URL.revokeObjectURL(file?.preview);
      });
    };
  }, [files]);

  useEffect(() => {
    const filesFiltered = (files ?? [])
      .filter((item) => item instanceof File)
      .map((file) => file?.name);

    const allFileNames = [...filesFiltered];

    offeringIncomeForm.setValue('fileNames', allFileNames as any);
  }, [files]);

  const removeFile = (name: any): void => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };

  const removeCloudFile = (name: any): void => {
    setFiles((files) => files.filter((file) => file !== name));
  };

  const removeAll = (): void => {
    setFiles([]);
    setRejected([]);
  };

  const removeRejected = (name: any): void => {
    setRejected((files) => files.filter(({ file }) => file.name !== name));
  };

  return { onDrop, removeAll, removeFile, removeCloudFile, removeRejected };
};
