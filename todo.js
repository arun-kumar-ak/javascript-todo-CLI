const fs =require('fs');

const add = (todostr,file) => {
    fs.appendFile(file,todostr+"\n",(error)=>{
        if (error) throw error;
        console.log("Added todo: \""+todostr+"\"");
    })
}

const read = (file)=> {
    var array = fs.readFileSync(file).toString().split("\n");
    j=array.length-1;
    for(i=array.length-2;i>=0;i--) {
        console.log("["+j+"]",array[i]);
        j--;
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
    fs.readFile(file,{encoding:'utf-8'},(err,data)=>{
        if(err) throw err;
        let arr=data.split('\n');
        num=Number(num)-1;
        if(num<arr.length-1) {
            arr.splice(num,1);
            const upd_arr=arr.join('\n');
            fs.writeFile(file,upd_arr,(err)=> {
                if(err) throw err;
                console.log("Deleted todo #"+(num+1));
            })
        }else {
            console.log("Error: todo #"+(num+1)+" does not exist. Nothing deleted.")
        }
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
        break;
    case 'report':
        break;
    default:
        help();
        break;
}
