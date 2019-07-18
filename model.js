import News from './news.js';

export default class Model {
	constructor() {
		console.log('Model constructor');
		this.dataJSON;
		this.fetchcall();
	}

	fetchcall = () => {
		console.log('fetchcall');
		let url = 'https://newsapi.org/v2/top-headlines?' + 'country=us&' + 'apiKey=9fdb04ee4078412b82f9dd7f760464f8';
		let req = new Request(url);
		fetch(req).then((res) => res.json()).then((data) => {
			this.dataJSON = data.articles;
			let news = new News(this.dataJSON);
		});
	};

}
