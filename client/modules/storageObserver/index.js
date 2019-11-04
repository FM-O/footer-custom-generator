import RenderList from '../renderList';

class StorageObserver {
    constructor() {
        this.exec();
    }

    exec() {
       this.bindEvents();
    }

    bindEvents() {
        window.addEventListener('storageChange', (e) => {
            const renderList = new RenderList();
            renderList.exec();
        });
    }
}
  
export default StorageObserver;
