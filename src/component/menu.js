import React, { useState } from 'react';
import { useQuery, useMutation } from 'react-apollo';
import gql from "graphql-tag";

import { createEmployee, createSkill, createSkillOwner } from "../graphql/mutations";
import { listEmployees, listSkills } from '../graphql/queries';
import { addEmployee, addLink, addSkill } from '../functions/mutationFunctions';

import { Typography, TextField, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { Accordion, AccordionSummary, AccordionDetails } from './accordion';
import Loader from './loader';
import SimpleAlerts from './alert';


const Menu = ({ callback }) => {
	const [expanded, setExpanded] = React.useState('panel1')
	const handleChange = (panel) => (event, newExpanded) => {
		setExpanded(newExpanded ? panel : false)
	}

	// Fetch all employees
	const { data, refetch } = useQuery(gql(listEmployees))

	// Fetch all skills
	const { data: skillData, loading: skillLoading } = useQuery(gql(listSkills))

	// Initialize fields (employee and skills) of the form
	const [employee, setEmployee] = useState({ id: '', firstname: '', lastname: '' })
	const [skills, setSkills] = useState([])

	// It is the string representing skills to be displayed
	const [skillString, setSkillString] = useState('')

	// The loading state determines loading status
	const [loading, setLoading] = useState(false)

	// The alert and warningType state controls the display of warning message
	const [alert, setAlert] = useState(false)
	const [warningType, setWarningType] = useState('')

	// Generate mutations that can add employee, skill, and employee-skill link
	const [addOneEmployee] = useMutation(gql(createEmployee))
	const [addOneSkill] = useMutation(gql(createSkill))
	const [addSkillOwner] = useMutation(gql(createSkillOwner))

	// Function handleClear resets all the fields
	const handleClear = () => {
		setEmployee({ id: '', firstname: '', lastname: '' })
		setSkills([])
		setSkillString('')
	}

	// Handle search query by filtering all employees
	const handleSearch = () => {

		// Funtion skillCheck() checks if the current employee has all the skills in the query
		function skillCheck(ownedSkill) {
			refetch()
			let skillQuery = skills

			for (let skill of ownedSkill) {
				if (skillQuery.includes(skill.skillID)) {
					skillQuery = skillQuery.filter((item) => (item !== skill.skillID))
				}
			}

			return skillQuery.length === 0
		}

		// Filtered data is the list of employees fit the query
		let filteredData = { listEmployees: { items: [] } }

		filteredData.listEmployees.items = [
			...data.listEmployees.items.filter(item =>
				(!employee.id || employee.id === item.id)
				&& (!employee.firstname || employee.firstname === item.firstname)
				&& (!employee.lastname || employee.lastname === item.lastname)
				&& (skills.length === 0 || skillCheck(item.skills.items))
			)
		]
		callback(filteredData)
	}

	// Contains all skills currently in database
	let allSkills = []
	if (!skillLoading) {
		for (let skill of skillData.listSkills.items) {
			allSkills.push(skill.id)
		}
	}

	// onChange handler that updates form fields
	function setEmployeeInput(key, value) {
		setEmployee({ ...employee, [key]: value })
	}

	// Parse the skill entry and filter out invalid skills (empty and duplicate skills)
	function setSkillInput(value) {
		setSkillString(value)
		let newSkills = value.split(',')
		newSkills = newSkills.map((skill) => (skill.trim()));
		newSkills = newSkills.filter((elem, index) => elem && newSkills.indexOf(elem) === index)
		setSkills(newSkills)
	}

	// Add new employee and its related skills and employee-skill links to database
	const handleAddEmployee = async (e) => {
		e.preventDefault()

		setLoading(true)
		// If the id of the new employee is not unique, show warn message and stop adding it
		for (let existingEmployee of data.listEmployees.items) {
			if (existingEmployee.id === employee.id) {
				setAlert(true)
				setWarningType('warning')
				handleClear()
				return
			}
		}

		// Add new employee to database
		await addEmployee({ employee }, addOneEmployee)

		// Add new skills and skill-employee link to database
		for (let skill of skills) {
			if (!allSkills.includes(skill)) {
				allSkills.push(skill)
				await addSkill({ skill }, addOneSkill)
			}
			await addLink({ employee, skill }, addSkillOwner)
		}

		// Switch the DataTable to display all data
		callback(undefined)

		setLoading(false)

		// Show success message
		setAlert(true)
		setWarningType('success')

		// Reset all the fields
		handleClear()
		// Make sure the DataTable component is displaying updated data
		refetch()
	}

	return (
		<div>
			<Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
				<AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
					<SearchIcon style={{ marginRight: 10 }} />
					<Typography>Lookup Employee</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<div>
						<Typography> Employee Query: </Typography>
						<div>
							<TextField label='Employee ID' value={employee.id}
								onChange={event => setEmployeeInput('id', event.target.value)} />
						</div>
						<div>
							<TextField label='First Name' value={employee.firstname}
								onChange={event => setEmployeeInput('firstname', event.target.value)} />
						</div>
						<div>
							<TextField label='Last Name' value={employee.lastname}
								onChange={event => setEmployeeInput('lastname', event.target.value)} />
						</div>
						<div>
							<TextField label='Skill' value={skillString}
								onChange={event => { setSkillInput(event.target.value) }} />
						</div>
						<div>
							<Button variant='outlined' onClick={handleClear} style={{ marginTop: '20px', float: "left" }}> Clear </Button>
							<Button variant='outlined' onClick={handleSearch} style={{ marginTop: '20px', float: "right" }}> Search </Button>
						</div>
					</div>
				</AccordionDetails>
			</Accordion>
			<Accordion square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
				<AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
					<PersonAddIcon style={{ marginRight: 10 }} />
					<Typography>Add Employee</Typography>
				</AccordionSummary>
				{alert && <div><SimpleAlerts type={warningType} closeCallback={() => setAlert(false)} /></div>}
				<AccordionDetails>

					{!loading ?
						<form onSubmit={event => handleAddEmployee(event)}>
							<Typography> New Employee: </Typography>
							<div>
								<TextField label='Employee ID' value={employee.id} required
									onChange={event => setEmployeeInput('id', event.target.value)} />
							</div>
							<div>
								<TextField label='First Name' value={employee.firstname} required
									onChange={event => setEmployeeInput('firstname', event.target.value)} />
							</div>
							<div>
								<TextField label='Last Name' value={employee.lastname} required
									onChange={event => setEmployeeInput('lastname', event.target.value)} />
							</div>
							<div>
								<TextField label='Skill' value={skillString}
									onChange={event => { setSkillInput(event.target.value) }} />
							</div>
							<div>
								<Button variant='outlined' onClick={handleClear} style={{ marginTop: '20px', float: "left" }}> Clear </Button>
								<Button type='submit' variant='outlined' style={{ marginTop: '20px', float: "right" }}> Add </Button>
							</div>
						</form>
						:
						<Loader />
					}
				</AccordionDetails>
			</Accordion>
		</div>
	)
}

export default Menu