import News from './view.js';

export default class Controller {
	constructor(data) {
		this.dataJSON = data;
		this.email = [];
	}

	validate = () => {
		if (
			/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(
				document.getElementById('subscribe').value
			)
		) {
			let loc = localStorage.getItem('iamkey');
			if (loc) {
				this.email = JSON.parse(loc);
			}
			this.email.push(document.getElementById('subscribe').value);
			localStorage.setItem('iamkey', JSON.stringify(this.email));
			console.log(localStorage.getItem('iamkey'));
			alert('You have entered a valid email address!');
			return true;
		}
		alert('You have entered an invalid email address!');
		return false;
	};

	showpopup = (i) => {
		let modalData = `<div id="myModal" class="modal">
					<div class="modal-content">
						<div class="modal-header">
							<span class="close" id="spanClose">&times;</span>
							<h2 id="popup_head"></h2>
						</div>
						<div class="modal-body">
							<p id="popup_content" class="popup_content"></p>
						</div>
						<div class="modal-footer">
							<h3 id="popup_foot">&copy; NewsFeed 2019</h3>
						</div>
					</div>
				</div>`;

		let modelDivision = document.createElement('div');
		modelDivision.setAttribute('id', 'iammodal');
		let contentDivision = document.getElementById('content');
		contentDivision.appendChild(modelDivision);
		document.getElementById('iammodal').innerHTML = modalData;
		document.getElementById('spanClose').addEventListener("click", this.closepopup);

		document.getElementById('popup_head').innerHTML = this.dataJSON[i].title;
		document.getElementById('popup_content').innerHTML = this.dataJSON[i].content;
		let modal = document.getElementById('myModal');
		modal.style.display = 'block';

	}

	closepopup = () => {
		let modal = document.getElementById('myModal');
		modal.style.display = 'none';
	}

	showLoader = () => {
		let loader = document.createElement('div');
		loader.setAttribute('id', 'loader');
		loader.setAttribute('class', 'loader');
		let main = document.getElementById('main');
		main.appendChild(loader);
	}

	closeLoader = () => {
		let loader = document.getElementById('loader');
		loader.style.display = 'none';
	}
}
window.onclick = function (event) {
	let modal = document.getElementById('myModal');
	if (event.target == modal) {
		modal.style.display = 'none';
	}
};
