import React, { useState } from 'react';
import { Mutation, useMutation } from 'react-apollo';
import gql from 'graphql-tag';

import { deleteEmployee, deleteSkillOwner } from '../graphql/mutations';
import { removeEmployee } from '../functions/mutationFunctions';

import { Button, Dialog } from '@material-ui/core';
import Loader from './loader';



const DeleteButton = ({ employeeID, skillID, callback }) => {
	const [removeLink, { loading }] = useMutation(gql(deleteSkillOwner))

	// Controls the loading display
	const [open, setOpen] = useState(false)

	// Delete the chosen employee and the related employee-skill links
	const handleDelete = async (deleteEmployee) => {
		// Display loader
		setOpen(true)
		for (let skill of skillID) {
			await removeLink({ variables: { input: { id: 'E' + employeeID + 'S' + skill } } })
		}
		await removeEmployee({ employeeID }, deleteEmployee)

		// Show success message
		setOpen(false)

		callback(employeeID);
	}

	return (
		<Mutation mutation={gql(deleteEmployee)}>
			{(deleteEmployee) => {
				return (
					<>
						<Button
							variant='outlined'
							size='small'
							onClick={() => handleDelete(deleteEmployee)} style={{ marginLeft: 12 }}
						>
							Delete
					</Button>
						<Dialog open={open} >
							{loading &&
								<div style={{ display: 'flex', justifyContent: 'center', minHeight: 300, minWidth: 300 }}>
									<Loader />
								</div>}

						</Dialog>
					</>
				)
			}}
		</Mutation>
	)

}

export default DeleteButton;