const FIELD_ID  = 0
const FIELD_NAME = 1
const FIELD_DESCRIPTION = 2
const FIELD_OWNER = 3
const FIELD_BALANCE = 4
const FIELD_TOTAL_DONATIONS = 5

export const serializeProject = (projectData) => {
    return {
        id: projectData[FIELD_ID],
        name: projectData[FIELD_NAME],
        description: projectData[FIELD_DESCRIPTION],
        owner: projectData[FIELD_OWNER],
        balance: projectData[FIELD_BALANCE],
        totalDonations: projectData[FIELD_TOTAL_DONATIONS],
    }
}
