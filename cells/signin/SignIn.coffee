define ['Services','cell!./SignedIn'], (S, SignedIn)->

  init: ->
    S.bus.bind 'auth.userLoggedOut', =>
      @$el.toggleClass 'loggedin', false

  'render <span>': (R,A)->
    S.auth.user (user)=>
      if user? then @$el.toggleClass 'loggedin'
      A """
        <div id='signin-group'>
          <a id='signin-toggle' href='#'>Sign in</a>
          <div id='input-group'>
            <div>
              User <input type='text' id='auth-user'></input>
            </div>
            <div>
              Pass <input type='password' id='auth-pass'></input>
            </div>
            <span id='loginFailed'>Login Failed</span>
            <button id='signin-button'>Sign in</button>
          </div>
        </div>
        #{R.cell SignedIn, user: user}
        """

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
