
export interface RejectedProps {
  errors: ErrorsProps[];
  file: File;

}

interface ErrorsProps{
  code: string;
  message: string;
}


