define [
  'data/JSONP'
  'data/DashboardService'
  'data/Auth'
], ({getXPToolBaseUrl},DashboardService,Auth)->
  
  isIOS: (ua = navigator.userAgent).match(/iPhone/i) or ua.match(/iPod/i) or ua.match(/iPad/i)
  getXPToolBaseUrl: getXPToolBaseUrl
  dashboard: DashboardService
  auth: Auth
