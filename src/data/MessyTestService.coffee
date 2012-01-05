define ['data/JSONPService'],({JSONPService})->
  
  new JSONPService 'MessyTest'
    baseURL: 'http://mhxxfscw62331:8018/smplxml/'
    methods:
      getSuites: 'jsonsuit.php'
      getTests: (suiteName)->"jsonmain.php?sn=#{suiteName}"
      getTestDetails: (testnum)-> "jsontest.php?testid=#{testnum}"
