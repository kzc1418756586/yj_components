import { storage, tokenTableName } from "@/config";

/**
 * @author
 * @description 获取accessToken
 * @returns {string|ActiveX.IXMLDOMNode|Promise<any>|any|IDBRequest<any>|MediaKeyStatus|FormDataEntryValue|Function|Promise<Credential | null>}
 */
export function getAccessToken() {
  if (storage) {
    if (storage === "localStorage") {
      return localStorage.getItem(tokenTableName);
    } else if (storage === "sessionStorage") {
      return sessionStorage.getItem(tokenTableName);
    } else {
      return localStorage.getItem(tokenTableName);
    }
  } else {
    return localStorage.getItem(tokenTableName);
  }
}

/**
 * @author
 * @description 存储accessToken
 * @param accessToken
 * @returns {void|*}
 */
export function setAccessToken(accessToken) {
  if (storage) {
    if (storage === "localStorage") {
      return localStorage.setItem(tokenTableName, accessToken);
    } else if (storage === "sessionStorage") {
      return sessionStorage.setItem(tokenTableName, accessToken);
    } else {
      return localStorage.setItem(tokenTableName, accessToken);
    }
  } else {
    return localStorage.setItem(tokenTableName, accessToken);
  }
}

/**
 * @author
 * @description 移除accessToken
 * @returns {void|Promise<void>}
 */
export function removeAccessToken() {
  if (storage) {
    if (storage === "localStorage") {
      return localStorage.removeItem(tokenTableName);
    } else if (storage === "sessionStorage") {
      return sessionStorage.clear();
    } else {
      return localStorage.removeItem(tokenTableName);
    }
  } else {
    return localStorage.removeItem(tokenTableName);
  }
}
