const content = require('fs').readFileSync(__dirname+'/index.html');

const httpServer = require('http').createServer((req,res)=>{
  res.setHeader('Content-Type','text/html');
  res.setHeader('Content-Length',Buffer.byteLength(content));
  res.end(content);
})

const io = require('socket.io')(httpServer);

io.on('connection',socket=>{
  console.log('user connected')
  
  // socket.on('chat message',(msg)=>{
  //   console.log('message: '+msg);
  // })

  socket.on('chat message',(msg)=>{
    io.emit('chat message',msg)
  })

})


httpServer.listen(3000,()=>{
  console.log('go to http://localhost:3000')
})