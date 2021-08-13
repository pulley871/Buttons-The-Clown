import { BcClowns } from "./bcClowns.js";
import { fetchCompletedPartys, fetchEmployees, fetchRequests } from "./dataAccess.js";


const mainContainer = document.querySelector("#mainContainer")


const renderHTML = () => {
    fetchEmployees()
    fetchCompletedPartys()
    fetchRequests()
    .then(

        () =>{
            mainContainer.innerHTML = BcClowns()

        }
    )
}

renderHTML();
document.addEventListener("stateChanged", event => {
    console.log("State of data has changed. Regenerating HTML...")
    renderHTML()
})