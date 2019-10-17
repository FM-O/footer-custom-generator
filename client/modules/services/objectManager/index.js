import Storage from '../storage';
import Diacritics from 'diacritics';
import ObjectAssign from 'object-assign';

class ObjectManager {
    constructor() {}

    add(dataName, props, selector) {
        const data = {};

        if (selector !== undefined && (!props.name || typeof props.name !== 'string')) {
            props = ObjectAssign(this.get(dataName, selector), props);
        }

        if ((!props.name || typeof props.name !== 'string') && selector === undefined) {
            return '';
        }

        const propName = this.__normalize(props.name);
        data[propName] = {};
 
        for (const property in props) {
            if (props.hasOwnProperty(property)) {
                data[propName][property] = props[property];
            }
        }

        Storage.setData(dataName, data);
        return propName;
    }

    delete(dataGroup, dataName) {
        Storage.deleteData(dataGroup, dataName);
    }

    get(dataGroup, selector) {
       return selector === undefined ? Storage.getData(dataGroup) : Storage.getData(dataGroup, selector);
    }

    __normalize(string) {
        if (!typeof string === 'string') {
            return false;
        }

        const normalizedString = string.toLowerCase().trim();

        return Diacritics.remove(normalizedString.split(' ').join('-').split('\'').join('-'));
    }
}
  
export default ObjectManager;
