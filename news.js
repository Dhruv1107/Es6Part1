import Model from './model.js';
import Controller from './controller.js';

let model;
window.onload = () => {
	console.log('onload');
	model = new Model();
};

export default class News {
	constructor(data) {
		this.dataJSON = data;
		this.controllerObj = new Controller(data);
		this.displayPage();
		this.fullData = ``;
		this.email = [];
	}
	displayPage = () => {
		this.header();
		this.footer();
		this.displayForm();
		this.displayNews();
	};

	header = () => {
		let html = `<h1 class="header__heading">NEWSFEED</h1><p class="header__caption">Yet another newsfeed</p>
						<input type='text' id='subscribe' class='form__subscribe-textbox' placeholder='Email Address'/>
						<button class='form__subscribe-button' id='subBtn'>Subscribe</button>`;
		document.getElementById('header').innerHTML = html;
		document.getElementById('subBtn').addEventListener("click", this.controllerObj.validate);
	};

	footer = () => {
		let html = `<p class="footer__copyright">&copy; NewsFeed 2019</p>`;
		document.getElementById('footer').innerHTML = html;
	};

	displayForm = () => {
		let channels = [];
		this.dataJSON.forEach((e) => {
			channels.push(e.source.name);
		});
		channels = [...new Set(channels)];
		let formDivision = document.createElement('div');
		formDivision.setAttribute('id', 'iamform');
		let mainDivision = document.getElementById('main');
		mainDivision.appendChild(formDivision);

		let allChannels = '';
		for (let i = 0; i < channels.length; i++) {
			allChannels += `<option value='${channels[i]}'>${channels[i]}</option>`;
		}

		document.getElementById('iamform').innerHTML = `<div class='form'>
		<label for='sel-category' class='form__select-label'><b>SELECT CATEGORY</b></label>
		<select id='sel-category' class='form__select-box'>
		<option value=' ' selected></option>
		${allChannels} 
		</select>
		</div>`;
		document.getElementById('sel-category').addEventListener("change", this.selectCategoryNews);
	};

	displayNews = () => {
		let displayNews = document.createElement('div');
		displayNews.setAttribute('id', 'displaynews');
		let main = document.getElementById('main');
		main.appendChild(displayNews);
		console.log(this.dataJSON);
		this.fullData = `<div class='content' id='content'>`;
		for (let index = 0; index < this.dataJSON.length; index++) {
			this.fullData += `<div class='content__sub' id='content__display'>
								<img src='${this.dataJSON[index].urlToImage}' class='content__img' ></img>
								<h3 class='content__modifier content__head' id='myBtn'>
								${this.dataJSON[index].title}
								</h3>
								<p class='content__modifier content__date'>
								${this.dataJSON[index].publishedAt}
								</p>
								<p class='content__modifier content__matter'>
								${this.dataJSON[index].description}
								</p>
								<a href='#!' class='content__modifier btn btn--pink' id='myBtn${index}' 
								>Continue Reading</a>
								</div>
								<hr>`;
		}
		document.getElementById('displaynews').innerHTML = this.fullData;
		let obj = new Controller(this.dataJSON);
		for (let index = 0; index < this.dataJSON.length; index++) {
			document.getElementById(`myBtn${index}`).addEventListener("click", function () {
				obj.showpopup(index);
			});
		}
	};

	selectCategoryNews = () => {
		let selectedCategory = document.getElementById('sel-category').value;
		let display = ' ';
		let indexDisplay = [];

		let selectedData = this.dataJSON.filter(function (e, index) {
			if (selectedCategory === e.source.name) indexDisplay.push(index);
			return selectedCategory === e.source.name;
		});
		console.log(selectedData);	//2 Data
		console.log(indexDisplay);	// index=[2,16]
		selectedData.forEach((currentItem, index) => {
			display += `<div class='content' id='content'>
							<div class='content__sub' id='content__display'>
							<img src='${currentItem.urlToImage}' class='content__img' ></img>
							<h3 class='content__modifier content__head'>
							${currentItem.title}
							</h3>
							<p class='content__modifier content__date'>
							${currentItem.publishedAt}
							</p>
							<p class='content__modifier content__matter'>
							${currentItem.description}
							</p>
							<a href='#' class='content__modifier btn btn--pink' id='myBtn${index}'>Continue Reading</a>
							</div><hr></div>`;
		});

		document.getElementById('displaynews').innerHTML = display;
		let obj = new Controller(this.dataJSON);
		for (let index = 0; index < selectedData.length; index++) {
			console.log(document.getElementById(`myBtn${index}`).innerHTML);
			document.getElementById(`myBtn${index}`).addEventListener("click", function () {
				obj.showpopup(indexDisplay[index]);
			});
		}
	};

}
