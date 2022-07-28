import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import { ListSubheader, styled, Switch} from '@mui/material'

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

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

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

export default function SelectSingle() {
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl variant='standard' sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label" required sx={{ position: 'absolute', top: 7, left: 11, color: '#747474 !important'}}>Select brand</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput sx={{borderRadius: 2, textAlign: 'left', backgroundColor: 'rgba(25, 118, 210, 0.08)', color: '#747474 !important', padding: 0 }}/>}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          <ListSubheader sx={{padding: 2, backgroundColor: 'rgba(25, 118, 210, 0.08)'}}>
            <ListItemText primary={'Select one option only'} />
          </ListSubheader>
          {names.map((name) => (
            <MenuItem sx={{padding: 2}} key={name} value={name}>
              <ListItemText primary={name} />
              <FormControlLabel
                sx={{marginLeft: 20}}
                control={<IOSSwitch checked={personName.indexOf(name) > -1}/>}
              />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
