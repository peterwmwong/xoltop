TODO
====

Handoff
-------
* Project structure
* Quick dev workflow demo
* Cell structure
* Overview of XPTool RESTful services
* Go over deploying XPTool
* getting-started / Deploying Checklist
* getting-started / Changing XPTool Service Source

Backend Integration
-------------------
* Allow for "special" stories that don't have any tests
  * XPTool should automatically create Chump Task and ATs Task
  * If AT Task is deleted and NO ATs have been written, it is assumed that ATs are not necessary
* Refresh data/mock XPTool server response snapshots

Dashboard
---------
### Authed features
* Chump Tasks
  * Add
  * Send to Retest
  * Send to Needs Attention
  * Signup
* Code Tasks
  * Add
  * Signup
  * Log time
* Tests
  * Signup

### General
* Clicking on Stories should take you somewhere (story info or tasks)
  * Story headline section?
    * X Incomplete Tasks
    * X Failing Tests
    * X Needs Attention Tasks
* Indicate when you are "working" on a story
    * Not a chump, but worked tasks, tests, or code
* News Flash
  * Message, Severity (Red, Yellow)
  * Arbritrary Messages (Backend Integration, JSONP submission and get)
  * Examples
    * Regression - "Sign up for Objectives, # Left"
    * Small tests integration - "Build Broken!"
* Auto Update
  * Update Dashboard every... 2 minutes?
  * Add "Updated 5 minutes ago" message somewhere
* Status Shelf - Overall Iteration Health
  * Percentages of Code, Tests, and Tasks
* Burnup Charts based on Code Completion
* Link to expanded stuff
* Code Tasks - show total time spent and time left
* Show story ballpark (ex. bars/color)
* Handle Roll Over Stories
* Test health monitors
  * Small tests
* Add new Story Description section
* Light theme for cbloom
* IE Support


Misc
----
* Table-ize Tests/Messy IssueGroups
* Highlight hovered rows in:
  * Tests/Metrics
  * Tests/Messy
