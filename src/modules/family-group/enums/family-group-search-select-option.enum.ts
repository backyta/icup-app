export enum FamilyGroupSearchSelectOption {
  //* Status
  Inactive = 'inactive',
}

export const FamilyGroupSearchSelectOptionNames: Record<FamilyGroupSearchSelectOption, string> = {
  //* Record Status
  [FamilyGroupSearchSelectOption.Inactive]: 'Inactivo',
};

//* Record Status
export enum FamilyGroupSearchByRecordStatus {
  Inactive = 'inactive',
}

export const FamilyGroupSearchNamesByRecordStatus: Record<FamilyGroupSearchByRecordStatus, string> =
  {
    [FamilyGroupSearchByRecordStatus.Inactive]: 'Inactivo',
  };
