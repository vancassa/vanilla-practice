/*
 * Github.js
 */

class Github {
    constructor() {
        this.client_id = "asf";
        this.client_secret = "asfa";
        this.repos_count = 5;
        this.repos_sort = "created:asc";
    }

    async getUser(username) {
        const profileRes = await fetch(`https://api.github.com/users/${username}`);
        const profile = await profileRes.json();

        const repoRes = await fetch(
            `https://api.github.com/users/${username}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}`
        );
        const repos = await repoRes.json();

        return {
            profile,
            repos
        };
    }
}

/*
 * UI.js
 */

class UI {
    constructor() {
        this.profile = document.getElementById("profile");
    }

    showProfile(user) {
        this.profile.innerHTML = `
        <div class="card card-body mb-3">
          <div class="row">
            <div class="col-md-3">
              <img class="img-fluid mb-2" src="${user.avatar_url}">
              <a href="${
                  user.html_url
              }" target="_blank" class="btn btn-primary btn-block mb-4">View Profile</a>
            </div>
            <div class="col-md-9">
              <span class="badge badge-primary">Public repos: ${user.public_repos}</span>
              <span class="badge badge-secondary">Public gist: ${user.public_gists}</span>
              <span class="badge badge-success">Followers: ${user.followers}</span>
              <span class="badge badge-info">Public repos: ${user.following}</span>
              <br><br>
              <ul class="list-group">
                <li class="list-group-item">Company: ${
                    user.company === null ? "-" : user.company
                }</li>
                <li class="list-group-item">Website/blog: ${
                    user.blog === null ? "-" : user.blog
                }</li>
                <li class="list-group-item">Location: ${
                    user.location === null ? "-" : user.location
                }</li>
                <li class="list-group-item">Member since: ${user.created_at}</li>
            </div>
          </div>
        </div>
        <h3 class="page-heading mb-3">Latest Repos</h3>
        <div id="repos"></div>
      `;
    }

    clearProfile() {
        this.profile.innerHTML = "";
    }

    showRepos(repos) {
        let output = "";

        repos.forEach(repo => {
            output += `
          <div class="card card-body mb-2">
            <div class="row">
              <div class="col-md-6">
                <a href="${repo.html_url}" target="_blank">${repo.name}</a>
              </div>
              <div class="col-md-6">
                <span class="badge badge-primary">Stars: ${repo.stargazers_count}</span>
                <span class="badge badge-secondary">Watchers: ${repo.watchers_count}</span>
                <span class="badge badge-success">Forks: ${repo.forks_count}</span>
              </div>
            </div>
          </div>
        `;
        });

        document.getElementById("repos").innerHTML = output;
    }

    clearRepos() {}

    showAlert(msg, className) {
        this.clearAlert();

        // Create alert element
        const div = document.createElement("div");
        div.className = className;
        div.appendChild(document.createTextNode(msg));

        const container = document.querySelector(".searchContainer");
        container.insertBefore(div, document.querySelector(".search"));
    }

    clearAlert() {
        const currentAlert = document.querySelector(".alert");
        if (currentAlert) currentAlert.remove();
    }
}

/*
 * App.js
 */

const github = new Github();
const ui = new UI();

// Search input
const searchUser = document.getElementById("searchUser");
searchUser.addEventListener("keyup", e => {
    const userText = e.target.value;
    if (userText !== "") {
        // Fetch github data
        github.getUser(userText).then(data => {
            const message = data.profile.message;

            if (message) {
                if (message === "Not Found") {
                    // User not found
                    ui.showAlert(`User ${userText} not found`, "alert alert-danger");
                } else if (message.includes("API rate limit exceeded")) {
                    // Rate limit exceeded
                    ui.showAlert(
                        `Whoops! Github fetch limit exceeded. Please try again later.`,
                        "alert alert-danger"
                    );
                }
            } else {
                // Show profile
                ui.showProfile(data.profile);
                ui.showRepos(data.repos);
                ui.clearAlert();
            }
        });
    } else {
        //Clear data
        ui.clearProfile();
    }
});
