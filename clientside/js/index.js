async function getUsers(){
    const res = await fetch("http://localhost:3000/api/getusers");
    console.log(res);
    const users =await res.json();
    str=``
    users.map((user)=>{
        // console.log(user.file.filename);
        
        str +=`
            <div class="card">
                <div class="imgdiv">
                    <img src="http://localhost:3000/api/image/${user.file.filename}" alt="">
                </div>
                <h4>${user.username}</h4>
                <h5>${user.email}</h5>
                <div class="buttondiv">
                    <a class="btn" href="./pages/edit.html?id=${user._id}"<button class="edit" >Edit</button></a>
                    <button class="delete" onclick="deleteData('${user._id}')">Delete</button>
                </div>
            </div>
        `
    })
    document.getElementById("cards").innerHTML=str
}
getUsers()

async function deleteData(_id){
    console.log(_id);
    const res=await fetch(`http://localhost:3000/api/delete/${_id}`,{method:"DELETE"})
    console.log(res);
    window.location.reload();
}

const editButton = document.querySelectorAll('.edit');

editButton.forEach(button=>{
    button.addEventListener('click',(event)=>{
        const userId = new URL(event.target.href).searchParams.get('id');
        window.location.href=`./pages/edit.html?id=${userId}`;
    })
})