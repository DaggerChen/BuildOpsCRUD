import React, { useEffect, useState } from 'react';

import { DataGrid } from '@material-ui/data-grid';
import DeleteButton from './deleteButton';
import EditDialog from './editDialog';


const DataTable = ({ data: dataDisplay }) => {
	const [rows, setRows] = useState([])

	// Initialize DataTable and refresh data when the provided dataDisplay is changed
	useEffect(() => {
		let tempRows = []
		const items = dataDisplay.listEmployees.items
		for (let employee of items) {
			let skills = []
			for (let skill of employee.skills.items) {
				skills.push(skill.skillID)
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
		<div style={{ height: 600, width: '100%' }}>
			<DataGrid rows={rows} columns={columns.map((column) => ({
				...column,
				disableClickEventBubbling: true,
			}))} pageSize={20} />
		</div>
	)
}

export default DataTable