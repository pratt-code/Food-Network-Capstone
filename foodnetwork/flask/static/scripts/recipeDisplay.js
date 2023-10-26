$(document).ready(function() {
    let debounce;
    let hidden = document.querySelectorAll(".recipe_hidden");
    let drop = document.querySelectorAll(".hide_button");
    for (i = 0; i<hidden.length; i++){
        hidden[i].id = `hidden${i}`;
        drop[i].id = `drop${i}`;
        drop[i].addEventListener('click', (e) => {
            e.preventDefault();
            console.log(e.currentTarget.textContent)
            let icon = e.currentTarget.getElementsByTagName("i");
            if (icon[0].textContent == "expand_less"){
                let d = e.currentTarget.id.substring(e.currentTarget.id.length-1, e.currentTarget.id.length);
                document.getElementById(`hidden${d}`).style.display = "none";
                icon[0].textContent = "expand_more";
            }
            else{
                icon[0].textContent = "expand_less";
                let d = e.currentTarget.id.substring(e.currentTarget.id.length-1, e.currentTarget.id.length);
                console.log(document.getElementById(`hidden${d}`).display)
                document.getElementById(`hidden${d}`).style.display = "inline-block";
            }

        })
    }
        
})