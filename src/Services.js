
define(['Bus', 'data/JSONPService', 'data/DashboardService', 'data/Auth'], function(Bus, _arg, DashboardService, Auth) {
  var getXPToolBaseUrl, ua;
  getXPToolBaseUrl = _arg.getXPToolBaseUrl;
  return {
    isIOS: (ua = navigator.userAgent).match(/iPhone/i) || ua.match(/iPod/i) || ua.match(/iPad/i),
    bus: Bus,
    getXPToolBaseUrl: getXPToolBaseUrl,
    dashboard: DashboardService,
    auth: Auth
  };
});
