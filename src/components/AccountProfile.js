
import {
  Avatar,
  Box,
  Card,
  CardContent,
  makeStyles,
  Typography
} from '@material-ui/core';

/* const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith',
  timezone: 'GTM-7'
};
 */

const AccountProfile = (props) => {
  const useStyles = makeStyles((theme) => {
    return ({
      page: {
        ...theme.page,
        marginTop: theme.spacing(8)
      }, avatar: {

        height: 200,
        width: 200

      }, box: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column'
      }

    })
  });
  const classes = useStyles();
  const { user } = props;
  
  return (
    <Card {...props}>
      <CardContent>
        <Box
          className={classes.box}
        >
          <Avatar
            src={user?.photoURL}
            className={classes.avatar}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h4"
          >
            {user?.displayName}
          </Typography>

        </Box>
      </CardContent>

    </Card>
  )
}

export default AccountProfile;