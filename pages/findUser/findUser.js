//Add id to this URL to get a single user
const URL = "https://jsonplaceholder.typicode.com/users/"

let userDetails = null
let handlersInitialized = false

export async function initFindUser(match) {
  //Clear input field from previous runs
  document.getElementById("user-details").innerHTML = ""
  if (!handlersInitialized) {
    userDetails =document.getElementById("user-details")
    document.getElementById("btn-fetch-user").addEventListener("click",getUser)
    handlersInitialized = true
  }
  //Check if userID is provided via a query parameter and if, use it to fetch and render user
  if (match?.params?.id) {
    const id = match.params.id
    document.getElementById("user-details").innerHTML = ""
    fetchAndRenderUser(id)
  }
}

const navigoRoute = "find-user"
async function getUser(evt) {
  evt.preventDefault()
  fetchAndRenderUser()
}

//Get the user from the input field, or via the ID provided via the URL, and render it
async function fetchAndRenderUser(idFromURL) {

  const id = idFromURL ? idFromURL : document.getElementById("user-id-input").value
  if (!id) {
    userDetails.innerHTML = ""
    appendParagraph(userDetails, "Please provide an id", "color:red")
    return
  }
  try {
    const user = await fetch(URL + id).then(res => res.json())

    //The Dummy API we are using) returns an empty object for users not found, NOT an error
    if (Object.keys(user).length === 0) {  //checks for an empty object = {}
      throw new Error("No user found for id:" + id)
    }

    userDetails.innerHTML = ""
    //Build the DOM with the user details
    appendParagraph(userDetails, "id: " + user.id)
    appendParagraph(userDetails, "name: " + user.name)
    appendParagraph(userDetails, "email: " + user.email)
    appendParagraph(userDetails, "phone: " + user.phone)
    appendParagraph(userDetails, "street: " + user.address.street)
    appendParagraph(userDetails, "city: " + user.address.city)
    appendParagraph(userDetails, "zipcode: " + user.address.zipcode)
    //Next two lines --> Update the URL in the browser, but do not call the handler (Remove if you don't care)
    const queryString = "?id=" + id
    window.router.navigate(`/${navigoRoute}${queryString}`, { callHandler: false, updateBrowserURL: true })
  } catch (err) {
    userDetails.innerHTML = ""
    appendParagraph(userDetailsParagraph, "Could not find user: " + id, "color:red")
  }
}


//Helper function to append a p-tag to a given parent, with a given text and optional style
function appendParagraph(outerElement, value, style) {
  let p = document.createElement("p");
  p.textContent = value;
  if (style) {
    p.style = style
  }
  outerElement.appendChild(p);
}