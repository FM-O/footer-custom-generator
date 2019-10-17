const modules = require('./modules');

const app = () => {
    for (const mod in modules) {
        // console.log(`mod : ${mod}; content: ${modules[mod]}`);
        // console.log(modules[mod]);
        const ModuleClass = modules[mod];

        const Class = ModuleClass.default.prototype.constructor;
        new Class();
    }
}

window.app = app();