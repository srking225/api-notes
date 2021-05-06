const baseURL = 'https://api.nytimes.com/srv/search/v2/articlesearch.json';//1
const key = '6unzIAJKh9BOg4irzhiGkegwSqqSEpPa';//2
let url; //3

//SEARCH FORM
const searchTerm = document.querySelector('.search');
const startDate = document.querySelector('.start-date');
const endDate = document.querySelector('.edn-date');
const searchForm = document.querySelector('form');
const submitBtn = document.querySelector('.submit');

//RESULTS NAVIGATION
const nextBtn = document.querySelector('.next');
const previousBtn = document.querySelector('.prev');
const nav = document.querySelector('nav');

//Results Secton
const section = document.querySelector('section');

nav.style.display = 'none';
let pageNumber = 0;
let displayNav = false;

searchForm.addEventListener('submit', fetchResults);
nextBtn.addEventListener('click', nextPage);
previousBtn.addEventListener('click', previousPage);

function fetchResults(e){
    e.preventDefault();

url = baseURL + '?api-key=' + key + '&page=' + pageNumber + '&q=' + searchTerm.Value;
console.log(url);
}

function nextPage(){
    console.log("Next button clicked");
}

function previousPage(){
    console.log("Next button clicked");
}
if(startDate.value !==''){
    console.log(startDate.value)
    url += '&begin_date=' + startDate.value;
};

if(endDate.value !== ''){
    url += '&end_date=' + endDate.value;
};

// f/* etch(url)
// .then(function(result){
//     console.log(result)
//     return result.json();
// }).then(function(json){
//     console.log(json);
// }); */

// function fetchResults(e){
    fetch(url).then(function(result) {
        return result.json();
    }).then(function(json){
        displayResults(json);
    });

function displayResults(json){
    console.log("DisplayResults", json);
};

const articles = json.response.docs;

    if(articles.length === 10) {
      nav.style.display = 'block';
    } else {
      nav.style.display = 'none';
    }

    if(articles.length === 0) {
      const para = document.createElement('p');
      para.textContent = 'No results returned.'
      section.appendChild(para);
    } else {
      for(let i = 0; i < articles.length; i++) {
        const article = document.createElement('article');
        const heading = document.createElement('h2');
        const link = document.createElement('a');
        const img = document.createElement('img');
        const para1 = document.createElement('p');
        const para2 = document.createElement('p');
        const clearfix = document.createElement('div');

        const current = articles[i];
        console.log(current);

        link.href = current.web_url;
        link.textContent = current.headline.main;
        para1.textContent = current.snippet;
        para2.textContent = 'Keywords: ';
        for(let j = 0; j < current.keywords.length; j++) {
          const span = document.createElement('span');
          span.textContent = current.keywords[j].value + ' ';
          para2.appendChild(span);
        }

        if(current.multimedia.length > 0) {
          img.src = 'http://www.nytimes.com/' + current.multimedia[0].url;
          img.alt = current.headline.main;
        }

        clearfix.setAttribute('class','clearfix');

        article.appendChild(heading);
        heading.appendChild(link);
        article.appendChild(img);
        article.appendChild(para1);
        article.appendChild(para2);
        article.appendChild(clearfix);
        section.appendChild(article);
      }
    }
  };

  function nextPage(e) {
    pageNumber++;
    fetchResults(e);
  };

  function previousPage(e) {
    if(pageNumber > 0) {
      pageNumber--;
    } else {
      return;
    }
    fetchResults(e);
  };
