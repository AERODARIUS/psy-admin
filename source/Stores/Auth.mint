enum UserStatus {
  LoggedIn(User)
  LoggedOut
}

store Auth {
  state user : UserStatus = UserStatus::LoggedOut

  fun setUser (currentUser : UserStatus) : Promise(Never, Void) {
    next { user = currentUser }
  }
}
