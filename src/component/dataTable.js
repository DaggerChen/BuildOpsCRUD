import React, { useEffect, useState } from 'react';

import { DataGrid } from '@material-ui/data-grid';
import DeleteButton from './deleteButton';
import EditDialog from './editDialog';
import { Snackbar } from '@material-ui/core';
import SimpleAlerts from './alert';


const DataTable = ({ data: dataDisplay }) => {
	const [rows, setRows] = useState([])
	const [snackOpen, setSnackOpen] = useState(false)
	// Initialize DataTable and refresh data when the provided dataDisplay is changed
	useEffect(() => {
		let tempRows = []
		let items = []

		// Set items base on types of data to display
		if (dataDisplay.listSkills) {
			items = dataDisplay.listSkills.items[0] ? dataDisplay.listSkills.items[0].employees.items : []
		} else {
			items = dataDisplay.listEmployees.items
		}
		
		for (let employee of items) {
			let skills = []
			if (employee.employee) {
				employee = employee.employee
				for (let skill of employee.skills.items) {
					skills.push(skill.skillID)
				}
			} else {
				for (let skill of employee.skills.items) {
					skills.push(skill.skillID)
				}
			}

			tempRows.push({
				id: employee.id, firstName: employee.firstname,
				lastName: employee.lastname, skills: skills.join(', ')
			})
		}
		setRows(tempRows)
	}, [dataDisplay])

	// Callback function provided to delete button that updates the data in table
	const deleteCallback = (id) => {
		setRows([...rows.filter((row) => (row.id !== id))])
		setSnackOpen(true)
	}

	// Callback function provided to update button that updates the data in table
	const UpdateCallback = (employee, skills) => {
		setRows([...rows.map((row) => {
			if (row.id === employee.id) {
				row.firstName = employee.firstname
				row.lastName = employee.lastname
				row.skills = skills.join(', ')
			}
			return row
		})])
		setSnackOpen(true)
	}

	// Initialize fields in columns of DataGrid
	const columns = [
		{ field: 'id', headerName: 'ID', width: 150, sortComparator: (v1, v2, row1, row2) => parseInt(row1.data.id) - parseInt(row2.data.id) },
		{ field: 'firstName', headerName: 'First name', width: 150 },
		{ field: 'lastName', headerName: 'Last name', width: 150 },
		{
			field: 'fullName',
			headerName: 'Full name',
			sortable: false,
			width: 250,
			valueGetter: (params) =>
				`${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''
				}`,
		},
		{
			field: 'skills',
			headerName: 'Skills',
			width: 700,
		},
		{
			field: 'date',
			headerName: 'Edit',
			width: 200,
			renderCell: (params) => (
				<div>
					<EditDialog employeeData={params} callback={UpdateCallback} />
					<DeleteButton data={dataDisplay} callback={deleteCallback} employeeID={params.getValue('id')} skillID={params.getValue('skills').split(', ')} />
				</div>
			),
		},
	]

	return (
		<div style={{ height: 700, width: '100%' }}>
			<DataGrid rows={rows} columns={columns.map((column) => ({
				...column,
				disableClickEventBubbling: true,
			}))} pageSize={10} />
			<Snackbar open={snackOpen} autoHideDuration={4000} onClose={()=>{setSnackOpen(false)}}>
				<SimpleAlerts />
			</Snackbar>
		</div>
	)
}

export default DataTable