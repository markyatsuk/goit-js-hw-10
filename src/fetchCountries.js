export { fetchCountries };


function fetchParams(){
    const params = new URLSearchParams({
        fields: "name.official, capital, populatio, flags.svg, languages" 
    })
    return params;
}


function fetchCountries(name){
    return fetch(`https://restcountries.com/v3.1/name/${name}?${fetchParams}`)
    .then(response => {
        if(!respomce.ok){
            throw new Error(response.status);
        }
        return response.json();
    })
}