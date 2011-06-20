define ['data/MetricsService','cell!./MetricsNode'], (MetricsService,MetricsNode)->

  ReleaseCol = cell.extend
    'render <span>': ->
      """
      <span class='ats'>
        <span class='count'>#{@model.ats}</span>Tests
      </span> 
      <span class='chumpTasks'> 
        <span class='count'>#{@model.chumpTasks}</span>Tasks
      </span> 
      """

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
      nodeCell: MetricsNode.extend(nameLabel:'Iteration')
      noChildrenCell: cell.extend
        'render <div class="nochildren">': -> 'No stories'
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
          'render <span class="nameContainer">': ->
            url = "http://destinyxptool/xptool/projecttool/projecttool.storyview.do?storyNumber=#{@model.data.id}"
  
            """
            <a target='_blank' href='#' onclick='window.open(\"#{url}\")'>#{@model.data.id}</a>
            <span class='name'>#{@model.data.name or ''}</span>
            """

  render: (R)->
    """
    #{R.cell 'shared/page/SectionTitle',
        title: 'Metrics'
        description: 'Iteration and Story complexity based on number of tasks and tests'}
    #{R.cell 'shared/tabletree/TableTree',
        id:'Metrics'
        cols: ['ATs','Chump Tasks']
        dataProviders:dataProviders}
    """

