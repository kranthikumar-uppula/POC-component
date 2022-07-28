import { styled, TextField } from "@mui/material";

export const RedditTextField = styled((props) => (
    <TextField InputProps={{ disableUnderline: true }} InputLabelProps={{shrink: true}} {...props} />
  ))(({ theme }) => ({
    '& .MuiFilledInput-root': {
      border: '1px solid grey',
      borderRadius: 7,
      fontWeight: 600,
      width: 300,
      overflow: 'hidden',
      backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
      transition: theme.transitions.create([
        'border-color',
        'background-color',
        'box-shadow',
      ]),
      '&:hover': {
        backgroundColor: 'transparent',
      },
      '&.Mui-focused': {
        backgroundColor: "rgba(140, 215, 254, 0.22)",
        borderColor: theme.palette.primary.main,
      },
      '&.Mui-error': {
        border: '1px solid red'
      }
    },
    '& .MuiFormLabel-asterisk': {
      color: 'red'
    },
    '& .MuiFormLabel-root': {
      fontWeight: 600
    }
  }));
  