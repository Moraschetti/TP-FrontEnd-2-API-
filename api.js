"use strict";
document.addEventListener("DOMContentLoaded", () => {
  const url = "https://6393e57e11ed187986bf9667.mockapi.io/api/curso/employees";  
  let table = document.querySelector("tbody");
  let btnAdd = document.querySelector("#add");   
  fetch(url)
  .then((res)=> res.json())
  .then((dataEmployees) => makeRowEmployee(dataEmployees))
  .catch((error) => console.log("la peticion de Fetch tiene un problema a resolver"));
  
  function makeRowEmployee(listaEmployees) {
       listaEmployees.forEach(informationEmployee => create(informationEmployee))
  }
  function create(informationEmployee) {
      let rowEmployee = document.createElement("tr");
      let id = document.createElement("th");
      id.innerText = informationEmployee.id;
      let name = document.createElement("td");
      name.innerText = informationEmployee.name;
      name.classList.add("edit");
      let city = document.createElement("td");
      city.innerText = informationEmployee.city;
      city.classList.add("edit");
      let birthday = document.createElement("td");
      birthday.innerText = informationEmployee.birthday;  
      birthday.classList.add("edit"); 
      let email = document.createElement("td");
      email.innerText = informationEmployee.email;
      email.classList.add("edit");
      let btnEdit = document.createElement("button");
      btnEdit.innerText = "Editar";
      btnEdit.classList.add("btn-dark");
      let btnRemove = document.createElement("button");
      btnRemove.innerText = "Eliminar";
      btnRemove.classList.add("btn-dark");
      table.appendChild(rowEmployee);
      rowEmployee.appendChild(id);
      rowEmployee.appendChild(name);
      rowEmployee.appendChild(city);
      rowEmployee.appendChild(birthday);
      rowEmployee.appendChild(email);
      rowEmployee.appendChild(btnEdit);
      rowEmployee.appendChild(btnRemove);
     
      btnEdit.addEventListener("click", () => {
          let edits = btnEdit.parentElement;
          edits = edits.childNodes
          if(btnEdit.innerText == "Editar") {
              edit(edits);
              btnEdit.innerText = "Confirmar";
          } else {
              change(edits)
              btnEdit.innerText = "Editar";
          }
      });
      btnRemove.addEventListener("click", () => {
          rowEmployee.remove();
      })
  }
  function edit(e) {
    e.forEach(element => {
        if(element.className === "edit") {
            let editInfo = document.createElement("input");
            editInfo.value = element.innerText;
            element.replaceWith(editInfo);
            editInfo.classList.add("edit")  
        }
    })     
}
function change(e) {
    e.forEach(element => {
        if(element.className === "edit") {
            let addInfo = document.createElement("td");
            addInfo.innerText = element.value;
            element.replaceWith(addInfo);  
            addInfo.classList.add("edit")                   
            };
        }); 
};
  btnAdd.addEventListener("click", () => {
      let infoName = document.querySelector("#name").value;
      let infocity = document.querySelector("#city").value;
      let infobirthday = document.querySelector("#birthday").value;
      let infoEmail = document.querySelector("#email").value;
      if(form(infoName, infocity, infobirthday, infoEmail) === true) {
          let ID = document.querySelectorAll("tbody th").length
          let newEmployees = {
              id : ID + 1,
              name : infoName,
              city: infocity,
              birthday: infobirthday,
              email: infoEmail,
          };
           create(newEmployees);
      }
  })
});
