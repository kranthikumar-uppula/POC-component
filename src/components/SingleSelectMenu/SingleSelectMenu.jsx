import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel, FormHelperText, ListSubheader, ThemeProvider } from '@mui/material';
import { SelectTheme } from '../Themes and Styles/selectTheme';
import { StyledSwitch } from '../Themes and Styles/switchStyle'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function SingleSelectMenu
({  placeholderProp, 
    itemsArray,  
    markerType, 
    fixedItemLabel, 
    inputLabel, 
    requiredProp,
    setErrorRoot,
    handleFieldValue
}) 

{
  const errorModel = {
    isError: false,
    message: ''
  }
  const [personName, setPersonName] = React.useState([]);
  const [error, setError] =  React.useState(errorModel);


    const handleChange = (event) => {
      const {
      target: { value },
      } = event;
      handleFieldValue({name: inputLabel, value: value})
      setPersonName( typeof value === 'string' ? value.split(',') : value );
      checkError(event)
    };

    const checkError = (event) => {
      if(event.target.value.length === 0){
        setError({...error, isError: true, message: `${inputLabel} is required`})
        setErrorRoot({isError: true, field3Error: true})
      } else {
        setError({...error, isError: false, message: ''})
        setErrorRoot({isError: false, field3Error: false})
      }
    }
  
  return (
    <ThemeProvider theme={SelectTheme}>
      <FormControl variant='standard'>
        <InputLabel 
          error={ error.isError ? true : false} 
          shrink 
          id="demo-multiple-checkbox-label" 
          required 
        >
          {inputLabel}
        </InputLabel>
        <Select
          error = { error.isError ? true : false}
          required = { requiredProp ? true : false }
          displayEmpty
          value={personName}
          onBlur={checkError}
          onChange={handleChange}
          input={<OutlinedInput />}
          MenuProps={MenuProps}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <small>{placeholderProp}</small>;
            }
            return personName.name;
          }}
        >
            {
                fixedItemLabel &&  
                  <ListSubheader>
                      <MenuItem>
                          <ListItemText primary={fixedItemLabel.label} />
                      </MenuItem>
                  </ListSubheader>
            }
            {
                itemsArray.map((item) => (
                  <MenuItem disableRipple key={item.key} value={item}>
                    <ListItemText primary={item.name} />
                    { 
                      markerType === 'checkbox' && 
                      <Checkbox 
                        size='small' 
                        color='success' 
                        disableRipple={true} 
                        checked={personName.name === item.name} 
                      />
                    }
                    { 
                      markerType === 'switch' &&  
                      <FormControlLabel
                        sx={{marginLeft: 20, padding: 1}}
                        control={<StyledSwitch checked={personName.name === item.name}/>}
                      />
                    }
                  </MenuItem>
                ))
            }
        </Select>
        <FormHelperText sx={{color: 'red'}}>
          { error.isError && error.message }
        </FormHelperText>
      </FormControl>
    </ThemeProvider>
  );
}
