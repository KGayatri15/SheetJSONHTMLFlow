function processRootFolder(rootFolder) {
    var MAX_RUNNING_TIME_MS = 1 * 60 * 1000;
    var RECURSIVE_ITERATOR_KEY = "RECURSIVE_ITERATOR_KEY";
  
    var startTime = (new Date()).getTime();
  
    // [{folderName: String, fileIteratorContinuationToken: String?, folderIteratorContinuationToken: String}]
    var recursiveIterator = JSON.parse(PropertiesService.getDocumentProperties().getProperty(RECURSIVE_ITERATOR_KEY));
    if (recursiveIterator !== null) {
      // verify that it's actually for the same folder
      if (rootFolder.getName() !== recursiveIterator[0].folderName) {
        console.warn("Looks like this is a new folder. Clearing out the old iterator.");
        recursiveIterator = null;
      } else {
        console.info("Resuming session.");
      }
    }
    if (recursiveIterator === null) {
      console.info("Starting new session.");
      recursiveIterator = [];
      recursiveIterator.push(makeIterationFromFolder(rootFolder));
    }
  
    while (recursiveIterator.length > 0) {
      recursiveIterator = nextIteration(recursiveIterator, startTime);
  
      var currTime = (new Date()).getTime();
      var elapsedTimeInMS = currTime - startTime;
      var timeLimitExceeded = elapsedTimeInMS >= MAX_RUNNING_TIME_MS;
      if (timeLimitExceeded) {
        PropertiesService.getDocumentProperties().setProperty(RECURSIVE_ITERATOR_KEY, JSON.stringify(recursiveIterator));
        console.info("Stopping loop after '%d' milliseconds. Please continue running.", elapsedTimeInMS);
     return;
      }
    }
  
    console.info("Done running");
    PropertiesService.getDocumentProperties().deleteProperty(RECURSIVE_ITERATOR_KEY);
}  
  // process the next file or folder
  function nextIteration(recursiveIterator) {
    var currentIteration = recursiveIterator[recursiveIterator.length-1];
    if (currentIteration.fileIteratorContinuationToken !== null) {
      var fileIterator = DriveApp.continueFileIterator(currentIteration.fileIteratorContinuationToken);
      if (fileIterator.hasNext()) {
        // process the next file
        var path = recursiveIterator.map(function(iteration) { return iteration.folderName; }).join("/");
        processFile(fileIterator.next(), path);
        currentIteration.fileIteratorContinuationToken = fileIterator.getContinuationToken();
        recursiveIterator[recursiveIterator.length-1] = currentIteration;
        return recursiveIterator;
      } else {
        // done processing files
        currentIteration.fileIteratorContinuationToken = null;
        recursiveIterator[recursiveIterator.length-1] = currentIteration;
        return recursiveIterator;
      }
    }
  
    if (currentIteration.folderIteratorContinuationToken !== null) {
      var folderIterator = DriveApp.continueFolderIterator(currentIteration.folderIteratorContinuationToken);
      if (folderIterator.hasNext()) {
        // process the next folder
        var folder = folderIterator.next();
        recursiveIterator[recursiveIterator.length-1].folderIteratorContinuationToken = folderIterator.getContinuationToken();
        recursiveIterator.push(makeIterationFromFolder(folder));
        return recursiveIterator;
      } else {
        // done processing subfolders
        recursiveIterator.pop();
        return recursiveIterator;
      }
    }
  
    throw "should never get here";
}
  
  function makeIterationFromFolder(folder) {
    return {
      folderName: folder.getName(), 
      fileIteratorContinuationToken: folder.getFiles().getContinuationToken(),
      folderIteratorContinuationToken: folder.getFolders().getContinuationToken()
    };
  }
  function processFile(file, path) {
    console.log(path + "/" + file.getName());
  }