var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define({
  render: function(R, A) {
    return DashboardService.getStoryTasksDetails(this.options.storynum, __bind(function(_arg) {
      var numVisibleGroups, oddEven, tasks;
      tasks = _arg.tasks;
      numVisibleGroups = 0;
      oddEven = (function() {
        var isEven;
        isEven = false;
        return function() {
          return (isEven = !isEven) && 'even' || 'odd';
        };
      })();
      return A("<table>\n  <tbody>\n    " + (R(displayOrder, function(status, gi) {
        var stests;
        return R((stests = tests[status]).length !== 0 && ("          " + (R(numVisibleGroups++ !== 0 && "            <tr class='groupSpacer'><td colspan='6'> </td></tr>          ")) + "          <tr class='statusGroup " + (oddEven()) + " " + (R(!stests[0].update.isToday && ' notToday')) + "'>            <td rowspan='" + stests.length + "' id='header' class='" + status + "'>              " + statusDisplayable[status] + "            </td>            " + (R(stests, function(t, i) {
          return "              " + (R(i !== 0 && ("                <tr class='" + (oddEven()) + " " + (R(!t.update.isToday && ' notToday')) + "'>              "))) + "                <td class='colSpacer'> </td>                <td class='id " + status + "'>" + t.id + "</td>                <td class='name'>" + t.name + "</td>                <td class='status'>" + t.update.status + "</td>                <td class='date'>" + (toDateString(t.update.date, t.update.isToday)) + "</td>                <td class='owner'>" + t.update.owner + "</td>          </tr>            ";
        })) + "    "));
      })));
    }, this));
  }
});