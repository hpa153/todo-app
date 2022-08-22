export const safeToLocalStorage = (key: string, value: any): void => {
  window.localStorage.setItem(key, JSON.stringify(value));
}