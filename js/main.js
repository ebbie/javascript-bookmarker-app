//listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save Bookmark
function saveBookmark(e) {
    // Get form values
    var  siteName = document.getElementById('siteName').value;
    console.log(siteName);    
    var  siteURL = document.getElementById('siteUrl').value;
    console.log(siteURL);    

    if(!siteName || !siteURL) {
        alert("Please fill in the form");
        return false;
    }
    var bookmark = {
        name: siteName,
        url: siteURL
    }

    console.log(bookmark);

    // // Local Storage Test
    // localStorage.setItem('test', 'Hello World');
    // console.log(localStorage.getItem('test'));
    // localStorage.removeItem('test');
    // console.log(localStorage.getItem('test'));
    
    // Test if bookmarks is null
    if (localStorage.getItem('bookmarks') === null) {
        // Initialize array
        var bookmarks = [];
        // Add to array
        bookmarks.push(bookmark);
        // Set to LocalStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        // Get bookmarks from LocalStorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // Add bookmark to array 
        bookmarks.push(bookmark);
        // Reset back to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

        // Refetch the Bookmarks
        fetchBookmarks();

    // pervent form from submitting
    e.preventDefault();
}

// Delete Bookmark
function deleteBookmark(url) {
    console.log(url);
    // Get bookmarks from LcoalStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Loop Through bookmarks
    for(var i=0; i < bookmarks.length; i++) {
        if(bookmarks[i].url == url) {
            // Remove from array
            bookmarks.splice(i, 1);
        }
        // Reset back to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    // Refetch the Bookmarks
    fetchBookmarks();
}

function fetchBookmarks() {
        // Get bookmarks from LocalStorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

        console.log(bookmarks);

        // Get output id
        var bookmarksResults = document.getElementById('bookmarksResults');

        // Build Output
        bookmarksResults.innerHTML = '';
        for(var i = 0; i < bookmarks.length; i++) {
            var name = bookmarks[i].name;
            var url = bookmarks[i].url;

            bookmarksResults.innerHTML += '<div class="well">'+
                                           '<h3>'+name+
                                           ' <a class= "btn btn-default" href="'+url+'">Visit</a>'+
                                           ' <a onclick="deleteBookmark(\''+url+'\')" class= "btn btn-danger" href="#">Delete</a>'+
                                           '</h3>'+
                                           '</div>';
        }
}