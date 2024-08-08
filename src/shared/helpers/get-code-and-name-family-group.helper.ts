interface Options {
  code: string;
  name: string;
}

export const getCodeAndNameFamilyGroup = ( {code, name}: Options): string => {

  return `${name } ${code}` 
}


