"use strict";
//* Get form and resume div elements
const form_submit = document.getElementById("resume-form");
const resume_generate = document.getElementById("generated-resume");
// const shareable_link_container = document.getElementById(
//   "shareable-link"
// ) as HTMLDivElement;
const shareable_link_element = document.getElementById("share-link");
const download_pdf_Btn = document.getElementById("pdf-download");
//* Form submission event listener
form_submit.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form submission from reloading the page
    //* Capture input values
    const username = document.getElementById("username")
        .value; // Now correctly capturing the username inside the event
    const user_name = document.getElementById("name").value;
    const user_email = document.getElementById("email")
        .value;
    const user_phone = document.getElementById("phone")
        .value;
    const user_education = document.getElementById("education").value;
    const user_experience = document.getElementById("experience").value;
    const user_skills = document.getElementById("skills")
        .value;
    //* Save resume data to localStorage with the username as the key
    const resumeData = {
        user_name,
        user_email,
        user_phone,
        user_education,
        user_experience,
        user_skills,
    };
    localStorage.setItem(username, JSON.stringify(resumeData));
    const resume_html = `
    <h2><b>Editable Resume</b></h2>
    <h3>Personal Info</h3>
    <p><b>Name:</b> <span contenteditable="true">${user_name}</span></p>
    <p><b>Email:</b> <span contenteditable="true">${user_email}</span></p>
    <p><b>Phone No:</b> <span contenteditable="true">${user_phone}</span></p>
    
    <h3>Education</h3>
    <p contenteditable="true">${user_education}</p>

    <h3>Experience</h3>
    <p contenteditable="true">${user_experience}</p>
    
    <h3>Skills</h3>
    <p contenteditable="true">${user_skills}</p>
  `;
    //* Show the generated resume in the "generated-resume" div
    resume_generate.innerHTML = resume_html;
    shareable_link_element.addEventListener("click", (e) => {
        e.preventDefault();
        //* Generate a shareable URL with the username
        const shareableURL = `${window.location.origin}?/${username}`;
        //* Show shareable link
        shareable_link_element.href = shareableURL;
        window.location.href = shareableURL;
    });
});
//* PDF download
download_pdf_Btn.addEventListener("click", () => {
    window.print(); //* This will open the print dialog and allow the user to save the PDF
});
//* Autofill form with data from localStorage if found with the username in the URL
window.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get("username");
    if (username) {
        //* Autofill form if data is found in localStorage
        const saved_resume_data = localStorage.getItem(username);
        if (saved_resume_data) {
            const resumeData = JSON.parse(saved_resume_data);
            document.getElementById("username").value =
                username;
            document.getElementById("name").value =
                resumeData.user_name;
            document.getElementById("email").value =
                resumeData.user_email;
            document.getElementById("phone").value =
                resumeData.user_phone;
            document.getElementById("education").value =
                resumeData.user_education;
            document.getElementById("experience").value =
                resumeData.user_experience;
            document.getElementById("skills").value =
                resumeData.user_skills;
        }
    }
});
