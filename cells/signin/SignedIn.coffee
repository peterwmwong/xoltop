define ['Services','cell!shared/InitialsList'], (S,InitialsList)->

  updateUser = ->
    u = S.auth.getUser()
    if u?
      @$('.InitialsList').remove()
      @$('#username')
        .html( u.loginName.toUpperCase() )
        .after( new InitialsList(initials: (u and [u.initials] or [])).el )

  tag: 'span'

  init: ->
    S.bus.bind 'auth.userLoggedIn', => updateUser.call this

  render: (_)-> [
    _ 'a#username', href:'#'
    _ '#options-group',
      _ 'button#signout-button', 'Sign Out'
  ]

  afterRender: updateUser

  on:
    'click #signout-button': ->
      S.auth.logout()
      @$el.toggleClass 'expanded', false

    'click #username': ->
      @$el.toggleClass 'expanded'
