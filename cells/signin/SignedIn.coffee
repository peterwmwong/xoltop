define ['Services','Bus'], (S,Bus)->

  init: ->
    Bus.bind 'auth.userLoggedIn', ({user})=>
      @$('#username').html user.loginName

  'render <span>': (R)->
    """
    <a id='username' href='#'></a>
    <div id='options-group'>
      <button id='signout-button'>Sign Out</button>
    </div>
    """

  bind:
    'click #signout-button': ->
      S.auth.logout()
      @$el.toggleClass 'expanded', false

    'click #username': ->
      @$el.toggleClass 'expanded'
