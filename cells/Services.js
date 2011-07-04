define(['data/JSONP', 'data/DashboardService', 'data/Auth'], function(_arg, DashboardService, Auth) {
  var getXPToolBaseUrl, ua;
  getXPToolBaseUrl = _arg.getXPToolBaseUrl;
  return {
    isIOS: (ua = navigator.userAgent).match(/iPhone/i) || ua.match(/iPod/i) || ua.match(/iPad/i),
    getXPToolBaseUrl: getXPToolBaseUrl,
    dashboard: DashboardService,
    auth: Auth
  };
});