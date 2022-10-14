interface ButtonProps {
  children: any;
  version: string;
  type?: "button" | "submit" | "reset";
  isDisabled: boolean;
}

const Button = ({children, version, type, isDisabled}:ButtonProps) => {
  return (
    <button 
    type={type} 
    disabled={isDisabled} 
    className={`btn btn-${version}`}>{children}</button>
  )
}

Button.defaultProps = {
  version: 'primary',
  type: 'button',
  isDisabled: false
}

export default Button