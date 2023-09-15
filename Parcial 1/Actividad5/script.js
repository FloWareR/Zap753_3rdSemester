const fetchFact = async() =>{
  try{
  const response = await fetch("https://catfact.ninja/fact?max_length=150");
  const data = await response.json();

    console.log(data);
    document.getElementById("catFactBox").innerHTML = data.fact; 
  }catch(error){
    console.error(error)
  }
};
fetchFact();