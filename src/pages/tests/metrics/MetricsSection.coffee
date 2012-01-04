define [
  'data/MetricsService'
  'cell!./MetricsNode'
  'cell!shared/page/SectionTitle'
  'cell!shared/tabletree/TableTree'
], (MetricsService,MetricsNode,SectionTitle,TableTree)->

  ReleaseCol = cell.extend
    tag: '<span>'
    render: (_)-> [
      _ 'span.ats',
        _ 'span.count', @model.ats
        'Tests'
      _ 'span.chumpTasks' ,
        _ 'span.count', @model.chumpTasks
        'Tasks'
    ]

  extend = (destObj, srcObj)->
    destObj[p] = srcObj[p] for p of srcObj
    destObj

  dataProviders=
    _: do->
      releaseVerRegex = /(v|V)([1-9]\d*\.\d)/
      getReleaseVer = (rel)->
        new Number releaseVerRegex.exec(rel?.toLowerCase())?[2]

      sortRelVer = (l)->
        l.sort (a,b)->
          getReleaseVer(b.name) - getReleaseVer(a.name)

      data: {id: 'ReleasesID'}
      getChildren: (done)->
        MetricsService.getReleases (rs)->
          count = 0
          done ({expanded: not count++ and true or false,type:'release',id:_.id,data:_} for _ in sortRelVer(rs))

    release:
      nodeCell: MetricsNode.extend(nameLabel:'Release', countColCell: ReleaseCol)
      getChildren: (done)->
        MetricsService.getReleaseIterations @id, (iters)=>
          done ({type:'iteration',id:_.id,data:extend(_,release:@id,parent:@data)} for _ in iters.sort((a,b)->b.id-a.id))

    iteration:
      nodeCell: MetricsNode.extend(nameLabel:'Iteration ')
      noChildrenCell: cell.extend
        tag: "<div class='nochildren'>"
        render: -> ['No stories']
      getChildren: (done)->
        MetricsService.getReleaseIterationStories
          release:@release
          iteration:@id
          (stories)=>
             done ({type:'story',id:_.id.toString(),data: extend(_, parent:@data)} for _ in stories)

    chump:
      nodeCell: MetricsNode
      getChildren: (done)->
        MetricsService.getReleaseChumpStories
          release:@data.release
          chump:@id
          (stories)=>
            done ({type:'story',id:_.id.toString(),data: extend(_, parent:@data)} for _ in stories)

    story:
      nodeCell: MetricsNode.extend
        nameColCell: cell.extend
          tag: "<span class='nameContainer'>"
          render: (_)->
            url = "http://destinyxptool/xptool/projecttool/projecttool.storyview.do?storyNumber=#{@model.data.id}"
            [
              _ 'a', target:'_blank', href:'#', onclick:'window.open(\"#{url}\")',
                @model.data.id
              _ 'span.name', @model.data.name or ''
            ]

  render: (_)-> [
    _ SectionTitle,
        title: 'Metrics'
        description: 'Iteration and Story complexity based on number of tasks and tests'
    _ TableTree,
        id:'Metrics'
        cols: ['ATs','Chump Tasks']
        dataProviders:dataProviders
  ]
