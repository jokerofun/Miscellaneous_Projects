function startApp() {

}

$('#registerButton').on('click', showRegisterView);
$('#registerUser').on('click', registerUser);
$('#loginButton').on('click', showLoginView);
$('#logUserBtn').on('click', loginUser);
$('#myListings').on('click', myListingView);
$('#logout').on('click', logoutUser);
$('#signUpBtn').on('click', showRegisterView);
$('#signInBtn').on('click', showLoginView);
$('#home').on('click', showHomeMenu);
$('#allListings').on('click', allListings);
$('#createListings').on('click', createListingsView);
// $('.button-carDetails').on('click',carDetails);
$('#createCars').submit(createCar);
$('#editCars').submit(saveEditedCar);
$("form").submit(function (event) {
    event.preventDefault()
});

function hideAllViews() {
    $('#main').hide();
    $('#login').hide();
    $('#registerForm').hide();
    $('#createCars').hide();
    $('#editCars').hide();
    $('#carMyListings').hide();
    $('#car-listings').hide();
    $('#listDetails').hide();
    $('#allListings').hide();
    $('#createListings').hide();
    $('#myListings').hide();
    $('#profile').hide();

}

function showHideMenuLinks() {
    hideAllViews();
    if (sessionStorage.getItem('authToken') === null) {
        $('#main').show();

    } else {
        $('#main').hide();
        $('#allListings').show();
        $('#myListings').show();
        $('#createListings').show();
        $('#profile').show();
        $('#car-listings').show();
        $('#welcm').text(`Welcome ${sessionStorage.getItem('username')}`);

    }
}

function showHomeMenu() {
    showHideMenuLinks();
}

function createListingsView() {
    hideAllViews();
    $('#createCars').show();
}

function showRegisterView() {
    hideAllViews();
    $('#registerForm').show();
}

function showLoginView() {
    hideAllViews();
    $('#login').show();
}

function loginUser() {
    let username = $('#formLogin input[name="username"]').val();
    let password = $('#formLogin input[name="password"]').val();

    let usernameRegex = /[A-Za-z]{3,}/;
    let passRegex = /A-Za-z0-9{6,}/;

    if (!usernameRegex.test(username)) {
        showError("Username length should be at least 3 characters long and contains just english lettes");

    } else if (!passRegex.test(password)) {
        showError("Password should be at least 6 characters");
    } else {
        $.ajax({
            method: "POST",
            url: kinveyBaseUrl + "user/" + kinveyAppKey + "/login",
            data: {
                username,
                password
            },
            headers: kinveyAppAuthHeaders
        }).then(function (res) {
            saveAuthInSession(res);
            showHideMenuLinks();
            allListings();
            showInfo("Login successful.");
        }).catch(handleAjaxError);
    }
}

function registerUser() {
    let username = $('#registerForm input[name="username"]').val();
    let password = $('#registerForm input[name="password"]').val();
    let repeatPass = $('#registerForm input[name="repeatPass"]').val();

    let usernameRegex = /[A-Za-z]{3,}/;
    let passRegex = /A-Za-z0-9{6,}/;

    if (!usernameRegex.test(username)) {
        showError("Username length should be at least 3 characters long and contains just english lettes");

    } else if (!passRegex.test(password)) {
        showError("Password should be at least 6 characters");
    } else if (password !== repeatPass) {
        showError("Password and repeat password should match.");
    } else {
        $.ajax({
            method: "POST",
            url: kinveyBaseUrl + "user/" + kinveyAppKey + "/",
            data: {
                username,
                password
            },
            headers: kinveyAppAuthHeaders
        }).then(function (res) {
            saveAuthInSession(res);
            showHideMenuLinks();
            allListings();
            showInfo("Registration successful.");
        }).catch(handleAjaxError);
    }
}

function logoutUser() {
    $.ajax({
        method: "POST",
        url: kinveyBaseUrl + "user/" + kinveyAppKey + "/_logout",
        headers: getKinveyUserAuthHeaders()
    }).then(function () {
        sessionStorage.clear();
        $('#welcm').text('');
        showHideMenuLinks();
        showInfo("Logout successful.");
    }).catch(handleAjaxError);

}

