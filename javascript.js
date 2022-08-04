async function main(){
    let response = await fetch("data/nzbird.json");
    let birds = await response.json();
    console.log(birds[0]);
}

main();