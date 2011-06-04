var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
define(['data/DashboardService'], function(DashboardService) {
  var displayOrder, statusDisplayable, toDateString;
  toDateString = function(d, isToday) {
    if (isToday) {
      return "Today";
    } else {
      return "" + (d.getMonth() + 1) + "/" + (d.getDate()) + "/" + (d.getFullYear());
    }
  };
  displayOrder = ['towrite', 'failing', 'passing'];
  statusDisplayable = {
    failing: 'Failing',
    towrite: 'To Write',
    passing: 'Passing'
  };
  return {
    render: function(R) {
      return DashboardService.getStoryTestDetails(this.options.storynum, __bind(function(_arg) {
        var numVisibleGroups, oddEven, tests;
        tests = _arg.tests;
        numVisibleGroups = 0;
        oddEven = (function() {
          var isEven;
          isEven = false;
          return function() {
            return (isEven = !isEven) && 'even' || 'odd';
          };
        })();
        return "<table>\n  <tbody>\n    " + (R(displayOrder, function(status, gi) {
          var stests;
          return R((stests = tests[status]).length !== 0 && ("          " + (R(numVisibleGroups++ !== 0 && "            <tr class='groupSpacer'><td colspan='6'> </td></tr>          ")) + "          <tr class='statusGroup " + (oddEven()) + " " + (R(!stests[0].update.isToday && ' notToday')) + "'>            <td rowspan='" + stests.length + "' id='header' class='" + status + "'>              " + statusDisplayable[status] + "            </td>            " + (R(stests, function(t, i) {
            return "              " + (R(i !== 0 && ("                <tr class='" + (oddEven()) + " " + (R(!t.update.isToday && ' notToday')) + "'>              "))) + "                <td class='colSpacer'> </td>                <td class='id " + status + "'>" + t.id + "</td>                <td class='name'>" + t.name + "</td>                <td class='status'>" + t.update.status + "</td>                <td class='date'>" + (toDateString(t.update.date, t.update.isToday)) + "</td>                <td class='owner'>" + t.update.owner + "</td>          </tr>            ";
          })) + "    "));
        }));
      }, this));
    }
  };
});