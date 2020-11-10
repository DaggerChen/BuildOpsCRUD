import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-apollo';
import gql from 'graphql-tag';

import { listSkills } from '../graphql/queries';
import { updateEmployee, deleteSkillOwner, createSkillOwner, createSkill } from '../graphql/mutations';
import { addLink, addSkill, editEmployee, removeLink } from '../functions/mutationFunctions';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Loader from './loader';
import SimpleAlerts from './alert';


const EditDialog = ({ employeeData, callback }) => {

	let currentSkills = employeeData.data.skills.split(', ')

	// Initialize employee and skill state and generate mutation and query functions
	const { data: skillData, loading: skillLoading } = useQuery(gql(listSkills))
	const [refreshEmployee] = useMutation(gql(updateEmployee))
	const [deleteLink] = useMutation(gql(deleteSkillOwner))
	const [createLink] = useMutation(gql(createSkillOwner))
	const [addOneSkill] = useMutation(gql(createSkill))

	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false)
	const [employee, setEmployee] = useState({ id: employeeData.data.id, firstname: employeeData.data.firstName, lastname: employeeData.data.lastName })
	const [skills, setSkills] = useState(currentSkills)

	// allSkills contains all skills stored in database
	let allSkills = []
	if (!skillLoading) {
		for (let skill of skillData.listSkills.items) {
			allSkills.push(skill.id)
		}
	}

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const handleUpload = async (e) => {
		setLoading(true)
		e.preventDefault()

		// Update employee's fields excepts id
		await editEmployee({ employee }, refreshEmployee)

		if (currentSkills[0] || skills[0]) {
			// Add new skills that are not stored to the database and add links
			for (let skill of skills) {
				if (!allSkills.includes(skill)) {
					allSkills.push(skill)
					await addSkill({ skill }, addOneSkill)
				}
				if (!currentSkills.includes(skill)) {
					await addLink({ employee, skill }, createLink)
				}
			}
			// Delete the skills and employee-skill links that no long exist
			for (let skill of currentSkills) {

				if (!skills.includes(skill)) {
					await removeLink({ employee, skill }, deleteLink)
				}
			}
		}
		// Pass the value back to DataTable and update display
		callback(employee, skills)
		setLoading(false)
	}

	// Update employee state when text fields are changed
	function setEmployeeInput(key, value) {
		setEmployee({ ...employee, [key]: value })
	}

	// Update skill array when text fields are changed
	function setSkillInput(value) {
		let newSkills = value.split(',')
		newSkills = newSkills.map((skill) => (skill.trim()));
		let cleanSkills = newSkills.filter((elem) => elem)
		setSkills(cleanSkills)
	}

	return (
		<span>
			<Button variant="outlined" size='small' color="primary" onClick={handleClickOpen}>
				Update
      </Button>
			<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
					<div>
						<DialogTitle id="form-dialog-title">Edit Information of {[employeeData.data.firstName, employeeData.data.lastName].join(' ')}</DialogTitle>
						<DialogContent>
							<DialogContentText>
								ID is read-only. Delete and re-add the employee if ID needs to be changed.
         		</DialogContentText>
							{loading
								? <div style={{ display: 'flex', justifyContent: 'center', minHeight: 200 }}> <Loader /></div>
								: <form onSubmit={(e) => handleUpload(e)}>
									<TextField
										autoFocus
										margin="dense"
										label='ID'
										defaultValue={employeeData.data.id}
										fullWidth
										InputProps={{
											readOnly: true,
										}}
									/>
									<TextField
										margin="dense"
										label='First Name'
										defaultValue={employeeData.data.firstName}
										onChange={(event) => setEmployeeInput('firstname', event.target.value)}
										fullWidth
										required
									/>
									<TextField
										margin="dense"
										label='Last Name'
										defaultValue={employeeData.data.lastName}
										onChange={(event) => setEmployeeInput('lastname', event.target.value)}
										fullWidth
										required
									/>
									<TextField
										margin="dense"
										label='Skills'
										defaultValue={employeeData.data.skills}
										onChange={event => { setSkillInput(event.target.value) }}
										fullWidth
									/>
									<Button type='submit' style={{ float: "right" }} color="primary">
										Confirm
								</Button>
									<Button onClick={handleClose} style={{ float: "right" }} color="primary">
										Cancel
								</Button>
								</form>
							}
						</DialogContent>
					</div>
			</Dialog>
		</span>
	)
}

export default EditDialog