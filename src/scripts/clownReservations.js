import { deleteRequest, getClowns, getRequest, PostCompletedParty } from "./dataAccess.js";



export const ReservationList = () => {
    let htmlString = ""
    const requests = getRequest().map((request) =>{
        if(request.isCompleted === false){
            return `
                    <div class="reservation--${request.id}">
                        <h3>${request.childName}'s Party</h3>
                        <ul>
                            <li>Parent Name: ${request.parentName}</li>
                            <li>Total Attendies: ${request.totalAttendies}</li>
                            <li>Party Length: ${request.partyLength} hours</li>
                            <li>Party Date: ${request.partyDate}</li>
                            <li>Party Address: ${request.partyAddress}</li>
                            <li>
                                <label class="label" for="employeeSelection">Select Clown</label>
                                <select name="employeeSelection" id="clowns">
                                    ${getClowns().map((clown)=>{
                                        return `<option value="${request.id}--${clown.id}">${clown.firstName} ${clown.lastName}</option>`
                                    }).join("")}
                                </select>
                            </li>
                        </ul>
                        <button class="button" id="completedParty--${request.id}"value="${request.id}--">Completed</button>
                        <button class="button" id="deleteParty--${request.id}">Delete</button>
                    </div>
                    `
        }else{
            return `<div class="completedParty"><h2>Party:${request.id}</h2><p>${request.parentName}</div>`
        }       
    })
    htmlString += requests.join("")
    return htmlString
}


document.addEventListener("change",
    (event)=>{
        if (event.target.id = "clowns"){
            const [requestId, clownId] = event.target.value.split("--")
            const partyObject = {
                employeeId: parseInt(clownId),
                partyNumber: parseInt(requestId),
                date: new Date(Date.now()).toString().substr(4, 11)
            }
            PostCompletedParty(partyObject)
        }
    })
document.addEventListener("click",
    (event)=>{
        if (event.target.id.startsWith("deleteParty--")){
            const [,eventId] = event.target.id.split("--")
            deleteRequest(parseInt(eventId))
        }
    })
// "parentName": "James",
//             "childName": "Billy",
//             "totalAttendies": 30,
//             "partyAddress": "100 North Avenue Clarksville Tn 37042",
//             "partyDate": "01/14/21",
//             "partyLength": 5