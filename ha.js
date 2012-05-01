var http = require('http')
var hookio = require('hook.io')
var i=0
var startTime = new Date()

setInterval(function() {
  i++
}, 1)

var hookMaster = hookio.createHook({
  name: "master",
  hookPort: "5000",
  m: true
})

hookMaster.on('*::ans', function(data){
  // outputs b::sup::dog
  i += data
})

hookMaster.start()

http.createServer(function (req, res) {
  hookMaster.emit('get')
  var time = (new Date() - startTime)/1000
  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.write('time: '+time+' seg\n')
  res.end(i+'\n')
}).listen(4444)

