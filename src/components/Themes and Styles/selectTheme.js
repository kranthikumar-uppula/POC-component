import { createTheme } from "@mui/material"
export const SelectTheme = createTheme({
    components: {
        MuiFormLabel: {
            styleOverrides: {
                asterisk: { 
                    color: "red",
                },
                root : {
                    position: 'absolute !important', 
                    top: '7px !important', 
                    left: '11px !important', 
                    fontWeight: 600,
                }
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
        MuiOutlinedInput : {
            styleOverrides: {
                root: {
                    borderRadius: 8, 
                    textAlign: 'left', 
                    fontWeight: 600, 
                    padding: 0 
                } 
            } 
        },
        MuiButton : {
          styleOverrides : {
            root : {
                borderRadius: 3, 
                backgroundColor: 'rgba(140, 215, 254, 0.22)', 
                border: 'none', 
                color: 'rgba(48, 179, 255, 1)', 
                fontWeight: 600,  
                marginTop: 5, 
                marginLeft: 1,
            },
            outlined : {
                '&:hover': {
                    backgroundColor: 'rgba(140, 215, 254, 0.22)',
                    border: 'none'
                }
            }
          }
        },
        MuiFormControl : {
            styleOverrides : {
                root : {
                  margin: 20,
                  width: 300
                }
            }
        },
        MuiListSubheader : {
            styleOverrides : {
                root : {
                  paddingLeft: 0,
                  paddingRight: 0
                }
            }
        }
    },
})