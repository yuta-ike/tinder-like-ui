export const isIOSChrome = () => {
  const userAgent = window.navigator.userAgent.toLowerCase()
  const isChrome =
    userAgent.indexOf("edge") < 0 &&
    userAgent.indexOf("edga") < 0 &&
    userAgent.indexOf("edgios") < 0 &&
    userAgent.indexOf("opera") < 0 &&
    userAgent.indexOf("opr") < 0 &&
    (0 <= userAgent.indexOf("chrome") || 0 <= userAgent.indexOf("crios"))
  const isIOS = userAgent.indexOf("iphone") !== -1 || userAgent.indexOf("ipad") !== -1
  return isChrome && isIOS
}
