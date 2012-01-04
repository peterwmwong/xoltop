define [
  'data/MessyTestService'
  'cell!shared/page/SectionTitle'
  'cell!shared/tabletree/TableTree'
  'cell!./MessySuite'
  'cell!./MessyTest'
], (MessyTestService,SectionTitle,TableTree,MessySuite,MessyTest)->

    IssueGroupProvider=
      nodeCell: cell.extend
        tag: '<div class="issueGroup">'
        init: ->
          @model.expanded = !!@model.expanded and @model.data?.length
        render: (_)->
          @$el.toggleClass 'expanded', @model.expanded
          isEmpty = !!@model.data?.length
          [
            _ '#expando'
            _ "span.count#{isEmpty and '.red' or ''}",
              @model.data?.length or 0
            _ "a.label#{not isEmpty and '.isempty' or ''}", href:'#',
              @model.type
          ]

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
        render: (_)->[
          _ 'span.name', @model.fieldName
          _ 'span.diff', format @model.before
          _ 'span.diffArrow', '>'
          _ 'span.diff.after', format @model.after
        ]

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

    render: (_)-> [
      _ SectionTitle,
          title: 'Messy Tests',
          description: "Tests that don't pick up after themselves"
      _ TableTree,
          id:'Messy'
          cols: ['Chump Tasks']
          dataProviders: dataProviders()
    ]
   
