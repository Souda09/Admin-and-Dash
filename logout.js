import supabase from "./config.js";
console.log(supabase);

let logoutbtn = document.getElementById("logout");

async function  logout(e) {
   e.preventDefault()
try{
     const { error } = await supabase.auth.signOut()
     if(error){
        console.log(error)
     }
     else{
        alert("logout Successfully!")
        location.href = "signup.html";
     }
}
catch(err){
    console.log(err)
}
    
}
logoutbtn && logoutbtn.addEventListener('click',logout)