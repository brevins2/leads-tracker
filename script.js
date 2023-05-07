let myLead = [];
const inputEl = document.getElementById('input-el');
const inputBtn = document.getElementById('input-btn');
const list = document.getElementById('list-item');
const deleteBtn = document.getElementById('delete-btn');
const tabbtn = document.getElementById('tab-btn');

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLead"));

if(leadsFromLocalStorage) {
	myLead = leadsFromLocalStorage;
	render(myLead);
}

tabbtn.addEventListener('click', function() {
	chrome.tabs.query({active: true, currentWindow: true}, function(tab) {
		myLead.push(tab[0].url);
		localStorage.setItem("myLead", JSON.stringify(myLead));
		render(myLead);	
	})
});

deleteBtn.addEventListener('dblclick', function() {
	localStorage.clear();
	myLead = [];
	render(myLead);
});

inputBtn.addEventListener('click', function () {
	myLead.push(inputEl.value);
	localStorage.setItem("myLead", JSON.stringify(myLead));

	render(myLead);
});

function render(leads) {
	let listItem = "";
	for(let i = 0; i < leads.length; i++) {
		listItem += `
		<li>
			<a target='_blank' href='${leads[i]}'>${leads[i]}</a>
		</li>
		`;
	}

	list.innerHTML = listItem;
	inputEl.value = "";
}