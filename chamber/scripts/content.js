
const url = "data/members.json";

const membersSection = document.querySelector('#members');
const gridButton = document.querySelector('#grid');
const listButton = document.querySelector('#list');

const levels = {1: 'Member', 2: 'Silver', 3:'Gold'};

async function getMembers() {
    try {
        const response = await fetch(url);

        if(!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);

        }

        const data = await response.json();

        displayMembers(data.companies);

    }   catch (error) {
        console.error(error);
    }
}

function displayMembers(members) { 
    membersSection.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement('article');
        const name = document.createElement('h2');
        const category = document.createElement('p');
        const logo = document.createElement('img');
        const address = document.createElement('p');
        const phone = document.createElement('p');
        const website = document.createElement('a');
        const founded = document.createElement('p');
        const level = document.createElement('p');

        card.classList.add('member-card');

        name.textContent = member.name;
        
        category.textContent = member.category;
        category.classList.add('tagline');
        
        logo.setAttribute('src', `images/${member.image}`);
        logo.setAttribute('alt', `${member.name} logo`);
        logo.setAttribute('loading', 'lazy');
        logo.setAttribute('width', '200');
        logo.setAttribute('height', '120');
        
        address.textContent = member.address;
        address.classList.add('address');

        phone.textContent = member.phone;
        phone.classList.add('phone');
        
        website.textContent = member.website.replace(/^https?:\/\//, '');
        website.setAttribute('href', member.website);
        website.setAttribute('target', '_blank');
        website.setAttribute('rel', "noopener");
        website.classList.add('url');
        
        founded.textContent = `Founded: ${member.founded}`;
        founded.classList.add('founded');
        
        level.textContent = `${levels[member.membershipLevel]} member`;
        level.classList.add('level', `level-${member.membershipLevel}`);

        card.append(name, category, logo, address, phone, website, founded, level);
        membersSection.appendChild(card);

    });
}

gridButton.addEventListener('click', () => {
    membersSection.classList.add('grid');
    membersSection.classList.remove('list');
    gridButton.setAttribute('aria-pressed', 'true');
    listButton.setAttribute('aria-pressed', 'false');
});


listButton.addEventListener('click', () => {
    membersSection.classList.add('list');
    membersSection.classList.remove('grid');
    listButton.setAttribute('aria-pressed', 'true');
    gridButton.setAttribute('aria-pressed', 'false');
});


getMembers();

