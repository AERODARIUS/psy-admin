routes {
  / {
    Routing.setPage(Page::Home)
  }

  /login {
    Routing.setPage(Page::LogIn)
  }

  * {
    Routing.setPage(Page::NotFound)
  }
}
