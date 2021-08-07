$(() => {
    const app = Sammy('#main', function () {

        this.use('Handlebars', 'hbs');

        this.get('/index.html', displayHome);
        this.get('#/home', displayHome);

        this.get('#/about', function (context) {
            context.loggedIn = sessionStorage.getItem('authtoken') !== null;
            context.username = sessionStorage.getItem('username');

            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function () {
                this.partial('./templates/about/about.hbs');
            });
        });


        this.get('#/login', function (context) {
            context.loggedIn = sessionStorage.getItem('authtoken') !== null;
            context.username = sessionStorage.getItem('username');

            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                loginForm: './templates/login/loginForm.hbs'
            }).then(function () {
                this.partial('./templates/login/loginPage.hbs');
            });
        });
        this.get('#/register', function (context) {
            context.loggedIn = sessionStorage.getItem('authtoken') !== null;
            context.username = sessionStorage.getItem('username');

            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                registerForm: './templates/register/registerForm.hbs'
            }).then(function () {
                this.partial('./templates/register/registerPage.hbs');
            });
        });

        this.get('#/logout', function (context) {
            auth.logout()
                .then(function () {
                    sessionStorage.clear();
                    auth.showInfo("Successfully logged out!");
                    displayHome(context);
                });
        });

        this.post('#/register', function (context) {
            let username = this.params.username;
            let password = this.params.password;
            let repeatPassword = this.params.repeatPassword;

            if (password !== repeatPassword) {
                WebAuthentication.showError('The given passwords do not matched!');
            } else {
                auth.register(username, password)
                    .then(function (response) {
                        auth.saveSession(response);
                        auth.showInfo("You was registered successfully!");
                        displayHome(context);
                    }).catch(auth.handleError);
            }
        });

        this.post('#/login', function (context) {

            let username = this.params.username;
            let password = this.params.password;

            auth.login(username, password)
                .then(function (response) {
                    auth.saveSession(response);
                    auth.showInfo("You just logged in!");
                    displayHome(context);
                }).catch(auth.handleError);
        });

        this.get('#/catalog', function (context) {
            context.loggedIn = sessionStorage.getItem('authtoken') !== null;
            context.username = sessionStorage.getItem('username');
            context.teamId = sessionStorage.getItem('teamId') !== 'undefined' ||
                sessionStorage.getItem('teamId') !== null;
            context.hasNoTeam = sessionStorage.getItem('teamId') !== null;

            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                team: './templates/catalog/team.hbs'
            }).then(function () {
                teamsService.loadTeams()
                    .then((response) => {
                        context.teams = response;
                        this.partial('./templates/catalog/teamCatalog.hbs');
                    }).catch(auth.handleError);

            });
        });

        this.get('#/create', function (context) {
            context.loggedIn = sessionStorage.getItem('authtoken') !== null;
            context.username = sessionStorage.getItem('username');

            this.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
                createForm: './templates/create/createForm.hbs'
            }).then(function () {
                this.partial('./templates/create/createPage.hbs');
            });
        });


        function displayHome(context) {

            context.loggedIn = sessionStorage.getItem('authtoken') !== null;
            context.username = sessionStorage.getItem('username');
            context.teamId = sessionStorage.getItem('teamId') !== 'undefined' ||
                sessionStorage.getItem('teamId') !== null;


            context.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs'
            }).then(function () {
                this.partial('./templates/home/home.hbs');
            });
        }
    });

    app.run();
});