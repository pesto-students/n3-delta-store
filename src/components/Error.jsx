import {

    Container,
    Paper,
    Typography
} from '@material-ui/core';

const NotFound = () => (
    <>
        <Paper
            style={{ minHeight: '90vh' }}
            sx={{
                backgroundColor: 'background.default',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                justifyContent: 'center'
            }}
        >
            <Container maxWidth="md">
                <Typography
                    align="center"
                    color="textPrimary"
                    variant="h2"
                >
                    404: The page you are looking for isn’t here
                </Typography>
                <Typography
                    align="center"
                    color="textPrimary"
                    variant="subtitle2"
                >
                    You either tried some shady route or you came here by mistake.
                    Whichever it is, try using the navigation
                </Typography>
            </Container>
        </Paper>
    </>
);

export default NotFound;