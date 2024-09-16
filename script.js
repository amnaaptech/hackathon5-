// // Get the HTML elements
var profilepickInput = document.getElementById('profilepick');
var resumeForm = document.getElementById('resume');
var nameElement = document.getElementById('name');
var emailElement = document.getElementById('email');
var phoneElement = document.getElementById('phone');
var addressElement = document.getElementById('address');
var educationElement = document.getElementById('education');
var experienceElement = document.getElementById('experience');
var skillsInput = document.getElementById('Skills');
var addSkillBtn = document.getElementById('addskillbtn');
var removeSkillBtn = document.getElementById('remskillbtn');
var skillsList = document.getElementById('skills-list');
var resumeOutputElement = document.getElementById('resumeOutput');
//
var usernameElement = document.getElementById("username");
// Initialize an array to store the skills
var skills = [];
// Regular expressions for validation
var nameRegex = /^[a-zA-Z ]{2,30}$/;
var emailRegex = /^[a-zA-Z0-9]+@[a-z]{5,7}.[a-zA-Z]{2,}$/;
var phoneRegex = /^[0-9]{10}$/;
var addressRegex = /^[a-zA-Z0-9\s,]{2,}$/;
var educationRegex = /^[a-zA-Z0-9\s.,]{2,}$/;
var experienceRegex = /^[a-zA-Z0-9\s.,]{2,}$/;
// Add event listener to the form submission
resumeForm.addEventListener('submit', function (event) {
    var _a;
    event.preventDefault();
    if (profilepickInput && emailElement && phoneElement && addressElement && educationElement && experienceElement && usernameElement) {
        // Get the form values
        var name_1 = nameElement.value;
        var email = emailElement.value;
        var phone = phoneElement.value;
        var address = addressElement.value;
        var profilePick = profilepickInput.value;
        var education = educationElement.value;
        var experience = experienceElement.value;
        var skill = skillsInput.value;
        var username = usernameElement.value;
        var uniquePath = "resume".concat(username.replace(/\s+/g, '_'), "_cv.html");
        // //profile pick 
        var profilepick = (_a = profilepickInput.files) === null || _a === void 0 ? void 0 : _a[0];
        var profilePickURL = profilepick ? URL.createObjectURL(profilepick) : "";
        // Validate the form values
        if (!nameRegex.test(name_1)) {
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
        var resumeOutput = "\n    <h2  style=\"text-align: left;\" >Resume</h2>\n    ".concat(profilePickURL ? "<img src=\"".concat(profilePickURL, "\" alt=\"Profile Pick\" class=\"profilePick\"  style=\"width: 180px;  height: 200px; border-radius: 500%;  box-shadow: 10px 13px 46px -1px rgba(0,0,0,0.37); display: block;\n  margin-right:30px;  margin-buttom:10px; object-fit: cover;  text-align: left; \">") : '', "\n    <p style=\"text-align: left;\"><strong>Name:</strong>\n    <span  style=\"text-align: left;\"  id=\"edit-name\" class=\"editable\">").concat(name_1, "</span>\n    </p>\n    <p style=\"text-align: left;\" ><strong>Email:</strong>\n    <span  style=\"text-align: left;\" id=\"edit-email\" class=\"editable\">").concat(email, "</span>\n    </p>\n    <p style=\"text-align: left;\" ><strong>Phone Number:</strong>\n    <span style=\"text-align: left;\" id=\"edit-phone\" class=\"editable\">").concat(phone, "</span>\n    </p>\n\n    <h3 style=\"text-align: left;\" >Education:</h3>\n    <p style=\"text-align: left;\"  id=\"edit-education\" class=\"editable\">").concat(education, "</p>\n\n    <h3 style=\"text-align: left;\" >Experience</h3>\n    <p style=\"text-align: left;\" id=\"edit-experience\" class=\"editable\">").concat(experience, "</p>\n\n    <h3 style=\"text-align: left;\" >Skills</h3>\n    <ul  style=\"text-align: left;\" id=\"edit-skills\" class=\"editable\">\n      ").concat(skills.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join(''), "\n    </ul>\n\n    \n  ");
        // Create a blob from the resume output
        var blob = new Blob([resumeOutput], { type: 'text/html' });
        // Create a URL from the blob
        var downloadurl = document.createElement('a');
        downloadurl.href = URL.createObjectURL(blob);
        downloadurl.download = uniquePath;
        downloadurl.textContent = 'Download Your Resume';
        // Append the download link to the document
        document.body.appendChild(downloadurl);
        // ...
        // Display the resume output
        var resumeOutputElement_1 = document.getElementById('resumeOutput');
        if (resumeOutputElement_1) {
            resumeOutputElement_1.innerHTML = resumeOutput;
            resumeOutputElement_1.appendChild(downloadurl);
            resumeOutputElement_1.style.display = "block";
        }
        makeEditable();
        ///
        // Update the skills list
        updateSkillsList();
    }
});
// Function to make the resume output editable
function makeEditable() {
    var editableElements = document.querySelectorAll('.editable');
    editableElements.forEach(function (element) {
        element.addEventListener('click', function () {
            var _a;
            var currentElement = element;
            var currentValue = currentElement.textContent || '';
            if (currentElement.tagName === 'P' || currentElement.tagName === 'SPAN') {
                var input_1 = document.createElement('input');
                input_1.type = 'text';
                input_1.value = currentValue;
                input_1.classList.add('editing-input');
                input_1.addEventListener('blur', function () {
                    currentElement.textContent = input_1.value;
                    currentElement.style.display = 'inline';
                    input_1.remove();
                });
                currentElement.style.display = 'none';
                (_a = currentElement.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(input_1, currentElement);
                input_1.focus();
            }
        });
    });
}
// Add event listener to the Add button
addSkillBtn.addEventListener('click', function () {
    var newSkill = skillsInput.value.trim();
    if (newSkill !== '') {
        skills.push(newSkill);
        skillsInput.value = '';
        updateSkillsList();
    }
});
// Add event listener to the Remove button
removeSkillBtn.addEventListener('click', function () {
    if (skills.length > 0) {
        skills.pop();
        updateSkillsList();
    }
});
// Add event listener to the Remove button
removeSkillBtn.addEventListener('click', function () {
    var skillToRemove = skillsInput.value.trim();
    if (skillToRemove !== '') {
        var index = skills.indexOf(skillToRemove);
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
    skills.forEach(function (skill) {
        var listItem = document.createElement('li');
        listItem.textContent = skill;
        skillsList.appendChild(listItem);
    });
}
// Initialize the skills list
updateSkillsList();
