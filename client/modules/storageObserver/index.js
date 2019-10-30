import Storage from '../services/storage';
import ObjectManager from '../services/objectManager';

class StorageObserver extends ObjectManager {
    constructor() {
        super();
        this.groups = {
            'cities': document.getElementById('cities-area'),
            'regions': document.getElementById('regions-area'),
            'districts': document.getElementById('districts-area'),
        }
        this.objectManager = new ObjectManager();
        this.exec();
    }

    exec() {
       this.bindEvents();
    }

    bindEvents() {
        window.addEventListener('storageChange', (e) => {
            this.buildArea(e.detail.groupType, Storage.getData(e.detail.groupType));
        });
    }

    buildArea(groupType, data) {
        const oldCitiesList = this.groups[groupType].firstElementChild;
        if (oldCitiesList !== null) {
            this.groups[groupType].removeChild(oldCitiesList);
        }

        const citiesList = document.createElement('ul');
        for (const element in data) {
            const elementList = document.createElement('li');
            const elementLink = document.createElement('a');
            elementLink.href = data[element].link;
            elementLink.target = '_blank';
            elementLink.innerHTML = data[element].name;

            const deleteLink = elementLink.cloneNode(true);
            deleteLink.href = "#";
            deleteLink.className = "delete-button";
            deleteLink.setAttribute('data-list', groupType);
            deleteLink.setAttribute('data-element', element);
            deleteLink.innerHTML = 'delete';
            this.attachDeleteEvent(deleteLink);

            elementList.appendChild(elementLink);
            elementList.appendChild(deleteLink);
            citiesList.appendChild(elementList);
            
            // if (data[element].attachment !== undefined) {
            //     for (const attachment in data[element].attachment) {
            //         if (data[element].attachment.hasOwnProperty(attachment)) {
            //             const areaType = data[element].attachment[attachment];
            //             console.log(areaType);

            //             areaType.forEach(location => {
            //                 const locationData = this.objectManager.get(attachment, location);
            //                 console.log(locationData);
            //             });
            //         }
            //     }
            // }
        }

        this.groups[groupType].appendChild(citiesList);
    }

    attachDeleteEvent(link) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            this.objectManager.delete(link.getAttribute('data-list'), link.getAttribute('data-element'));
        });
    }
}
  
export default StorageObserver;
