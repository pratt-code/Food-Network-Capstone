$(document).ready(function() {
    let debounce;
    let ingredient_item = [];
    document.querySelector(".search-box").addEventListener('keydown', (e) => {
        if(e.keyCode == 13){
                getSearch(ingredient_item);
        } 
        else if(document.getElementById('search_type').value != "Ingredients"){
                clearTimeout(debounce)
                debounce = setTimeout(() => {
                        getAutoComplete();  
                }, 200);
        }
        else if(document.getElementById('search-box').value.endsWith(",") && document.getElementById('search_type').value == "Ingredients" && document.getElementById('search-box').value.length > 2){
                e.preventDefault();
                $('.resultList').append(`<div class="boxContainer2" id="con${ingredient_item.length}">
                <table class="elementsContainer2" style="height=42px;">
                  <tr>
                    <td style="font-size: 17px; font-family: Nunito; padding-right: 20px; padding-left: 15px; vertical-align: 10px;">
                        <b id="ingredient_item${ingredient_item.length}">${document.getElementById('search-box').value.substring(0, document.getElementById('search-box').value.length-1)}</b>
                    </td>
                    <td style="width: 40px;">
                        <button class="x_button" id="ingredient_x${ingredient_item.length}" href=""><i style="font-size: 20px;" class="material-icons">close</i></button>
                    </td>
                  </tr>
                </table>
              </div>`)
              document.getElementById(`ingredient_x${ingredient_item.length}`).addEventListener('click', (e) => {
                var n = e.currentTarget.id.substring(e.currentTarget.id.length-1, e.currentTarget.id.length);
                document.getElementById(`con${n}`).remove();
                var index = ingredient_item.indexOf(`ingredient_item${n}`);
              });
              ingredient_item.push(document.getElementById('search-box').value.substring(0, document.getElementById('search-box').value.length-1));
              document.getElementById('search-box').value = '';
        }
    });
    
    document.querySelector(".search_type").addEventListener('click', (e) => {
        if (document.getElementById('search_type').value == "Ingredients"){
                $('.results').empty();
                document.getElementById('search-box').value = '';
        }
        else{
                $('.resultList').empty();
                $('.results').empty();
                ingredient_item = [];
                document.getElementById('search-box').value = '';
        }
    })

    document.querySelector(".search_button").addEventListener('click', (e) => {
        getSearch(ingredient_item);
    })
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

  function getSearch(ing) {
        const query = $('.search-box').val();
        if (document.getElementById('search_type').value != "Ingredients"){
                window.open(`/result?prompt=${query}&auto=0&ing=0&size=${document.getElementById('max_results').value}`, "_self")
        }
        else {
                console.log(ing.toString())
                window.open(`/result?prompt=${ing.toString()}&auto=0&ing=1&size=${document.getElementById('max_results').value}`, "_self")
        }
}
  