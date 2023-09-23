

export function showMatchObject(match) {
  document.getElementById("p-match").innerHTML = `<pre>${JSON.stringify(match, null, 2)}</pre>`
}