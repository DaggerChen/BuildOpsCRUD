import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles(() => ({
	root: {
		left: 0,
		right: 0,
		margin: 'auto'
	},
}))

export default function Loader() {
	const classes = useStyles();

	return (
		<CircularProgress className={classes.root} />
	)
}