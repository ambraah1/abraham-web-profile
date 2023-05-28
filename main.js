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

function initHeader() {
    const headerTitle = document.getElementById('header-title');
    const headerDescription = document.getElementById('header-description');

    headerTitle.textContent = '¡Bienvenido a mi mundo!';
    headerDescription.textContent = '¡Hola! Soy Abraham, un apasionado explorador de distintas áreas del conocimiento y experiencias. A lo largo de mi vida, he jugado muchos roles: desde programador y escritor hasta neurocientífico y analista. Me encanta adentrarme en nuevas disciplinas y desafíos, ya sea en el campo de la metafísica, el deporte, la nutrición, o cualquier otro espacio donde pueda aprender y crecer. En esta página, compartiré contigo mis habilidades, proyectos, escritos y pensamientos. Espero que encuentres algo que te inspire, te informe o simplemente te haga pasar un buen rato. ¡Disfruta del recorrido!';
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

function initProjects() {
    const projects = [
        {
            title: 'True Wireless Earbuds',
            description: '¡Bienvenidos al emocionante mundo de los audífonos inalámbricos! Aquí encontrarás el mejor proyecto de ventas, ofreciendo lo último en tecnología y calidad de sonido. ¡Sumérgete en la libertad de la música sin cables con nosotros!',
            image: 'project1.png',
            link: 'https://truewirelessearbuds.netlify.app/'
        },
        {
            title: 'Proyecto 2',
            description: 'Descripción breve del proyecto 2.',
            image: 'project.png',
            link: '#'
        },
        {
            title: 'Proyecto 3',
            description: 'Descripción breve del proyecto 3.',
            image: 'project.png',
            link: '#'
        }
    ];
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
    for (const [network, url] of Object.entries(data.socialLinks)) {
        document.getElementById(`${network}-link`).href = url;
    }

    // Llenar el contenido de derechos de autor
    const currentYear = new Date().getFullYear();
    document.getElementById('copyright').textContent = `© ${currentYear} ${data.copyright}`;
}

function initMusicLinks() {
    document.querySelector('#song1 a').href = 'https://www.youtube.com/watch?v=XFkzRNyygfk'; // URL de la canción 'Radiohead - Creep'
    document.querySelector('#song2 a').href = 'https://www.youtube.com/watch?v=fV4DiAyExN0'; // URL de la canción 'The Reason - Hoobastank'
    document.querySelector('#song3 a').href = 'https://www.youtube.com/watch?v=eBG7P-K-r1Y'; // URL de la canción 'Foo Fighters - Everlong'
    document.querySelector('#song4 a').href = 'https://www.youtube.com/watch?v=r00ikilDxW4'; // URL de la canción '21 Guns - Green Day'
    document.querySelector('#song5 a').href = 'https://www.youtube.com/watch?v=4qlCC1GOwFw'; // URL de la canción 'One Step Closer - Linkin Park'
    document.querySelector('#song6 a').href = 'https://www.youtube.com/watch?v=rgNvZeZ0K6k'; // URL de la canción 'R. City - Locked Away ft. Adam Levine'
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

function initWritingSkills() {
    const writingSkills = [
        'Creativa y técnica',
        'Constantemente estoy desarrollando y mejorando mis habilidades de escritura. Almaceno en mi computadora varios tipos de escritura, incluyendo relatos sobre mi vida personal, que estarán disponibles en esta página en un futuro próximo. Manténganse al tanto para más actualizaciones.'
    ];
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
