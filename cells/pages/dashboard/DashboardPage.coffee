define [
  'Services'
  'Bus'
  'cell!shared/loadingindicator/LoadingIndicator'
  'cell!./DashboardStory'
  'cell!./statusshelf/IterationChooser'
  'cell!./statusshelf/testresultsgraph/TestResultsGraph'
], (S,Bus,LoadingIndicator,DashboardStory,IterationChooser,TestResultsGraph)->

  init: ->
    @iterationNo = null

    Bus.bind 'auth.userLoggedIn', rerender = =>
      S.dashboard.getStorySummaries @iterationNo, ({iterationNo,stories})=>
        @renderStories stories

    Bus.bind 'auth.userLoggedOut', rerender
      
  renderStories: (stories)->
    user = S.auth.getUser()
    @$('.DashboardStory,.myStoryDivider').remove()

    mystories =
      if user?
        for s in stories when (s.devs? and user.initials in s.devs) or (s.testers? and user.initials in s.testers)
          @$el.append (new DashboardStory model: s).$el
          s.storynum
      else []

    if mystories.length > 0
      @$el.append $("<div class='myStoryDivider'><span class='leftTri'></span>MY STORIES</div>")

    for s in stories when s.storynum not in mystories
      @$el.append (new DashboardStory model: s).$el


  render: (R,A)->
    S.auth.user (user)=>
      S.dashboard.getStorySummaries null, ({iterationNo,stories})=>
        setTimeout (=> @renderStories stories), 0
        A """
          <div class='stats'>
            #{R.cell IterationChooser, iterationNo:iterationNo}
            #{R.cell TestResultsGraph,
                type: 'ats'
                label: 'AT'
                urlPrefix: S.getXPToolBaseUrl 'xp.failingtestsbypackage.do?runID='}
            #{R.cell TestResultsGraph,
                type: 'units'
                label: 'UNIT'
                urlPrefix: S.getXPToolBaseUrl 'unittool.failingtestsbysuite.do?testRunID='}
          </div>
          #{R.cell LoadingIndicator}
          """

  bind:
    # When a Dashboard Story is selected
    'selected .DashboardStory': ({target})->
      @$('.DashboardStory.selected').trigger('deselected')


    # When a new Interation is chosen
    'iterationNoChanged .IterationChooser': ({newIterationNo})->
      @iterationNo = newIterationNo
      @$('.DashboardStory,.myStoryDivider').remove()
      @$('.LoadingIndicator').trigger 'enable'

      # Fetch Stories for newly selected iteration
      S.dashboard.getStorySummaries @iterationNo, ({stories})=>
        @$('.LoadingIndicator').trigger 'disable'
        @renderStories stories
