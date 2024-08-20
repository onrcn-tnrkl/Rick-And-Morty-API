document.addEventListener('DOMContentLoaded', () => {
    const characterContainer = document.querySelector('.character-container');
    let currentUrl= new URL( `https://rickandmortyapi.com/api/character`);
    let currentPage=1;
    const backBtns = document.querySelectorAll(".backBtn");
    const currentTotals = document.querySelectorAll(".current-total-page");
    const nextBtns = document.querySelectorAll(".nextBtn");
    
    const filterName= document.querySelectorAll('.nameText');
    const filterStatus= document.querySelectorAll('.statusElement');
    const filterSpecies= document.querySelectorAll(".speciesText");
    const filterType= document.querySelectorAll('.typeText');
    const filterGender= document.querySelectorAll('.genderElement');
    const filterBtn= document.querySelectorAll('.filter-btn');
    const cancelBtn=document.querySelectorAll('.cancel-btn');

    function renderCharacter(characterData) {
        const character = document.createElement('div');
        character.classList.add('character');

        const characterImg = document.createElement('img');
        characterImg.src = characterData.image;
        character.appendChild(characterImg);

        const characterDescription = document.createElement('div');
        characterDescription.classList.add('character-description');

        const characterName = document.createElement('h2');
        characterName.classList.add('character-name');
        characterName.textContent = characterData.name;
        characterDescription.appendChild(characterName);

        const characterSpecies = document.createElement('div');
        characterSpecies.classList.add('character-species');
        characterSpecies.textContent = characterData.species;
        characterDescription.appendChild(characterSpecies);

        const characterType = document.createElement('div');
        characterType.classList.add('character-type');
        characterType.textContent = characterData.type || 'No type';
        characterDescription.appendChild(characterType);

        const hr = document.createElement('hr');

        characterDescription.appendChild(hr);
        const characterStatus = document.createElement('div');
        characterStatus.classList.add('character-status');
        const statusIcon = document.createElement('i');
        const statusText = document.createTextNode(characterData.status);
        if (characterData.status === "Alive") {
            statusIcon.classList.add('fa-regular', 'fa-face-laugh');
            characterStatus.style.color = "#319795";
        } else if (characterData.status === "Dead") {
            statusIcon.classList.add('fa-regular', 'fa-face-dizzy');
            characterStatus.style.color = "red";
        } else {
            statusIcon.classList.add('fa-solid', 'fa-face-meh');
            characterStatus.style.color = "purple";
            statusText.textContent="Status unknown"
        }
        characterStatus.appendChild(statusIcon);
        characterStatus.appendChild(statusText);
        characterDescription.appendChild(characterStatus);


        const characterGender = document.createElement('div');
        characterGender.classList.add('character-gender');
        const genderIcon = document.createElement('i');
        let genderText = document.createTextNode(characterData.gender);
        
        if (characterData.gender === "Male") {
            genderIcon.classList.add('fa-solid', 'fa-mars');
            characterGender.style.color = "#3182CE"; // Mavi renk
        } else if (characterData.gender === "Female") {
            genderIcon.classList.add('fa-solid', 'fa-venus');
            characterGender.style.color = "#E53E3E"; // Kırmızı renk
        } else if (characterData.gender === "Genderless") {  // characterData kullanılıyor
            genderIcon.classList.add('fa-solid', 'fa-genderless');
            characterGender.style.color = "#718096"; // Gri renk
        } else {
            genderIcon.classList.add('fa-solid', 'fa-mars-and-venus');
            characterGender.style.color = "#9F7AEA"; // Mor renk
            genderText = document.createTextNode("Gender unknown");  // Gender unknown metnini oluştur
        }
        
        characterGender.appendChild(genderIcon);
        characterGender.appendChild(genderText);
        characterDescription.appendChild(characterGender);
        


        const characterLocation = document.createElement('div');
        characterLocation.classList.add('character-location');
        const locationIcon = document.createElement('i');
        locationIcon.classList.add('fa-solid', 'fa-location-dot');
        characterLocation.appendChild(locationIcon);
        const locationName = document.createTextNode(characterData.location.name);
        characterLocation.appendChild(locationName);
        characterDescription.appendChild(characterLocation);


        const detailsBtn = document.createElement('button');
        detailsBtn.classList.add('details-btn')
        const detailsText = document.createElement('p');
        detailsText.textContent = "Details";
        const detailsArrow = document.createElement('i');
        detailsArrow.classList.add('fa-solid', 'fa-arrow-right');
        detailsBtn.appendChild(detailsText);
        detailsBtn.appendChild(detailsArrow);
        characterDescription.appendChild(detailsBtn);


        detailsBtn.addEventListener('click',()=>{
            localStorage.setItem('clickID',characterData.id);
            alert(`${characterData.id} numaralı kayıt tıklandı!`);
            window.location.href="details.html";
        })

        character.appendChild(characterDescription);
        characterContainer.appendChild(character);
    }
    
    function pagination_TotalShowing(data){
        const backPages = document.querySelectorAll('.backPage');
        const nextPages = document.querySelectorAll('.nextPage');

        // BackPage ve NextPage güncellemeleri
        backPages.forEach(backPage => {
            backPage.innerHTML = currentPage > 1 ? currentPage - 1 : "";
        });

        nextPages.forEach(nextPage => {
            nextPage.innerHTML = currentPage < data.info.pages ? currentPage + 1 : "";
        });

        // Back and Next Button görünürlüğü
        backBtns.forEach(backBtn => {
            backBtn.style.display = data.info.prev === null ? "none" : "flex";
        });

        nextBtns.forEach(nextBtn => {
            nextBtn.style.display = data.info.next === null ? "none" : "flex";
        });

        const total= document.getElementById('totalCount');
        const showing= document.getElementById('showing');
        if(characterContainer){
            total.innerText= data.info.count;
            showing.innerText=`Showing ${(data.results).length}`;
            currentTotals.forEach(currentTotal => {
                currentTotal.innerHTML = `${currentPage}/${data.info.pages}`;
            });
        }
        else{
            total.innerHTML=0 ;
            showing.innerHTML='Showing 0';
            currentTotals.forEach(currentTotal=>{
                currentTotal.innerHTML="1/1";
            })
        }
        
    }
    backBtns.forEach(backBtn => {
        backBtn.addEventListener('click', () => {
            if (pageData.info.prev) {
                characterContainer.innerHTML = "";
                currentPage--;
                currentUrl = pageData.info.prev;
                loadCharacters(currentUrl);
            }
        });
    });

    nextBtns.forEach(nextBtn => {
        nextBtn.addEventListener('click', () => {
            if (pageData.info.next) {
                characterContainer.innerHTML = "";
                currentPage++;
                currentUrl = pageData.info.next;
                loadCharacters(currentUrl);
            }
        });
    });

    function filterCharacter(url){
        const filterURL = new URL(url);
        filterName.forEach(fn => {
            if (fn.value) {
                filterURL.searchParams.set('name', fn.value);
            }
        });
        filterStatus.forEach(fsts => {
            if (fsts.selectedIndex !== 0) {
                filterURL.searchParams.set('status', fsts.value);
            }
        });
        filterSpecies.forEach(fspcs => {
            if (fspcs.value) {
                filterURL.searchParams.set('species', fspcs.value);
            }
        });
        filterType.forEach(ft => {
            if (ft.value) {
                filterURL.searchParams.set('type', ft.value);
            }
        });
        filterGender.forEach(fg => {
            if (fg.selectedIndex !== 0) {
                filterURL.searchParams.set('gender', fg.value);
            }
        });
        
        loadCharacters(filterURL);
    }

    function resetFilter(url){
        filterName.forEach(fn => {
            fn.value=""
        });
        filterStatus.forEach(fsts => {
            fsts.selectedIndex=0;
        });
        filterSpecies.forEach(fspcs => {
            fspcs.value="";
        });
        filterType.forEach(ft => {
            ft.value="";
        });
        filterGender.forEach(fg => {
            fg.selectedIndex=0;
        });
        loadCharacters(url)
    }

    filterBtn.forEach(btn=>{
        btn.addEventListener('click',()=>{
            characterContainer.innerHTML="";
            filterCharacter(currentUrl) 
        });
    })

    cancelBtn.forEach(btn=>{
        btn.addEventListener('click',()=>{
            characterContainer.innerHTML="";
            resetFilter(currentUrl);
        })
    })
    
    
    let pageData={};
    function loadCharacters(page) {
        const url = page
        
        // Tüm karakterleri çağıran URL
        fetch(url)
            .then(res => res.json())
            .then(data => {
                
                data.results.forEach(character => {
                    renderCharacter(character);
                });
                pagination_TotalShowing(data);
                pageData=data;
            })
            .catch(error => {
                console.error('API yüklenirken hata oluştu: ', error);
            });
    }

    loadCharacters(currentUrl);


});
