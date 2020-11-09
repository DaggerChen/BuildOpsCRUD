import React, { useState } from 'react';
import { Query } from 'react-apollo';
import gql from "graphql-tag";

import { listEmployees } from '../graphql/queries'

import { Container, Grid, makeStyles } from '@material-ui/core';
import Loader from './loader';
import Menu from './menu'
import DataTable from './dataTable';


const useStyles = makeStyles(() => ({
	root: {
		marginTop: '20px',
		flexGrow: 1,
	},
	grid: {
		left: 0,
		right: 0,
		margin: 'auto',
		width: '90%'
	},
	menu: {
		minWidth: 150
	},
	container: {
		display: 'flex',
		justifyContent: 'center',
		height: '100%'
	}
}))

const Body = () => {
	const classes = useStyles();

	// Initialize the search result returned from menu
	const [searchResult, setSearchResult] = useState()

	// Callback function provided to menu to retrieve data
	function searchCallback(result) {
		setSearchResult(result)
	}

	return (
		<div className={classes.root}>
			<Grid container spacing={3} className={classes.grid}>
				<Grid item xs={2} className={classes.menu} >
					<Menu callback={searchCallback} />
				</Grid>
				<Grid item xs={10} >
					{(!searchResult) ?
						<Query query={gql(listEmployees)} >
							{({ loading, data, error }) => {
								if (loading) return <Container className={classes.container}> <Loader /> </Container>
								if (error) return <p>{error.message}</p>
								return <DataTable data={data} />
							}}
						</Query>
						:
						<DataTable data={searchResult} />
					}
				</Grid>
			</Grid>
		</div>
	)
}

export default Body