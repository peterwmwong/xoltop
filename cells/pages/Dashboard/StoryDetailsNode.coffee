efine ['cell!./TestDetails','cell!./TaskDetails'], (TestDetails,TaskDetails)->
  render: (R)->
    console.log 'StoryDetailsNode'
    """
    <div class='StoryDetails'>
      Description blah blah blah
    </div>
    #{R TestDetails, model: @model}
    #{R TaskDetails, model: @model}
    """

  bind:
    changeDetails: ->
      console.log 'change details'
      false
