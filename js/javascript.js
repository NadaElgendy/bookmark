
var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");

//Array of bookmarks
var bookmarkList = [];

//Check Local storage
if (localStorage.getItem("bookmarkContainer") !== null) {
  bookmarkList = JSON.parse(localStorage.getItem("bookmarkContainer"));
  displayData();
}

//Add bookmark
function addBookmark() {
  if(validationName() && validationUrl()){

  //Object of a bookmark
  var bookmark = {
    name: siteNameInput.value.trim(),
    url: siteUrlInput.value.trim()
  };
  bookmarkList.push(bookmark);
  //Local storage
  localStorage.setItem("bookmarkContainer", JSON.stringify(bookmarkList));

  //Clear inputs for the user
  clearForm();
  displayData();
}else{
  alert("Site Name or Url is not valid, Please follow the rules below");
}
}
//Clear Form // *single responsibility*
function clearForm() {
  siteNameInput.value = null;
  siteUrlInput.value = null;
}

//Display Data
function displayData() {
  var bookmarkContainer = ""; //Cartona
  for (var i = 0; i < bookmarkList.length; i++) {
    bookmarkContainer += `                       
        <tr>
        <td>${i + 1}</td>
        <td>${bookmarkList[i].name}</td>              
        <td>
          <button class="btn btn-visit" data-index="${i}">
          <a href= "${bookmarkList[i].url}" target="blank">
            <i class="fa-solid fa-eye pe-2"></i>Visit
            </a>
          </button>
        </td>
        <td>
          <button class="btn btn-delete pe-2" data-index="0" onClick="deleteData(${i})">
            <i class="fa-solid fa-trash-can"></i>
            Delete
          </button>
        </td>
    </tr>
    `;
  }
  document.getElementById("tableContent").innerHTML = bookmarkContainer;
}
//Delete Data
function deleteData(index) {
  bookmarkList.splice(index, 1);
  localStorage.setItem("bookmarkContainer", JSON.stringify(bookmarkList));
  displayData();
}

//Validation
function validationName(){
  var regex = /^.[a-z[A-Z]{3,8}.$/;
  var text = siteNameInput.value;
  if(regex.test(text)){
    siteNameInput.classList.add("is-valid");
    siteNameInput.classList.remove("is-invalid");
    document.getElementById("nameMsg").classList.add("d-none");
    return true;
  }
  else{
    siteNameInput.classList.add("is-invalid");
    siteNameInput.classList.remove("is-valid");
    document.getElementById("nameMsg").classList.remove("d-none");
    return false;
  }
}

function validationUrl(){
  var regex = /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
  var text = siteUrlInput.value;
  if(regex.test(text)){
    siteUrlInput.classList.add("is-valid");
    siteUrlInput.classList.remove("is-invalid");
    document.getElementById("urlMsg").classList.add("d-none"); //alert
    return true;
  }
  else{
    siteUrlInput.classList.add("is-invalid");
    siteUrlInput.classList.remove("is-valid");
    document.getElementById("urlMsg").classList.remove("d-none");
    return false;
  }
}