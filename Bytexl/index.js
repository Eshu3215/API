const newsContainer = document.getElementById('news-container');


async function fetchNews() {
    const url = 'https://ok.surf/api/v1/cors/news-feed'; 
    try {
        const response = await fetch(url);
        const data = await response.json();

        
        if (data.Business && data.Business.length > 0) {
            displayNews(data.Business);
        } else {
            newsContainer.innerHTML = '<p>Unable to load news at this time.</p>';
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        newsContainer.innerHTML = '<p>There was an error loading news.</p>';
    }
}


function displayNews(articles) {
    newsContainer.innerHTML = '';  

    articles.forEach(article => {
        const newsCard = document.createElement('div');
        newsCard.className = 'news-card';

        const imageUrl = article.og ? article.og : 'https://via.placeholder.com/300x150';
        const newsHTML = `
            <img src="${imageUrl}" alt="${article.title}">
            <div class="news-content">
                <h3>${article.title}</h3>
                <p>Source: <img src="${article.source_icon}" alt="${article.source}" style="width: 16px; height: 16px;"> ${article.source}</p>
                <a href="${article.link}" target="_blank">Read more</a>
            </div>
        `;

        newsCard.innerHTML = newsHTML;
        newsContainer.appendChild(newsCard);
    });
}


window.onload = () => {
    fetchNews();
};
