const applicationState = {
    partyResorvations:[],
    completedPartys:[],
    employees:[]
}

const API = "http://localhost:8088"
//fetch list of request
export const fetchRequests = () => {
    return fetch(`${API}/partyResorvations`)
        .then(response => response.json())
        .then(
            (partyRequest) => {
                // Store the external state in application state
                applicationState.partyResorvations = partyRequest
            }
        )
}
// fetch parties
export const fetchCompletedPartys = () => {
    return fetch(`${API}/completedPartys`)
        .then(response => response.json())
        .then(
            (completedParty) => {
                // Store the external state in application state
                applicationState.completedPartys = completedParty
            }
        )
}
//fetch employees
export const fetchEmployees = () => {
    return fetch(`${API}/employees`)
        .then(response => response.json())
        .then(
            (employee) => {
                // Store the external state in application state
                applicationState.employees = employee
            }
        )
}
// save entry
export const saveServiceEntry = (entryObject) =>{
    // Use `fetch` with the POST method to add your entry to your API
    fetch(`${API}/partyResorvations`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(entryObject)
    })
        .then(
            () => {
                //  Get all journal entries
                getRequest()
            }
        )
        .then(
            () => {
                document.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )

}
export const PostCompletedParty = (partyObject) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(partyObject)
    }


    return fetch(`${API}/completedPartys`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            document.dispatchEvent(new CustomEvent("stateChanged"))
        })
}
//delete items
export const deleteRequest = (id) => {
    return fetch(`${API}/partyResorvations/${id}`, {method: "DELETE"})
    .then(()=>{document.dispatchEvent(new CustomEvent("stateChanged"))})
}

export const getRequest = () => {
    //return applicationState.partyResorvations.map((reservation) => ({...reservation}))
    const mappedRequest = applicationState.partyResorvations.map(party =>{
        party.isCompleted = !!applicationState.completedPartys.find((completedParty)=>{
            return party.id === completedParty.partyNumber
        })
        return party
    })
    return mappedRequest.sort((a,b)=> a.isCompleted - b.isCompleted)
}

export const getClowns = () =>{
    return applicationState.employees.map((employee)=>({...employee}))
}