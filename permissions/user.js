import ROLES from "./role.js";

//canViewUserProfile takes loggedIn user and the userId of the user that the loggedIn user want to see and will return true if he  is allowed else false
function canViewUserProfile(loggedUser, viewedUserId) {
    viewedUserId= parseInt(viewedUserId)
    return (
        loggedUser.role === ROLES.ADMIN ||
        loggedUser.role === ROLES.MENTOR ||
        loggedUser.id === viewedUserId
    )
  }

//canUpdateUserProfile will provide update permission of user profile
function canUpdateUserProfile(loggedUser, viewedUserId) {
    viewedUserId= parseInt(viewedUserId)
    return (
      loggedUser.role === ROLES.ADMIN ||
      loggedUser.id === viewedUserId
    )
  }

//canDeleteUserProfile will provide delete persmission
function canDeleteUserProfile(loggedUser) {
    return (
      loggedUser.role === ROLES.ADMIN 
    )
  }

export {canDeleteUserProfile, canUpdateUserProfile, canViewUserProfile}
  