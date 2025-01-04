import { Dispatch, SetStateAction, useState } from "react";

interface IValidation {
  isError: boolean;
  message: string;
}

export const useValidation = (): [
  IValidation,
  Dispatch<
    SetStateAction<{
      isError: boolean;
      message: string;
    }>
  >
] => {
  const [validation, setValidation] = useState<IValidation>({
    isError: false,
    message: "",
  });

  return [validation, setValidation];
};
