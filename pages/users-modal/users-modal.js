const URL = "https://jsonplaceholder.typicode.com/users/"
import { sanitizeStringWithTableRows } from "../../utils.js"


export function initUsersModal() {
  document.getElementById("tbl-body").onclick = showUserDetails
  getAllUsers()
}

export async function getAllUsers() {
  try {
    const usersFromServer = await fetch(URL).then(res => res.json())
    showAllData(usersFromServer)
  }
  catch (err) {
    console.error("UPPPPPS: " + err) //This can be done better - do it
  }
}

function showAllData(data) {
  const tableRowsArray = data.map(user => `
  <tr>                                
    <td>${user.id} </td>              
    <td>${user.name} </td>                     
    <td>${user.address.street} </td>  
    <td>${user.address.city} </td>
    <td>
    <button id="row-btn_details_${user.id}" type="button"  class="btn btn-sm btn-primary">Details</button> 
    <button id="row-btn_delete_${user.id}" type="button"  class="btn btn-sm btn-danger">Delete</button> 
    </td>      
  </tr>`)

  const tableRowsString = tableRowsArray.join("\n")
  document.getElementById("tbl-body").innerHTML = sanitizeStringWithTableRows(tableRowsString)
}

async function showUserDetails(evt) {
  const target = evt.target
  if (!target.id.startsWith("row-btn_")) {
    return
  }
  
  const parts = target.id.split("_");
  const id = parts[2]
  const btnAction = parts[1]
    if (btnAction === "details") {
      alert("Here you can Add an option to view ALL details for user with id: " + id )
    } 
    else 
    if (btnAction === "delete")  {
        alert("NOT MY RECOMMENDED STRATEGY, but here you could DELETE user with id: " + id )
    }
    
}
