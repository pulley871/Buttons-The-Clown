import { saveServiceEntry } from "./dataAccess.js"


export const ReservationForm = () =>{
    return `
    <div class="field">
        <label class="label" for="parentName">Parent Name</label>
        <input type="text" name="parentName" id="input__parent"class="input" />
    </div>
    <div class="field">
        <label class="label" for="childName">Child Name</label>
        <input type="text" name="childName" id="input__child"class="input" />
    </div>
    <div class="field">
        <label class="label" for="attendees">Total Attendees</label>
        <input type="number" name="attendees" id="input__attendees"class="input" />
    </div>
    <div class="field">
        <label class="label" for="partyAddress">Address</label>
        <input type="text" name="partyAddress" id="input__address"class="input" />
    </div>
    <div class="field">
        <label class="label" for="partyDate">Date needed</label>
        <input type="date" name="partyDate" id="input__partyDate"class="input" />
    </div>
    <div class="field">
        <label class="label" for="partyLength">Length(hours)</label>
        <input type="number" name="partyLength" id="input__hours"class="input" />
    </div>
    <button class="button" id="submitRequest">Submit Request</button>

    `
}
// "parentName": "James",
//             "childName": "Billy",
//             "totalAttendies": 30,
//             "partyAddress": "100 North Avenue Clarksville Tn 37042",
//             "partyDate": "01/14/21",
//             "partyLength": 5

const postRequest = () =>{
    const parentName = document.getElementById("input__parent").value
    const childName = document.getElementById("input__child").value
    const totalAttendies = document.getElementById("input__attendees").value
    const partyAddress = document.getElementById("input__address").value
    const partyDate = document.getElementById("input__partyDate").value
    const partyLength = document.getElementById("input__hours").value
    
    const request = {
        "parentName": parentName,
        "childName": childName,
        "totalAttendies": totalAttendies,
        "partyAddress": partyAddress,
        "partyDate": partyDate,
        "partyLength": partyLength
    }
    saveServiceEntry(request)
}

document.addEventListener(
    "click",
    (event) =>{
        if (event.target.id === "submitRequest"){
            postRequest()
            
        }
    }
)