function allListings() {
    $.ajax({
        method: "GET",
        url: kinveyBaseUrl + "appdata/" + kinveyAppKey + "/cars",
        headers: getKinveyUserAuthHeaders()
    }).then(function (resp) {
        $('#car-listings').show();
        $('#listings').empty();
        if (res.length === 0) {
            $('#listings').append('<p class="no-cars">No cars in database!</p>')
        } else {
            for (const res of resp) {
                let singleListing = $(`<div class="listing">
                <p>${res.title}</p>
                <img src="${res.imageUrl}">
                <h2>${res.brand}</h2>
                <div class="info">
                    <div id="data-info">
                        <h3>Seller: ${res.seller}</h3>
                        <h3>Fuel: ${res.fuel}</h3>
                        <h3>Year: ${res.year}</h3>
                        <h3>Price: ${res.price} $</h3>
                    </div>
                    <div id="data-buttons">
                        <ul>
                            <li class="action">
                                <a href="#" class="button-carDetails details">Details</a>
                            </li>
                            <li class="action">
                                <a href="#" class="button-carDetails edit">edit</a>
                            </li>
                            <li class="action">
                                <a href="#" class="button-carDetails del">delete</a>
                            </li>

                        </ul>
                    </div>
                </div>

            </div>`);
                singleListing.appendTo($('#listings'));
                // .find('.details').on('click',{id:res._id},carDetails)
            }
        }
    }).catch(handleAjaxError);
}

function createCar() {
    let seller = sessionStorage.getItem('username');
    let title = $('#createCars input[name="title"]').val().trim();
    let description = $('#createCars input[name="description"]').val().trim();
    let brand = $('#createCars input[name="brand"]').val().trim();
    let model = $('#createCars input[name="model"]').val().trim();
    let year = $('#createCars input[name="year"]').val().trim();
    let imageUrl = $('#createCars input[name="imageUrl"]').val().trim();
    let fuel = $('#createCars input[name="fuelType"]').val().trim();
    let price = $('#createCars input[name="price"]').val().trim();

    if (title.length > 33) {
        showError("Title length is too long!")
    } else if (description.length < 30 || description.length > 450) {
        showError("Should be between 30 and 450 chars");
    } else if (brand.length > 11 || fuel.length > 11 || model.length > 11) {
        showError("Brand, fuel and model are too long");
    } else if (model.length < 4) {
        showError("Model should be longer than 4 chars");
    } else if (year.length !== 4) {
        showError("Year has contains 4 chars");
    } else if (price > 1000000) {
        showError("Invalid price!");
    } else if (title === '' || price === '') {
        showError("All fields have to be filler!");
    } else {
        $.ajax({
            method: "POST",
            url: kinveyBaseUrl + "appdata/" + kinveyAppKey + "/cars",
            data: {
                seller,
                title,
                description,
                brand,
                model,
                year,
                imageUrl,
                fuel,
                price
            },
            headers: getKinveyUserAuthHeaders()
        }).then(function (res) {
            showHideMenuLinks();
            showInfo("Listing created!");
            allListings();
        }).catch(handleAjaxError);
    }
}

function carDetails(car) {
    hideAllViews();
    $('#listDetails').show();
    $('.my-listing-details').empty();

    let details =
        `<p id="auto-title">${car.title}</p>
    <img src="${car.imageUrl}">
    <div class="listing-props">
        <h2>Brand: ${car.brand}</h2>
        <h3>Model: ${car.model}</h3>
        <h3>Year: ${car.year}</h3>
        <h3>Fuel: ${car.fuel}</h3>
        <h3>Price: ${car.price} $</h3>
    </div>
    <div class="listings-buttons">

        <a href="#" class="button-list">Edit</a>
        <a href="#" class="button-list">Delete</a>
    </div>
    <p id="description-title">Description:</p>
    <p id="description-para">${car.description}</p>`;
    $(details).appendTo($('.my-listing-details'));
}

function deleteCar(car) {
    $.ajax({
        method: "DELETE",
        url: kinveyBaseUrl + "appdata/" + kinveyAppKey + "/cars/" + car._id,
        headers: getKinveyUserAuthHeaders()
    }).then(function (res) {
        allListings();
        showInfo('Listing deleted');
    }).catch(handleAjaxError);
}

function editCar() {

}