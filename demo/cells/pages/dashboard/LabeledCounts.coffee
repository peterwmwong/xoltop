define
  init: ->
    @options.showIfZero ?= []

  render: (R)-> [
    R '.triangle'

    R '.label', href: '#', do=> @options.label

    R '.counts',
      for type, count of @options.counts when count > 0 or type in @options.showIfZero
        R ".#{type}.count", count
  ]
