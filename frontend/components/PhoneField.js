import React from 'react';
import PropTypes from 'prop-types';
import MaskedInput from 'react-text-mask';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

  function TextMaskCustom(props) {
    const { inputRef, ...other } = props;
  
    return (
      <MaskedInput
        {...other}
        ref={(ref) => {
          inputRef(ref ? ref.inputElement : null);
        }}
        mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        placeholderChar={'\u2000'}
        showMask
      />
    );
  }
  
  TextMaskCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
  };


  export default function FormattedInputs(props) {
    const [values, setValues] = React.useState(props.value);

    const handleChange = (event) => {
      props.onChange(event);
      setValues(event.target.value);
    };
  
    return (   
      <FormControl>
      <InputLabel htmlFor={props.id}>{props.label}</InputLabel>
      <Input
       disabled={props.disabled}
       value={props.value}//{values}
       onChange={handleChange}
      name={props.name}
      id={props.id}
      inputComponent={TextMaskCustom}
    />
    </FormControl>
    );
}