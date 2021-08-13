import { ReservationForm } from "./clownReservationForm.js"
import { ReservationList } from "./clownReservations.js"




export const BcClowns = () =>{
    return `
        <section class="reservations">
            <article class="reservations__form>
                ${ReservationForm()}
            </article>
            <article class="reservations__list>
                ${ReservationList()}
            </article>
        </section>
    `
}
