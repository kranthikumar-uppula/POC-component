import { createTheme } from "@mui/material"
export const FileUploaderTheme = createTheme({
    components: {
        MuiDropzoneArea: {
            styleOverrides: {
                root: { 
                    border: "1px solid black !important",
                    backgroundColor: 'red'
                },
            },
        },
    },
})