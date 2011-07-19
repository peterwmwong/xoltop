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

  'render <span>': (R)-> [
    R 'a#username', href:'#'
    R '#options-group',
      R 'button#signout-button', 'Sign Out'
  ]

  bind:
    afterRender: updateUser

    'click #signout-button': ->
      S.auth.logout()
      @$el.toggleClass 'expanded', false

    'click #username': ->
      @$el.toggleClass 'expanded'
