  function getResult(i) {
        console.log("Got Here")
          const query = i;
          fetch(`http://localhost:9200/result_data?q=${encodeURIComponent(query.trim())}`)
            .then((resp) => resp.json())
            .then((data) => {
                    $('.display').empty();
                    for (let i = 0; i < data.length; i++) {
                            $('.display').append(`<button>${data[i]}</button>`)
                            console.log(data)
                    }
                  })
  }