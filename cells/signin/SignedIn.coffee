define ['Services','Bus','cell!shared/InitialsList'], (S,Bus,InitialsList)->

  updateUser = ->
    u = S.auth.getUser()
    @$('.InitialsList').remove()
    @$('#username')
      .html( u.loginName.toUpperCase() )
      .after( new InitialsList(initials: (u and [u.initials] or [])).el )


  init: ->
    Bus.bind 'auth.userLoggedIn', => updateUser.call this

  'render <span>': (R)->
    """
    <a id='username' href='#'></a>
    <div id='options-group'>
      <button id='signout-button'>Sign Out</button>
    </div>
    """

  bind:
    afterRender: updateUser

    'click #signout-button': ->
      S.auth.logout()
      @$el.toggleClass 'expanded', false

    'click #username': ->
      @$el.toggleClass 'expanded'
