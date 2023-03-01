## unfinish..

# alkaid

provide features like `inversion control` and `Dependency injection` to threejs or other app

> Requires `"emitDecoratorMetadata":true,"experimentalDecorators": true` in tsconfig.json and compiler that supports compiling metadata(prefer swc)


```cmd
npm i alkaid-core
```
```ts
import { Factory, Inject } from 'alkaid-core'

@Inject
class Son {

}
class Parent {
  consturctor(public son: Son) {

  }
}

const { app } = Factory(Parent)
app// = new Parent()
```