let qoute = document.getElementById('qouteId');
let Author = document.getElementById('author');
let tweetBtn = document.getElementById('tweeting');
let Loader = document.getElementById("loader");
let QouteContainer = document.getElementById("quote-body");
let count = 1;

function Loading(){
    Loader.hidden = false;
    QouteContainer.hidden = true; 
}

function showPage(){
    if(!Loader.hidden){
        QouteContainer.hidden = false;
        loader.hidden = true;
    }
}
// Getting Qoute from Api Url 
//  Function <<Start>> 
    async  function getQuote() {
        Loading();
        //Cors issue solved link
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        // Quote Api Url 
        const url = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
        try {
            let response = await fetch(proxy + url);
            let data = await response.json();
                if(data.quoteAuthor === ''){
                    Author.innerText = 'Unknown';
                }else{
                    Author.innerText = data.quoteAuthor
                }

            // set Quote text
            quoteText = data.quoteText; 
            qoute.innerText = quoteText;
            showPage();
        } catch (error) {
            console.log('oops.. something is wrong..',);
            // counting upto 10 if continue error persist
            if(count < 10){
                count++;
                getQuote();
            }else{
                console.log("Please Refresh")
            }
    }
}
//   Function <<End>> here 

//Tweet Quote
function tweet() {
    let tweetQuotetxt = qoute.innerText;
    let author =  Author.innerText;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetQuotetxt} by ${author}`;
    window.open(tweetUrl, '_blank');
}

// adding event listeners
tweetBtn.addEventListener('click' , tweet);


//Loading functions
// function display(){
//     if(true){
//         document.getElementById("loader").style.display = "block";
//         document.getElementById("quote-body").style.display = "none";
//     }else{
//         document.getElementById("loader").style.display = "none";
//         document.getElementById("quote-body").style.display = "block";
//     }
// }