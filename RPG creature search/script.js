const creatureListBtn = document.querySelector("#creature-list-btn");
const creatureList=document.querySelector(".creature-list")

const searchInput = document.querySelector("#search-input");

const searchBtn =document.querySelector("#search-button");


const creatureName= document.getElementById("creature-name");
const id= document.getElementById("creature-id");
const weight= document.getElementById("weight");
const height= document.getElementById("height");
const types= document.getElementById("types");
const hp= document.getElementById("hp");
const attack= document.getElementById("attack");
const defense= document.getElementById("defense");
const spAttack= document.getElementById("special-attack");
const spDefense= document.getElementById("special-defense");
const speed= document.getElementById("speed");



const creaturesUrl = "https://rpg-creature-api.freecodecamp.rocks/api/creature";


searchBtn.addEventListener("click",()=>{
  const inputValue = searchInput.value.trim().toLowerCase();
  getCreatureStats(inputValue);
  

})

creatureListBtn.addEventListener("click",()=>{
  const showBtn=creatureListBtn.innerText;
  console.log(showBtn);
  if(showBtn==="Show creature list"){
    creatureListBtn.innerText="Hide creature list";
    creatureList.style.display="block";
    
  }else{
    creatureListBtn.innerText="Show creature list";
    creatureList.style.display="none";

  }

  
})


 

const getCreatureStats= async (nameOrId)=>{
  try{ const res = await fetch(`${creaturesUrl}/${nameOrId}`);
  const data = await res.json();


  creatureName.innerText = data.name.toUpperCase();
id.innerText = data.id;
weight.innerText = data.weight;
height.innerText = data.height;

  types.textContent = "";
    data.types.forEach(type => {
      const span = document.createElement("span");
      span.innerText = type.name.toUpperCase();
      types.appendChild(span);
    });

   const stats = data.stats;
    hp.innerText = stats.find(s => s.name === "hp").base_stat;
    attack.innerText = stats.find(s => s.name === "attack").base_stat;
    defense.innerText = stats.find(s => s.name === "defense").base_stat;
    spAttack.innerText = stats.find(s => s.name === "special-attack").base_stat;
    spDefense.innerText = stats.find(s => s.name === "special-defense").base_stat;
    speed.innerText = stats.find(s => s.name === "speed").base_stat;
  
  
  
  
  
  
  }catch(err){
    alert("Creature not found")
    console.log(err)
  }
 

}