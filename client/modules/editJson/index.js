import Storage from '../services/storage';

class EditJson {
    constructor() {
        this.data = {};
        this.dlButton = document.getElementById('download-json');

        this.bindEvents();
    }

    bindEvents() {
        this.dlButton.addEventListener('click', this.fillJsonfile.bind(this));
    }

    fillJsonfile() {
        const storageData = JSON.stringify(Storage.getAllData());
        const data = JSON.stringify({jsonData: storageData});
        const xhr = new XMLHttpRequest();

        xhr.open('post', '/api/writeJson');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.responseType = 'text';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                window.location.href = xhr.response;
            } else {
               throw new Error('request api failed');
            }
        });
        xhr.send(data);
    }
}
  
export default EditJson;
