
// // Get the HTML elements
const profilepickInput = document.getElementById('profilepick') as HTMLInputElement;
const resumeForm = document.getElementById('resume') as HTMLFormElement;
const nameElement = document.getElementById('name') as HTMLInputElement;
const emailElement = document.getElementById('email') as HTMLInputElement;
const phoneElement = document.getElementById('phone') as HTMLInputElement;
const addressElement = document.getElementById('address') as HTMLInputElement;
const educationElement = document.getElementById('education') as HTMLInputElement;
const experienceElement = document.getElementById('experience') as HTMLInputElement;
const skillsInput = document.getElementById('Skills') as HTMLInputElement;
const addSkillBtn = document.getElementById('addskillbtn') as HTMLButtonElement;
const removeSkillBtn = document.getElementById('remskillbtn') as HTMLButtonElement;
const skillsList = document.getElementById('skills-list') as HTMLUListElement;
const resumeOutputElement = document.getElementById('resumeOutput') as HTMLElement;


//
const usernameElement = document.getElementById("username") as HTMLInputElement;


// Initialize an array to store the skills
let skills: string[] = [];

// Regular expressions for validation
const nameRegex = /^[a-zA-Z ]{2,30}$/;
const emailRegex = /^[a-zA-Z0-9]+@[a-z]{5,7}.[a-zA-Z]{2,}$/;
const phoneRegex = /^[0-9]{10}$/;
const addressRegex = /^[a-zA-Z0-9\s,]{2,}$/;
const educationRegex = /^[a-zA-Z0-9\s.,]{2,}$/;
const experienceRegex = /^[a-zA-Z0-9\s.,]{2,}$/;

// Add event listener to the form submission
resumeForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (profilepickInput && emailElement && phoneElement && addressElement && educationElement && experienceElement && usernameElement) {

    // Get the form values
    const name = nameElement.value;
    const email = emailElement.value;
    const phone = phoneElement.value;
    const address = addressElement.value;
    const profilePick = profilepickInput.value;
    const education = educationElement.value;
    const experience = experienceElement.value;
    const skill = skillsInput.value;
    const username = usernameElement.value;
    const uniquePath = `resume${username.replace(/\s+/g, '_')}_cv.html`

    // //profile pick 
    const profilepick = profilepickInput.files?.[0]
    const profilePickURL = profilepick ? URL.createObjectURL(profilepick) : "";

    // Validate the form values
    if (!nameRegex.test(name)) {
      alert('Invalid name Please enter a name with only letters and spaces.');
      return;
    }

    if (!emailRegex.test(email)) {
      alert('Invalid email Please enter a valid email address.');
      return;
    }

    if (!phoneRegex.test(phone)) {
      alert('Invalid phone number Please enter a phone number in the format XXX-XXX-XXXX.');
      return;
    }
    if (!addressRegex.test(address)) {
      alert('Invalid address Please enter a valid address.');
      return;
    }

    if (!educationRegex.test(education)) {
      alert('Invalid education Please enter a valid education.');
      return;
    }

    if (!experienceRegex.test(experience)) {
      alert('Invalid experience Please enter a valid experience.');
      return;
    }

    // Create the resume output
    const resumeOutput = `
    <h2>Resume</h2>
    ${profilePickURL ? `<img src="${profilePickURL}" alt="Profile Pick" class="profilePick"  style="width: 180px;  height: 200px; border-radius: 500%;  box-shadow: 10px 13px 46px -1px rgba(0,0,0,0.37);   display: block;
  margin: 0 auto;       object-fit: cover;  text-align: left; ">` : ''}
    <p><strong>Name:</strong>
    <span id="edit-name" class="editable">${name}</span>
    </p>
    <p><strong>Email:</strong>
    <span id="edit-email" class="editable">${email}</span>
    </p>
    <p><strong>Phone Number:</strong>
    <span id="edit-phone" class="editable">${phone}</span>
    </p>

    <h3>Education:</h3>
    <p id="edit-education" class="editable">${education}</p>

    <h3>Experience</h3>
    <p id="edit-experience" class="editable">${experience}</p>

    <h3>Skills</h3>
    <ul id="edit-skills" class="editable">
      ${skills.map((skill) => `<li>${skill}</li>`).join('')}
    </ul>

    
  `;

    // Create a blob from the resume output
    const blob = new Blob([resumeOutput], { type: 'text/html' });

    // Create a URL from the blob
    const downloadurl = document.createElement('a');
    downloadurl.href = URL.createObjectURL(blob);
    downloadurl.download = uniquePath;
    downloadurl.textContent = 'Download Your Resume';

    // Append the download link to the document
    document.body.appendChild(downloadurl);

    // ...

    // Display the resume output
    const resumeOutputElement = document.getElementById('resumeOutput');
    if (resumeOutputElement) {
      resumeOutputElement.innerHTML = resumeOutput;

      resumeOutputElement.appendChild(downloadurl)
      resumeOutputElement.style.display = "block";


    }

    makeEditable();

    ///



    // Update the skills list
    updateSkillsList();
  }
});

// Function to make the resume output editable
function makeEditable() {
  const editableElements = document.querySelectorAll('.editable');
  editableElements.forEach((element) => {
    element.addEventListener('click', () => {
      const currentElement = element as HTMLElement;
      const currentValue = currentElement.textContent || '';

      if (currentElement.tagName === 'P' || currentElement.tagName === 'SPAN') {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = currentValue;
        input.classList.add('editing-input');

        input.addEventListener('blur', () => {
          currentElement.textContent = input.value;
          currentElement.style.display = 'inline';
          input.remove();
        });

        currentElement.style.display = 'none';
        currentElement.parentNode?.insertBefore(input, currentElement);
        input.focus();
      }
    });
  });
}

// Add event listener to the Add button
addSkillBtn.addEventListener('click', () => {
  const newSkill = skillsInput.value.trim();
  if (newSkill !== '') {
    skills.push(newSkill);
    skillsInput.value = '';
    updateSkillsList();
  }
});
// Add event listener to the Remove button
removeSkillBtn.addEventListener('click', () => {
  if (skills.length > 0) {
    skills.pop();
    updateSkillsList();
  }
});
// Add event listener to the Remove button
removeSkillBtn.addEventListener('click', () => {
  const skillToRemove = skillsInput.value.trim();
  if (skillToRemove !== '') {
    const index = skills.indexOf(skillToRemove);
    if (index !== -1) {
      skills.splice(index, 1);
      skillsInput.value = '';
      updateSkillsList();
    }
  }
});

// Function to update the skills list
function updateSkillsList() {
  skillsList.innerHTML = '';
  skills.forEach((skill) => {
    const listItem = document.createElement('li');
    listItem.textContent = skill;
    skillsList.appendChild(listItem);
  });
}

// Initialize the skills list
updateSkillsList();



