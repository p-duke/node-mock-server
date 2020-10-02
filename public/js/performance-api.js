function convertMS(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

function convertBytes(bytes, decimals=2) {
  if (bytes === 0) {
    return "0 Bytes";
  }

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

function urlTotalTime() {
  const results = [];
  performance.getEntries().forEach((entry)=>{
    const timeMS = entry.responseEnd - entry.connectStart;
    const totalTime =  timeMS < 0 ? timeMS : (timeMS / 1000.0);

    results.push({
      url: entry.name,
      totalTime: totalTime,
    });
  });

  return results.sort(function(a, b) {
    return b.totalTime - a.totalTime;
  });
};

function calculatedEntries() {
  const results = [];
  performance.getEntries().forEach((entry)=>{
    if (entry.name.indexOf("dev-api") > 0 && entry.requestStart > 0) {
      results.push({
        type: entry.initiatorType,
        url: entry.name,
        requestStart: entry.responseStart,
        responseEnd: entry.responseEnd,
        totalTime: entry.responseEnd - entry.requestStart,
        encodedBodySize: convertBytes(entry.encodedBodySize),
        timeToFirstByte: entry.responseStart - entry.requestStart,
        httpHeaderSize: convertBytes(entry.transferSize - entry.encodedBodySize),
        transferSize: convertBytes(entry.transferSize),
      });
    }
  });

  return results.sort(function(a, b) {
    return b.totalTime - a.totalTime;
  });
};



