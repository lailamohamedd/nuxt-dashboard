export default function (to, from, next) {
  const userCookie = useCookie("user").value;

  if (!userCookie && to.name === "profile") {
    return navigateTo("/");
  }

  next(); 
}
