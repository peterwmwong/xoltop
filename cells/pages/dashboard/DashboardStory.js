var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __slice = Array.prototype.slice;
define(['Services', 'cell!./LabeledCounts', 'cell!shared/loadingindicator/LoadingIndicator', 'cell!./tests/TestsSection', 'cell!./tasks/TasksSection', 'cell!./code/CodeSection', 'cell!shared/InitialsList'], function(S, LabeledCounts, LoadingIndicator, TestsSection, TasksSection, CodeSection, InitialsList) {
  var statusToColor;
  statusToColor = ['red', 'yellow', 'green'];
  return {
    render: function(R) {
      return "<div class='header'>\n  <div class='collapseStory'>\n    <div class='triangle'></div>\n    <div class='rect'></div>\n  </div>\n  <div class='storyID " + statusToColor[this.model.status] + "'>\n    " + this.model.storynum + "\n  </div>\n  " + (R.cell(LabeledCounts, {
        "class": 'code',
        label: "CODE",
        showIfZero: ['green'],
        counts: __bind(function() {
          var completePct, completed, inProgress, notStarted, _ref;
          _ref = this.model.codeTasks, completePct = _ref.completePct, notStarted = _ref.notStarted, inProgress = _ref.inProgress, completed = _ref.completed;
          completePct = completePct + "<span class='codeCompletePct'>%</span>";
          if (notStarted) {
            return {
              red: completePct
            };
          } else if (inProgress) {
            return {
              yellow: completePct
            };
          } else {
            return {
              green: completePct
            };
          }
        }, this)()
      })) + "\n  " + (R.cell(LabeledCounts, {
        "class": 'tests',
        label: "TESTS",
        showIfZero: ['green'],
        counts: __bind(function() {
          var failing, needsAttn, total, unwritten, _ref;
          _ref = this.model.ats, failing = _ref.failing, needsAttn = _ref.needsAttn, unwritten = _ref.unwritten, total = _ref.total;
          if (failing + needsAttn + unwritten) {
            return {
              red: failing,
              needsAttn: needsAttn,
              yellow: unwritten
            };
          } else {
            return {
              green: total
            };
          }
        }, this)()
      })) + "\n  " + (R.cell(LabeledCounts, {
        "class": 'tasks',
        label: "TASKS",
        showIfZero: ['green'],
        counts: __bind(function() {
          var completed, needsAttn, retest, _ref;
          _ref = this.model.tasks, needsAttn = _ref.needsAttn, retest = _ref.retest, completed = _ref.completed;
          if (needsAttn + retest) {
            return {
              red: needsAttn,
              yellow: retest
            };
          } else {
            return {
              green: completed
            };
          }
        }, this)()
      })) + "\n  <div class='nameContainer'>\n    <a class='name' target='_blank' href='http://destinyxptool/xptool/projecttool/projecttool.storyedit.do?storyID=" + this.model.storynum + "'>" + this.model.name + "</a>\n  </div>\n  <div class='chumps'>\n    " + (R.cell(InitialsList, {
        initials: __slice.call(this.model.devs).concat(__slice.call(this.model.testers))
      })) + "\n  </div>\n</div>\n<div class='details'>\n  " + (R.cell(LoadingIndicator)) + "\n  <div class='contents'></div>\n</div>";
    },
    bind: (function() {
      var collapseStory, selectSection;
      selectSection = function(detail) {
        return function(ev) {
          var $detail, detailCell;
          this.$('.LabeledCounts.selected').toggleClass('selected', false);
          if (!(this.$el.hasClass('selected'))) {
            this.$el.trigger('selected');
            this.$el.toggleClass('selected', true);
          }
          if (detail.prototype.name === this.options.expandedSection) {
            return collapseStory.call(this);
          } else {
            this.options.expandedSection = detail.prototype.name;
            this.$('.countCol > .selected').toggleClass('selected', false);
            $(ev.target).closest('.LabeledCounts').toggleClass('selected', true);
            this.$('.detail.selected').fadeOut().toggleClass('selected', false);
            if (!($detail = this.$("." + detail.prototype.name))[0]) {
              detailCell = new detail({
                "class": 'detail selected',
                storynum: this.model.storynum
              });
              this.$('.details > .contents').prepend(detailCell.el);
              this.$('.LoadingIndicator').trigger('enable');
              return detailCell.ready(__bind(function() {
                this.$('.LoadingIndicator').trigger('disable');
                detailCell.$el.fadeIn();
                return this.$('.details').height("" + (detailCell.$el.outerHeight()) + "px");
              }, this));
            } else {
              $detail.prependTo($detail.parent()).fadeIn().toggleClass('selected', true);
              return this.$('.details').height("" + ($detail.outerHeight()) + "px");
            }
          }
        };
      };
      return {
        'click .header > .tests': selectSection(TestsSection),
        'click .header > .tasks': selectSection(TasksSection),
        'click .header > .code': selectSection(CodeSection),
        'click .collapseStory': collapseStory = function() {
          this.$('.LabeledCounts.selected, .detail.selected').toggleClass('selected', false);
          this.$el.toggleClass('selected', false);
          this.$('.details').height('0px');
          return this.options.expandedSection = void 0;
        },
        'deselected': collapseStory
      };
    })()
    /*
      # --------------------------------
      # USING next gen cell-R templating
      # --------------------------------
      render: (R)->
        R '.header',
    
          R '.collapseStory',
            R '.triangle'
            R '.rect'
    
          do->
            debugger
            R '.storyID', class: statusToColor[@model.status],
              @model.storynum
    
          R.cell LabeledCounts,
            class: 'code'
            label: "CODE"
            showIfZero: ['green']
            counts: do=>
              {completePct, notStarted, inProgress, completed} = @model.codeTasks
              completePct = completePct+"<span class='codeCompletePct'>%</span>"
              if notStarted
                red: completePct
              else if inProgress
                yellow: completePct
              else
                green: completePct
            
          R LabeledCounts,
            class: 'tests'
            label: "TESTS"
            showIfZero: ['green']
            counts: do=>
              {failing,needsAttn,unwritten,total} = @model.ats
              if failing + needsAttn + unwritten
                red: failing
                needsAttn: needsAttn
                yellow: unwritten
              else
                green: total
    
          R LabeledCounts,
            class: 'tasks'
            label: "TASKS"
            showIfZero: ['green']
            counts: do=>
              {needsAttn,retest,completed} = @model.tasks
              if needsAttn + retest
                red: needsAttn
                yellow: retest
              else
                green: completed
          
          R '.nameContainer',
            R 'a.name', target:'_blank', href:"http://destinyxptool/xptool/projecttool/projecttool.storyedit.do?storyID=#{@model.storynum}",
              @model.name
    
          R '.chumps',
            R InitialsList, initials: [@model.devs..., @model.testers...]
          
        R '.details'
          R LoadingIndicator
          R '.contents'
      */
  };
});