document.addEventListener('DOMContentLoaded',()=>{
    const clickID= localStorage.getItem('clickID');
    const goBackBtn= document.querySelector('.goback-btn');

    goBackBtn.addEventListener('click',()=>{
        location.href="index.html"
    })

    function renderDetails(character){
        const characterImg= document.querySelector('#characterImg');
        characterImg.src=character.image;

        const characterName= document.querySelector('#characterName');
        characterName.textContent=character.name;

        const characterStatus= document.querySelector('.statusValue');
        const statusText= document.createTextNode(character.status);
        const statusIcon= document.getElementById('statusIcon');
        if (character.status === "Alive") {
            statusIcon.classList.add('fa-regular', 'fa-face-laugh');
            characterStatus.style.color = "#319795";
            statusIcon.style.color="#319795";
        } else if (character.status === "Dead") {
            statusIcon.classList.add('fa-regular', 'fa-face-dizzy');
            characterStatus.style.color = "red";
            statusIcon.style.color="red";
        } else {
            statusIcon.classList.add('fa-solid', 'fa-face-meh');
            characterStatus.style.color = "purple";
            statusIcon.style.color="purple";
            statusText.textContent="Status unknown"
        }
        characterStatus.appendChild(statusText);


        const characterGender = document.querySelector('.genderValue');
        const genderText = document.createTextNode(character.gender);
        const genderIcon = document.getElementById('genderIcon');
        if (character.gender === "Male") {
            genderIcon.classList.add('fa-regular', 'fa-mars');
            characterGender.style.color = "#3182CE";
            genderIcon.style.color = "#3182CE";
        } else if (character.gender === "Female") {  // Burada "status" yerine "gender" olmalıydı
            genderIcon.classList.add('fa-regular', 'fa-venus');
            characterGender.style.color = "#E53E3E";
            genderIcon.style.color = "#E53E3E";
        }
        else if(character.gender==="Genderless"){
            genderIcon.classList.add('fa-solid', "fa-genderless");
            characterGender.style.color="#718096"
            genderIcon.style.color="#718096";
        }
         else {
            genderIcon.classList.add('fa-solid', 'fa-mars-and-venus');
            characterGender.style.color = "#9F7AEA";
            genderIcon.style.color = "#9F7AEA";
            genderText.textContent = "Gender unknown";
        }
        characterGender.appendChild(genderText);
        
        const characterSpecies= document.querySelector('.speciesValue');
        const speciesText= document.createTextNode(character.species);
        characterSpecies.appendChild(speciesText);
        

        const characterType= document.querySelector('.typeValue');
        const typeText= document.createTextNode(character.type);
        characterType.appendChild(typeText);

        const characterOrigin= document.querySelector('.originValue');
        const originValue= document.createTextNode(character.origin.name);
        characterOrigin.appendChild(originValue);

        const characterLocation= document.querySelector('.locationValue');
        const locationText= document.createTextNode(character.location.name);
        characterLocation.appendChild(locationText);
    

        character.episode.forEach(data => {
            const episodeURL= data;
            fetch(data)
            .then(res=> res.json())
            .then(eps=>{

                const episodeList= document.querySelector('#episodeList');

                const episode= document.createElement('li');
                episode.classList.add('episode');
                
                const episodeName= document.createElement('p');
                episodeName.classList.add('episode-name');
                episodeName.textContent=`⇾  ${eps.episode} - ${eps.name}`;
                episode.appendChild(episodeName);

                const episodeDate= document.createElement('p')
                episodeDate.classList.add('episode-date');
                episodeDate.textContent=eps.air_date;
                episode.appendChild(episodeDate)

                episodeList.appendChild(episode);
            })
            
        });
    
    }

    
    function getCharacter(id){
        const url= `https://rickandmortyapi.com/api/character/${id}`;
        fetch(url)
        .then(res=> res.json())
        .then(data =>{
            renderDetails(data);
        })
    }
    getCharacter(clickID);
})