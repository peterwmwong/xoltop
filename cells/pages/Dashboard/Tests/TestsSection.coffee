define ['data/DashboardService'],(DashboardService)->
  toDateString = (d,isToday)->
    if isToday then "Today"
    else "#{d.getMonth()+1}/#{d.getDate()}/#{d.getFullYear()}"
  displayOrder = ['towrite','failing','passing']
  statusDisplayable =
    failing: 'Failing'
    towrite: 'To Write'
    passing: 'Passing'

  render: (R)->
    DashboardService.getStoryTestDetails @options.storynum, ({tests})=>
      numVisibleGroups = 0
      oddEven = do->
        isEven = false
        -> (isEven = !isEven) and 'even' or 'odd'
      """
      <table>
        <tbody>
          #{R displayOrder, (status,gi)->
              R (stests = tests[status]).length != 0 and "
                #{R numVisibleGroups++ != 0 and "
                  <tr class='groupSpacer'><td colspan='6'> </td></tr>
                "}
                <tr class='statusGroup #{oddEven()} #{R not stests[0].update.isToday and ' notToday'}'>
                  <td rowspan='#{stests.length}' id='header' class='#{status}'>
                    #{statusDisplayable[status]}
                  </td>
                  #{R stests, (t,i)-> "
                    #{R i!=0 and "
                      <tr class='#{oddEven()} #{R not t.update.isToday and ' notToday'}'>
                    "}
                      <td class='colSpacer'> </td>
                      <td class='id #{status}'>#{t.id}</td>
                      <td class='name'>#{t.name}</td>
                      <td class='status'>#{t.update.status}</td>
                      <td class='date'>#{toDateString t.update.date, t.update.isToday}</td>
                      <td class='owner'>#{t.update.owner}</td>
                </tr>
                  "}
          "}
      """
