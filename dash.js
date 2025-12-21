import supabase from "./config.js";
console.log(supabase);

async function checkrole() {

    const {
        data: { user } } = await supabase.auth.getUser()

    if (!user) {
        alert("Customer record not found");
        location.href = "./login.html";
        return;
    }

    // fetch data
    const { data, error } = await supabase
        .from('customers')
        .select("*")
        .eq("UID", user.id)
        .single()


    console.log("customer data:", data);
    console.log("customer error:", error);

    if (data.Role !== "admin") {
        alert("access denied");
        return (location.href = "./signup.html")
    }
}
checkrole();


//  _________________________ Add product functionality
let paname = document.getElementById("pname");
let pprice = document.getElementById("pprice");
let pcategory = document.getElementById("pcategory");
let pdecs = document.getElementById("pdesc");
let addColor = document.getElementById("addColor");
let PForm = document.getElementById("pForm");
let pimage = document.getElementById("pimage");
let colorGroup = document.getElementById("colorGroup");

addColor.addEventListener("click", (e) => {
    e.preventDefault();
    let div = document.createElement("div")
    div.className = "color filed"
    div.innerHTML =
        `<div class = 'row'>
            <div class = col-md-6 mb-3>
            <input type="color" class="colorInput">
            </div>
            <div class = "col-md-6 mb-3">
     <button type="button" class="btn btn-danger removeColor">✕</button>
        </div>
        </div> `;

    colorGroup.appendChild(div);

    // div.querySelector("#removColor").addEventListener("click", () =>{
    //     div.remove();
    div.querySelector(".removeColor").addEventListener("click", () => {
        div.remove();
    });

});

// upload image

let imageUrl;
async function ulpadfile(f) {
    let fileName = `${Date.now()}-${f?.name}`
    try {
        const { data, error } = await supabase
            .storage
            .from('Products')
            .upload(fileName, f);

        if (data) {

            const { data: uploadData } = supabase.storage    //getpublicUrl
                .from("Products")
                .getPublicUrl(data.path);

            if (uploadData) {

                imageUrl = uploadData.publicUrl;

            }

            else {
                console.log('is error')
            }
        }
    }
    catch (error) {
        console.log(error)
    }

    return imageUrl;
}


async function addProduct(e) {
    e.preventDefault()
   console.log('HI');
    let pcolor = document.querySelectorAll(".colorInput");
    console.log(pcolor);
    let colorsArr = [];
    pcolor.forEach((inp) => {
        if (inp.value.trim() !== "") {
            colorsArr.push(inp.value);
        }
        console.log(colorsArr);
    });

    let imageadd = await ulpadfile(pimage.files[0]);
    try {
        const { error } = await supabase
            .from('productCards')
            .insert({
                name: paname.value,
                category: pcategory.value,
                price: pprice.value,
                description: pdecs.value,
                colors: colorsArr,
                imageUrl: imageadd
            });



        if (error) {
            console.log(error)
        }
        else {
            alert("product added successfully");
        }
    }
    catch (error) {
        console.log(error)
    }
}
PForm && PForm.addEventListener("submit", addProduct)