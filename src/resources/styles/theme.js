import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
    header:{
        height: "60px"
    },
    img: {
        maxWidth: "100%",
        maxHeight: "100%"
    }, page: {
        minHeight: "calc(90vh - 50px)"
    }
});

export default theme;