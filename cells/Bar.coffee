define ['Services'], (S)->
  render: (R)->
    #{R.cell 'SearchInput'}
    """
    <span id='xoltop'>XOLTOP</span>
    #{R @options.items, (item,i)=>"
      <span class='navItemContainer'>
        <a href='#'
           class='navItem #{R i == 0 and 'selected'}'
           data-item='#{item}'>#{item.toUpperCase()}</a>
      </span>
    "}
    <span id='auth'>
      <a href='#'>Sign in</a>
      <div id='auth-login-panel'>
        <div>
          User <input type='text' id='auth-user'></input>
        </div>
        <div>
          Pass <input type='password' id='auth-pass'></input>
        </div>
        <button id='auth-button'>Sign in</button>
      </div>
    </span>
    """

  bind: do->
    doSubmit = ->
      user = @$('#auth-user').val()
      pass = @$('#auth-pass').val()

      if user.length == 0
        @$('#auth-user').toggleClass 'invalid', true
      if pass.length == 0
        @$('#auth-pass').toggleClass 'invalid', true

      if user.length + pass.length > 0
        S.auth.login user, pass, (result)->

    'keypress #auth-pass, #auth-user': ({charCode})->
      if charCode == 13 then doSubmit.call this

    'click #auth-button': doSubmit

    'hover #auth': -> @$('#auth-user').focus()

    'click .navItem': (ev)->
      @$('.navItem.selected').removeClass 'selected'
      (target = $(ev.target)).addClass 'selected'
      $(@el).trigger 'selectedItemChanged', item: $(target).attr 'data-item'
