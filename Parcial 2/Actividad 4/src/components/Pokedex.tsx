import { useEffect, useState } from "react"



const Pokedex = () => {

  const [loading, setLoading] = useState(true)
  const [name, setName] = useState();
  const [ability, setAbility] = useState<string[]>([]);
  const [type, setType] = useState<string[]>([])
  const [Image, setImage] = useState();

  const getRandomNumber = () => {
    return Math.floor(Math.random() * 150) + 1;
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const randomNumber = getRandomNumber();
      const response = await fetch('https://pokeapi.co/api/v2/pokemon/'+ randomNumber)
      const allData = await response.json();
      const abilities = allData.abilities.map((ability: any) => ability.ability.name);
      const types = allData.types.map ((type: any) => type.type.name);
    
      setImage(allData.sprites?.front_default || null);
      console.log(allData)
      setName(allData.name)
      setAbility(abilities)
      setType(types)
      setLoading(false)
    

    } catch (error) {
      console.error(error);
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 2000);
    return () => {
      clearInterval(intervalId); 
    };
  }, []); 


  if(loading){
    return <h1>Wait....</h1>
  }

  return (
    <div>
      <h1>{name} </h1>
      <p>
        <ul>
        Abilities:
        {ability.map((ability, index) => (
                  <li key={index}>{ability}</li>
                ))}
          
        </ul>
        <img src={Image}></img>
        <ul>
        Types:
        {type.map((type, index) => (
                  <li key={index}>{type}</li>
                ))}
          
        </ul>
      </p>
    </div>
  )
}

export default Pokedex

