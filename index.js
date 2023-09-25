import "https://unpkg.com/navigo"  //Will create the global Navigo object used below
import "https://cdnjs.cloudflare.com/ajax/libs/dompurify/2.4.0/purify.min.js"

import {
  setActiveLink, renderHtml, loadHtml
} from "./utils.js"

import { initNavigate } from "./pages/navigate/navigate.js"
import { showMatchObject } from "./pages/show-match/match.js"
import { initUsersModal } from "./pages/users-modal/users-modal.js"
import { initUsers } from "./pages/users-navigate/users.js"
import { initFindUser } from "./pages/findUser/findUser.js"
import { demo1 } from "./pages/demo1/demo1.js"

window.addEventListener("load", async () => {

  const templateAbout = await loadHtml("./pages/about/about.html")
  const templateUsersModal = await loadHtml("./pages/users-modal/users-modal.html")
  const templateUsersNavigate = await loadHtml("./pages/users-navigate/users.html")
  const templateFindUser = await loadHtml("./pages/findUser/findUser.html")
  const templateNavigate = await loadHtml("./pages/navigate/navigate.html")
  const templateMatch = await loadHtml("./pages/show-match/match.html")
  const templateNotFound = await loadHtml("./pages/notFound/notFound.html")
  const templateDemo1 = await loadHtml("./pages/demo1/demo1.html")

  
  const router = new Navigo("/",{hash:true});
  //Not especially nice, BUT MEANT to simplify things. Make the router global so it can be accessed from all js-files
  window.router = router
 

  router
    .hooks({
      before(done, match) {
        setActiveLink("menu", match.url)
        done()
      }
    })
    .on({
      //For very simple "templates", you can just insert your HTML directly like below
      "/": () => document.getElementById("content").innerHTML =
        `<h2>Home</h2>
      <p style='margin-top:2em'>
      This is the content of the Home Route <br/>
      Observe that since this is so simple  all HTML is added in the on-handler for the route. 
      and not in a separate file.
      </p>
     `,
      "/about": () => renderHtml(templateAbout, "content"),

      "/users-modal": () => {
        renderHtml(templateUsersModal, "content")
        initUsersModal()
      },
      "/users-navigate": () => {
        renderHtml(templateUsersNavigate, "content")
        initUsers()
      },
      "/find-user": (match) => {
        renderHtml(templateFindUser, "content")
        initFindUser(match)
      },

      "/navigate-programatically": () => {
        renderHtml(templateNavigate, "content")
        initNavigate()
      },

      "/show-match": (match) => {
        renderHtml(templateMatch, "content")
        showMatchObject(match)
      },
      "/demo1": (match) => {
        renderHtml(templateDemo1, "content")
        demo1()
      }
    })
    .notFound(() => {
      renderHtml(templateNotFound, "content")
    })
    .resolve()
});


window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
  alert('Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber
    + ' Column: ' + column + ' StackTrace: ' + errorObj);
}