const fs = require('fs')
const http = require('http')
const {parse} = require('querystring')
const port =5000
const server=http.createServer((req,res)=>{
  if(req.method === 'POST'){
    let body = ''
    req.on('data',(chunk) =>{
        body =body+ chunk.toString()
    })

    req.on('end',()=>{
        const noteDetails= parse(body)
        console.log(noteDetails)
        if(noteDetails.category== 'personal'){
            console.log('Personal')
            const dir = 'Personal'
            console.log(`${dir}/${noteDetails.title}`)
           if(!fs.existsSync(dir)){
               fs.mkdir(dir,(error)=>{
                   if(error){
                       console.log(error)
                   }
                   else{
                     
                       fs.writeFile(`${dir}/${noteDetails.title}.txt`,`${noteDetails.content}`,(error)=>{
                           if(error){
                               console.log(error)
                           }
                           else{
                               console.log(`File ${noteDetails.title}.txt created successfully`)
                           }
                       })
                   }

               })
           }
           else{
            fs.writeFile(`${dir}/${noteDetails.title}.txt`,`${noteDetails.content}`,(error)=>{
                if(error){
                    console.log(error)
                }
                else{
                    console.log(`File ${noteDetails.title}.txt created successfully`)
                }
            })
           }
        }
        
        else if(noteDetails.category== 'work'){
            console.log('work')
            const dir = 'Work'
            console.log(`${dir}/${noteDetails.title}`)
           if(!fs.existsSync(dir)){
               fs.mkdir(dir,(error)=>{
                   if(error){
                       console.log(error)
                   }
                   else{
                     
                       fs.writeFile(`${dir}/${noteDetails.title}.txt`,`${noteDetails.content}`,(error)=>{
                           if(error){
                               console.log(error)
                           }
                           else{
                               console.log(`File ${noteDetails.title}.txt created successfully`)
                           }
                       })
                   }

               })
           }
           else{
            fs.writeFile(`${dir}/${noteDetails.title}.txt`,`${noteDetails.content}`,(error)=>{
                if(error){
                    console.log(error)
                }
                else{
                    console.log(`File ${noteDetails.title}.txt created successfully`)
                }
            })
           }
        }
        res.end('ok')
    })
  }
  else{
      res.end(
          `<!DOCTYPE html>
            <html>
            <head>
                <title>Notes App</title>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
            </head>
                <body>
                <div class="row justify-content-center">
                    <h3 class="mt-4">Notes App</h3>
                    <div class="col-6">
                    <form action="/" method="post">
                        <div class="form-group">
                        <label >Note title</label>
                        <input type="text" class="form-control" name="title" />
                        </div>
                        <div class="form-group">
                        <label>Note Content</label>
                        <input type="text" class="form-control" name="content" />
                        </div>
                        <div class="form-group">
                        <label>Choose a category</label>
                        <select name="category" class="form-control">
                        <option value="personal">Personal</option>
                        <option value="work">Work</option>
                        </select>
                        </div>
                        <button type="submit" class="btn btn-success">Save Note </button>
                    </form>
                    <div class="btn-group">
                    <button class="btn btn-info" id="personal">View Personal Contents </button>
                    <button  class="btn btn-secondary" id="work">View Work Contents </button>
                    </div>
                    </div>
                    
                    </div>
                </body>
            </html>`
      )
  }
})

server.listen(port,'127.0.0.1')
console.log(`Server running on http://127.0.0.1:${port}`)
