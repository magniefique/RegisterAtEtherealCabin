<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="stylesheet.css">
    <title>Cabin 626 - Home</title>
</head>
<body>
    <section id="home_page">
        <header id="profile_header">
            <div id="title">
                <h1>The CABIN 626</h1>
            </div>
            <p>Account Details</p>
        </header>
        <section id="main_segment">
            <div class="bg"></div>
            <div id="main_text">
                <h2>Welcome,</h2>
                <h1>Subject Name!</h1>
                <h3>Current Position</h3>
            </div>
        </section>
    </section>
<script>
    let loggedIn = localStorage.getItem('loggedInUser');
    let loggedInData = JSON.parse(loggedIn);

    console.log(loggedInData);
</script>
</body>
</html>