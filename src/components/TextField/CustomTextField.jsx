import * as React from 'react';
import { FormControl, FormHelperText } from '@mui/material';
import { RedditTextField } from '../Themes and Styles/textFieldStyle';


export default function CustomTextField({setErrorRoot, handleFieldValue, inputLabel}) {
  const errorModel = {
    isError: false,
    message: ''
  }
  const [userInput, setUserInput] = React.useState(0);
  const [error, setError] = React.useState(errorModel);

  const handleChange = (e) => {
    const value=e.target.value.length;
    setUserInput(value);
    checkError(e)
    handleFieldValue({name: inputLabel, value: e.target.value})
  }

  const checkError = (event) => {
    if(event.target.value.length === 0){
      setError({...error, isError: true, message: `${inputLabel} is required`})
      setErrorRoot({isError: true, field2Error: true})
    } else {
      setError({...error, isError: false, message: ''})
      setErrorRoot({isError: false, field2Error: false})
    }
  }

  return (
      <FormControl>
        <RedditTextField
          onChange={handleChange}
          onBlur={checkError}
          required
          label={inputLabel}
          id="reddit-input"
          variant="filled"
          placeholder='Enter text'
          error={error.isError ? true : false}
        />
        <FormHelperText id="component-helper-text">
            {userInput}/20
            &nbsp;&nbsp;
            <span style={{color: 'red'}}>{error.isError && error.message }</span>
        </FormHelperText>
      </FormControl>
  );
}
