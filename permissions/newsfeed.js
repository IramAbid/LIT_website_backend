import ROLES from "./role.js";

function canViewNewsfeed(loggedUser, ViewedUserId) {
    viewedUserId= parseInt(viewedUserId)
    return (
        loggedUser.role === ROLES.ADMIN ||
        loggedUser.role === ROLES.MENTOR ||loggedUser.role == ROLES.SPONSOR||
        loggedUser.id === addUserId
    )
  }


function canUpdateNewsfeed(loggedUser, viewedUserId) {
    viewedUserId= parseInt(viewedUserId)
    return (
      loggedUser.role === ROLES.ADMIN ||
      loggedUser.id === viewedUserId
    )
  }


function canDeleteNewsfeed(loggedUser) {
    return (
      loggedUser.role === ROLES.ADMIN  ||
      loggedUser.id === viewedUserId
    )
  }

export {canDeleteNewsfeed, canUpdateNewsfeed, canViewNewsfeed}
  