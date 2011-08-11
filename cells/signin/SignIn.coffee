define ['Services','cell!./SignedIn'], (S, SignedIn)->

  init: ->
    S.bus.bind 'auth.userLoggedOut', =>
      @$el.toggleClass 'loggedin', false

  'render <span>': (_,A)->
    S.auth.user (user)=>
      if user? then @$el.toggleClass 'loggedin'
      A [
        _ '#signin-group',
          _ 'a#signin-toggle', href:'#', 'Sign In'

          _ '#input-group',
            _ '.user',
              'User '
              _ 'input#auth-user', type:'text'

            _ '.password',
              'Pass '
              _ 'input#auth-pass', type:'password'
            
            _ 'span#loginFailed', 'Login Failed'
            _ 'button#signin-button', 'Sign in'
              
        _ SignedIn, user: user
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
