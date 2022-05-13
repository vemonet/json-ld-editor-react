import React from "react";
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Tooltip } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import InfoIcon from '@mui/icons-material/Info';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { AuthButton } from '@solid/react';

// @ts-ignore
import iconImage from '../../assets/icon.png';

  
export default function NavBar() {

  const theme = useTheme();
  const useStyles = makeStyles(() => ({
    solidButton: {
      backgroundColor: theme.palette.primary.main,
      color: '#fff',
      borderRadius: '6px',
      // boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)',
      padding: '7px 14px',
      '&:hover': {  
        backgroundColor: theme.palette.primary.dark,
        cursor: 'pointer'
      }
    },
    menuButton: {
      color: theme.palette.common.white
    },
    linkButton: {
      textTransform: 'none',
      textDecoration: 'none'
    },
    linkLogo: {
      alignItems: 'center',
      display: 'flex',
    },
    // navbar: {
    //   color: 'white',
    //   backgroundColor: theme.palette.primary.main,
    // },
  }))
  const classes = useStyles();

  return (
    <AppBar title="" color='primary' position='static'>
      {/* className={classes.navbar} */}
      <Toolbar variant='dense' color='primary'>
        <Link to="/" className={classes.linkLogo}>
          <Tooltip title='JSON-LD Editor 🧙‍♂️'>
            <img src={iconImage} style={{height: '2em', width: '2em', marginRight: '10px'}} alt="Logo" />
          </Tooltip>
        </Link>
        {/* <Link to="/wizard" className={classes.linkButton}>
          <Tooltip title='Start metadata wizard'>
            <Button className={classes.menuButton}>
              <CreateNewFolderIcon />
            </Button>
          </Tooltip>
        </Link> */}
        <div className="flexGrow"></div>

        <AuthButton login='Login with SOLID' logout='Logout from SOLID' className={classes.solidButton}
          popup="https://inrupt.net/common/popup.html"/>
        <Link to="/about" className={classes.linkButton}>
          <Tooltip title='About the Institute of Data Science'>
            <Button className={classes.menuButton}>
              <InfoIcon />
            </Button>
          </Tooltip>
        </Link>
        <Tooltip title='Go to IDS Best Practices documentation'>
          <Button className={classes.menuButton} target="_blank"
          href="https://maastrichtu-ids.github.io/best-practices">
            <MenuBookIcon />
          </Button>
        </Tooltip>
        <Tooltip title='Go to https://github.com/vemonet/jsonld-editor '>
          <Button className={classes.menuButton} target="_blank"
          href="https://github.com/vemonet/jsonld-editor ">
            <GitHubIcon />
          </Button>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
}