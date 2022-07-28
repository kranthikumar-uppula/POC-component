import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import ClearIcon from '@mui/icons-material/Clear';
import { 
    Button,
    FormControlLabel, 
    FormHelperText, 
    Stack, 
    ThemeProvider 
} from '@mui/material';
import { SelectTheme } from '../Themes and Styles/selectTheme';
import { StyledSwitch } from '../Themes and Styles/switchStyle';

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

export default function MultiSelectMenu(
{   placeholderProp, 
    itemsArray, 
    markerType, 
    fixedItemLabel, 
    inputLabel, 
    requiredProp,
    chips,
    setErrorRoot,
    handleFieldValue
}) 
{
  const errorModel = {
    isError: false,
    message: ''
  }
  const [personName, setPersonName] = React.useState([]);
  const isAllSelected = itemsArray.length > 0 && personName.length === itemsArray.length;
  const [error, setError] = React.useState(errorModel)


    const handleChange = (event) => {
        console.log(event.target.value)
        if (event.target.value[event.target.value.length - 1] === "all") {
          setPersonName(personName.length === itemsArray.length ? [] : itemsArray);
          return;
        }
        const { target: { value } } = event;
        setPersonName( typeof value === 'string' ? value.split(',') : value );
        requiredProp && checkError(event)
        handleFieldValue({name: inputLabel, value: value})
    };

    const checkError = (event) => {
      if(event.target.value.length === 0){
        setError({...error, isError: true, message: `${inputLabel} is required` })
        setErrorRoot({isError: true, field1Error: true})
      } else {
        setError({...error, isError: false, message: ''})
        setErrorRoot({isError: false, field1Error: false})
      }
    }

    const deleteSelectedItem = (index) => {
        const personNameArray = personName.filter((person) => {
          return personName.indexOf(person) !== index
        });
        if(personNameArray.length === 0 ){
          setError({...error, isError: true, message: `${inputLabel} is required`})
          setErrorRoot({isError: true, field1Error: true})
        }
        setPersonName(personNameArray)
    }

  return (
    <ThemeProvider theme={SelectTheme}>
      <FormControl variant='standard'>
        <InputLabel 
          error={ error.isError && requiredProp ? true : false} 
          shrink 
          id="demo-multiple-checkbox-label" 
          required
          >
            {inputLabel}
          </InputLabel>
        <Select
          multiple
          error = { error.isError && requiredProp ? true : false}
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
            return Array.prototype.map.call(selected, function(item) { return item.name; }).join(",");
          }}
        >
            {
                fixedItemLabel.hasMarker &&
                <MenuItem value={'all'}>
                    <ListItemText primary={fixedItemLabel.label} />
                    { 
                        fixedItemLabel.hasMarker && 
                        <Checkbox color='success' checked={isAllSelected} size='small' />
                    }
                </MenuItem> 
            }
            {
                itemsArray.map((item) => (
                    <MenuItem key={item.id} value={item}>
                    <ListItemText primary={item.name} /> 
                        { 
                            markerType === 'checkbox' && 
                            <Checkbox 
                                size='small' 
                                color='success' 
                                disableRipple={true} 
                                checked={personName.indexOf(item) > -1} 
                            />
                        }
                        { 
                            markerType === 'switch' &&  
                            <FormControlLabel
                                sx={{marginLeft: 20, padding: 1}}
                                control={<StyledSwitch checked={personName.indexOf(item) > -1}/>}
                            />
                        }
                    </MenuItem>
                ))
            }
        </Select>
        <FormHelperText sx={{color: 'red'}}>
          { error.isError && requiredProp && error.message }
        </FormHelperText>
        { 
            chips &&  
            <Stack sx={{marginTop: 1, display: 'block'}} direction="row">
                    { 
                        personName.map( (item) => {
                            return (
                                <Button 
                                  key={item.id}
                                  variant="outlined" 
                                  disableRipple
                                  disableElevation
                                  endIcon={<ClearIcon />}
                                  onClick={() => deleteSelectedItem(personName.indexOf(item))}
                                >
                                  {item.name}
                                </Button>
                            )
                        })
                    }
            </Stack>
        }
      </FormControl>
    </ThemeProvider>
  );
}
