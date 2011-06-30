TODO
====

Backend Integration
-------------------
* Auth (Resteasy/JAXRS)
* Allow for "special" stories that don't have any tests
* Refresh data/mock XPTool server response snapshots
* Split up DashboardService

Dashboard
---------
### Authed features
* "My Stories" divider
* Signin
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
* Clicking on Story Section when it's expanded should collapse it
* Put more visual emphasis when hovering over Story Sections
* Clicking on Stories should take you somewhere (story info or tasks)
  * Story headline section?
    * X Incomplete Tasks
    * X Failing Tests
    * X Needs Attention Tasks
* Auto Update
  * Update Dashboard every... 2 minutes?
  * Add "Updated 5 minutes ago" message somewhere
* IE Support
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


Misc
----
* Table-ize Tests/Messy IssueGroups
* Highlight hovered rows in:
  * Tests/Metrics
  * Tests/Messy
