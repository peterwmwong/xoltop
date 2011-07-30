define [
  'Services'
  'cell!shared/loadingindicator/LoadingIndicator'
  'cell!./DashboardStory'
  'cell!./statusshelf/IterationChooser'
  'cell!./statusshelf/testresultsgraph/TestResultsGraph'
  'cell!shared/InitialsList'
], (S,LoadingIndicator,DashboardStory,IterationChooser,TestResultsGraph,InitialsList)->

  init: ->
    @iterationNo = null

    S.bus.bind
      'auth.userLoggedIn': rerender = =>
        S.dashboard.getStorySummaries @iterationNo, ({iterationNo,stories})=>
          @renderStories stories
      'auth.userLoggedOut': rerender
      
  renderStories: (stories)->
    user = S.auth.getUser()
    @$('.DashboardStory').remove()

    mystories =
      if user?
        for s in stories when (s.devs? and user.initials in s.devs) or (s.testers? and user.initials in s.testers)
          @$el.append (new DashboardStory model: s).$el
          s.storynum
      else []

    if mystories.length > 0
      @$('.myStoryDivider .InitialsList').remove()
      @$('.myStoryDivider > .leftTri').after(new InitialsList(initials:user and [user.initials] or []).el)
      @$('.myStoryDivider').toggle true
      @$el.append @$('.myStoryDivider')
    else
      @$('.myStoryDivider').toggle false

    for s in stories when s.storynum not in mystories
      @$el.append (new DashboardStory model: s).$el


  render: (R,A)->
    S.auth.user (user)=>
      S.dashboard.getStorySummaries null, ({iterationNo,stories})=>
        setTimeout (=> @renderStories stories), 0
        A [
          R '.myStoryDivider',
            R 'span.leftTri'
            'STORIES'

          R '.stats',
            R IterationChooser, iterationNo:iterationNo
            R TestResultsGraph,
                type: 'ats'
                label: 'AT'
                urlPrefix: S.getXPToolBaseUrl 'xp.failingtestsbypackage.do?runID='
            R TestResultsGraph,
                type: 'units'
                label: 'UNIT'
                urlPrefix: S.getXPToolBaseUrl 'unittool.failingtestsbysuite.do?testRunID='

          R LoadingIndicator
        ]

  bind:
    # When a Dashboard Story is selected
    'selected .DashboardStory': ({target})->
      @$('.DashboardStory.selected').trigger('deselected')


    # When a new Interation is chosen
    'iterationNoChanged .IterationChooser': ({newIterationNo})->
      @iterationNo = newIterationNo
      @$('.DashboardStory').remove()
      @$('.LoadingIndicator').trigger 'enable'

      # Fetch Stories for newly selected iteration
      S.dashboard.getStorySummaries @iterationNo, ({stories})=>
        @$('.LoadingIndicator').trigger 'disable'
        @renderStories stories
