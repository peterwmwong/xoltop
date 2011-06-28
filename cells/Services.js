define(['data/JSONP', 'data/DashboardService', 'data/Auth'], function(_arg, DashboardService, Auth) {
  var getXPToolBaseUrl;
  getXPToolBaseUrl = _arg.getXPToolBaseUrl;
  return {
    getXPToolBaseUrl: getXPToolBaseUrl,
    dashboard: DashboardService,
    auth: Auth
  };
});