import React from 'react';
import TextField from '@material-ui/core/TextField';
import NumberFormat from 'react-number-format';

export interface TextInputProps {
  formik: any;
  name: string;
  label: string;
  required?: boolean;
  isCurrencyValue?: boolean;
}

const NumberFormatCustom = (props: any) => {
  const {inputRef, onChange, ...other} = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
    />
  );
};

const TextInput: React.FC<TextInputProps> = ({formik, name, label, required, isCurrencyValue}) => {
  return (
    <TextField
      fullWidth
      id={name}
      name={name}
      label={label}
      value={formik.values[name]}
      onChange={formik.handleChange}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      helperText={formik.touched[name] && formik.errors[name]}
      required={required}
      InputProps={{
        inputComponent: isCurrencyValue ? NumberFormatCustom : undefined,
      }}
    />
  );
};

export default TextInput;
