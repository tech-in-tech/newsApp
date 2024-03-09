const apiKey = "a79657c87600401599949581c69c83ba"
const url = "https://newsapi.org/v2/everything?q=tesla&from=2024-02-09&sortBy=publishedAt&"

window.addEventListener("load", async () => fetchNews("india"));


async function fetchNews(query) {
  const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&from=2024-02-09&sortBy=publishedAt&apiKey=${apiKey}`);
  const data = await response.json();
  console.log(data);
  bindData(data.articles);
}


function bindData(articles) {
  const card = document.querySelector(".card-container")
  const cardTemplate = document.querySelector("#template-div");

  card.innerHTML = ''

  articles.forEach((article) => {
    if (!article.urlToImage) return;
    const cardClone = cardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone, article);
    card.appendChild(cardClone);
  });
}

function fillDataInCard(cardClone, article) {
  const newsImg = cardClone.querySelector("#img");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsDesc = cardClone.querySelector("#news-desc");
  const newSource = cardClone.querySelector("#news-source");
  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title
  newsDesc.innerHTML = article.description
  const date = new Date(article.publishedAt).toLocaleString("en-us", { timeZone: "Asia/Jakarta" });
  newSource.innerHTML = `${article.source.name} - ${date}`
  // goToNews(article.url,cardClone);
  cardClone.firstElementChild.addEventListener("click",()=>{
    window.open(article.url,"_blank")
  })
  
}





