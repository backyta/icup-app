
export interface UserPasswordUpdateFormData {
  currentPassword    : string;
  newPassword        : string,
  newPasswordConfirm?: string | undefined,
}

export type UserPasswordUpdateFormDataKeys =
  | 'currentPassword'
  | 'newPassword'
  | 'newPasswordConfirm'

