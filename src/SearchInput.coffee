define
  render: (R)->
    """
    <div id='searchInputContainer'>
      <input id='searchinput' type='text' placeholder='#{R @options.placeholder or 'Search'}'></input>
    </div>
    <div id='searchIcon'>
      <div id='circle'></div>
      <div id='rect'></div>
    </div>
    """
