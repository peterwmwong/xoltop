define [
	'Bus'
  'data/JSONPService'
  'data/DashboardService'
  'data/Auth'
], (Bus,{getXPToolBaseUrl},DashboardService,Auth)->
  
  isIOS: (ua = navigator.userAgent).match(/iPhone/i) or ua.match(/iPod/i) or ua.match(/iPad/i)
  bus:Bus
  getXPToolBaseUrl: getXPToolBaseUrl
  dashboard: DashboardService
  auth: Auth
