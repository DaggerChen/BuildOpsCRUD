/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateEmployee = /* GraphQL */ `
  subscription OnCreateEmployee {
    onCreateEmployee {
      id
      firstname
      lastname
      skills {
        items {
          id
          employeeID
          skillID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateEmployee = /* GraphQL */ `
  subscription OnUpdateEmployee {
    onUpdateEmployee {
      id
      firstname
      lastname
      skills {
        items {
          id
          employeeID
          skillID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteEmployee = /* GraphQL */ `
  subscription OnDeleteEmployee {
    onDeleteEmployee {
      id
      firstname
      lastname
      skills {
        items {
          id
          employeeID
          skillID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateSkillOwner = /* GraphQL */ `
  subscription OnCreateSkillOwner {
    onCreateSkillOwner {
      id
      employeeID
      skillID
      employee {
        id
        firstname
        lastname
        skills {
          nextToken
        }
        createdAt
        updatedAt
      }
      skill {
        id
        name
        employees {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateSkillOwner = /* GraphQL */ `
  subscription OnUpdateSkillOwner {
    onUpdateSkillOwner {
      id
      employeeID
      skillID
      employee {
        id
        firstname
        lastname
        skills {
          nextToken
        }
        createdAt
        updatedAt
      }
      skill {
        id
        name
        employees {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteSkillOwner = /* GraphQL */ `
  subscription OnDeleteSkillOwner {
    onDeleteSkillOwner {
      id
      employeeID
      skillID
      employee {
        id
        firstname
        lastname
        skills {
          nextToken
        }
        createdAt
        updatedAt
      }
      skill {
        id
        name
        employees {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateSkill = /* GraphQL */ `
  subscription OnCreateSkill {
    onCreateSkill {
      id
      name
      employees {
        items {
          id
          employeeID
          skillID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateSkill = /* GraphQL */ `
  subscription OnUpdateSkill {
    onUpdateSkill {
      id
      name
      employees {
        items {
          id
          employeeID
          skillID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteSkill = /* GraphQL */ `
  subscription OnDeleteSkill {
    onDeleteSkill {
      id
      name
      employees {
        items {
          id
          employeeID
          skillID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
