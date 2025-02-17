interface Options {
  code: string;
  name: string;
  preacher: string;
}

export const getCodeAndNameFamilyGroup = ({ code, name, preacher }: Options): string => {
  return `${name} ${code} ${preacher}`;
};
