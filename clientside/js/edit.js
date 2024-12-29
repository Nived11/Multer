const userId = new URLSearchParams(window.location.search).get('id');
console.log(userId);

async function update(_id) {
    const res=await fetch(`http://localhost:3000/api/update/${_id}`,{method:"PUT"});
    console.log(res);
    const user=await res.json();
    console.log(user);

    document.getElementById("form").innerHTML=`
      <div class="head">
                <h3>Edit User Information </h3>
            </div>
     <div class="divs">
                <label>Email</label><br>
                <input type="text" value=${user.email} name="email" id="name" required>
            </div>
            <div class="divs">
                <label>Username</label><br>
                <input type="text" value=${user.username} name="username" id="username">
            </div>
            <div class="imgdiv">
                <img src="../assets/pexels-stefanstefancik-91227.jpg" alt="profile">
            </div>
            <div class="divs">
                <label>Profile Image</label><br>
                <input type="file" name="file" id="image" multiple>
            </div>
            <div class="divs">
                <label>Phone</label><br>
                <input type="text" value=${user.phone} name="phone" id="phone">
            </div>
            <button>Save</button>
                <div class="footer">
                <label>&copy;2024 Your Company</label><br>
            </div>
    `
    
    
}
update(userId);