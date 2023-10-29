$(document).ready(function() {
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
                let d = e.currentTarget.id.substring(4);
                console.log(d)
                document.getElementById(`hidden${d}`).style.display = "none";
                icon[0].textContent = "expand_more";
            }
            else{
                icon[0].textContent = "expand_less";
                let d = e.currentTarget.id.substring(4);
                console.log(d)
                console.log(document.getElementById(`hidden${d}`).display)
                document.getElementById(`hidden${d}`).style.display = "inline-block";
            }

        })
    }

    /* Change color of calories container based on number */
    let c = document.querySelectorAll(".calories");
    for (i=0; i<c.length; i++){
        let num = c[i].querySelector(".c_num");
        
        /* Set value of recipes without calories */
        if (num.textContent == "No"){
            num.textContent = "N/A";
            c[i].style.backgroundColor = "#c2c2d6";
        }
        else if (parseInt(num.textContent) > 1000){
            c[i].style.backgroundColor = "#ff6666";

        }
        else if (parseInt(num.textContent) > 650){
            c[i].style.backgroundColor = "#ffff99";
        }
    }

    /* Change "No" for nutrition info to N/A */
    let n = document.querySelectorAll(".protein");
    for (i=0; i<n.length; i++){ 
        let p = n[i].querySelector("b");
        if (p.textContent == "No g"){
            p.textContent = "N/A"
        }
    }

    let m = document.querySelectorAll(".fat");
    for (i=0; i<m.length; i++){ 
        let p = m[i].querySelector("b");
        if (p.textContent == "No g"){
            p.textContent = "N/A"
        }
    }

    let o = document.querySelectorAll(".sodium");
    for (i=0; i<o.length; i++){ 
        let p = o[i].querySelector("b");
        if (p.textContent == "No mg"){
            p.textContent = "N/A"
        }
    }
        
})