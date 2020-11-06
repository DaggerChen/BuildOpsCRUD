import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		'& > * + *': {
			marginTop: theme.spacing(2),
		},
	},
}))

export default function SimpleAlerts({ type, closeCallback }) {
	const classes = useStyles();
	let alert = <Alert severity="success" onClose={closeCallback}>Operation Succeed!</Alert>
	if (type === 'warning') {
		alert = <Alert severity="error" onClose={closeCallback}>Each employee must have a unique ID!</Alert>
	}
	return (
		<div className={classes.root}>
			{alert}
		</div>
	)
}