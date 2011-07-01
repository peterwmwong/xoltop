define do->
  bus = $ document.createElement()
  
  trigger: (ev)-> bus.trigger ev
  one: (type, cb)-> bus.one type, cb
  bind: (type, cb)-> bus.bind type, cb
  unbind: (type, cb)->
    # You MUST specify a handler to be unbound
    # Prevent all handlers of {type} from being unbound
    if typeof cb == 'function'
      bus.unbind type, cb
