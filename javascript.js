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
}

function filter(eventData){
    console.log(eventData);
    let inputSearch = document.querySelector('input');
    let inputStatus = document.querySelector('#status_menu');
    let inputSortBy = document.querySelector('#sort_by');

    let search = inputSearch.value;
    let status = inputStatus.value;
    let sortBy = inputSortBy.value;

    //console.log(`${search} ${status} ${sortBy}`);

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
    console.log(filteredBirds);
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
        }
    }
    console.log(filteredBirds);
    return filteredBirds;
}
/*
function compare(a, b){
    let namea = a.english_name.toUpperCase;
    console.log(a.english_name);
    let nameb = b.english_name.toUpperCase;
    let comparison = 0
    if(namea > nameb){
        comparison = 1
    }else if(namea < nameb){
        comparison = -1;
    }
    console.log("tst");
    return comparison;
}

function filterSortBy(sortBy, birds){
    if(sortBy == "Default"){
        return birds;
    }
    let sortBirds = birds;
    console.log(sortBy);
    sortedBirds = sortBirds.sort(compare);
    console.log(sortBirds.sort(compare)[0])
    console.log(sortedBirds[0]);
    return sortedBirds;
}
*/
function filterSortBy(sortBy, birds){
    if(sortBy == "Default"){
        return birds;
    }
    let sortBirds = birds;
    console.log(sortBy);
    if(sortBy == "length" || sortBy == "weight"){
        console.log("test");
        for(let i = 0; i < sortBirds.length; i++){
            for(let j = 0; j < sortBirds.length-1; j++){
                if(sortBirds[j]["size"][sortBy]["value"] > sortBirds[j]["size"][sortBy]["value"]){
                    
                    let temp = sortBirds[j+1];
                    sortBirds[j+1] = sortBirds[j];
                    sortBirds[j] = temp;
                }
            }
        }
    }else if(sortBy == "credit"){
        for(let i = 0; i < sortBirds.length; i++){
            for(let j = 0; j < sortBirds.length-1; j++){
                if(sortBirds[j]["photo"][sortBy] > sortBirds[j]["photo"][sortBy]){
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

async function main(){
    let response = await fetch("data/nzbird.json");
    all_birds = await response.json();


    let filterButton = document.querySelector('button');
    filterButton.addEventListener('click', filter);

    birdsToScreen(all_birds);
}

let all_birds;

main();