component Content {
  connect Routing exposing { page }

  fun render : Html {
    case (page) {
      Page::Initial => Html.empty()

      Page::Home => <Pages.Home/>

      Page::LogIn => <Pages.LogIn/>

      Page::NotFound => <Pages.NotFound/>
    }
  }
}

component Main {
  style base {
    font-weight: bold;
    font-size: 50px;

    justify-content: center;
    align-items: center;
    display: flex;
    height: 100vh;
    width: 100vw;
  }

  fun render : Html {
    <div::base class="container-fluid">
      <Content/>
    </div>
  }
}
