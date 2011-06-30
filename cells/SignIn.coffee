define ['Services'], (S)->
 'render <span>': (R)->
    """
    <a class='signin' href='#'>Sign in</a>
    <div id='auth-login-panel'>
      <div>
        User <input type='text' id='auth-user'></input>
      </div>
      <div>
        Pass <input type='password' id='auth-pass'></input>
      </div>
      <button id='auth-button'>Sign in</button>
    </div>
    """

  bind:
    'click #auth-button': doSubmit = ->
      user = @$('#auth-user').val()
      pass = @$('#auth-pass').val()

      @$('#auth-user').toggleClass 'invalid', user.length == 0
      @$('#auth-pass').toggleClass 'invalid', pass.length == 0

      if user.length + pass.length > 0
        S.auth.login user, pass, (result)->

    'keypress #auth-pass, #auth-user': ({charCode})->
      if charCode == 13 then doSubmit.call this


    'click .signin': ->
      @$el.toggleClass 'selected'
      if @$el.hasClass 'selected'
        @$('#auth-user, #auth-pass').val ''
        @$('#auth-user').focus()
