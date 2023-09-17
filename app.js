const toggleBox = document.querySelector(".toggle-btn");
const bodyEle = document.querySelector("#body");

toggleBox.addEventListener("click", () => {
  toggleBox.classList.toggle("active");
  bodyEle.classList.toggle("dark-mode");
});

// // save mode state to the local storage for later retrieval
// localStorage.setItem("mode", "night");
// if(localStorage.getItem("mode") == "night"){
//  bodyEle.classList.add("dark-mode");
// }else{
//     bodyEle.classList.remove("dark-mode");
// }

