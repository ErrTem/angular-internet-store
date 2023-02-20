export interface User {
  uid?: string,
  email: string,
  password: string,
  returnSecureToken?: boolean,
  displayName?: string,
  photoURL?: string,
  emailVerified?: boolean,
}
