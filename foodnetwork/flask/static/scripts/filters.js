function getFilters(tags) {
    let allergy = [];
    let numFiltered = 0;
    let tagsList = tags.split('"');
    for (i=0; i<tagsList.length; i++){
        if(tagsList[i].endsWith("Free") && !allergy.includes(tagsList[i])){
            allergy.push(tagsList[i]);
            $('.allergy').append(`<input type="checkbox" id="filter${allergy.length-1}" name="filter${i}"><label for="filter${allergy.length-1}">${tagsList[i]}</label><br>`);
            document.getElementById(`filter${allergy.length-1}`).addEventListener('change', (e) => {
                if (e.target.checked) {
                    console.log("Checkbox is checked..");
                    rs = document.querySelectorAll(".recipe");
                    for (j=0; j<rs.length; j++){
                        let tList = rs[j].querySelector('.hidden_tags');
                        let tString = tList.textContent;
                        let d = e.currentTarget.id.substring(6);
                        if (!tString.includes(allergy[d])){
                            rs[j].style.display = "None"
                            let filterCount = parseInt(rs[j].querySelector(".filterCount").textContent);
                            if (filterCount == 0){
                                numFiltered++;
                            }
                            rs[j].querySelector(".filterCount").textContent = filterCount + 1;
                        }
                    }
                    let fill = document.getElementById("filterNum");
                    fill.textContent = numFiltered;
                  } else {
                    console.log("Checkbox is not checked..");
                    rs = document.querySelectorAll(".recipe");
                    for (j=0; j<rs.length; j++){
                        let tList = rs[j].querySelector('.hidden_tags');
                        let tString = tList.textContent;
                        let d = e.currentTarget.id.substring(6);
                        if (!tString.includes(allergy[d])){
                            let filterCount = parseInt(rs[j].querySelector(".filterCount").textContent);
                            if (filterCount == 1){
                                rs[j].style.display = "inline-block"
                                numFiltered--;
                            }
                            rs[j].querySelector(".filterCount").textContent = filterCount - 1;
                        }
                    }
                    let fill = document.getElementById("filterNum");
                    fill.textContent = numFiltered;
                  }
            });
        }
        
    }    
}

