window.onload = async function() {
    try {
      const response = await fetch('data.json');
      const data = await response.json();
      loadPageData(data);
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  }
  
  function createListItem(text) {
    const li = document.createElement('li');
    li.innerText = text;
    return li;
  }
  
  function createProjectElement(project) {
    const projectDiv = document.createElement('div');
    const projectTitle = document.createElement('h3');
    projectTitle.innerText = project.title;
    const projectDescription = document.createElement('p');
    projectDescription.innerText = project.description;
    const projectLink = document.createElement('a');
    projectLink.href = project.link;
    projectLink.innerText = 'Ver proyecto';
    projectDiv.appendChild(projectTitle);
    projectDiv.appendChild(projectDescription);
    projectDiv.appendChild(projectLink);
    return projectDiv;
  }
  
  function createMusicLinkElement(musicLink) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = musicLink.url;
    a.innerText = musicLink.title;
    li.appendChild(a);
    return li;
  }
  
  function loadPageData(data) {
    const headerTitle = document.getElementById('header-title');
    const headerDescription = document.getElementById('header-description');
    const toggleDescription = document.getElementById('toggle-description');
  
    headerTitle.innerText = data.header.title;
  
    // Define las versiones completa y abreviada de la descripción
    const fullDescription = data.header.description;
    const shortDescription = fullDescription.substring(0, 100) + '...';
    
    // Mostrar la descripción abreviada inicialmente
    headerDescription.innerText = shortDescription;
  
    // Alternar entre la descripción completa y la abreviada al hacer clic en el enlace
    toggleDescription.addEventListener('click', function() {
      if (headerDescription.innerText === shortDescription) {
        headerDescription.innerText = fullDescription;
        toggleDescription.innerText = 'Ver menos';
      } else {
        headerDescription.innerText = shortDescription;
        toggleDescription.innerText = 'Ver más';
      }
    });
  
    const programmingSkillsList = document.querySelector('#programming-skills ul');
  const toggleSkills = document.getElementById('toggle-skills');
  const fullSkills = data.programmingSkills;
  const shortSkills = fullSkills.slice(0, 5);
  let isExpanded = false;

  function createListItem(skill) {
    const li = document.createElement('li');
    li.innerText = skill;
    return li;
  }

  function showSkills(skills) {
    programmingSkillsList.innerHTML = '';
    skills.forEach(skill => {
      const li = createListItem(skill);
      programmingSkillsList.appendChild(li);
    });
  }

  toggleSkills.addEventListener('click', function() {
    if (!isExpanded) {
      showSkills(fullSkills);
      toggleSkills.innerText = 'Ver menos';
      isExpanded = true;
    } else {
      showSkills(shortSkills);
      toggleSkills.innerText = 'Ver más';
      isExpanded = false;
    }
  });

  showSkills(shortSkills);
  
    const writingSkillsList = document.querySelector('#writing-skills ul');
    data.writingSkills.forEach(skill => {
      const li = createListItem(skill);
      writingSkillsList.appendChild(li);
    });
  
    const projectsContainer = document.querySelector('#projects-container');
    data.projects.forEach(project => {
      const projectDiv = createProjectElement(project);
      projectsContainer.appendChild(projectDiv);
    });
  
    const musicLinksList = document.querySelector('#music-links ul');
    data.musicLinks.forEach(musicLink => {
      const li = createMusicLinkElement(musicLink);
      musicLinksList.appendChild(li);
    });
  
    document.getElementById('thanks-message').innerText = data.footer.thanksMessage;
    document.getElementById('contact-message').innerText = data.footer.contactMessage;
    document.getElementById('copyright').innerText = data.copyright;
  
    const socialMediaLinksList = document.querySelector('footer .social-media-links');
    Object.entries(data.socialLinks).forEach(([key, value]) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = value;
      a.innerHTML = `<i class="fab fa-${key}"></i>`;
      li.appendChild(a);
      socialMediaLinksList.appendChild(li);
    });
  }
  