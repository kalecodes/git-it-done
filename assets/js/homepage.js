var repoContainerEl = document.getElementById("repos-container");
var repoSearchTerm = document.getElementById("repo-search-term");

//funciton that makes request to server
var getUserRepos = function(user) {
    //format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // make a request to the api url
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            //Sending response data to displayRepos() after it is converted to JSON
            displayRepos(data, user);
        });
    });
};

//Add form funtionality and pass input to API request
var userFormEl = document.getElementById("user-form");
var nameInputEl = document.getElementById("username");

var formSubmitHandler = function(event) {
    event.preventDefault();
    //get value from input element, trim any extra spaces and assign to variable username
    var username = nameInputEl.value.trim();
    //checking if a username has been entered
    if (username) {
        //if there is a username entered, we pass that data to getUserRepos() as an argument
        getUserRepos(username);
        //clear the form 
        nameInputEl.value = "";
    } else {
        alert("Please enter a GitHub username");
    }
};

userFormEl.addEventListener("submit", formSubmitHandler);

//Creare a function to display repos 
    //Accepts both the array of repo data and the term we searched for as parameters
var displayRepos = function(repos, searchTerm) {
    //clear input field and display result username on page
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;
    //displaying repository data to the page 
    //loop over repos
    for (var i = 0; i < repos.length; i++) {
        //format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        //create a container for each repo 
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";

        //create a span element to hold repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        //append to container 
        repoEl.appendChild(titleEl);

        //append container to the dom 
        repoContainerEl.appendChild(repoEl);
    }
};