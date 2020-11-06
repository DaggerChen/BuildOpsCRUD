import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Logo from '../image/logo.png';


const useStyles = makeStyles((theme) => ({
	root: {
	},

	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {

	},
	logo: {
		width: '80px',
		marginRight: 30
	}
}));

export default function Header() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar position="static" color='primary' className={classes.appBar}>
				<Toolbar>
					<img src={Logo} alt='logo' className={classes.logo}></img>
					<Typography variant="h4" className={classes.title}>
						Employee and Skills CRUD
          </Typography>
				</Toolbar>
			</AppBar>
		</div>
	)
}