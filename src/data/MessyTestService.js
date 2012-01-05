
define(['data/JSONPService'], function(_arg) {
  var JSONPService;
  JSONPService = _arg.JSONPService;
  return new JSONPService('MessyTest', {
    baseURL: 'http://mhxxfscw62331:8018/smplxml/',
    methods: {
      getSuites: 'jsonsuit.php',
      getTests: function(suiteName) {
        return "jsonmain.php?sn=" + suiteName;
      },
      getTestDetails: function(testnum) {
        return "jsontest.php?testid=" + testnum;
      }
    }
  });
});
