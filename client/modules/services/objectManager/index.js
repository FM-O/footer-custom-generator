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
        this.deleteAttachments(dataName, dataGroup);

        Storage.deleteData(dataGroup, dataName);
    }

    updateAttachments(from, to) {
        const existingAttachment = Storage.getData('attachments', this.__normalize(from.name));

        if (typeof existingAttachment === 'object' && Object.keys(existingAttachment).length > 0) {
            const newArray = existingAttachment.attachedTo;

            newArray.forEach(entry => {
                if (entry.name === to.name) {
                    return false;
                }
            });

            newArray.push({name: to.name, type: to.type});

            this.add('attachments', {name: from.name, type: from.type, attachedTo: newArray});
            return true;
        }

        this.add('attachments', {name: from.name, type: from.type, attachedTo: [{name: to.name, type: to.type}]});
        return true;
    }

    deleteAttachments(deletedEntity, group) {
        const attachments = Storage.getData('attachments');

        for (const attachment in attachments) {
            if (attachments.hasOwnProperty(attachment)) {
                const element = attachments[attachment];
                const newArray = element.attachedTo;
                
                element.attachedTo.forEach((linkedEntity, index) => {
                    if (linkedEntity.name === deletedEntity) {
                        newArray.splice(index, 1);
                    }
                });

                this.add('attachments', {name: element.name, attachedTo: newArray});
            }
        }

        if (!attachments[deletedEntity]) {
            return false;
        }

        const attachedEntities = attachments[deletedEntity].attachedTo;

        attachedEntities.forEach(entity => {
            const targetedEntity = Storage.getData(entity.type, entity.name);
            const targetedAttachment = targetedEntity.attachment[group].indexOf(deletedEntity);
            const newArray = targetedEntity.attachment[group];

            if (targetedAttachment < 0) {
                return false;
            }

            if (targetedEntity.attachment[group].length < 2) {
                targetedEntity.attachment[group] = [];
                this.add(entity.type, {
                    attachment: targetedEntity.attachment
                }, entity.name);
            }

            newArray.splice(targetedAttachment, 1);

            targetedEntity.attachment[group] = newArray;

            this.add(entity.type, {
                attachment: targetedEntity.attachment
            }, entity.name);

            // All attachments are deleted, we can now delete the entity from attachments
        });

        Storage.deleteData('attachments', deletedEntity);
        return true;
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
