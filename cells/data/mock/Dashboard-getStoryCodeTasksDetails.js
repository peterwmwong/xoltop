
define([], function() {
  var task;
  task = function(o) {
    return {
      task: o
    };
  };
  return [
    task({
      id: 1003,
      description: 'Client',
      status: 'notStarted',
      owner: 'CB'
    }), task({
      id: 1004,
      description: 'Client Quest',
      status: 'notStarted',
      owner: 'EG'
    }), task({
      id: 1005,
      description: 'Client Quest 2',
      status: 'notStarted',
      owner: 'BP'
    }), task({
      id: 1002,
      description: 'Session',
      status: 'inProgress',
      owner: 'TF'
    }), task({
      id: 1005,
      description: 'Session Keywording',
      status: 'inProgress',
      owner: 'BP'
    }), task({
      id: 1001,
      description: 'DBUpgrade add column',
      status: 'complete',
      owner: 'TW'
    })
  ];
});
