async function main(){
    let response = await fetch("data/nzbird.json");
    let birds = await response.json();
    console.log(birds[0]);
}

function birdToScreen(birds){
    for(let i = 0; i < birds.length; i++){
        
    }

}

main();