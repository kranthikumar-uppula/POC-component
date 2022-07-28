import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { ListSubheader, styled } from '@mui/material';

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





export default function MultiSelectNew() {
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
      <FormControl variant='standard' focused sx={{ m: 5, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label" required sx={{ position: 'absolute', top: 7, left: 11, color: '#747474 !important'}}>Region</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          displayEmpty
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput sx={{borderRadius: 2, textAlign: 'left', backgroundColor: 'rgba(25, 118, 210, 0.08)', color: '#747474 !important', padding: 0 }}/>}
          //renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <small>Select region/s</small>;
            }

            return selected.join(', ');
          }}
        >
          <MenuItem>
            <ListItemText primary={'Select region/s'} />
            <Checkbox  size='small' />
          </MenuItem>
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <ListItemText primary={name} />
              <Checkbox size='small' color='success' checked={personName.indexOf(name) > -1} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
