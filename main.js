document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initAboutMe();
    initSkills();
    initProjects();
    initBlogPosts();
    initContactInfo();
    initContactForm();
    initFooter(); // Añade la llamada a la función aquí.
    initMusicLinks(); // Añade la llamada a la función aquí.
    initExperienceEducation(); // Nueva llamada a función
    initWritingSkills(); // Añade la llamada a la función aquí.
    initSportsList();
});

async function initHeader() {
    const response = await fetch('data.json');
    const jsonData = await response.json();

    const headerData = jsonData.header;
    
    const headerTitle = document.getElementById('header-title');
    const headerDescription = document.getElementById('header-description');

    headerTitle.textContent = headerData.title;
    headerDescription.textContent = headerData.description;
}


function initAboutMe() {
    const aboutMe = document.getElementById('about-me');
    aboutMe.textContent = 'Soy Abraham, un apasionado de la tecnología y la creatividad. Me especializo en programación y disfruto tanto de escribir ficción como de explorar temas de no ficción. Mi curiosidad me ha llevado a investigar la metafísica, el funcionamiento del cerebro y la nutrición. Además, como deportista entusiasta, busco mantener un estilo de vida activo y saludable para potenciar mi bienestar integral.';
}

async function initSkills() {
    // Cargar los datos
    const response = await fetch('data.json');
    const data = await response.json();

    const programmingSkillsList = document.getElementById('programming-skills-list');
    const toggleSkillsButton = createToggleButton(programmingSkillsList);

    // Llenar la lista de habilidades
    data.programmingSkills.forEach(skill => {
        const skillItem = document.createElement('li');
        skillItem.textContent = skill;
        programmingSkillsList.appendChild(skillItem);
    });

    programmingSkillsList.classList.add('hidden');
    programmingSkillsList.parentNode.insertBefore(toggleSkillsButton, programmingSkillsList);
}


function createToggleButton(elementToToggle) {
    const toggleButton = document.createElement('button');
    toggleButton.id = 'toggle-skills-button';
    toggleButton.textContent = 'Mostrar habilidades';
    toggleButton.addEventListener('click', () => {
        elementToToggle.classList.toggle('hidden');
        toggleButton.textContent = elementToToggle.classList.contains('hidden') ? 'Mostrar habilidades' : 'Ocultar habilidades';
    });
    return toggleButton;
}

async function initProjects() {
    const response = await fetch('data.json');
    const jsonData = await response.json();

    const projects = jsonData.projects;
    const projectsList = document.getElementById('projects');

    projects.forEach(project => {
        const projectItem = document.createElement('li');
        const projectContent = createProjectContent(project);
        projectItem.innerHTML = projectContent;
        projectsList.appendChild(projectItem);
    });
}


function createProjectContent(project) {
    return `
        <div class="project">
            <img src="${project.image}" alt="${project.title}">
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <a href="${project.link}">Enlace al proyecto</a>
            </div>
        </div>
    `;
}

function initBlogPosts() {
    const blogPosts = [
        {
            title: 'Título del Artículo 1',
            content: 'Contenido del artículo 1.'
        },
    ];
    const blogPostsContainer = document.getElementById('blog-posts');

    blogPosts.forEach(post => {
        const postItem = document.createElement('div');
        postItem.classList.add('blog-post');
        const postContent = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
        `;
        postItem.innerHTML = postContent;
        blogPostsContainer.appendChild(postItem);
    });
}

function initContactInfo() {
    const contactInfo = [
        { label: 'Dirección', value: 'Metaverso' },
        { label: 'Teléfono', value: '+1234567890' },
        { label: 'Email', value: 'abrahamav011@gmail.com' }
    ];
    const contactInfoList = document.getElementById('contact-info');

    contactInfo.forEach(info => {
        const infoItem = document.createElement('li');
        const labelElement = document.createElement('strong');
        labelElement.textContent = info.label + ': ';
        infoItem.appendChild(labelElement);
        infoItem.appendChild(document.createTextNode(info.value));
        contactInfoList.appendChild(infoItem);
    });
}


function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const nameErrorText = document.querySelector('#name + .error-text');
    const emailErrorText = document.querySelector('#email + .error-text');
    const messageErrorText = document.querySelector('#message + .error-text');

    const resetErrorText = () => {
        nameErrorText.textContent = '';
        emailErrorText.textContent = '';
        messageErrorText.textContent = '';
    };

    const displayError = (input, message) => {
        const errorText = document.querySelector(`#${input.id} + .error-text`);
        errorText.textContent = message;
    };

    contactForm.addEventListener('submit', event => {
        event.preventDefault();
        resetErrorText();
        try {
            validateContactForm(nameInput, emailInput, messageInput);
            const name = nameInput.value;
            const email = emailInput.value;
            const message = messageInput.value;
            console.log('Nombre:', name);
            console.log('Email:', email);
            console.log('Mensaje:', message);
            contactForm.reset();
        } catch (error) {
            displayError(error.target, error.message);
        }
    });
}


function validateContactForm(nameInput, emailInput, messageInput) {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (name.length < 3) {
        throw new Error('El nombre debe tener al menos 3 caracteres.');
    } else if (name.length > 50) {
        throw new Error('El nombre debe tener como máximo 50 caracteres.');
    } else if (!/^[a-zA-Z\s]+$/.test(name)) {
        throw new Error('El nombre sólo puede contener letras y espacios.');
    }

    validateEmail(email);

    if (message.length < 10) {
        throw new Error('El mensaje debe tener al menos 10 caracteres.');
    } else if (message.length > 500) {
        throw new Error('El mensaje debe tener como máximo 500 caracteres.');
    }
}


function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!regex.test(email)) {
        throw new Error('Email inválido');
    }

    const validDomains = ['gmail.com', 'yahoo.com', 'hotmail.com'];
    const domain = email.split('@')[1].toLowerCase();

    if (!validDomains.includes(domain)) {
        throw new Error('Dominio de email no soportado');
    }

    return true;
}

