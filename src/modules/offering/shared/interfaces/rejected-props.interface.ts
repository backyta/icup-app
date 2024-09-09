export interface RejectionProps {
  errors: ErrorProps[];
  file: File;
}

interface ErrorProps{
  code: string;
  message: string;
}


