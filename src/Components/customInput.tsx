import React from "react";
import { FormGroup, FormText, Input, Label } from "reactstrap";
import { InputType } from "reactstrap/es/Input";
import { getRegExp, getSentenceFromCamelCase } from "../helper";

const CustomInput: React.FunctionComponent<{
  checked?: boolean,
  className?: string,
  disabled?: boolean,
  error?: string,
  fixLength?: number,
  helperText?: string,
  isRequired?: boolean,
  label?: string,
  minLength?: number,
  maxLength?: number,
  name: string,
  onChange: (name: string, value: string | boolean) => void,
  placeholder?: string,
  reqType?: string,
  style?: object,
  type?: InputType,
  validationHandler?: (name: string, error: string) => void,
  value: any,
}> = ({
  checked = false,
  className = "",
  disabled = false,
  error = "",
  fixLength = 0,
  helperText = "",
  isRequired = false,
  label = "",
  minLength = 0,
  maxLength = 0,
  name,
  onChange,
  placeholder = "",
  reqType = "",
  style = {},
  type,
  validationHandler = () => { },
  value,
}) => {

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
      const { name, value, type, checked } = event.target;
      const inputValue = type === "checkbox" ? checked : value;
      onChange && onChange(name, inputValue);
    };

    const onValidationChange = (event: React.FocusEvent<HTMLInputElement>): void => {
      if (!validationHandler) return;
      const { value } = event.target;
      let errorMessage = "";
      if (!value && isRequired) {
        errorMessage = `Please enter ${getSentenceFromCamelCase(name)}.`;
      } else if (minLength && value.length < minLength) {
        errorMessage = `${name.charAt(0).toUpperCase() + getSentenceFromCamelCase(name).slice(1)
          } must be at least ${minLength} characters long.`;
      } else if (maxLength && value.length > maxLength) {
        errorMessage = `${name.charAt(0).toUpperCase() + getSentenceFromCamelCase(name).slice(1)
          } must be ${minLength} characters long.`;
      } else if (fixLength && value.length !== fixLength) {
        errorMessage = `${name.charAt(0).toUpperCase() + getSentenceFromCamelCase(name).slice(1)
          } must be ${fixLength} characters.`;
      } else if (value && reqType && !getRegExp(reqType).test(value)) {
        errorMessage = `Please enter valid ${getSentenceFromCamelCase(name)}.`;
      }
      validationHandler(name, errorMessage);
    };

    return (
      <FormGroup>
        {label ? (
          <>
            <Label for={name}>{label}</Label>
            {isRequired ? <span className='text-danger'>*</span> : null}
          </>
        ) : null}
        <Input
          type={type}
          name={name}
          id={name}
          value={value}
          checked={checked}
          placeholder={placeholder}
          className={className}
          style={style}
          disabled={disabled}
          onChange={onChangeHandler}
          onBlur={onValidationChange}
          onFocus={() => validationHandler(name, "")}
        />
        {helperText && <FormText color='muted'>{helperText}</FormText>}
        {error ? <span className='text-danger fs-12'>{error}</span> : null}
      </FormGroup>
    );
  };



export default CustomInput;
