export function Mapping(symbol: Symbol): PropertyDecorator{
    return (target, propertyKey) => {
        Reflect.defineMetadata(propertyKey, symbol, target)
    }
}
