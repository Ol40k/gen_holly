import { ButtonProps } from './Button.interfaces';

import './Button.scss';

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button className="btn" {...props}>
      {children}
    </button>
  );
};
