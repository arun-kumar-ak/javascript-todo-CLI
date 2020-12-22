const fs =require('fs');

const add = (todostr,file) => {
    if(typeof todostr==='undefined') {
        console.log("Error: Missing todo string. Nothing added!");
    }else {
        fs.appendFile(file,todostr+"\n",()=>{
            console.log("Added todo: \""+todostr+"\"");
        })
    }
}

const read = (file)=> {
    if(fs.existsSync(file)) {
        var array = fs.readFileSync(file).toString().split("\n");
        j=array.length-1;
        for(i=array.length-2;i>=0;i--) {
            console.log("["+j+"]",array[i]);
            j--;
        }
    }else {
        console.log("There are no pending todos!");
    }
    
}

const help = () => {
    console.log("Usage :-");
    console.log("$ ./todo add \"todo item\"  # Add a new todo");
    console.log("$ ./todo ls               # Show remaining todos");
    console.log("$ ./todo del NUMBER       # Delete a todo");
    console.log("$ ./todo done NUMBER      # Complete a todo");
    console.log("$ ./todo help             # Show usage");
    console.log("$ ./todo report           # Statistics");
}

const del = (num,file)=> {
    if(typeof num === 'undefined') {
        console.log("Error: Missing NUMBER for deleting todo.");
    }else {
        fs.readFile(file,{encoding:'utf-8'},(err,data)=>{
            if(err) throw err;
            let arr=data.split('\n');
            num=Number(num)-1;
            if(num===-1) {
                console.log("Error: todo #"+(num+1)+" does not exist. Nothing deleted.");
            }else {
                if(num<arr.length-1) {
                    arr.splice(num,1);
                    const upd_arr=arr.join('\n');
                    fs.writeFile(file,upd_arr,(err)=> {
                        if(err) throw "Error: Missing NUMBER for marking todo as done.";
                        console.log("Deleted todo #"+(num+1));
                    })
                }else {
                    console.log("Error: todo #"+(num+1)+" does not exist. Nothing deleted.")
                }
            }
            
        });
    }
}

const done = (num,filetodo,filedone)=> {
    if(typeof num === 'undefined') {
        console.log("Error: Missing NUMBER for marking todo as done.");
    }else {
        fs.readFile(filetodo,{encoding:'utf-8'},(err,data)=> {
            if(err) throw err;
            let arr=data.split('\n');
            num=Number(num)-1;
            if(num===-1) {
                console.log("Error: todo #"+(num+1)+" does not exist.");
            }else {
                if(num<arr.length-1) {
                    let donestr = arr[num];
                    arr.splice(num,1);
                    const upd_arr=arr.join('\n');
                    fs.writeFile(filetodo,upd_arr,(err)=> {
                        if(err) throw err;
                    });
                    fs.appendFile(filedone,donestr+"\n",(err)=>{
                        if (err) throw err;
                        console.log("Marked todo #"+(num+1)+" as done.");
                    });
                }else {
                    console.log("Error: todo #"+(num+1)+" does not exist.");
                }
            }
        });
    }
}

const report =(filetodo,filedone)=> {
    var todo_arr=[];
    var done_arr=[];
    fs.readFile(filetodo,{encoding:'utf-8'},(err,data1)=> {
        if(err) throw err;
        todo_arr=data1.split('\n');
        fs.readFile(filedone,{encoding:'utf-8'},(err,data2)=> {
            if(err) throw err;
            done_arr=data2.split('\n');
            let date= new Date();
            console.log(`${date.toISOString().slice(0, 10)} Pending : ${todo_arr.length-1} Completed : ${done_arr.length-1}`);
        });
    });
}

var todo_input = process.argv.slice(2);
const todof="todo.txt";
const donef="done.txt";
switch (todo_input[0]) {
    case 'help':
        help();
        break;
    case 'ls':
        read(todof);
        break;
    case 'add':
        add(todo_input[1],todof);
        break;
    case 'del':
        del(todo_input[1],todof);
        break;
    case 'done':
        done(todo_input[1],todof,donef);
        break;
    case 'report':
        report(todof,donef);
        break;
    default:
        help();
        break;
}
