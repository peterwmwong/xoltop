define ['data/MessyTestService','cell!shared/TableTree/TableTree','cell!./MessySuite','cell!./MessyTest'],
  (MessyTestService,TableTree,MessySuite,MessyTest)->

    IssueGroupProvider=
      nodeCell: cell.extend
        render: (R)->
          @model.expanded = !!@model.expanded and @model.data?.length
          $(@el).toggleClass 'expanded', @model.expanded
          isEmpty = !!@model.data?.length
          """
          <div id='expando'></div>
          <span class='count#{R isEmpty and ' red'}'>#{@model.data?.length or 0}</span>
          <a class='label#{R not isEmpty and ' isempty'}' href='#'>#{@model.type}</a>
          """
        on:
          expanded: ->
            if !!@model.data?.length
              $(@el).toggleClass 'expanded', @model.expanded

      getChildren: ->
        if @data instanceof Array
          for i in @data
            i.type = 'issue'
            i

    IssueProvider = do->
      format = (o)->
          if typeof o == 'string' and
              (o == '' or
                (isNaN(new Number(o)) and
                  (o != 'true' and o != 'false')))
            "\"#{o}\""
          else
            o
      nodeCell: cell.extend
        render: ->
          """
          <span class='name'>#{@model.fieldName}</span>
          <span class='diff'>#{format @model.before}</span>
          <span class='diffArrow'>&gt</span>
          <span class='diff after'>#{format @model.after}</span>
          """

    dataProviders = do->
      issueGroups = ['DbTable','SysProps','UserProps','ConfigDistrict','ConfigSite','ConfigSiteDefaults']
      ->
        _:
          data: {id: 'Messy'}
          getChildren: (done)->
            MessyTestService.getSuites (suites)->
              done do-> for s in suites
                {type: 'Suite', data: s}

        Suite:
          nodeCell: MessySuite
          getChildren: (done)->
            MessyTestService.getTests @data.suitename,(rs)->
              done do-> for t in rs
                {type: 'Test', suiteName: t.suitename, data:t}
        Test:
          nodeCell: MessyTest
          getChildren: (done)->
            MessyTestService.getTestDetails @data.testnumber,(rs)->
              result = []
              for p in issueGroups when !!(rs[p]?.length)
                result.push {type: p, data:rs[p], expanded:true}
              done result

        DbTable: IssueGroupProvider
        SysProps: IssueGroupProvider
        UserProps: IssueGroupProvider
        ConfigDistrict: IssueGroupProvider
        ConfigSite: IssueGroupProvider
        ConfigSiteDefaults: IssueGroupProvider
        issue: IssueProvider

    render: (R)->
      R TableTree,
          id:'Messy'
          cols: ['Chump Tasks']
          dataProviders: dataProviders()
