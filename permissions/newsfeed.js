import ROLES from "./role.js";
import prisma from "../prisma/client/client.js";



function canUpdateNewsfeed(loggedUser, newsfeedAuthorId) {
  return (
    loggedUser.role === ROLES.ADMIN ||
    (loggedUser.id === newsfeedAuthorId && [ROLES.MENTOR, ROLES.SPONSOR].includes(loggedUser.role))
  );
}

function canDeleteNewsfeed(loggedUser, newsfeedAuthorId) {
  return (
    loggedUser.role === ROLES.ADMIN ||
    (loggedUser.id === newsfeedAuthorId && [ROLES.MENTOR, ROLES.SPONSOR].includes(loggedUser.role))
  );
}



export {canDeleteNewsfeed, canUpdateNewsfeed}
  