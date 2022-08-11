function birdsToScreen(birds){
    let cards = document.querySelector('#cards');
    cards.innerHTML = "";
    const template = document.querySelector("#info_card_template");

    for(let i = 0; i < birds.length; i++){
        const info_card = template.content.cloneNode(true);
        info_card.querySelector('img').setAttribute("src", birds[i].photo.source);
        info_card.querySelector('.colour_circle').setAttribute("class", `${birds[i].status.split(' ').join('_')} colour_circle`);
        info_card.querySelector('.status_words').textContent = birds[i].status;
        info_card.querySelector('.primary_name').textContent = birds[i].primary_name;
        info_card.querySelector('.english_name').textContent = birds[i].english_name;
        info_card.querySelector('.scientific_name_word').textContent = birds[i].scientific_name;
        info_card.querySelector('.order_word').textContent = birds[i].order;
        info_card.querySelector('.family_word').textContent = birds[i].family;
        info_card.querySelector('.length_word').textContent = `${birds[i].size.length.value}${birds[i].size.length.units}`;
        info_card.querySelector('.weight_word').textContent = `${birds[i].size.weight.value}${birds[i].size.weight.units}`;
        info_card.querySelector('.credit').textContent = "Photo by " + birds[i].photo.credit;
        
        cards.append(info_card);
    }
    document.querySelector('#how_many_results').innerText = birds.length + " results found";

}

function filter(eventData){
    let inputSearch = document.querySelector('input');
    let inputStatus = document.querySelector('#status_menu');
    let inputSortBy = document.querySelector('#sort_by');

    let search = inputSearch.value;
    let status = inputStatus.value;
    let sortBy = inputSortBy.value;

    let birds = filterConservationStatus(status, all_birds);
    birds = filterSearch(search, birds);
    birds = filterSortBy(sortBy, birds);
    birdsToScreen(birds);

    eventData.preventDefault();
}

function filterConservationStatus(status, birds){
    if(status == "All"){
        return birds;
    }
    let filteredBirds = [];
    for(let i = 0; i < birds.length; i++){
        if(birds[i].status == status){
            filteredBirds.push(birds[i]);
        }
    }
    return filteredBirds;
}

function filterSearch(search, birds){
    if(search == ""){
        return birds;
    }
    let simpleSearch = search.toLowerCase().normalize("NFD");
    let filteredBirds = [];
    for(let i = 0; i < birds.length; i++){
        if(birds[i].primary_name.toLowerCase().normalize("NFD").includes(simpleSearch)){
            filteredBirds.push(birds[i]);
        }else if(birds[i].english_name.toLowerCase().normalize("NFD").includes(simpleSearch)){
            filteredBirds.push(birds[i]);
        }else if(birds[i].scientific_name.toLowerCase().normalize("NFD").includes(simpleSearch)){
            filteredBirds.push(birds[i]);
        }else if(birds[i].order.toLowerCase().normalize("NFD").includes(simpleSearch)){
            filteredBirds.push(birds[i]);
        }else if(birds[i].family.toLowerCase().normalize("NFD").includes(simpleSearch)){
            filteredBirds.push(birds[i]);
        }else{
            let birdNotPushed = true;
            let j = 0
            while(j < birds[i].other_names.length && birdNotPushed){
                if(birds[i].other_names[j].toLowerCase().normalize("NFD").includes(simpleSearch)){
                    filteredBirds.push(birds[i]);
                    birdNotPushed = false;
                }
                j++;
            }
        }
    }
    return filteredBirds;
}

function filterSortBy(sortBy, birds){
    if(sortBy == "Default"){
        return birds;
    }
    let sortBirds = birds;
    if(sortBy == "length" || sortBy == "weight"){
        for(let i = 0; i < sortBirds.length; i++){
            for(let j = 0; j < sortBirds.length-1; j++){
                if(sortBirds[j]["size"][sortBy]["value"] > sortBirds[j+1]["size"][sortBy]["value"]){                   
                    let temp = sortBirds[j+1];
                    sortBirds[j+1] = sortBirds[j];
                    sortBirds[j] = temp;
                }
            }
        }
    }else if(sortBy == "credit"){
        for(let i = 0; i < sortBirds.length; i++){
            for(let j = 0; j < sortBirds.length-1; j++){
                if(sortBirds[j]["photo"][sortBy] > sortBirds[j+1]["photo"][sortBy]){
                    let temp = sortBirds[j+1];
                    sortBirds[j+1] = sortBirds[j];
                    sortBirds[j] = temp;
                }
            }
        }
    }else{
        for(let i = 0; i < sortBirds.length; i++){
            for(let j = 0; j < sortBirds.length-1; j++){
                if(sortBirds[j][sortBy] > sortBirds[j+1][sortBy]){
                    let temp = sortBirds[j+1];
                    sortBirds[j+1] = sortBirds[j];
                    sortBirds[j] = temp;
                }
            }
        }
    }
    return sortBirds;
}

function goToTop(){
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
   
}

async function main(){
    const response = await fetch("data/nzbird.json");
	if (!response.ok){
		console.error(response.status); // error handling
	}
	all_birds = await response.json()

    let filterButton = document.getElementById("filterButton");
    filterButton.addEventListener('click', filter);

    let topButton = document.getElementById("topButton");
    topButton.addEventListener('click', goToTop);

    birdsToScreen(all_birds);
}

let all_birds;

main();