const API_KEY = '017ff392a4ea4d1cb7baa9b7915c6c54';
const url = 'https://newsapi.org/v2/everything?q=';

window.addEventListener('load', fetchNews('top india technology news'))

async function fetchNews(query) {
  const res = await fetch(`${url}${query}&sortBy=publishedAt&apiKey=${API_KEY}`);
  const data = await res.json();
  console.log(data)
  bindData(data.articles);
}

function bindData(articles) {
  const template = document.getElementById('cardtemp');
  const container = document.getElementById('container');
  container.innerHTML = "";

  articles.forEach((article) => {
    if (!article.urlToImage) return;
    const cardClone = template.content.cloneNode(true);
    fillData(cardClone, article)
    container.appendChild(cardClone);

  });
}

function fillData(cardClone, articles) {
  let img = cardClone.getElementById('cimg');
  let title = cardClone.getElementById('ctitle');
  let source = cardClone.getElementById('csrc');
  let desc = cardClone.getElementById('cdesc');
  const date = new Date(articles.publishedAt).toLocaleDateString("en-US", "asia/india");

  img.src = articles.urlToImage;
  title.innerHTML = articles.title;
  desc.innerHTML = articles.description;
  source.innerHTML = `${articles.source.name} ${date}`;
}