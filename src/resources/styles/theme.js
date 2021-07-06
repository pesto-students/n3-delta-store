import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
    typography: {
        fontFamily: [
            'Verdana',
            'sans-serif',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        "fontSize": 14,
        "fontWeightLight": 300,
        "fontWeightRegular": 400,
        "fontWeightMedium": 500
    },
    palette: {
        primary: {
            light: '#c3dfd0',
            main: '#4da58f',
            dark: '#1b4837',
            contrastText: '#fff'
        },
        secondary: {
            light: '#f3806b',
            main: '#ef5135',
            dark: '#d82f11',
            contrastText: '#fff'
        }



    },
    header: {
        borderBottom: '1px solid darkgray'
    },
    img: {
        maxWidth: "100%",
        maxHeight: "100%"
    }, page: {
        minHeight: "calc(90vh - 50px)"
    }
});

export default theme;