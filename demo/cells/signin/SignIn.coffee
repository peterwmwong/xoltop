define ['Services','cell!./SignedIn'], (S, SignedIn)->

  init: ->
    S.bus.bind 'auth.userLoggedOut', =>
      @$el.toggleClass 'loggedin', false

  'render <span>': (R,A)->
    S.auth.user (user)=>
      if user? then @$el.toggleClass 'loggedin'
      A [
        R '#signin-group',
          R 'a#signin-toggle', href:'#', 'Sign In'

          R '#input-group',
            R '.user',
              'User '
              R 'input#auth-user', type:'text'

            R '.password',
              'Pass '
              R 'input#auth-pass', type:'password'
            
            R 'span#loginFailed', 'Login Failed'
            R 'button#signin-button', 'Sign in'
              
        R SignedIn, user: user
      ]

  bind:
    'click #signin-button': doSubmit = ->
      user = @$('#auth-user').val()
      pass = @$('#auth-pass').val()

      @$('#auth-user').toggleClass 'invalid', user.length == 0
      @$('#auth-pass').toggleClass 'invalid', pass.length == 0
      @$('#signin-button').attr 'disabled', 'true'
      @$el.toggleClass 'loading', true
      @$('#loginFailed').toggle false

      if user.length + pass.length > 0
        S.auth.login user, pass, (user)=>
          @$('#signin-button').removeAttr 'disabled'
          @$el.toggleClass 'loading', false
          if user?
            @$el.toggleClass 'selected', false
            @$el.toggleClass 'loggedin', true

          failed = !user
          @$('#loginFailed').toggle failed
          @$('#auth-user').toggleClass 'invalid', failed
          @$('#auth-pass').toggleClass 'invalid', failed

    'keyup #auth-pass, #auth-user': ({which})->
      if which == 13 then doSubmit.call this


    'click #signin-toggle': ->
      @$el.toggleClass 'selected'
      if @$el.hasClass 'selected'
        @$('#auth-user, #auth-pass').val ''
        @$('#auth-user').focus()
