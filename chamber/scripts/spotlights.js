const spotlightContainer = document.querySelector('#spotlights');
const levels = {1: 'Member', 2: 'Silver', 3: 'Gold'};

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

async function getSpotlights() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    const data = await response.json();

    const eligible = data.companies.filter(member => member.membershipLevel >= 2);
    const selected = shuffle(eligible).slice(0, 3);

    displaySpotlights(selected);
  } catch (error) {
    console.error(error);
    spotlightContainer.textContent = 'Spotlights are not available right now.';
  }
}

function displaySpotlights(members) {
    members.forEach(member => {
        const card = document.createElement('article');
        const name = document.createElement('h3');
        const logo = document.createElement('img');
        const phone = document.createElement('p');
        const address = document.createElement('p');
        const website = document.createElement('a');
        const level = document.createElement('p');

        card.classList.add('spotlight-card');

        name.textContent = member.name;

        logo.setAttribute('src', `images/${member.image}`);
        logo.setAttribute('alt', `${member.name} logo`);
        logo.setAttribute('loading', 'lazy');
        logo.setAttribute('width', '200');
        logo.setAttribute('height', '120');

        phone.textContent = member.phone;
        address.textContent = member.address;

        website.textContent = member.website.replace(/^https?:\/\//, '');
        website.setAttribute('href', member.website);
        website.setAttribute('target', '_blank');
        website.setAttribute('rel', 'noopener');

        level.textContent = `${levels[member.membershipLevel]} member`;
        level.classList.add('level', `level-${member.membershipLevel}`);

        card.append(name, logo, phone, address, website, level);
        spotlightContainer.appendChild(card);

    });
}

getSpotlights();

