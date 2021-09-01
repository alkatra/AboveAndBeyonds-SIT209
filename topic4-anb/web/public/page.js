const apiUrl = 'https://api.github.com/networks';

class repoDetails {
    constructor(authorName, repoName) {
        this.authorName = authorName;
        this.repoName = repoName;
    }
}

var repoEvents = []

var author = localStorage.getItem('author');
var repo = localStorage.getItem('repo');

$('#repo-details').on('click', () => {
    currentRepoDetails = new repoDetails($('#authorX').val(), $('#repoX').val());
    localStorage.setItem('author', $('#authorX').val());
    localStorage.setItem('repo', $('#repoX').val());
    location.href = '/stats';
});

function typeCounted(type) {
    for(let i = 0; i < repoEvents.length; i++) {
        if(repoEvents[i][0] == type) {
            return true;
        }
    } 
    return false;
}

function checkEvents(json) {
    for(let i = 0; i < json.length; i++) {
        if(!typeCounted(json[i].type)) {
            var eventName = json[i].type;
            var eventCounter = 0;
            for(let j = i; j < json.length; j++) {
                if (json[j].type == eventName) {
                    eventCounter++;
                }
            }
            var eventArray = [eventName, eventCounter];
            repoEvents[repoEvents.length] = eventArray;
        }
    }
    console.log(repoEvents);
}

function addEventsToTable(json) {
    for(let i = 0; i < repoEvents.length; i++) {
        $('#eventsTable tbody').append(`
            <tr>
            <td>${repoEvents[i][0]}</td>
            <td>${repoEvents[i][1]}</td>
            </tr>`
        ); 
    }
    if(repoEvents.length == 0) {
        $('#eventsTable tbody').append(`
            <tr><td>No events found</td></tr>`
        ); 
    }
}

function resolveLater() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve("resolved");
      }, 150);
    });
}
  
async function asyncCall() {
    console.log("start");
    const result = await resolveLater();
    const response = await fetch(`${apiUrl}/${author}/${repo}/events?per_page=100`);
    const json =  await response.json();
    checkEvents(json);
    addEventsToTable(json);
    // console.log(json);
    console.log(result);
}

asyncCall();
