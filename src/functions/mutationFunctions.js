import { listEmployees } from '../graphql/queries';
import gql from "graphql-tag";


export async function addLink({ employee, skill }, addSkillOwner) {
	await addSkillOwner({
		variables: {
			input: {
				id: 'E' + employee.id + 'S' + skill,
				employeeID: employee.id,
				skillID: skill
			}
		},
		refetchQueries: [{ query: gql(listEmployees) }]
	}).catch((err) => {
		console.log(err)
	})
}

export async function addSkill({ skill }, addSkill) {
	await addSkill({
		variables: {
			input: {
				id: skill,
				name: skill
			}
		}
	})
}

export async function addEmployee({ employee }, addEmployee) {
	await addEmployee({
		variables: {
			input: {
				id: employee.id,
				firstname: employee.firstname,
				lastname: employee.lastname,
			}
		},
	})
}

export async function removeEmployee({ employeeID }, removeEmployee) {
	await removeEmployee({
		variables: {
			input: {
				id: employeeID
			}
		},
		update: (cache, { data: { removeEmployee } }) => {
			const query = gql(listEmployees);
			const data = cache.readQuery({ query });
			data.listEmployees.items = [
				...data.listEmployees.items.filter(item =>
					item.id !== employeeID)
			];
			cache.writeQuery({ query, data });
		}
	})
}

export async function removeLink({ employee, skill }, deleteLink) {
	await deleteLink({
		variables: {
			input: {
				id: 'E' + employee.id + 'S' + skill
			}
		}
	})
}

export async function editEmployee({ employee }, updateEmployee) {
	await updateEmployee({
		variables: {
			input: {
				id: employee.id,
				firstname: employee.firstname,
				lastname: employee.lastname,
			}
		}
	})
}


