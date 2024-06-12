export function Singleton(): ClassDecorator {
    return (target) => {
        const originalConstructor = target;

        function construct(constructor: any, args: any[]) {
            if (!constructor.instance) {
                constructor.instance = new (originalConstructor as unknown as Constructor)(...args);
            }
            return constructor.instance;
        }

        const newConstructor: any = function (...args: any[]) {
            return construct(originalConstructor, args);
        }

        newConstructor.prototype = originalConstructor.prototype;
        return newConstructor;
    }
}
