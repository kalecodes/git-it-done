var repoContainerEl = document.getElementById("repos-container");
var repoSearchTerm = document.getElementById("repo-search-term");

//funciton that makes request to server
var getUserRepos = function(user) {
    //format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    // make a request to the api url
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                //Sending response data to displayRepos() after it is converted to JSON
                displayRepos(data, user);
            });
        } else {
            alert("Error: Github User Not Found");
        }
    })
    .catch(function(error) {
        //Notice this '.catch()' getting chained onto the end of the '.then()' method
        alert("Unable to connect to GitHub")
    })
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
    //check if api returned any repos
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }
    //clear input field and display result username on page
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;
    //displaying repository data to the page 
    //loop over repos
    for (var i = 0; i < repos.length; i++) {
        //format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        //create a container for each repo 
        var repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

        //create a span element to hold repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        //append to container 
        repoEl.appendChild(titleEl);

        //create a status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        //check if current repo has issues or not
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }
        //append to container 
        repoEl.appendChild(statusEl);
        //append container to the dom 
        repoContainerEl.appendChild(repoEl);
    }
};