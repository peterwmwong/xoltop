define ['Services','cell!./SignedIn','Bus'], (S, SignedIn, Bus)->

  init: ->
    Bus.bind 'auth.userLoggedOut', =>
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

      if user.length + pass.length > 0
        S.auth.login user, pass, (user)=>
          @$('#signin-button').removeAttr 'disabled'
          @$el.toggleClass 'loading', false
          if user?
            @$el.toggleClass 'selected', false
            @$el.toggleClass 'loggedin', true

    'keypress #auth-pass, #auth-user': ({charCode})->
      if charCode == 13 then doSubmit.call this


    'click #signin-toggle': ->
      @$el.toggleClass 'selected'
      if @$el.hasClass 'selected'
        @$('#auth-user, #auth-pass').val ''
        @$('#auth-user').focus()
