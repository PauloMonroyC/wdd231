
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

        const members = await response.json();

        displayMembers(members);

    }   catch (error) {
        console.error(error);
    }
}

function displayMembers(members) { 
    membersSection.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement('article');
        const name = document.createElement('h2');
        const logo = document.createElement('img');
        const category = document.createElement('p');
        const address = document.createElement('p');
        const phone = document.createElement('p');
        const website = document.createElement('a');
        const level = document.createElement('p');
        const founded = document.createElement('p');

        card.classList.add('member-card');

        name.textContent = member.name;

        logo.setAttribute('src', `images/${member.image}`);
        logo.setAttribute('alt', `${member.name} logo`);
        logo.setAttribute('loading', 'lazy');
        logo.setAttribute('width', '200');
        logo.setAttribute('height', '120');
        
        category.textContent = member.category;
        address.textContent = member.address;
        phone,textContent = member.phone;

        website.textContent = 'Visit website';
        website.setAttribute('href', member.website);
        website.setAttribute('target', '_blank');
        website.setAttribute('rel', "noopener");

        level.textContent = `${levels[member.membershipLevel]} member`;

        card.append(logo, name, category, address, phone, website, level);
        membersSection.appendChild(card);

    });
}