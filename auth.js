import supabase from "./config.js";
console.log(supabase)

let  reg = document.getElementById("regform")
let sname = document.getElementById("sname");
let scontact = document.getElementById("scontact")
let semail = document.getElementById("semail")
let spassword = document.getElementById("spassword")
let log = document.getElementById("login")

async function Signup(e){
   e.preventDefault()

        try{
            if(! sname.value){
                alert("Please Enter a name")
                return
            }
            else if(!scontact.value){
                alert("Please Enter a  contact number")
                return
            }
            else if (!semail.value){
                alert("Please Enter a email")
                return
            }
            else if(! spassword.value){
                alert("Please Enter a password")
                return
            }
const { data, error } = await supabase.auth.signUp({
  email: semail.value,
  password: spassword.value,
  
  options: {
      data: {
        UserName: sname.value,
        Email: scontact.value,
        role: 'user'
      }
    }
});

if(data){
    console.log(data)
const{id,user_metadata} = data.user


const { error:dberr } = await supabase
  .from('customers')
  .insert({ UID: id , UserName: user_metadata.UserName, Email : user_metadata.email
   , Role :user_metadata.role
})

if(dberr){
    console.log(dberr);
}

else{
    alert('Signup Successfully')
    location.href="./home.html"
}
}

else{
    console.log(error)
}
 }
        catch(err){
            console.log(err)
        }

    }

  reg && reg.addEventListener('submit', Signup)  
