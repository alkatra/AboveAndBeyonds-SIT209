const parts = JSON.parse(localStorage.getItem('parts')) || [];

parts.forEach(function(part) {
    $('#parts tbody').append(`
      <tr>
        <td>${part.partname}</td>
      </tr>`
    );
});

$('#add-part').on('click', function() {
    const partname = $('#partname').val();
    parts.push({partname});
    localStorage.setItem('parts', JSON.stringify(parts));
    location.href = 'iot.html';
});

$('#remove-part').on('click',function() {
    parts.pop();
    localStorage.setItem('parts', JSON.stringify(parts));
    location.href ="iot.html";
})

$('#learnmore').on('click', function() {
    location.href = 'iot.html';
});