async function initFooter() {
    // Cargar los datos
    const response = await fetch('data.json');
    const data = await response.json();

    // Llenar los enlaces a las redes sociales
    const socialMediaLinksDiv = document.getElementById('social-media-links');
    for (const [network, url] of Object.entries(data.socialLinks)) {
        const aElement = document.createElement('a');
        aElement.id = `${network}-link`;
        aElement.href = url;
        aElement.target = '_blank';
        aElement.title = network.charAt(0).toUpperCase() + network.slice(1);

        const iElement = document.createElement('i');
        iElement.className = `fab fa-${network}`;

        aElement.appendChild(iElement);
        aElement.appendChild(document.createTextNode(` ${network.charAt(0).toUpperCase() + network.slice(1)}`));

        socialMediaLinksDiv.appendChild(aElement);
    }

    // Llenar el contenido de derechos de autor
    const currentYear = new Date().getFullYear();
    document.getElementById('copyright').textContent = `© ${currentYear} ${data.copyright}`;

    // Cambiar el contenido de los mensajes de pie de página
    document.getElementById('thanks-message').textContent = data.footer.thanksMessage;
    document.getElementById('contact-message').textContent = data.footer.contactMessage;
}



async function initMusicLinks() {
    const response = await fetch('data.json');
    const jsonData = await response.json();

    const musicLinks = jsonData.musicLinks;
    const musicListElement = document.querySelector('#music-list');
    
    // Limpia cualquier contenido existente
    while (musicListElement.firstChild) {
        musicListElement.firstChild.remove();
    }

    musicLinks.forEach(song => {
        const listItem = document.createElement('li');
        listItem.id = song.id;

        const link = document.createElement('a');
        link.href = song.url;
        link.textContent = song.title;

        listItem.appendChild(link);
        musicListElement.appendChild(listItem);
    });
}




function initExperienceEducation() {
    const experienceEducationList = document.getElementById('experience-education');

    // Limpia cualquier contenido existente
    while (experienceEducationList.firstChild) {
        experienceEducationList.firstChild.remove();
    }

    // Nueva experiencia y educación para mostrar
    const experienceEducation = [
        'Experiencia autodidacta en programación y desarrollo web',
        'Grado en Ciencias de la Computación, Universidad XYZ',
        'Certificación en Desarrollo Full-Stack, Bootcamp ABC'
    ];

    // Crea y añade cada nueva experiencia/educación a la lista
    experienceEducation.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        experienceEducationList.appendChild(listItem);
    });
}

async function initWritingSkills() {
    const data = await fetch('data.json');
    const jsonData = await data.json();
    const writingSkills = jsonData.writingSkills;
    const writingSkillsList = document.getElementById('writing-skills');

    writingSkills.forEach(skill => {
        const skillItem = document.createElement('li');
        skillItem.textContent = skill;
        writingSkillsList.appendChild(skillItem);
    });
}


function initSportsList() {
    const sports = [
        'Fútbol',
        'Baloncesto',
        'Caminata',
        'Trote',
        'Ejercicios de baja intensidad',
        'Yoga'
    ];
    const sportsList = document.getElementById('sports-list');

    sports.forEach(sport => {
        const sportItem = document.createElement('li');
        sportItem.textContent = sport;
        sportsList.appendChild(sportItem);
    });
}
