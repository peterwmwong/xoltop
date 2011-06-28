define [
  'data/JSONP'
  'data/DashboardService'
  'data/Auth'
], ({getXPToolBaseUrl},DashboardService,Auth)->
  getXPToolBaseUrl: getXPToolBaseUrl
  dashboard: DashboardService
  auth: Auth
