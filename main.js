      document.getElementById('findword').onclick = () => {
        let word = document.getElementById('word').value;

        addlocalStorage(word);

        document.getElementById('definitions').innerHTML = '';
        axios.get(`https://images-api.nasa.gov/search?q=${word}&media_type=image`)
          .then(response => {
            console.log(response.data.collection.items);

            for (let i = 0; i < 10; i++) {
                let defsDiv = document.getElementById('definitions');
                createImgNasa(response.data.collection.items[i].links[0].href);
                createDescr(response.data.collection.items[i].data[0].description);
            }
        })
      }

      let addlocalStorage = word => {
        let historyWords = JSON.parse(localStorage.getItem('space'));
        if (historyWords) {
          historyWords.push(word);
          localStorage.setItem('space', JSON.stringify(historyWords));
        } else {
        localStorage.setItem('space', JSON.stringify([word, ]))
        }
      }

      function  createImgNasa(param) {
          let li = document.createElement('li');
          let img = document.createElement('img');
          img.style = "width:600px";
          li.style = "list-style-type: none";
          li.appendChild(img);
          img.src = param;
          document.getElementById('definitions').appendChild(li);
        }

      function createDescr(desc) {
        let li = document.createElement('li');
        let p = document.createElement('p');
        li.style = "list-style-type:none; width:600px; margin-bottom:15px";
        li.appendChild(p);
        li.innerHTML = desc;
        document.getElementById('definitions').appendChild(li);
      }
