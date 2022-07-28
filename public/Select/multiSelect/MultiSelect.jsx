import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { ListSubheader } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddSharpIcon from '@mui/icons-material/AddSharp';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function createData(name, calories, fat, carbs, protein) {
    return { name, calories};
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

const MultiSelect = ({names, labelName}) => {
  const [personName, setPersonName] = React.useState([]);
  const [addItem, setAddItem] = React.useState(false)

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const addNew = () => {
    console.log('hi')
  }

  return (
    <div>
      <FormControl sx={{ m: 3, width: 200 }}>
        <InputLabel variant={'filled'} required={true} id="demo-multiple-checkbox-label">
            {labelName}
        </InputLabel>
        <Select
            sx={{width: 200}}
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Brand name" />}
          renderValue={(selected) => selected.join(', ')}
          variant={'filled'}
          onOpen={() => setAddItem(true)}
          onClose={() => setAddItem(false)}
        >
            {/* <ListSubheader>
                Select Initiatives
                <Checkbox color='success' />
            </ListSubheader>
            {names.map((name) => (
                <MenuItem dense={true} key={name} value={name}>
                <ListItemText primary={name} />
                <Checkbox color='success' checked={personName.indexOf(name) > -1} />
                </MenuItem>
            ))} */}
            
            

        </Select>
         { addItem &&  <TableContainer sx={{width: 200, zIndex: 9999, maxHeight: 250}} component={Paper}>
            <Table sx={{ width: 200,  maxHeight: 200 }} size="small" aria-label="a dense table">
                <TableBody >
                     {names.map((row) => (
                    <TableRow key={row} style={{border: 0}}>
                        <TableCell component="th" scope="row">
                            {row}
                        </TableCell>
                        <TableCell align="right">
                            <Checkbox color='success' size='' sx={{height: 30}}/>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Table sx={{ width: 282, position: 'absolute', bottom: 0 }} size="small" aria-label="a dense table">
            <TableBody>
                    <TableRow>
                        <TableCell component="th" scope="row" sx={{ textAlign: 'left', backgroundColor: 'white', cursor: 'pointer'}}>
                            <AddSharpIcon color={'primary'} sx={{ marginBottom: -0.8 }}/> &nbsp;&nbsp;{'Add new brand'}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer> }
      </FormControl>
    </div>
  );
}

export default MultiSelect;
