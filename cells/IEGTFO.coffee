define ->
  render: (_)-> [
    _ '.pls',
      "Please use another browser."
      _ '.ftlog.ftlog2',
        'chrome, firefox, safari, mobile safari, opera, or '
        _ 'span', "any browser that doesn't suck",
        '.'
    _ 'div', '☑ Saddam Hussein'
    _ 'div', '☑ Osama Bin Laden'
    _ 'div.ie', '☐ ',
      _ 'span', 'Internet Explorer'
  ]

