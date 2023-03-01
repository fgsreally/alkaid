import 'reflect-metadata'

type Construct<T = any> = new (...args: Array<any>) => T

export function Inject(target: any) { }

export function Factory<T>(Module: Construct<T>) {
  const moduleMap = new Map<Construct, InstanceType<Construct>>()
  const app = buildNestModule(Module, moduleMap) as InstanceType<Construct<T>>
  return { app, moduleMap }
}

function buildNestModule(Module: Construct, map: Map<Construct, InstanceType<Construct>>) {
  const paramtypes = getParamtypes(Module) as Construct[]
  let instance: InstanceType<Construct>
  if (map.has(Module)) {
    instance = map.get(Module)
    if (!instance)
      throw new Error(`exist Circular Module dep--${Module}`)
    return instance
  }
  map.set(Module, undefined)
  if (paramtypes) {
    instance = new Module(...paramtypes.map(item =>
      buildNestModule(item, map),
    ))
  }
  else {
    instance = new Module()
  }
  map.set(Module, instance)

  return instance
}

function getParamtypes(Module: Construct) {
  return Reflect.getMetadata('design:paramtypes', Module)
}
