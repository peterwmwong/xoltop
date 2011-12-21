define ['Services','cell!shared/InitialsList'], (S,InitialsList)->

  updateUser = ->
    u = S.auth.getUser()
    if u?
      @$('.InitialsList').remove()
      @$('#username')
        .html( u.loginName.toUpperCase() )
        .after( new InitialsList(initials: (u and [u.initials] or [])).el )


  init: ->
    S.bus.bind 'auth.userLoggedIn', => updateUser.call this

  'render <span>': (_)-> [
    _ 'a#username', href:'#'
    _ '#options-group',
      _ 'button#signout-button', 'Sign Out'
  ]

  on:
    afterRender: updateUser

    'click #signout-button': ->
      S.auth.logout()
      @$el.toggleClass 'expanded', false

    'click #username': ->
      @$el.toggleClass 'expanded'
