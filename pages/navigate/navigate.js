
let handlersInitialized = false;

export function initNavigate() {
  //Clear input field from previous runs
  document.getElementById("route-to-navigate-to").value = ""
  if (!handlersInitialized) {
    document.getElementById("btn-navigate").onclick = navigateToRoute
    handlersInitialized = true
  }

  function navigateToRoute() {
    const route = document.getElementById("route-to-navigate-to").value
    window.router.navigate(route)
  }
}