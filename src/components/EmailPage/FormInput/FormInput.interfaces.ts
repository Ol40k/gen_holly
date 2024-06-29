export interface FormInputProps
  extends React.PropsWithRef<JSX.IntrinsicElements['input']> {
  validation: (value: string) => boolean;
  onValidityChange: (isValid: boolean) => void;
}
