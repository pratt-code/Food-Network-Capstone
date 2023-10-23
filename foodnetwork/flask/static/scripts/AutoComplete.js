$(document).ready(function() {
    let debounce;
    document.querySelector(".search-box").addEventListener('keydown', (e) => {
        if(e.keyCode == 13){
                getSearch();
        } 
        else if(document.getElementById('search_type').value != "Ingredients"){
                clearTimeout(debounce)
                debounce = setTimeout(() => {
                        getAutoComplete();  
                }, 200);
        }
    });
    
    document.querySelector(".search_type").addEventListener('click', (e) => {
        if (document.getElementById('search_type').value == "Ingredients"){
                $('.results').empty(); 
        }
    })

    document.querySelector(".search_button").addEventListener('click', (e) => {
        getSearch();
    })

    var coll = document.getElementsByClassName("collapsible");
    var n;
    for (n = 0; n < coll.length; n++) {
        coll[i].addEventListener("click", function() {
          this.classList.toggle("active");
          var content = this.nextElementSibling;
          if (content.style.display === "block") {
            content.style.display = "none";
          } else {
            content.style.display = "block";
          }
        });
    }
  })

  function getAutoComplete() {
          const query = $('.search-box').val();
          fetch(`http://localhost:9200/search?q=${encodeURIComponent(query.trim())}`)
            .then((resp) => resp.json())
            .then((data) => {
                    $('.results').empty();
                    for (let i = 0; i < data.length; i++) {
                        if (i == 0){
                                $('.results').append(`<a href=result?prompt=${data[i].split(' ').join('_')}&auto=1&ing=0&size=${document.getElementById('max_results').value} ><button style="border-top-right-radius: 8px; border-top-left-radius: 8px; border-bottom: 1px;
                                border-image: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(199,199,199,1) 49%, rgba(255,255,255,1) 100%);">${data[i]}</button></a>`);
                        }
                        else if(i == data.length-1){
                                $('.results').append(`<a href=result?prompt=${data[i].split(' ').join('_')}&auto=1&ing=0&size=${document.getElementById('max_results').value} ><button style="border-bottom-right-radius: 8px; border-bottom-left-radius: 8px; border: none;">${data[i]}</button></a>`);
                        }
                        else{
                                $('.results').append(`<a href=result?prompt=${data[i].split(' ').join('_')}&auto=1&ing=0&size=${document.getElementById('max_results').value} ><button style="border-bottom: 1px;
                                border-image: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(199,199,199,1) 49%, rgba(255,255,255,1) 100%);">${data[i]}</button></a>`); 
                        }   
                    }
                  })
  }

  function getSearch() {
        const query = $('.search-box').val();
        if (document.getElementById('search_type').value != "Ingredients"){
                window.open(`/result?prompt=${query}&auto=0&ing=0&size=${document.getElementById('max_results').value}`, "_self")
        }
        else {
                window.open(`/result?prompt=${query}&auto=0&ing=1&size=${document.getElementById('max_results').value}`, "_self")
        }
}
  