const objects = []
document.getElementById("add").addEventListener("click", function addData(){
  const Name = document.getElementById("name").value;
  const Age = document.getElementById("age").value;
  const Address = document.getElementById("address").value;
  const Bankruptcy = document.getElementById("bankruptcy").checked;
  
  const object = {
    Name: Name,
    Age: Age,
    Address: Address,
    Bankruptcy: Bankruptcy
  };
  object.adult = Age >=18;
  objects.push(object);

  const objectsDiv = document.getElementById("objectsDiv");
  const objectString = JSON.stringify(object, null, 2);
  objectsDiv.innerHTML += "<pre>"+ objectString + "</pre>";
  console.log(objects);

});

