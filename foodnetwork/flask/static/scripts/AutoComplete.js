$(document).ready(function() {
    let debounce;
    $('.search-box').on('keydown', function (e) { 
      clearTimeout(debounce)
      debounce = setTimeout(() => {
              getAutoComplete();  
      }, 300);
    })
  })

  function getAutoComplete() {
          const query = $('.search-box').val();
          fetch(`http://localhost:9200/search?q=${encodeURIComponent(query.trim())}`)
            .then((resp) => resp.json())
            .then((data) => {
                    $('.results').empty();
                    for (let i = 0; i < data.length; i++) {
                            $('.results').append(`<a href=result ><button>${data[i]}</button></a>`)
                            console.log(data)
                    }
                  })
  }
  