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
  Chip, 
  createTheme, 
  FormControlLabel, 
  ListItemIcon, 
  ListSubheader, 
  Stack, 
  styled, 
  Switch, 
  ThemeProvider 
} from '@mui/material';

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

const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    border: '2px solid grey',
    borderRadius: 20,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 0,
      transitionDuration: '100ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: 'green',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
          opacity: 1,
          border: 0,
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color:
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[600],
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 100,
      }),
    },
  }));


export default function CustomSelect(
    {   placeholderProp, 
        itemsArray, 
        multipleProp, 
        markerType, 
        fixedItemLabel, 
        inputLabel, 
        requiredProp,
        chips 
    }) {
  const [personName, setPersonName] = React.useState([]);
  const isAllSelected = itemsArray.length > 0 && personName.length === itemsArray.length;


  const handleChange = (event) => {
    console.log(event.target.value)
    if (event.target.value[event.target.value.length - 1] === "all") {
      setPersonName(personName.length === itemsArray.length ? [] : itemsArray);
      return;
    }
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const deleteSelectedItem = (index) => {
    const personNameArray = personName.filter((person) => {
      return personName.indexOf(person) !== index
    })

    setPersonName(personNameArray)
  }
  
  const theme = createTheme({
    components: {
        MuiFormLabel: {
            styleOverrides: {
                asterisk: { 
                    color: "red",
                },
            },
        },
        MuiSelect : {
            styleOverrides: {
                select: {
                    paddingTop: 25,
                    paddingLeft: 11,
                    paddingBottom: 5,
                    "&:focus": {
                        backgroundColor: "rgba(140, 215, 254, 0.22)",
                    },
                } 
            } 
        },
        MuiChip : {
          styleOverrides : {
            deleteIcon : {
              color: 'rgba(48, 179, 255, 1)',
              fontSize: 16
            }
          }
        }
    },
})

  

  return (
    <ThemeProvider theme={theme}>
      <FormControl variant='standard' sx={{ m: 5, width: 300 }}>
        <InputLabel shrink id="demo-multiple-checkbox-label" required sx={{ position: 'absolute', top: 7, left: 11, fontWeight: 600, color: 'grey'}}>{inputLabel}</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple = { multipleProp ? true : false }
          required = { requiredProp ? true : false }
          displayEmpty
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput sx={{borderRadius: 2, textAlign: 'left', fontWeight: 600, padding: 0 }}/>}
          //renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <small>{placeholderProp}</small>;
            }

            return selected.join(', ');
          }}
        >
            {
                !fixedItemLabel.hasMarker &&  <ListSubheader>
                                        <MenuItem sx={{padding: 0}}>
                                            <ListItemText sx={{fontSize: 10, padding: 1, textAlign: 'left'}} primary={fixedItemLabel.label} />
                                        </MenuItem>
                                    </ListSubheader>
            }
             {
                fixedItemLabel.hasMarker &&   
                                                <MenuItem value={'all'}>
                                                    <ListItemText sx={{fontSize: 10, padding: 1, textAlign: 'left'}} primary={fixedItemLabel.label} />
                                                    <ListItemIcon>
                                                      { fixedItemLabel.hasMarker && <Checkbox color='success' checked={isAllSelected} size='small' />}
                                                    </ListItemIcon>
                                                </MenuItem>
                                             
            }
          {itemsArray.map((name) => (
            <MenuItem key={name} value={name}>
              <ListItemText primary={name} /> 
                { markerType === 'checkbox' && <Checkbox size='small' color='success' disableRipple={true} checked={personName.indexOf(name) > -1} />}
                { markerType === 'switch' &&  <FormControlLabel
                                                sx={{marginLeft: 20, padding: 1}}
                                                control={<IOSSwitch checked={personName.indexOf(name) > -1}/>}
                                            />
                }
            </MenuItem>
          ))}
        </Select>
       { chips &&  <Stack sx={{marginTop: 1, display: 'block'}} direction="row">
                    { personName.map( (person) => {
                      return (
                            
                              <Chip
                                //size='small'
                                key={personName.indexOf(person)}
                                sx={{borderRadius: 1, backgroundColor: 'rgba(140, 215, 254, 0.22)', border: 'none', color: 'rgba(48, 179, 255, 1)', fontWeight: 600,  marginTop: 0.5, marginLeft: 1}}
                                color={'primary'}
                                label={person}
                                onDelete={ () => deleteSelectedItem(personName.indexOf(person))}
                                deleteIcon={<ClearIcon />}
                              />
                      )
                    })}
         </Stack>}
      </FormControl>
    </ThemeProvider>
  );
}
